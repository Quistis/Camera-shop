// import { useEffect, useState, useCallback, memo } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import FocusTrap from 'focus-trap-react';
// import { toast } from 'react-toastify';
// import { useAppDispatch } from '../../hooks';
// import { postOrder } from '../../store/api-actions';
// import { TCamerasCard } from '../../types/cameras';

// type CallMeModalProps = {
//   product: TCamerasCard | null;
//   isModalActive: boolean;
//   onCrossButtonClick?: () => void | null;
// };

// type FormValues = {
//   phoneNumber: string;
// };

// const generateDescription = (cameraType: string, cameraCategory: string): string => {

//   const categoryEndings: Record<string, string> = {
//     Фотоаппарат: 'фотоаппарат',
//     Видеокамера: 'видеокамера',
//   };

//   const typeEnding = cameraCategory === 'Фотоаппарат' ? 'Цифровой' : cameraType;

//   const description = `${typeEnding.charAt(0).toUpperCase()}${typeEnding.slice(1).toLowerCase()} ${categoryEndings[cameraCategory].toLowerCase()}`;

//   return description;
// };

// const normalizePhoneNumber = (phoneNumber: string): string => {

//   const digitsOnly: string = phoneNumber.replace(/\D/g, '');

//   const normalized: string = digitsOnly.startsWith('8') ? `7${digitsOnly.slice(1)}` : digitsOnly;

//   const countryCodeAdded: string = normalized.startsWith('7') ? normalized : `7${normalized}`;

//   if (countryCodeAdded.length !== 11) {
//     throw new Error('Неправильная длина номера телефона');
//   }

//   return `+${countryCodeAdded}`;
// };

// const CallMeModal = memo(({product, isModalActive = false, onCrossButtonClick}: CallMeModalProps): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm<FormValues>();
//   const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

//   const { vendorCode = '', name = '', category = '', price = 0, level = '', type = '', previewImgWebp = '', previewImgWebp2x = '', previewImg = '', previewImg2x = '' } = product ?? {};

//   useEffect(() => {
//     if (isModalActive) {
//       setTimeout(() => {
//         setFocus('phoneNumber');
//         setIsFocusTrapActive(true);
//       }, 100);
//     } else {
//       setIsFocusTrapActive(false);
//     }
//   }, [setFocus, isModalActive]);

//   useEffect(() => {
//     if (isModalActive) {
//       document.body.classList.add('scroll-lock');
//     } else {
//       document.body.classList.remove('scroll-lock');
//     }
//   }, [isModalActive]);

//   const handleEscKeyDown = useCallback((evt: KeyboardEvent) => {
//     if (evt.key === 'Escape' && isModalActive && onCrossButtonClick) {
//       onCrossButtonClick();
//       reset({ phoneNumber: '' });
//     }
//   }, [isModalActive, reset, onCrossButtonClick]);

//   useEffect(() => {
//     document.addEventListener('keydown', handleEscKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleEscKeyDown);
//     };
//   }, [isModalActive, onCrossButtonClick, reset, handleEscKeyDown]);

//   const handleCrossButtonClick = useCallback(() => {
//     if (onCrossButtonClick) {
//       onCrossButtonClick();
//       reset({ phoneNumber: '' });
//     }
//   }, [onCrossButtonClick, reset]);

//   const onSubmit: SubmitHandler<FormValues> = useCallback((data) => {

//     if (product) {
//       dispatch(postOrder({
//         tel: normalizePhoneNumber(data.phoneNumber),
//         camerasIds: [product.id],
//         coupon: null,
//       }))
//         .then((response) => {
//           if (response.meta.requestStatus === 'fulfilled') {
//             if (onCrossButtonClick) {
//               onCrossButtonClick();
//               reset({ phoneNumber: '' });
//               toast.success('Успешно отправлено');
//             }
//           } else {
//             toast.warn('Ошибка при оформолении заказа');
//           }
//         });
//     }
//   }, [dispatch, product, onCrossButtonClick, reset]);

//   return (
//     <FocusTrap active={isFocusTrapActive}>
//       <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
//         <div className="modal__wrapper">
//           <div className="modal__overlay" onClick={handleCrossButtonClick}/>
//           <div className="modal__content">
//             <p className="title title--h4">Свяжитесь со мной</p>
//             {product &&
//             <div className="basket-item basket-item--short">
//               <div className="basket-item__img">
//                 <picture>
//                   <source
//                     type="image/webp"
//                     srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
//                   />
//                   <img
//                     src={`/${previewImg}`}
//                     srcSet={`/${previewImg2x} 2x`}
//                     width={140}
//                     height={120}
//                     alt={`${category} ${name}`}
//                   />
//                 </picture>
//               </div>
//               <div className="basket-item__description">
//                 <p className="basket-item__title">{name.includes('Ретрокамера') ? name : `${category} ${name}`}</p>
//                 <ul className="basket-item__list">
//                   <li className="basket-item__list-item">
//                     <span className="basket-item__article">Артикул:</span>{' '}
//                     <span className="basket-item__number">{vendorCode}</span>
//                   </li>
//                   <li className="basket-item__list-item">{generateDescription(type, category)}</li>
//                   <li className="basket-item__list-item">{level} уровень</li>
//                 </ul>
//                 <p className="basket-item__price">
//                   <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
//                 </p>
//               </div>
//             </div>}
//             <div className={`custom-input form-review__item ${errors.phoneNumber ? 'is-invalid' : ''}`}>
//               <label>
//                 <span className="custom-input__label">
//                   Телефон
//                   <svg width={9} height={9} aria-hidden="true">
//                     <use xlinkHref="#icon-snowflake" />
//                   </svg>
//                 </span>
//                 <input
//                   {...register('phoneNumber', {
//                     required: 'Это поле обязательно',
//                     pattern: {
//                       value: /^(?=([+]7|8))\+?(?:7|8)\s?(?:\(\d{3}\)|9\d{2})?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
//                       message: 'Неверный формат номера'
//                     }
//                   })}
//                   type="tel"
//                   name="phoneNumber"
//                   placeholder="Введите ваш номер"
//                 />
//               </label>
//               {errors.phoneNumber && <p className="custom-input__error">{errors.phoneNumber.message}</p>}
//             </div>
//             <div className="modal__buttons">
//               <button
//                 className="btn btn--purple modal__btn modal__btn--fit-width"
//                 type="button"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   handleSubmit(onSubmit)(event);
//                 }}
//               >
//                 <svg width={24} height={16} aria-hidden="true">
//                   <use xlinkHref="#icon-add-basket" />
//                 </svg>
//                 Заказать
//               </button>
//             </div>
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
// });

// CallMeModal.displayName = 'CallMeModal';

// export default CallMeModal;
