import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { selectCameraCards, selectCardsLoadingStatus } from '../../store/slices/cameras';
import { selectPromosData, selectPromosLoadingStatus } from '../../store/slices/promos';
import PromosSlider from '../../components/promos-slider/promos-slider';
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
      <Helmet>
        <title>
          Camera Shop. Каталог
        </title>
      </Helmet>
      <PromosSlider promos={promosData}/>
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
              </div>
              <div className="catalog__content">
                <ProductsList cards={cardsData} onClick={handleProductCardButtonClick}/>
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
