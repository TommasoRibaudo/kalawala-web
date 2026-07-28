import { render, screen } from '@testing-library/react';
import PropertyFacts from '../PropertyFacts.component';
import { PROPERTY_CAPACITY } from '../../../utils/constants';

describe('PropertyFacts', () => {
  test('renders bedrooms, bathrooms and max occupancy in English', () => {
    render(<PropertyFacts propertyKey="Geco" isSpanish={false} />);

    expect(screen.getByText('2 bedrooms')).toBeInTheDocument();
    expect(screen.getByText('1 bathroom')).toBeInTheDocument();
    expect(screen.getByText('Up to 5 guests')).toBeInTheDocument();
  });

  test('renders the same facts in Spanish', () => {
    render(<PropertyFacts propertyKey="Geco" isSpanish={true} />);

    expect(screen.getByText('2 habitaciones')).toBeInTheDocument();
    expect(screen.getByText('1 baño')).toBeInTheDocument();
    expect(screen.getByText('Hasta 5 huéspedes')).toBeInTheDocument();
  });

  test('uses singular wording for one-bedroom properties', () => {
    const { unmount } = render(<PropertyFacts propertyKey="VillaMar" isSpanish={false} />);
    expect(screen.getByText('1 bedroom')).toBeInTheDocument();
    unmount();

    render(<PropertyFacts propertyKey="VillaMar" isSpanish={true} />);
    expect(screen.getByText('1 habitación')).toBeInTheDocument();
  });

  test('renders plural bathrooms for the two-bathroom properties', () => {
    const { unmount } = render(<PropertyFacts propertyKey="Delfin" isSpanish={false} />);
    expect(screen.getByText('2 bathrooms')).toBeInTheDocument();
    expect(screen.getByText('Up to 6 guests')).toBeInTheDocument();
    unmount();

    render(<PropertyFacts propertyKey="Giulia" isSpanish={true} />);
    expect(screen.getByText('2 baños')).toBeInTheDocument();
    expect(screen.getByText('Hasta 4 huéspedes')).toBeInTheDocument();
  });

  test('renders nothing when the property has no capacity configured', () => {
    const { container } = render(<PropertyFacts propertyKey="NotAProperty" isSpanish={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('every configured property renders all three facts', () => {
    Object.keys(PROPERTY_CAPACITY).forEach((propertyKey) => {
      const { unmount } = render(<PropertyFacts propertyKey={propertyKey} isSpanish={false} />);
      expect(screen.getByLabelText('Property capacity').children).toHaveLength(3);
      unmount();
    });
  });
});
