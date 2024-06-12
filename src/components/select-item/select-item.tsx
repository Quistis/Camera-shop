import { useNavigate } from 'react-router-dom';
import { TCamerasCard } from '../../types/cameras';

type SelectItemProps = {
  product: TCamerasCard;
  onClick: () => void | null;
};

const SelectItem = ({product, onClick}: SelectItemProps): JSX.Element => {
  const {name, id} = product;
  const navigate = useNavigate();

  const handleSelectItemClick = () => {
    if (onClick) {
      onClick();
      navigate(`/camera/${id}`);
    }
  };

  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
      onClick={handleSelectItemClick}
    >
      {name}
    </li>
  );
};

export default SelectItem;
