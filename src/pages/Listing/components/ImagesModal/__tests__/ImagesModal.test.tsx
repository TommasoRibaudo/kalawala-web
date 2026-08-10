/**
 * ImagesModal Component Tests
 *
 * Covers the full-screen "all photos" gallery: the thumbnail grid, the
 * zoomable single-photo viewer, and how the two layers close.
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ImagesModal from '../ImagesModal.component';
import { gecoImageDescriptions, delfinImageDescriptionsES } from '../../../../../utils/constants';

describe('ImagesModal', () => {
  const closeModal = jest.fn();

  beforeEach(() => {
    closeModal.mockClear();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const openGrid = (houseName = 'Geco', locale: 'en' | 'es' = 'en') =>
    render(<ImagesModal closeModal={closeModal} houseName={houseName} locale={locale} />);

  const thumbs = () => screen.getAllByRole('button', { name: /./ }).filter((b) => b.querySelector('img'));

  test('renders every photo of the house as a thumbnail', () => {
    openGrid();

    expect(thumbs()).toHaveLength(gecoImageDescriptions.length);
    expect(screen.getByText(`${gecoImageDescriptions.length} photos`)).toBeInTheDocument();
  });

  test('locks page scroll while open and restores it on unmount', () => {
    const { unmount } = openGrid();
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test('closes from the header button and from Escape', () => {
    openGrid();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(closeModal).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closeModal).toHaveBeenCalledTimes(2);
  });

  test('opens the zoomable viewer on the photo that was tapped', () => {
    openGrid();

    fireEvent.click(thumbs()[2]);

    expect(screen.getByTestId('zoomable-image')).toBeInTheDocument();
    expect(screen.getByText(`3 / ${gecoImageDescriptions.length}`)).toBeInTheDocument();
  });

  test('pages through photos with the arrows and wraps around', () => {
    openGrid();
    fireEvent.click(thumbs()[0]);

    const total = gecoImageDescriptions.length;
    const viewerBar = screen.getByText(`1 / ${total}`).parentElement as HTMLElement;

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(within(viewerBar).getByText(`2 / ${total}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(within(viewerBar).getByText(`${total} / ${total}`)).toBeInTheDocument();
  });

  test('arrow keys page through the viewer', () => {
    openGrid();
    fireEvent.click(thumbs()[0]);

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText(`2 / ${gecoImageDescriptions.length}`)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText(`1 / ${gecoImageDescriptions.length}`)).toBeInTheDocument();
  });

  test('Escape steps back to the grid before closing the gallery', () => {
    openGrid();
    fireEvent.click(thumbs()[0]);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('zoomable-image')).not.toBeInTheDocument();
    expect(closeModal).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  test('labels controls in Spanish on the ES routes', () => {
    openGrid('DelfinES', 'es');

    expect(
      screen.getByText(`${delfinImageDescriptionsES.length} fotos`)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });

  test('renders a message instead of an empty grid for an unknown house', () => {
    render(<ImagesModal closeModal={closeModal} houseName="NotAHouse" locale="en" />);

    expect(screen.getByText('No images available')).toBeInTheDocument();
    expect(thumbs()).toHaveLength(0);
  });
});
