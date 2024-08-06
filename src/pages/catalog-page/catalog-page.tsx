import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { selectCameraCards, selectCardsLoadingStatus, selectCardsErrorStatus } from '../../store/slices/cameras';
import { selectPromosData, selectPromosLoadingStatus } from '../../store/slices/promos';
import PromosSlider from '../../components/promos-slider/promos-slider';
import ProductsList from '../../components/products-list/products-list';
import FilterForm from '../../components/filter-form/filter-form';
import Sorting from '../../components/sorting/sorting';
import PaginationList from '../../components/pagination-list/pagination-list';
import AddToCartModal from '../../components/add-to-cart-modal/add-to-cart-modal';
import AddToCartSuccessModal from '../../components/add-to-cart-success-modal/add-to-cart-success-modal';
import Loader from '../../components/loader/loader';
import EmptyProducts from '../../components/empty-products/empty-products';
import { TCamerasCard } from '../../types/cameras';
import { SortDirection, SortType } from '../../types/sorting';
import { Filters } from '../../types/filters';
import { AppRoutes } from '../../const';

const DEFAULT_SORT_TYPE = 'price';
const DEFAULT_SORT_DIRECTION = 'asc';

const ITEMS_PER_PAGE = 9;

const CatalogPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardsData = useAppSelector(selectCameraCards);
  const promosData = useAppSelector(selectPromosData);
  const isLoading = useAppSelector(selectCardsLoadingStatus);
  const cardsErrorStatus = useAppSelector(selectCardsErrorStatus);
  const isPromosLoading = useAppSelector(selectPromosLoadingStatus);
  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialSortType = queryParams.get('sortType') as SortType || DEFAULT_SORT_TYPE;
  const initialSortDirection = queryParams.get('sortDirection') as SortDirection || DEFAULT_SORT_DIRECTION;
  const initialPaginationPage = queryParams.get('page') || 1;

  const [sortType, setSortType] = useState<SortType>(initialSortType);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);
  const [currentPage, setCurrentPage] = useState<string | number>(initialPaginationPage);
  const [filters, setFilters] = useState<Filters>({
    category: queryParams.get('category') || '',
    types: queryParams.get('types')?.split(',') || [],
    levels: queryParams.get('levels')?.split(',') || [],
    priceMin: queryParams.get('priceMin') || '',
    priceMax: queryParams.get('priceMax') || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSortType(initialSortType);
    setSortDirection(initialSortDirection);
    setCurrentPage(initialPaginationPage);
  }, [initialSortType, initialSortDirection, initialPaginationPage]);

  useEffect(() => {
    const category = queryParams.get('category') || '';
    const types = queryParams.get('types')?.split(',') || [];
    const levels = queryParams.get('levels')?.split(',') || [];
    const priceMin = queryParams.get('priceMin') || '';
    const priceMax = queryParams.get('priceMax') || '';

    setFilters({
      category,
      types,
      levels,
      priceMin,
      priceMax,
    });
  }, [queryParams, location.search]);

  const [previousLowestPrice, setPreviousLowestPrice] = useState<number | null>(null);
  const [previousHighestPrice, setPreviousHighestPrice] = useState<number | null>(null);

  const updateQueryParams = (queryFilters: Filters, page:number) => {

    if (queryFilters.category) {
      queryParams.set('category', queryFilters.category);
    } else {
      queryParams.delete('category');
    }

    if (queryFilters.types.length > 0) {
      queryParams.set('types', queryFilters.types.join(','));
    } else {
      queryParams.delete('types');
    }

    if (queryFilters.levels.length > 0) {
      queryParams.set('levels', queryFilters.levels.join(','));
    } else {
      queryParams.delete('levels');
    }

    if (queryFilters.priceMin) {
      queryParams.set('priceMin', queryFilters.priceMin);
    } else {
      queryParams.delete('priceMin');
    }

    if (queryFilters.priceMax) {
      queryParams.set('priceMax', queryFilters.priceMax);
    } else {
      queryParams.delete('priceMax');
    }

    queryParams.set('page', page.toString());
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  const handleFilterChange = (newFilters: Filters) => {

    setCurrentPage(1);
    setFilters(newFilters);
    updateQueryParams(newFilters, 1);
  };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
    queryParams.set('page', page.toString());
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  const filteredProducts = useMemo(() =>
    cardsData.filter((card) => {
      let isMatch = true;

      if (filters.category && card.category !== filters.category) {
        isMatch = false;
      }

      if (filters.types && filters.types.length > 0 && !filters.types.includes(card.type)) {
        isMatch = false;
      }

      if (filters.levels && filters.levels.length > 0 && !filters.levels.includes(card.level)) {
        isMatch = false;
      }

      if (filters.priceMin && card.price < Number(filters.priceMin)) {
        isMatch = false;
      }

      if (filters.priceMax && card.price > Number(filters.priceMax)) {
        isMatch = false;
      }

      return isMatch;
    }),
  [cardsData, filters]);

  const lowestPrice = useMemo(() => {
    if (filteredProducts.length !== 0) {
      const minPrice = Math.min(...filteredProducts.map((product) => product.price));
      setPreviousLowestPrice(minPrice);
      return minPrice;
    }
    return previousLowestPrice !== null ? previousLowestPrice : 0;
  }, [filteredProducts, previousLowestPrice]);

  const highestPrice = useMemo(() => {
    if (filteredProducts.length !== 0) {
      const maxPrice = Math.max(...filteredProducts.map((product) => product.price));
      setPreviousHighestPrice(maxPrice);
      return maxPrice;
    }
    return previousHighestPrice !== null ? previousHighestPrice : 0;
  }, [filteredProducts, previousHighestPrice]);

  const highestCataloguePrice = useMemo(() => {
    if (cardsData.length !== 0) {
      const maxPrice = Math.max(...cardsData.map((product) => product.price));
      return maxPrice;
    }
    return previousHighestPrice !== null ? previousHighestPrice : 0;
  }, [cardsData, previousHighestPrice]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      let comparison = 0;

      if (sortType === 'price') {
        comparison = a.price - b.price;
      } else if (sortType === 'popularity') {
        comparison = a.rating - b.rating;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [sortType, sortDirection, filteredProducts]);

  const productsToShow = sortedProducts.slice((Number(currentPage) - 1) * ITEMS_PER_PAGE, Number(currentPage) * ITEMS_PER_PAGE);

  const pagesCount = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  if (isLoading || isPromosLoading) {
    return <Loader />;
  }

  if (cardsErrorStatus) {
    return <EmptyProducts/>;
  }

  const handleSortChange = (type: SortType, direction: SortDirection) => {
    setSortType(type);
    setSortDirection(direction);
    queryParams.set('sortType', type);
    queryParams.set('sortDirection', direction);
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  const handleProductCardButtonClick = (product?: TCamerasCard) => {
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

  return (
    <main>
      <Helmet>
        <title>
          Camera Shop. Каталог
        </title>
      </Helmet>
      <PromosSlider promos={promosData} />
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
              <FilterForm
                onFilterChange={handleFilterChange}
                filters={filters}
                minPrice={lowestPrice}
                maxPrice={highestPrice}
                maxCataloguePrice={highestCataloguePrice}
              />
              <div className="catalog__content">
                {filteredProducts.length === 0 ? (
                  <>
                    <Sorting
                      currentSortType={sortType}
                      currentSortDirection={sortDirection}
                      onSortChange={handleSortChange}
                    />
                    <EmptyProducts />
                  </>
                ) : (
                  <>
                    <Sorting
                      currentSortType={sortType}
                      currentSortDirection={sortDirection}
                      onSortChange={handleSortChange}
                    />
                    <ProductsList cards={productsToShow} onClick={handleProductCardButtonClick} />
                    {pagesCount > 1 && (
                      <PaginationList
                        pagesCount={pagesCount}
                        currentPage={Number(currentPage)}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddToCartModal
        product={activeProduct ? activeProduct : null}
        isModalActive={isModalActive}
        onCrossButtonClick={handleCrossButtonClick}
        onAddProductButtonClick={handleAddToCartButtonClick}
      />
      <AddToCartSuccessModal
        isModalActive={isSuccessModalActive}
        onCrossButtonClick={handleCloseSuccessModalCrossButtonClick}
      />
    </main>
  );
};

export default CatalogPage;
