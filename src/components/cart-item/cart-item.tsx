import { useState, FocusEvent, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectCartItems, updateProductQuantity } from '../../store/slices/cart';
import { saveCartState } from '../../utils/cartLocalStorage';
import { TCamerasCard } from '../../types/cameras';
import { toast } from 'react-toastify';

const QUANTITY_CHANGE_STEP = 1;
interface TCamerasCardWithQuantity extends TCamerasCard {
  quantity: number;
}

type CartItemProps = {
  product: TCamerasCardWithQuantity;
  onCartItemRemoveButtonClick?: (product?: TCamerasCard) => void | null;
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

const CartItem = ({product, onCartItemRemoveButtonClick}: CartItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id, name, type, category, price, quantity, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode} = product;
  const cartItems = useAppSelector(selectCartItems);

  const [inputQuantity, setInputQuantity] = useState<number | string>(quantity);

  //TODO: Эта штука должна открывать попап с подтверждением удаления позиции из корзины, доделать
  const handleCrossButtonClick = () => {
    // const updatedItems = cartItems.filter((item) => item.id !== productId);
    // saveCartState(updatedItems);
    // dispatch(removeProductFromCart(productId));
    if (onCartItemRemoveButtonClick) {
      onCartItemRemoveButtonClick(product);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 9) {
      setInputQuantity(newQuantity);

      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      saveCartState(updatedItems);
      dispatch(updateProductQuantity({ id, quantity: newQuantity }));
    } else {
      toast.warn('Количество товара не может быть меньше 1 и больше 9');
    }
  };

  const handleQuantityInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;

    if (target.value === '' || Number(target.value) < 1) {
      target.value = '1';
    }

    if (Number(target.value) > 9) {
      target.value = '9';
    }

    setInputQuantity(Number(target.value));

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(target.value) } : item
    );

    saveCartState(updatedItems);
    dispatch(updateProductQuantity({ id, quantity: Number(target.value) }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const newValue = target.value === '' ? '' : Number(target.value);
    setInputQuantity(newValue);
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
          onClick={() => handleQuantityChange(quantity - QUANTITY_CHANGE_STEP)}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          // defaultValue={inputQuantity}
          value={inputQuantity}
          // min={1}
          // max={9}
          aria-label="количество товара"
          onChange={handleInputChange}
          onBlur={handleQuantityInputBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => handleQuantityChange(quantity + QUANTITY_CHANGE_STEP)}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(price * quantity).toLocaleString('ru-RU')} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleCrossButtonClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
};

export default CartItem;
