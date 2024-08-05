import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import { useAppSelector } from '../../hooks';
import { selectPostOrderLoadingStatus, selectPostOrderErrorStatus } from '../../store/slices/cart';
import { AppRoutes } from '../../const';
import './post-order-modal.css';

type postOrderModalProps = {
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
};

const PostOrderModal = ({isModalActive, onCrossButtonClick}: postOrderModalProps): JSX.Element => {
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectPostOrderLoadingStatus);
  const isError = useAppSelector(selectPostOrderErrorStatus);

  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

  const successButtonRef = useRef<HTMLButtonElement>(null);
  const errorButtonRef = useRef<HTMLButtonElement>(null);

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
    if (isLoading === false) {
      if (isError === false && successButtonRef.current) {
        successButtonRef.current.focus();
      } else if (isError === true && errorButtonRef.current) {
        errorButtonRef.current.focus();
      }
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isModalActive]);

  const handleEscKeyDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isModalActive && onCrossButtonClick) {
      if (isError) {
        onCrossButtonClick();
      }
    }
  }, [isModalActive, onCrossButtonClick, isError]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [isModalActive, onCrossButtonClick, handleEscKeyDown]);

  const handleCrossButtonClick = () => {
    if (isLoading === false && isError === true && onCrossButtonClick) {
      onCrossButtonClick();
    }
  };

  return(
    <FocusTrap active={isFocusTrapActive}>
      <div className={`modal ${isModalActive ? 'is-active' : ''} modal--narrow`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCrossButtonClick}/>
          <div className="modal__content modal--min-sizes">
            {isLoading && <div className="loader"></div>}
            {isLoading === false && isError === false &&
          <>
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width={80} height={78} aria-hidden="true">
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => navigate(AppRoutes.Main)}
                ref={successButtonRef}
              >
                Вернуться к покупкам
              </button>
            </div>
          </>}
            {isLoading === false && isError === true &&
          <>
            <p className="title title--h4">Произошла ошибка</p>
            <img className="error-img" src="/img/error-icon.png" width="86px" height="86px" alt="Иконка с призраком"/>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleCrossButtonClick}
                ref={errorButtonRef}
              >
                Вернуться в корзину
              </button>
            </div>

          </>}
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

export default PostOrderModal;
