import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCartItems, addProductToCart } from '../../store/slices/cart';
import { saveCartState } from '../../utils/cartLocalStorage';
import FocusTrap from 'focus-trap-react';
// import { toast } from 'react-toastify';
import { TCamerasCard } from '../../types/cameras';

//TODO: изменения тут, чтобы хранить количество,менять его и считать цену и тд
type AddToCartModalProps = {
  product: TCamerasCard | null;
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
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

const AddToCartModal = ({product, isModalActive = false, onCrossButtonClick}: AddToCartModalProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

  const {
    id = 0,
    vendorCode = '',
    name = '',
    category = 'F',
    price = 0,
    level = '',
    type = '',
    previewImgWebp = '',
    previewImgWebp2x = '',
    previewImg = '',
    previewImg2x = '' } = product ?? {};

  useEffect(() => {
    if (isModalActive) {
      setTimeout(() => {
        setIsFocusTrapActive(true);
      }, 100);
    } else {
      setIsFocusTrapActive(false);
    }
  }, [isModalActive]);

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isModalActive]);

  const handleEscKeyDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isModalActive && onCrossButtonClick) {
      onCrossButtonClick();
    }
  }, [isModalActive, onCrossButtonClick]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [isModalActive, onCrossButtonClick, handleEscKeyDown]);

  const handleCrossButtonClick = useCallback(() => {
    if (onCrossButtonClick) {
      onCrossButtonClick();

    }
  }, [onCrossButtonClick]);
  //TODO: посмотреть на этот обработчик,второе условие вроде лишнее, мне не нужно добавлять продукт если он уже есть в массиве с таким ид
  const handleAddProduct = (productId: number, productPrice: number) => {
    const updatedCartItems = [...cartItems, { id: productId, quantity: 1, price: productPrice }];

    if (!cartItems.some((item) => item.id === id)) {
      dispatch(addProductToCart({ id: productId, quantity: 1, price: productPrice }));
      saveCartState(updatedCartItems);
    } else {
      const existingItem = cartItems.find((item) => item.id === id);
      if (existingItem) {
        dispatch(addProductToCart({ id: productId, quantity: 1, price: productPrice }));
        saveCartState(updatedCartItems);
      }
    }
  };

  return(
    <FocusTrap active={isFocusTrapActive}>
      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCrossButtonClick} />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
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
                    alt={`${category} ${name}`}
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
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => handleAddProduct(id, price)}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCrossButtonClick}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default AddToCartModal;
