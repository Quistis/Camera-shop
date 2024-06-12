import { TCamerasCard } from '../../types/cameras';
import SelectItem from '../select-item/select-item';

type SelectListProps = {
  products: TCamerasCard[];
  onClick: () => void | null;
};

const SelectList = ({products, onClick}: SelectListProps): JSX.Element => (
  <ul className="form-search__select-list scroller">
    {products.map((product) => <SelectItem key={product.id} product={product} onClick={onClick}/>)}
  </ul>
);

export default SelectList;
