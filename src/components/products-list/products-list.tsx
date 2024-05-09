import ProductCard from '../product-card/product-card';
import { TCamerasCard } from '../../types/cameras';

type ProductsListProps = {
  cards: TCamerasCard[];
};

const ProductsList = ({cards}: ProductsListProps): JSX.Element => (
  <div className="cards catalog__cards">
    {cards.map((card) => <ProductCard key={card.id} card={card}/>)}
  </div>
);


export default ProductsList;
