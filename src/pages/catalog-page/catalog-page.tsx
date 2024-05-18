import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCameraCards, selectCardsLoadingStatus } from '../../store/slices/cameras';
import { selectPromosData, selectPromosLoadingStatus } from '../../store/slices/promos';
import Banner from '../../components/banner/banner';
import ProductsList from '../../components/products-list/products-list';
import CallMeModal from '../../components/call-me-modal/call-me-modal';
import Loader from '../../components/loader/loader';
import { TCamerasCard } from '../../types/cameras';
import { AppRoutes } from '../../const';

const CatalogPage = (): JSX.Element => {
  const cardsData = useAppSelector(selectCameraCards);
  const promosData = useAppSelector(selectPromosData);
  const isLoading = useAppSelector(selectCardsLoadingStatus);
  const isPromosLoading = useAppSelector(selectPromosLoadingStatus);
  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  if (isLoading || isPromosLoading) {
    return <Loader/>;
  }

  const handleProductCardButtonClick = (product?: TCamerasCard) => {
    if (product) {
      setActiveProduct(product);
      setIsModalActive(true);
    }
  };

  const handleCrossButtonClick = () => {
    setIsModalActive(false);
  };

  return (
    <main>
      <Banner promo={promosData[0]}/>
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
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <img src="img/banner.png" />
                {/*<div class="catalog-filter">
                  <form action="#">
                    <h2 class="visually-hidden">Фильтр</h2>
                    <fieldset class="catalog-filter__block">
                      <legend class="title title&#45;&#45;h5">Цена, ₽</legend>
                      <div class="catalog-filter__price-range">
                        <div class="custom-input">
                          <label>
                            <input type="number" name="price" placeholder="от">
                          </label>
                        </div>
                        <div class="custom-input">
                          <label>
                            <input type="number" name="priceUp" placeholder="до">
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset class="catalog-filter__block">
                      <legend class="title title&#45;&#45;h5">Категория</legend>
                      <div class="custom-radio catalog-filter__item">
                        <label>
                          <input type="radio" name="category" value="photocamera" checked><span class="custom-radio__icon"></span><span class="custom-radio__label">Фотокамера</span>
                        </label>
                      </div>
                      <div class="custom-radio catalog-filter__item">
                        <label>
                          <input type="radio" name="category" value="videocamera"><span class="custom-radio__icon"></span><span class="custom-radio__label">Видеокамера</span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset class="catalog-filter__block">
                      <legend class="title title&#45;&#45;h5">Тип камеры</legend>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="digital" checked><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Цифровая</span>
                        </label>
                      </div>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="film" disabled><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Плёночная</span>
                        </label>
                      </div>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="snapshot"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Моментальная</span>
                        </label>
                      </div>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="collection" checked disabled><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Коллекционная</span>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset class="catalog-filter__block">
                      <legend class="title title&#45;&#45;h5">Уровень</legend>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="zero" checked><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Нулевой</span>
                        </label>
                      </div>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="non-professional"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Любительский</span>
                        </label>
                      </div>
                      <div class="custom-checkbox catalog-filter__item">
                        <label>
                          <input type="checkbox" name="professional"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Профессиональный</span>
                        </label>
                      </div>
                    </fieldset>
                    <button class="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                    </button>
                  </form>
                </div>*/}
              </div>
              <div className="catalog__content">
                {/*<div class="catalog-sort">
                  <form action="#">
                    <div class="catalog-sort__inner">
                      <p class="title title&#45;&#45;h5">Сортировать:</p>
                      <div class="catalog-sort__type">
                        <div class="catalog-sort__btn-text">
                          <input type="radio" id="sortPrice" name="sort" checked>
                          <label for="sortPrice">по цене</label>
                        </div>
                        <div class="catalog-sort__btn-text">
                          <input type="radio" id="sortPopular" name="sort">
                          <label for="sortPopular">по популярности</label>
                        </div>
                      </div>
                      <div class="catalog-sort__order">
                        <div class="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
                          <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию">
                          <label for="up">
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlink:href="#icon-sort"></use>
                            </svg>
                          </label>
                        </div>
                        <div class="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
                          <input type="radio" id="down" name="sort-icon" aria-label="По убыванию">
                          <label for="down">
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlink:href="#icon-sort"></use>
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>*/}
                <ProductsList cards={cardsData} onClick={handleProductCardButtonClick}/>
                {/*<div class="pagination">
                  <ul class="pagination__list">
                    <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link" href="2">2</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link" href="3">3</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
                    </li>
                  </ul>
                </div>*/}
              </div>
            </div>
          </div>
        </section>
      </div>
      <CallMeModal
        product={activeProduct ? activeProduct : null}
        isModalActive={isModalActive}
        onCrossButtonClick={handleCrossButtonClick}
      />
    </main>
  );
};

export default CatalogPage;
