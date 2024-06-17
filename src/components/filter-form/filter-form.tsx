import { useState, useEffect, ChangeEvent } from 'react';
import { Filters } from '../../types/filters';

type FilterFormProps = {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
};

//TODO: Доработать фильтрацию

const FilterForm = ({ onFilterChange, filters }: FilterFormProps): JSX.Element => {
  const [category, setCategory] = useState(filters.category || '');
  const [types, setTypes] = useState<string[]>(filters.types || []);
  const [levels, setLevels] = useState<string[]>(filters.levels || []);
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');

  // useEffect(() => {
  //   setCategory(filters.category || '');
  //   setTypes(filters.types || []);
  //   setLevels(filters.levels || []);
  //   setPriceMin(filters.priceMin || '');
  //   setPriceMax(filters.priceMax || '');
  // }, [filters]);

  useEffect(() => {
    onFilterChange({ category, types, levels, priceMin, priceMax });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, types, levels, priceMin, priceMax]);

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === 'videocamera') {
      setCategory('Видеокамера');
      setTypes((prevTypes) => prevTypes.filter((type) => type !== 'Плёночная' && type !== 'Моментальная'));
    } else {
      setCategory('Фотоаппарат');
    }
  };

  const handlePriceMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPriceMin(value);
  };

  const handlePriceMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPriceMax(value);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueMap: { [key: string]: string } = {
      beginner: 'Нулевой',
      amateur: 'Любительский',
      professional: 'Профессиональный',
    };

    const value = valueMap[event.target.value] || event.target.value;
    const isChecked = event.target.checked;

    setLevels((prevLevels) =>
      isChecked ? [...prevLevels, value] : prevLevels.filter((lvl) => lvl !== value)
    );
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueMap: { [key: string]: string } = {
      digital: 'Цифровая',
      film: 'Плёночная',
      snapshot: 'Моментальная',
      collection: 'Коллекционная',
    };

    const value = valueMap[event.target.value] || event.target.value;
    const isChecked = event.target.checked;

    setTypes((prevTypes) =>
      isChecked ? [...prevTypes, value] : prevTypes.filter((type) => type !== value)
    );
  };

  // const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   let value = event.target.value;
  //   const isChecked = event.target.checked;

  //   if (value === 'beginner') {
  //     value = 'Нулевой';
  //   }

  //   if (value === 'amateur') {
  //     value = 'Любительский';
  //   }

  //   if (value === 'professional') {
  //     value = 'Профессиональный';
  //   }

  //   if (isChecked) {
  //     setLevels((prevLevels) => [...prevLevels, value]);
  //   } else {
  //     setLevels((prevLevels) => prevLevels.filter((lvl) => lvl !== value));
  //   }

  // };

  // const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   let value = event.target.value;
  //   const isChecked = event.target.checked;

  //   if (value === 'digital') {
  //     value = 'Цифровая';
  //   }

  //   if (value === 'film') {
  //     value = 'Плёночная';
  //   }

  //   if (value === 'snapshot') {
  //     value = 'Моментальная';
  //   }

  //   if (value === 'collection') {
  //     value = 'Коллекционная';
  //   }

  //   if (isChecked) {
  //     setTypes((prevTypes) => [...prevTypes, value]);
  //   } else {
  //     setTypes((prevTypes) => prevTypes.filter((type) => type !== value));
  //   }
  // };

  const handleReset = () => {
    setCategory('');
    setTypes([]);
    setLevels([]);
    setPriceMin('');
    setPriceMax('');
  };

  return (
    <div className="catalog-filter">
      <form>
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceMin"
                  placeholder="от"
                  value={priceMin}
                  onChange={handlePriceMinChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceMax"
                  placeholder="до"
                  value={priceMax}
                  onChange={handlePriceMaxChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="photocamera"
                checked={category === 'Фотоаппарат'}
                onChange={handleCategoryChange}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="videocamera"
                checked={category === 'Видеокамера'}
                onChange={handleCategoryChange}
              />
              <span className="custom-radio__icon" />
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="level"
                value="beginner"
                onChange={handleLevelChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="level"
                value="amateur"
                onChange={handleLevelChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="level"
                value="professional"
                onChange={handleLevelChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="type"
                value="digital"
                checked={types.includes('Цифровая')}
                onChange={handleTypeChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="type"
                value="film"
                checked={types.includes('Плёночная')}
                onChange={handleTypeChange}
                disabled={category === 'Видеокамера'}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="type"
                value="snapshot"
                checked={types.includes('Моментальная')}
                onChange={handleTypeChange}
                disabled={category === 'Видеокамера'}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="type"
                value="collection"
                checked={types.includes('Коллекционная')}
                onChange={handleTypeChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <button
          type="button"
          className="btn catalog-filter__reset-btn"
          onClick={handleReset}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
