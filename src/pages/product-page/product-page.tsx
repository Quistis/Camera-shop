import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback, MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraById, fetchReviewsById, fetchSimilarProductsById } from '../../store/api-actions';
import { selectCurrentProduct, selectCurrentProductLoadingStatus, selectSimilarProducts } from '../../store/slices/cameras';
import { selectReviewsData } from '../../store/slices/reviews';
import StarRating from '../../components/star-rating/star-rating';
import ProductsSlider from '../../components/products-slider/products-slider';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NotFoundPage from '../not-found-page/not-found-page';
import AddToCartModal from '../../components/add-to-cart-modal/add-to-cart-modal';
import AddToCartSuccessModal from '../../components/add-to-cart-success-modal/add-to-cart-success-modal';
import ReviewModal from '../../components/review-modal/review-modal';
import ScrollToTopButton from '../../components/scroll-to-top-button/scroll-to-top-button';
import Loader from '../../components/loader/loader';
import { TCamerasCard } from '../../types/cameras';
import { AppRoutes } from '../../const';

const ProductPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);
  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);
  const [isPostReviewModalActive, setIsPostReviewModalActive] = useState(false);

  const currentProduct = useAppSelector(selectCurrentProduct);
  const similarProducts = useAppSelector(selectSimilarProducts);
  const isLoading = useAppSelector(selectCurrentProductLoadingStatus);
  const reviewsData = useAppSelector(selectReviewsData);

  const sortedReviewsData = useMemo(() =>
    reviewsData.slice().sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()),
  [reviewsData]);
  const slicedReviewsData = sortedReviewsData.slice(0, visibleReviewsCount);
  const allReviewsLoaded = reviewsData.length <= visibleReviewsCount;

  useEffect(() => {
    if (id) {
      dispatch(fetchCameraById(id));
      dispatch(fetchReviewsById(id));
      dispatch(fetchSimilarProductsById(id));
      setVisibleReviewsCount(3);
    }
  }, [id, dispatch]);

  const handleShowMoreReviewsButtonClick = useCallback(() => {
    setVisibleReviewsCount((prevCount) => prevCount + 3);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isLoading) {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.scrollY;
      if (windowBottom >= docHeight) {
        handleShowMoreReviewsButtonClick();
      }
    }
  }, [isLoading, handleShowMoreReviewsButtonClick]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, handleScroll]);

  if (isLoading) {
    return <Loader/>;
  }

  if (!currentProduct) {
    return <NotFoundPage/>;
  }

  const {name, category, type, level, vendorCode, price, description, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = currentProduct;

  const handleTabsClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const buttonText = (evt.target as HTMLElement).textContent;
    setActiveTab(buttonText === 'Характеристики' ? 'specs' : 'description');
  };

  const handleProductCardBuyButtonClick = (product?: TCamerasCard) => {
    if (product) {
      setActiveProduct(product);
      setIsModalActive(true);
    }
  };

  const handleCrossButtonClick = () => {
    setIsModalActive(false);
  };

  const handleAddToCartButtonClick = () => {
    setIsModalActive(false);
    setIsSuccessModalActive(true);
  };

  const handleCloseSuccessModalCrossButtonClick = () => {
    setIsSuccessModalActive(false);
  };

  const handlePostReviewButtonClick = () => {
    setIsPostReviewModalActive(true);
  };

  const handlePostReviewCrossButtonClick = () => {
    setIsPostReviewModalActive(false);
  };

  return (
    <>
      <main>
        <Helmet>
          <title>
            Camera Shop. {currentProduct.name}
          </title>
        </Helmet>
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

                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={() => handleProductCardBuyButtonClick(currentProduct)}
                  >
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
          {similarProducts &&
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <ProductsSlider products={similarProducts} itemsPerPage={3} onClick={handleProductCardBuyButtonClick}/>
              </div>
            </section>
          </div>}

          {reviewsData.length !== 0 &&
          <div className="page-content__section">
            <section className="review-block" >
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button
                    className="btn"
                    type="button"
                    onClick={handlePostReviewButtonClick}
                  >
                    Оставить свой отзыв
                  </button>
                </div>
                <ReviewsList reviews={slicedReviewsData} />
                {!allReviewsLoaded &&
                <div className="review-block__buttons">
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleShowMoreReviewsButtonClick}
                  >
                  Показать больше отзывов
                  </button>
                </div>}
              </div>
            </section>
          </div>}

        </div>
      </main>
      <ScrollToTopButton/>
      <AddToCartModal
        product={activeProduct}
        isModalActive={isModalActive}
        onCrossButtonClick={handleCrossButtonClick}
        onAddProductButtonClick={handleAddToCartButtonClick}
      />
      <AddToCartSuccessModal
        isModalActive={isSuccessModalActive}
        onCrossButtonClick={handleCloseSuccessModalCrossButtonClick}
      />
      <ReviewModal
        isActive={isPostReviewModalActive}
        onCrossButtonClick={handlePostReviewCrossButtonClick}
      />
    </>
  );
};

export default ProductPage;
