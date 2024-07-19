import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectCartProductIds, removeProductFromCart } from '../../store/slices/cart';
import { TCamerasCard } from '../../types/cameras';

//TODO: изменения тут для подсчета цены, кол-ва и тд
type CartItemProps = {
  product: TCamerasCard;
};

const generateDescription = (cameraType = '', cameraCategory = ''): string => {

  const categoryEndings: Record<string, string> = {
    Фотоаппарат: 'фотоаппарат',
    Видеокамера: 'видеокамера',
  };

  const typeEnding = cameraCategory === 'Фотоаппарат' ? 'Цифровой' : cameraType;

  const description = `${typeEnding.charAt(0).toUpperCase()}${typeEnding.slice(1).toLowerCase()} ${categoryEndings[cameraCategory]?.toLowerCase() || ''}`;

  return description;
};

const CartItem = ({product}: CartItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id, name, type, category, price, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode} = product;
  const cartProductIds = useAppSelector(selectCartProductIds);

  const handleCrossButtonClick = (productId:number) => {

    const updatedProductIds = cartProductIds.filter((item) => item !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedProductIds));

    dispatch(removeProductFromCart(productId));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={140}
            height={120}
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name.includes('Ретрокамера') ? name : `${category} ${name}`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{generateDescription(type, category)}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          defaultValue={1}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>37 940 ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => handleCrossButtonClick(id)}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
};

export default CartItem;
