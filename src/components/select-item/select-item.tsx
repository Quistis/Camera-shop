import { useNavigate } from 'react-router-dom';
import { TCamerasCard } from '../../types/cameras';
import './select-item.css';

type SelectItemProps = {
  product: TCamerasCard;
  highlightedIndexClass: string;
  highlightedIndex: number | null;
  onClick: () => void | null;
  onItemMouseEnter: (index: number) => void;
  onItemMouseLeave: () => void;
};

const SelectItem = ({product, highlightedIndexClass, highlightedIndex, onClick, onItemMouseEnter, onItemMouseLeave}: SelectItemProps): JSX.Element => {
  const {name, id} = product;
  const navigate = useNavigate();

  const handleSelectItemClick = () => {
    if (onClick) {
      onClick();
      navigate(`/camera/${id}`);
    }
  };

  const handleItemMouseEnter = () => {
    if (highlightedIndex !== null) {
      onItemMouseEnter(highlightedIndex);
    }
  };

  return (
    <li
      className={`form-search__select-item ${highlightedIndexClass}`}
      tabIndex={0}
      onClick={handleSelectItemClick}
      onMouseEnter={handleItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
    >
      {name}
    </li>
  );
};

export default SelectItem;
