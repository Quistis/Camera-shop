import { useState, useEffect } from 'react';
import { SortType, SortDirection } from '../../types/sorting';

type SortingProps = {
  currentSortType: SortType;
  currentSortDirection: SortDirection;
  onSortChange: (type: SortType, direction: SortDirection) => void;
};

const Sorting = ({currentSortType, currentSortDirection, onSortChange }: SortingProps): JSX.Element => {
  const [sortType, setSortType] = useState<SortType>(currentSortType);
  const [sortDirection, setSortDirection] = useState<SortDirection>(currentSortDirection);

  useEffect(() => {
    setSortType(currentSortType);
    setSortDirection(currentSortDirection);
  }, [currentSortType, currentSortDirection]);

  const handleSortTypeChange = (type: SortType) => {
    setSortType(type);
    onSortChange(type, sortDirection);
  };

  const handleSortDirectionChange = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onSortChange(sortType, newDirection);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === 'price'}
                onChange={() => handleSortTypeChange('price')} // Используем onChange для радиокнопок
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === 'popularity'}
                onChange={() => handleSortTypeChange('popularity')} // Используем onChange для радиокнопок
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                checked={sortDirection === 'asc'}
                onChange={handleSortDirectionChange} // Используем onChange для чекбоксов
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                checked={sortDirection === 'desc'}
                onChange={handleSortDirectionChange} // Используем onChange для чекбоксов
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sorting;
