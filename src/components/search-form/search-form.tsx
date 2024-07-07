import { useState, useEffect, useMemo, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectCameraCards } from '../../store/slices/cameras';
import SelectList from '../select-list/select-list';

//TODO: реализовать навигацию по списку при помощи стрелок

const SearchForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [isSelectListOpened, setSelectListOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectListRef = useRef<HTMLUListElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        selectListRef.current &&
        !selectListRef.current.contains(event.target as Node)
      ) {
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(evt.target.value);
  };

  const handleSelectedProductClick = () => {
    setSearchQuery('');
    setSelectListOpened(false);
  };

  const handleSearchInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>): void => {
    if (!isSelectListOpened || filteredCards.length === 0) {
      return;
    }

    if (evt.key === 'ArrowDown') {

      setHighlightedIndex((prevIndex) => (prevIndex === null || prevIndex === filteredCards.length - 1 ? 0 : prevIndex + 1));
      evt.preventDefault();

    } else if (evt.key === 'ArrowUp') {

      setHighlightedIndex((prevIndex) => (prevIndex === null || prevIndex === 0 ? filteredCards.length - 1 : prevIndex - 1));
      evt.preventDefault();

    } else if (evt.key === 'Enter' && highlightedIndex !== null) {

      setHighlightedIndex(null);
      handleSelectedProductClick();
      navigate(`/camera/${filteredCards[highlightedIndex].id}`);
      (evt.target as HTMLInputElement).blur();
      evt.preventDefault();

    } else if (evt.key === 'Tab') {

      if (highlightedIndex === null) {
        setHighlightedIndex(0);
      } else {
        let nextIndex;

        if (evt.shiftKey) {
          if (highlightedIndex === 0) {
            nextIndex = filteredCards.length - 1;
          } else {
            nextIndex = highlightedIndex - 1;
          }
        } else {
          if (highlightedIndex === filteredCards.length - 1) {
            nextIndex = 0;
          } else {
            nextIndex = highlightedIndex + 1;
          }
        }
        setHighlightedIndex(nextIndex);
      }
      evt.preventDefault();
    } else if (evt.key === 'Escape') {
      setSelectListOpened(false);
      setHighlightedIndex(null);
      setSearchQuery('');
    }
  };

  const handleItemMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleItemMouseLeave = () => {
    setHighlightedIndex(null);
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
            ref={searchInputRef}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
        </label>
        {isSelectListOpened && filteredCards.length !== 0 && (
          <SelectList
            ref={selectListRef}
            products={filteredCards}
            highlightedIndex={highlightedIndex}
            onClick={handleSelectedProductClick}
            onItemMouseEnter={handleItemMouseEnter}
            onItemMouseLeave={handleItemMouseLeave}
          />
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
