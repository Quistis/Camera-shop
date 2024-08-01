import { useAppSelector } from '../../hooks';
import { selectCardsErrorStatus, selectCurrentProductErrorStatus } from '../../store/slices/cameras';
import './empty-products.css';

const EmptyProducts = (): JSX.Element => {
  const cardsErrorStatus = useAppSelector(selectCardsErrorStatus);
  const currentProductErrorStatus = useAppSelector(selectCurrentProductErrorStatus);

  return (
    <div className='empty-products-wrapper'>
      <h2 className="empty-products">🥺👉👈{cardsErrorStatus || currentProductErrorStatus ? 'Ошибка получения данных с сервера' : 'Тут пока ничего нет'}👉👈🥺</h2>
    </div>
  );
};

export default EmptyProducts;
