import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCameraCards } from '../../store/slices/cameras';
import SelectList from '../select-list/select-list';

//TODO: реализовать навигацию по списку при помощи стрелок

const SearchForm = (): JSX.Element => {
  const [isSelectListOpened, setSelectListOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cardsData = useAppSelector(selectCameraCards);

  const filteredCards = useMemo(() => {
    if (searchQuery.trim().length < 3) {
      return [];
    } else {
      return cardsData.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }, [searchQuery, cardsData]);

  useEffect(() => {
    setSelectListOpened(searchQuery.trim().length > 0);
  }, [filteredCards, searchQuery]);

  const handleSearchInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(evt.target.value);
  };

  const handleSelectedProductClick = () => {
    setSearchQuery('');
    setSelectListOpened(false);
  };

  return (
    <div className={`form-search ${isSelectListOpened ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </label>
        {isSelectListOpened && filteredCards.length !== 0 && (
          <SelectList products={filteredCards} onClick={handleSelectedProductClick}/>
        )}
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => setSearchQuery('')}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default SearchForm;
