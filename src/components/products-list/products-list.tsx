import { memo } from 'react';
import ProductCard from '../product-card/product-card';
import { TCamerasCard } from '../../types/cameras';

type ProductsListProps = {
  cards: TCamerasCard[];
  onClick?: (product?: TCamerasCard) => void | null;
};

const ProductsList = memo(({cards, onClick}: ProductsListProps): JSX.Element => (
  <div className="cards catalog__cards">
    {cards.map((card) => <ProductCard key={card.id} card={card} onClick={onClick} isActive={false}/>)}
  </div>
));

ProductsList.displayName = 'ProductsList';

export default ProductsList;
