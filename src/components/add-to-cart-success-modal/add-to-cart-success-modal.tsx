import { useEffect, useCallback, useState, useRef, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import { AppRoutes } from '../../const';

type AddToCartSuccessModalProps = {
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
};

const AddToCartSuccessModal = ({isModalActive, onCrossButtonClick}: AddToCartSuccessModalProps): JSX.Element => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);
  const continueShoppingButtonRef = useRef<HTMLAnchorElement>(null);

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
    if (continueShoppingButtonRef.current) {
      continueShoppingButtonRef.current.focus();
    }
  }, []);

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

  const handleCrossButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();

    if (onCrossButtonClick) {
      onCrossButtonClick();
    }
  };

  const handleContinueShoppingButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();

    if (location.pathname !== '/') {
      navigate(AppRoutes.Main);
    } else if (onCrossButtonClick) {
      onCrossButtonClick();
    }
  };

  const handleGoToCartButtonClick = (): void => {
    navigate(AppRoutes.Cart);
  };

  return (
    <FocusTrap active={isFocusTrapActive}>
      <div className={`modal ${isModalActive ? 'is-active' : ''} modal--narrow`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCrossButtonClick}/>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width={86} height={80} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <a
                className="btn btn--transparent modal__btn"
                onClick={handleContinueShoppingButtonClick}
                ref={continueShoppingButtonRef}
              >
                Продолжить покупки
              </a>
              <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleGoToCartButtonClick}>
                Перейти в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCrossButtonClick}>
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

export default AddToCartSuccessModal;
