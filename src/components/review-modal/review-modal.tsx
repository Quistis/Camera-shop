import { useEffect, useState, useRef, useCallback } from 'react';
import FocusTrap from 'focus-trap-react';
import { useAppSelector } from '../../hooks';
import { selectPostReviewLoadingStatus, selectPostReviewErrorStatus } from '../../store/slices/reviews';
import ReviewForm from '../review-form/review-form';

type ReviewModalProps = {
  isActive: boolean;
  onCrossButtonClick?: () => void | null;
};

const ReviewModal = ({isActive, onCrossButtonClick}: ReviewModalProps): JSX.Element => {

  const isLoading = useAppSelector(selectPostReviewLoadingStatus);
  const isError = useAppSelector(selectPostReviewErrorStatus);

  const [isReviewFormShown, setIsReviewFromShown] = useState(true);
  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

  const successButtonRef = useRef<HTMLButtonElement>(null);
  const errorButtonRef = useRef<HTMLButtonElement>(null);
  const reviewFormRef = useRef<{ resetForm: () => void }>(null);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsFocusTrapActive(true);
      }, 100);
    } else {
      setIsFocusTrapActive(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isActive]);

  useEffect(() => {
    if (isLoading === false) {
      if (isError === false && successButtonRef.current && isReviewFormShown === false) {
        successButtonRef.current.focus();
      } else if (isError === true && errorButtonRef.current && isReviewFormShown === false) {
        errorButtonRef.current.focus();
      }
    }
  }, [isLoading, isError, isReviewFormShown]);

  const handleEscKeyDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isActive && onCrossButtonClick && isLoading === false) {
      onCrossButtonClick();

      setTimeout(() => {
        setIsReviewFromShown(true);

        if (reviewFormRef.current) {
          reviewFormRef.current.resetForm(); // Вызов метода resetForm
        }
      }, 400);
    }
  }, [isActive, onCrossButtonClick, isLoading]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [isActive, onCrossButtonClick, handleEscKeyDown]);

  const handleCrossButtonClick = () => {

    if (onCrossButtonClick && isLoading === false) {

      onCrossButtonClick();

      setTimeout(() => {
        setIsReviewFromShown(true);

        if (reviewFormRef.current) {
          reviewFormRef.current.resetForm(); // Вызов метода resetForm
        }
      }, 400);

    }
  };

  const handleReviewFormSubmitButtonClick = () => {
    setIsReviewFromShown(false);
  };

  return (
    <FocusTrap active={isFocusTrapActive}>
      <div className={`modal ${isActive ? 'is-active' : ''} ${isReviewFormShown === false ? 'modal-narrow' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCrossButtonClick}/>
          <div className="modal__content modal--min-sizes">
            {isLoading && <div className="loader"></div>}

            {isReviewFormShown &&
            <p className="title title--h4">Оставить отзыв</p>}

            <ReviewForm
              onSubmitButtonClick={handleReviewFormSubmitButtonClick}
              focusOnName={isActive}
              isHidden={isReviewFormShown}
              ref={reviewFormRef}
            />

            {isLoading === false && isError === false && !isReviewFormShown &&
          <>
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width={80} height={78} aria-hidden="true">
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={handleCrossButtonClick}
                ref={successButtonRef}
              >
                Вернуться к покупкам
              </button>
            </div>
          </>}
            {isLoading === false && isError === true && !isReviewFormShown &&
          <>
            <p className="title title--h4">Произошла ошибка</p>
            <img className="error-img" src="/img/error-icon.png" width="86px" height="86px" alt="Иконка с призраком"/>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => setIsReviewFromShown(true)}
                ref={errorButtonRef}
              >
                Вернуться к отзыву
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

export default ReviewModal;


// import { useEffect, useState, useRef } from 'react';
// import FocusTrap from 'focus-trap-react';
// import { useAppSelector } from '../../hooks';
// import { selectPostReviewLoadingStatus, selectPostReviewErrorStatus } from '../../store/slices/reviews';
// import ReviewForm from '../review-form/review-form';

// type ReviewModalProps = {
//   isActive: boolean;
//   onCrossButtonClick?: () => void | null;
// };

// const ReviewModal = ({isActive, onCrossButtonClick}: ReviewModalProps): JSX.Element => {

//   const isLoading = useAppSelector(selectPostReviewLoadingStatus);
//   const isError = useAppSelector(selectPostReviewErrorStatus);

//   const [isReviewFormShown, setIsReviewFromShown] = useState(true);
//   // const [isReviewFormShown, setIsReviewFromShown] = useState(false);
//   const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

//   const successButtonRef = useRef<HTMLButtonElement>(null);
//   const errorButtonRef = useRef<HTMLButtonElement>(null);
//   const submitButtonRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     if (isActive) {
//       setTimeout(() => {
//         setIsFocusTrapActive(true);
//         setIsReviewFromShown(true);
//         if (submitButtonRef.current) {
//           submitButtonRef.current.focus();
//         }
//       }, 100);
//     } else {
//       setIsFocusTrapActive(false);
//     }
//   }, [isActive]);

//   useEffect(() => {
//     if (isActive) {
//       document.body.classList.add('scroll-lock');
//     } else {
//       document.body.classList.remove('scroll-lock');
//     }
//   }, [isActive]);

//   useEffect(() => {
//     if (isLoading === false) {
//       if (isError === false && successButtonRef.current && isReviewFormShown === false) {
//         successButtonRef.current.focus();
//       } else if (isError === true && errorButtonRef.current && isReviewFormShown === false) {
//         errorButtonRef.current.focus();
//       }
//     }
//   }, [isLoading, isError, isReviewFormShown]);

//   const handleCrossButtonClick = () => {
//     if (onCrossButtonClick) {
//       onCrossButtonClick();
//       setTimeout(() => {
//         setIsReviewFromShown(true);
//       }, 1000);
//     }
//   };

//   const handleReviewFormSubmitButtonClick = () => {
//     setIsReviewFromShown(false);
//   };

//   return (
//     <FocusTrap active={isFocusTrapActive}>
//       <div className={`modal ${isActive ? 'is-active' : ''}`}>
//         <div className="modal__wrapper">
//           <div className="modal__overlay" />
//           <div className="modal__content">
//             {isReviewFormShown &&
//           <>
//             <p className="title title--h4">Оставить отзыв</p>
//             <ReviewForm onSubmitButtonClick={handleReviewFormSubmitButtonClick} submitButtonRef={submitButtonRef}/>
//             {/* <ReviewForm onSubmitButtonClick={handleReviewFormSubmitButtonClick}/> */}
//           </>}
//             {isLoading === false && isError === false && !isReviewFormShown &&
//           <>
//             <p className="title title--h4">Спасибо за отзыв</p>
//             <svg className="modal__icon" width={80} height={78} aria-hidden="true">
//               <use xlinkHref="#icon-review-success" />
//             </svg>
//             <div className="modal__buttons">
//               <button
//                 className="btn btn--purple modal__btn modal__btn--fit-width"
//                 type="button"
//                 // onClick={() => navigate(AppRoutes.Main)}
//                 ref={successButtonRef}
//               >
//                 Вернуться к покупкам
//               </button>
//             </div>
//           </>}
//             {isLoading === false && isError === true && !isReviewFormShown &&
//           <>
//             <p className="title title--h4">Произошла ошибка</p>
//             <img className="error-img" src="/img/error-icon.png" width="86px" height="86px" alt="Иконка с призраком"/>
//             <div className="modal__buttons">
//               <button
//                 className="btn btn--purple modal__btn modal__btn--fit-width"
//                 type="button"
//                 onClick={handleCrossButtonClick}
//                 ref={errorButtonRef}
//               >
//                 Вернуться в корзину
//               </button>
//             </div>

//           </>}
//             <button
//               className="cross-btn"
//               type="button"
//               aria-label="Закрыть попап"
//               onClick={handleCrossButtonClick}
//             >
//               <svg width={10} height={10} aria-hidden="true">
//                 <use xlinkHref="#icon-close" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </FocusTrap>
//   );
// };

// export default ReviewModal;
