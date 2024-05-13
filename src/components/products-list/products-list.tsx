import ProductCard from '../product-card/product-card';
import { TCamerasCard } from '../../types/cameras';

type ProductsListProps = {
  cards: TCamerasCard[];
  onClick?: (product?: TCamerasCard) => void | null;
};

const ProductsList = ({cards, onClick}: ProductsListProps): JSX.Element => (
  <div className="cards catalog__cards">
    {cards.map((card) => <ProductCard key={card.id} card={card} onClick={onClick}/>)}
  </div>
);


export default ProductsList;
