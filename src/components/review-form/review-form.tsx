import { Fragment, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm, SubmitHandler, FieldValues, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReview } from '../../store/api-actions';
import { selectCurrentProduct } from '../../store/slices/cameras';
import { selectPostReviewLoadingStatus } from '../../store/slices/reviews';
import './review-form.css';

const RATINGS = [5, 4, 3, 2, 1];

type FormData = {
  rating: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
};

type ReviewFormProps = {
  onSubmitButtonClick?: () => void | null;
  focusOnName?: boolean;
  isHidden?: boolean;
};

const ReviewForm = forwardRef(({
  onSubmitButtonClick,
  focusOnName,
  isHidden
}: ReviewFormProps, ref): JSX.Element => {

  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(selectCurrentProduct);
  const reviewLoadingStatus = useAppSelector(selectPostReviewLoadingStatus);

  const { register, handleSubmit, formState: { errors }, reset, control, setFocus } = useForm<FormData>();
  const ratingValue = useWatch({ control, name: 'rating', defaultValue: 0 });

  useEffect(() => {
    if (focusOnName) {
      setTimeout(() => {
        setFocus('userName');
      }, 100); // Задержка в 100 мс, чтобы дать время компоненту отобразиться
    }
  }, [focusOnName, setFocus, isHidden]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset();
    }
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    const formData = data as FormData;

    if (currentProduct) {

      const formattedData = {
        ...formData,
        cameraId: currentProduct.id,
        rating: Number(formData.rating),
      };

      dispatch(postReview(formattedData))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            reset();
          }
        });

      if (onSubmitButtonClick) {
        onSubmitButtonClick();
      }
    }
  };

  return (
    <div className={`form-review ${!isHidden ? 'form-review--hidden' : ''}`}>
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
      >
        <div className="form-review__rate">
          <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
            <legend className="rate__caption">
              Рейтинг
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                {RATINGS.map((rating) => (
                  <Fragment key={rating}>
                    <input
                      className="visually-hidden"
                      id={`star-${rating}`}
                      type="radio"
                      value={rating}
                      {...register('rating', { required: 'Нужно оценить товар' })}
                    />
                    <label
                      className="rate__label"
                      htmlFor={`star-${rating}`}
                      title={['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Ужасно'][5 - rating]}
                    />
                  </Fragment>
                ))}
              </div>
              <div className="rate__progress">
                <span className="rate__stars">{ratingValue}</span> <span>/</span>{' '}
                <span className="rate__all-stars">5</span>
              </div>
            </div>
            {errors.rating && <p className="rate__message">{errors.rating.message}</p>}
          </fieldset>
          <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                Ваше имя
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                maxLength={15}
                placeholder="Введите ваше имя"
                {...register('userName', {
                  required: 'Нужно указать имя',
                  minLength: { value: 2, message: 'Имя не менее 2 символов' } })}
              />
            </label>
            {errors.userName && <p className="custom-input__error">{errors.userName.message}</p>}
          </div>
          <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                Достоинства
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                maxLength={160}
                {...register('advantage', {
                  required: 'Нужно указать достоинства',
                  minLength: { value: 10, message: 'О достоинствах не менее 10 символов' }
                })}
                placeholder="Основные преимущества товара"
              />
            </label>
            {errors.advantage && <p className="custom-input__error">{errors.advantage.message}</p>}
          </div>
          <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                Недостатки
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                maxLength={160}
                {...register('disadvantage', {
                  required: 'Нужно указать недостатки',
                  minLength: { value: 10, message: 'О недостатках не менее 10 символов' }
                })}
                placeholder="Главные недостатки товара"
              />
            </label>
            {errors.disadvantage && <p className="custom-input__error">{errors.disadvantage.message}</p>}
          </div>
          <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-textarea__label">
                Комментарий
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <textarea
                maxLength={160}
                placeholder="Поделитесь своим опытом покупки"
                {...register('review', {
                  required: 'Нужно добавить комментарий',
                  minLength: { value: 10, message: 'Отзыв не менее 10 символов' }
                })}
                defaultValue={''}
              />
            </label>
            {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit" disabled={reviewLoadingStatus}>
          Отправить отзыв
        </button>
      </form>
    </div>
  );
// });
});

ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;


// import { Fragment, ForwardedRef, forwardRef } from 'react';
// import { useForm, SubmitHandler, FieldValues, useWatch } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { postReview } from '../../store/api-actions';
// import { selectCurrentProduct } from '../../store/slices/cameras';

// const RATINGS = [5, 4, 3, 2, 1];

// type FormData = {
//   rating: number;
//   userName: string;
//   advantage: string;
//   disadvantage: string;
//   review: string;
// };

// type ReviewFormProps = {
//   onSubmitButtonClick?: () => void | null;
//   submitButtonRef: ForwardedRef<HTMLButtonElement>;
// };

// const ReviewForm = forwardRef<HTMLButtonElement, ReviewFormProps>(({ onSubmitButtonClick, submitButtonRef }) => {
// // const ReviewForm = ({onSubmitButtonClick}: ReviewFormProps): JSX.Element => {

//   const dispatch = useAppDispatch();
//   const currentProduct = useAppSelector(selectCurrentProduct);
//   // const [currentRating, setCurrentRating] = useState<number>(0);

//   const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>();
//   const ratingValue = useWatch({ control, name: 'rating', defaultValue: 0 });

//   // const submitButtonRef = useRef<HTMLButtonElement>(null);

//   // useEffect(() => {
//   //   if (submitButtonRef.current) {
//   //     submitButtonRef.current.focus();
//   //   }
//   // }, [submitButtonRef]);

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {

//     const formData = data as FormData;

//     if (currentProduct) {

//       const formattedData = {
//         ...formData,
//         cameraId: currentProduct.id,
//         rating: Number(formData.rating),
//       };

//       dispatch(postReview(formattedData))
//         .then((response) => {
//           if (response.meta.requestStatus === 'fulfilled') {
//             reset();
//           }
//         });

//       if (onSubmitButtonClick) {
//         onSubmitButtonClick();
//       }
//     }
//   };

//   // const handleSubmitButtonClick = () => {
//   //   console.log('ЖОПА');
//   // };

//   return (
//     <div className="form-review">
//       <form
//         method="post"
//         onSubmit={(event) => {
//           event.preventDefault();
//           handleSubmit(onSubmit)(event);
//         }}
//       >
//         <div className="form-review__rate">
//           <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
//             <legend className="rate__caption">
//               Рейтинг
//               <svg width={9} height={9} aria-hidden="true">
//                 <use xlinkHref="#icon-snowflake" />
//               </svg>
//             </legend>
//             <div className="rate__bar">
//               <div className="rate__group">
//                 {RATINGS.map((rating) => (
//                   <Fragment key={rating}>
//                     <input
//                       className="visually-hidden"
//                       id={`star-${rating}`}
//                       type="radio"
//                       value={rating}
//                       {...register('rating', { required: 'Нужно оценить товар' })}
//                       // onChange={() => setCurrentRating(rating)}
//                     />
//                     <label
//                       className="rate__label"
//                       htmlFor={`star-${rating}`}
//                       title={['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Ужасно'][5 - rating]}
//                     />
//                   </Fragment>
//                 ))}
//               </div>
//               <div className="rate__progress">
//                 <span className="rate__stars">{ratingValue}</span> <span>/</span>{' '}
//                 <span className="rate__all-stars">5</span>
//               </div>
//             </div>
//             {errors.rating && <p className="rate__message">{errors.rating.message}</p>}
//           </fieldset>
//           <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
//             <label>
//               <span className="custom-input__label">
//                 Ваше имя
//                 <svg width={9} height={9} aria-hidden="true">
//                   <use xlinkHref="#icon-snowflake" />
//                 </svg>
//               </span>
//               <input
//                 type="text"
//                 // minLength={2}
//                 maxLength={15}
//                 // name="user-name"
//                 placeholder="Введите ваше имя"
//                 {...register('userName', {
//                   required: 'Нужно указать имя',
//                   minLength: { value: 2, message: 'Имя не менее 2 символов' } })}
//                 // required
//               />
//             </label>
//             {errors.userName && <p className="custom-input__error">{errors.userName.message}</p>}
//           </div>
//           <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
//             <label>
//               <span className="custom-input__label">
//                 Достоинства
//                 <svg width={9} height={9} aria-hidden="true">
//                   <use xlinkHref="#icon-snowflake" />
//                 </svg>
//               </span>
//               <input
//                 type="text"
//                 // minLength={10}
//                 maxLength={160}
//                 // name="user-plus"
//                 {...register('advantage', {
//                   required: 'Нужно указать достоинства',
//                   minLength: { value: 10, message: 'О достоинствах не менее 10 символов' }
//                 })}
//                 placeholder="Основные преимущества товара"
//                 // required
//               />
//             </label>
//             {errors.advantage && <p className="custom-input__error">{errors.advantage.message}</p>}
//           </div>
//           <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
//             <label>
//               <span className="custom-input__label">
//                 Недостатки
//                 <svg width={9} height={9} aria-hidden="true">
//                   <use xlinkHref="#icon-snowflake" />
//                 </svg>
//               </span>
//               <input
//                 type="text"
//                 // minLength={10}
//                 maxLength={160}
//                 // name="user-minus"
//                 {...register('disadvantage', {
//                   required: 'Нужно указать недостатки',
//                   minLength: { value: 10, message: 'О недостатках не менее 10 символов' }
//                 })}
//                 placeholder="Главные недостатки товара"
//                 // required
//               />
//             </label>
//             {errors.disadvantage && <p className="custom-input__error">{errors.disadvantage.message}</p>}
//           </div>
//           <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
//             <label>
//               <span className="custom-textarea__label">
//                 Комментарий
//                 <svg width={9} height={9} aria-hidden="true">
//                   <use xlinkHref="#icon-snowflake" />
//                 </svg>
//               </span>
//               <textarea
//                 // name="user-comment"
//                 // minLength={10}
//                 maxLength={160}
//                 placeholder="Поделитесь своим опытом покупки"
//                 {...register('review', {
//                   required: 'Нужно добавить комментарий',
//                   minLength: { value: 10, message: 'Отзыв не менее 10 символов' }
//                 })}
//                 defaultValue={''}
//               />
//             </label>
//             {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}
//           </div>
//         </div>
//         <button className="btn btn--purple form-review__btn" type="submit" ref={submitButtonRef} >
//           Отправить отзыв
//         </button>
//       </form>
//     </div>
//   );
// });
// // };

// ReviewForm.displayName = 'ReviewForm';

// export default ReviewForm;
