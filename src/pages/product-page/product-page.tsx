import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, MouseEvent } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraById } from '../../store/api-actions';
import { selectCurrentProduct, selectCurrentProductLoadingStatus } from '../../store/slices/cameras';
import StarRating from '../../components/star-rating/star-rating';
import Loader from '../../components/loader/loader';
import { AppRoutes } from '../../const';

const ProductPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (id) {
      dispatch(fetchCameraById(id));
    }
  }, [id, dispatch]);

  const currentProduct = useAppSelector(selectCurrentProduct);
  const isLoading = useAppSelector(selectCurrentProductLoadingStatus);

  if (isLoading) {
    return <Loader/>;
  }

  if (!currentProduct) {
    return <div> Тут будет страница с ошибкой, потом:D </div>;
  }

  const {name, category, type, level, vendorCode, price, description, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = currentProduct;

  const handleTabsClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const buttonText = (evt.target as HTMLElement).textContent;
    setActiveTab(buttonText === 'Характеристики' ? 'specs' : 'description');
  };

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoutes.Main}>
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoutes.Main}>
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {name.includes('Ретрокамера') ? name : `${category} ${name}`}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                  />
                  <img
                    src={`/${previewImg}`}
                    srcSet={`/${previewImg2x} 2x`}
                    width={560}
                    height={480}
                    alt={name}
                  />
                </picture>
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{name.includes('Ретрокамера') ? name : `${category} ${name}`}</h1>

                <StarRating rating={rating} reviewCount={reviewCount}/>

                <p className="product__price">
                  <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
                </p>

                <button className="btn btn--purple" type="button">
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Добавить в корзину
                </button>

                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button
                      className={`tabs__control ${activeTab === 'specs' ? 'is-active' : ''}`}
                      type="button"
                      onClick={handleTabsClick}
                    >
                      Характеристики
                    </button>
                    <button
                      className={`tabs__control ${activeTab === 'description' ? 'is-active' : ''}`}
                      type="button"
                      onClick={handleTabsClick}
                    >
                      Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    {activeTab === 'specs' &&
                    <div className="tabs__element is-active">
                      <ul className="product__tabs-list">
                        <li className="item-list">
                          <span className="item-list__title">Артикул:</span>
                          <p className="item-list__text"> {vendorCode}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{category}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{type}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{level}</p>
                        </li>
                      </ul>
                    </div>}
                    {activeTab === 'description' &&
                    <div className="tabs__element is-active">
                      <div className="product__tabs-text">
                        <p>
                          {description}
                        </p>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*<div class="page-content__section">
          <section class="product-similar">
            <div class="container">
              <h2 class="title title&#45;&#45;h3">Похожие товары</h2>
              <div class="product-similar__slider">
                <div class="product-similar__slider-list">
                  <div class="product-card is-active">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img9.webp, img/content/img9@2x.webp 2x"><img src="img/content/img9.jpg" srcset="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 4</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>12</p>
                      </div>
                      <p class="product-card__title">Фотоаппарат FastShot MR-5</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>18 970 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                  <div class="product-card is-active">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img1.webp, img/content/img1@2x.webp 2x"><img src="img/content/img1.jpg" srcset="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 3</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>23</p>
                      </div>
                      <p class="product-card__title">Ретрокамера «Das Auge IV»</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>73 450 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                  <div class="product-card is-active">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img5.webp, img/content/img5@2x.webp 2x"><img src="img/content/img5.jpg" srcset="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 5</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>849</p>
                      </div>
                      <p class="product-card__title">Фотоаппарат Instaprinter P2</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>8 430 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                  <div class="product-card">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img4.webp, img/content/img4@2x.webp 2x"><img src="img/content/img4.jpg" srcset="img/content/img4@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 4</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>12</p>
                      </div>
                      <p class="product-card__title">Фотоаппарат FastShot MR-5</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>18 970 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                  <div class="product-card">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img3.webp, img/content/img3@2x.webp 2x"><img src="img/content/img3.jpg" srcset="img/content/img3@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 3</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>23</p>
                      </div>
                      <p class="product-card__title">Ретрокамера «Das Auge IV»</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>73 450 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                  <div class="product-card">
                    <div class="product-card__img">
                      <picture>
                        <source type="image/webp" srcset="img/content/img11.webp, img/content/img11@2x.webp 2x"><img src="img/content/img11.jpg" srcset="img/content/img11@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2">
                      </picture>
                    </div>
                    <div class="product-card__info">
                      <div class="rate product-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlink:href="#icon-full-star"></use>
                        </svg>
                        <p class="visually-hidden">Рейтинг: 5</p>
                        <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>849</p>
                      </div>
                      <p class="product-card__title">Фотоаппарат Instaprinter P2</p>
                      <p class="product-card__price"><span class="visually-hidden">Цена:</span>8 430 ₽
                      </p>
                    </div>
                    <div class="product-card__buttons">
                      <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                      </button>
                      <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                      </a>
                    </div>
                  </div>
                </div>
                <button class="slider-controls slider-controls&#45;&#45;prev" type="button" aria-label="Предыдущий слайд" disabled>
                  <svg width="7" height="12" aria-hidden="true">
                    <use xlink:href="#icon-arrow"></use>
                  </svg>
                </button>
                <button class="slider-controls slider-controls&#45;&#45;next" type="button" aria-label="Следующий слайд">
                  <svg width="7" height="12" aria-hidden="true">
                    <use xlink:href="#icon-arrow"></use>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>*/}
        <div className="page-content__section">
          <section className="review-block">
            <div className="container">
              <div className="page-content__headed">
                <h2 className="title title--h3">Отзывы</h2>
                {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
              </div>
              <ul className="review-block__list">
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Сергей Горский</p>
                    <time className="review-card__data" dateTime="2022-04-13">
                      13 апреля
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 5</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">
                        Надёжная, хорошо лежит в руке, необычно выглядит
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">
                        Тяжеловата, сложно найти плёнку
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                        Раз в полгода достаю из-под стекла, стираю пыль, заряжаю —
                        работает как часы. Ни у кого из знакомых такой нет, все
                        завидуют) Теперь это жемчужина моей коллекции, однозначно
                        стоит своих денег!
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Пётр Матросов</p>
                    <time className="review-card__data" dateTime="2022-03-02">
                      2 марта
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 1</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">Хорошее пресс-папье</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">
                        Через 3 дня развалилась на куски
                      </p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                        При попытке вставить плёнку сломался механизм открытия
                        отсека, пришлось заклеить его изолентой. Начал настраивать
                        фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал
                        — отломилось несколько лепестков диафрагмы. От злости
                        стукнул камеру об стол, и рукоятка треснула пополам. Склеил
                        всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">Татьяна Кузнецова </p>
                    <time className="review-card__data" dateTime="2021-12-30">
                      30 декабря
                    </time>
                  </div>
                  <div className="rate review-card__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <p className="visually-hidden">Оценка: 4</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list">
                      <span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">Редкая</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">Высокая цена</p>
                    </li>
                    <li className="item-list">
                      <span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">
                        Дорого для портативной видеокамеры, но в моей коллекции как
                        раз не хватало такого экземпляра. Следов использования нет,
                        доставили в заводской упаковке, выглядит шикарно!
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="review-block__buttons">
                <button className="btn btn--purple" type="button">
                  Показать больше отзывов
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
