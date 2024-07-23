import { useEffect, useCallback, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const';

type AddToCartSuccessModalProps = {
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
};

const AddToCartSuccessModal = ({isModalActive, onCrossButtonClick}: AddToCartSuccessModalProps): JSX.Element => {

  const navigate = useNavigate();
  const location = useLocation();

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
              href="#"
              onClick={handleCrossButtonClick}
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
  );
};

export default AddToCartSuccessModal;
