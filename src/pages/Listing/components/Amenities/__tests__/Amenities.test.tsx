import { render, screen } from '@testing-library/react';
import Amenities from '../Amenities.component';
import { AmenityType } from '../../../../../utils/types';

const amenities: AmenityType[] = [
  { name: 'Private Equipped Bathroom', icon: 'bath' },
  { name: 'Private Equipped Kitchen', icon: 'kitchen' }
];

describe('Amenities', () => {
  test('leads with bedroom, bathroom and occupancy counts when given a property key', () => {
    render(<Amenities amenities={amenities} propertyKey="Geco" isSpanish={false} />);

    expect(screen.getByText('2 bedrooms')).toBeInTheDocument();
    expect(screen.getByText('1 bathroom')).toBeInTheDocument();
    expect(screen.getByText('Up to 5 guests')).toBeInTheDocument();

    // the amenities themselves are still rendered, after the capacity tiles
    expect(screen.getByText('Private Equipped Kitchen')).toBeInTheDocument();

    const tiles = screen.getAllByText(/bedrooms|bathroom|guests|Private Equipped/);
    expect(tiles.slice(0, 3).map((t) => t.textContent)).toEqual([
      '2 bedrooms',
      '1 bathroom',
      'Up to 5 guests'
    ]);
  });

  test('renders the counts in Spanish', () => {
    render(<Amenities amenities={amenities} propertyKey="Delfin" isSpanish={true} />);

    expect(screen.getByText('2 habitaciones')).toBeInTheDocument();
    expect(screen.getByText('2 baños')).toBeInTheDocument();
    expect(screen.getByText('Hasta 6 huéspedes')).toBeInTheDocument();
  });

  test('renders amenities alone when no property key is given', () => {
    const { container } = render(<Amenities amenities={amenities} />);

    expect(screen.getByText('Private Equipped Bathroom')).toBeInTheDocument();
    expect(container.querySelectorAll('.amenitiesCont__capacity')).toHaveLength(0);
  });

  test('skips the capacity tiles for an unknown property key', () => {
    const { container } = render(<Amenities amenities={amenities} propertyKey="NotAProperty" />);

    expect(screen.getByText('Private Equipped Bathroom')).toBeInTheDocument();
    expect(container.querySelectorAll('.amenitiesCont__capacity')).toHaveLength(0);
  });
});
