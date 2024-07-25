import { useEffect, useState, useCallback } from 'react';
import FocusTrap from 'focus-trap-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCartItems, removeProductFromCart } from '../../store/slices/cart';
import { saveCartState } from '../../utils/cartLocalStorage';
import { TCamerasCard } from '../../types/cameras';
import { generateDescription } from '../../utils/utils';
import { AppRoutes } from '../../const';
import './remove-cart-item.css';


type AddToCartModalProps = {
  product: TCamerasCard | null;
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
};

const RemoveCartItemModal = ({product, isModalActive, onCrossButtonClick}: AddToCartModalProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);

  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

  const {
    id = 0,
    vendorCode = '',
    name = '',
    category = 'F',
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

  const handleCartItemRemoval = (productId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    saveCartState(updatedItems);
    dispatch(removeProductFromCart(productId));

    if (onCrossButtonClick) {
      onCrossButtonClick();
      if (cartItems.length === 1) {
        navigate(AppRoutes.Main);
        toast.warn('Корзина пуста, переходим в каталог');
      }
    }

  };

  return (
    <FocusTrap active={isFocusTrapActive}>
      <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCrossButtonClick} />
          <div className="modal__content modal--min-width">
            <p className="title title--h4">Удалить этот товар?</p>
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
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                onClick={() => handleCartItemRemoval(id)}
              >
                Удалить
              </button>
              <Link
                className="btn btn--transparent modal__btn modal__btn--half-width"
                to={AppRoutes.Main}
              >
                Продолжить покупки
              </Link>
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

export default RemoveCartItemModal;
