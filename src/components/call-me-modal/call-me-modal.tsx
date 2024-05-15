import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { TCamerasCard } from '../../types/cameras';
import './call-me-modal.css';

type CallMeModalProps = {
  product: TCamerasCard | null;
  isModalActive: boolean;
  onCrossButtonClick?: () => void | null;
};

//TODO: Что-то сделать с валидацией номера и сабмитом данных, пока что закоментил неактивные участки кода

const CallMeModal = ({product, isModalActive = false, onCrossButtonClick}: CallMeModalProps): JSX.Element => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalActive && inputRef.current) {
      document.body.classList.add('modal-open');
      inputRef.current.focus();
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalActive]);

  useEffect(() => {
    const handleEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && isModalActive && onCrossButtonClick) {
        onCrossButtonClick();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [isModalActive, onCrossButtonClick]);

  if (!product) {
    return <div style={{display: 'none'}}></div>;
  }

  const {vendorCode, name, category, price, level, type, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x} = product;

  const validatePhoneNumber = (input: string) => {
    const pattern = /^(?:\+?7|8)?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    setIsValidPhoneNumber(pattern.test(input));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    validatePhoneNumber(event.target.value);
  };

  const handleCrossButtonClick = () => {
    if (onCrossButtonClick) {
      onCrossButtonClick();
    }
  };

  // const handleSubmit = () => {
  //   // Вы можете выполнить здесь дополнительные проверки перед отправкой данных
  //   if (isValidPhoneNumber) {
  //     // Отправка данных
  //     console.log('Номер телефона:', phoneNumber);
  //   } else {
  //     // Показать ошибку пользователю или предпринять другие действия
  //     console.log('Неверный номер телефона. Пожалуйста, исправьте его.');
  //   }
  // };

  const generateDescription = (cameraType: string, cameraCategory: string): string => {

    const categoryEndings: Record<string, string> = {
      Фотоаппарат: 'фотоаппарат',
      Видеокамера: 'видеокамера',
    };

    const typeEnding = cameraCategory === 'Фотоаппарат' ? 'Цифровой' : cameraType;

    const description = `${typeEnding.charAt(0).toUpperCase()}${typeEnding.slice(1).toLowerCase()} ${categoryEndings[cameraCategory].toLowerCase()}`;

    return description;
  };

  return (
    <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCrossButtonClick}/>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={`${previewImg}`}
                  srcSet={`${previewImg2x} 2x`}
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
          <div className={`custom-input form-review__item ${!isValidPhoneNumber && phoneNumber.length !== 0 ? 'is-invalid' : ''}`}>
            <label>
              <span className="custom-input__label">
                Телефон
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="tel"
                name="user-tel"
                placeholder="Введите ваш номер"
                // pattern='^(?:\+?7|8)?(?:\(\d{3}\)|\d{3})[-\s]?\\d{3}[-\s]?\\d{2}[-\s]?\\d{2}$'
                onChange={handleInputChange}
                required
              />
            </label>
            {!isValidPhoneNumber && phoneNumber.length !== 0 && <p className="custom-input__error">Нужно указать номер</p>}
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              // onClick={handleSubmit}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Заказать
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

  );
};

export default CallMeModal;
