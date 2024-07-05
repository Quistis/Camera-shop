import { ChangeEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Filters } from '../../types/filters';

type FilterFormProps = {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
  minPrice: number;
  maxPrice: number;
  maxCataloguePrice: number;
};

const FilterForm = ({ onFilterChange, filters, minPrice, maxPrice, maxCataloguePrice }: FilterFormProps): JSX.Element => {

  useEffect(() => {
    if (filters.priceMax !== '' && filters.priceMax < filters.priceMin) {
      onFilterChange({
        ...filters,
        priceMax: '',
      });
      toast.warn('Максимальная цена не должна быть меньше минимальной');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.priceMin]);

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === 'videocamera') {
      if (filters.types) {
        onFilterChange({
          ...filters,
          category: 'Видеокамера',
          types: filters.types.filter((type) => type !== 'Плёночная' && type !== 'Моментальная'),
        });
      }
    } else {
      onFilterChange({
        ...filters,
        category: 'Фотоаппарат',
      });
    }
  };

  const handlePriceMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === '') {
      onFilterChange({
        ...filters,
        priceMin: value,
      });

      return;
    }

    if (Number(value) >= Number(filters.priceMax !== '' ? filters.priceMax : maxPrice)) {
      onFilterChange({
        ...filters,
        priceMin: filters.priceMax !== '' ? filters.priceMax : maxPrice.toString(),
      });

      // toast.warn('Минимальная цена товара не может превышать максимальную цену товара');

      return;
    }

    if (value !== '' || (Number(value) >= Number(minPrice) && Number(value) <= Number(maxPrice))) {
      onFilterChange({
        ...filters,
        priceMin: value,
      });
    }

  };

  const handlePriceMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === '') {
      onFilterChange({
        ...filters,
        priceMax: value,
      });

      return;
    }

    // if (Number(value) < Number(filters.priceMin) && Number(filters.priceMin !== '')) {
    //   onFilterChange({
    //     ...filters,
    //     priceMax: filters.priceMin.toString()
    //   });
    //   return;
    // }

    if (value !== '' || (Number(value) >= Number(minPrice) && Number(value) <= Number(maxPrice))) {
      onFilterChange({
        ...filters,
        priceMax: value
      });
    }

    if (Number(value) > Number(maxCataloguePrice)) {
      onFilterChange({
        ...filters,
        priceMax: maxCataloguePrice.toString(),
      });
    }
  };

  const onMinPriceBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (Number(value) < Number(minPrice) && Number(filters.priceMin !== '')) {
      onFilterChange({
        ...filters,
        priceMin: minPrice.toString(),
      });
    }

    if (filters.priceMax !== '' && filters.priceMax < filters.priceMin) {
      onFilterChange({
        ...filters,
        priceMax: '',
      });
    }

  };

  const onMaxPriceBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (Number(value) < Number(minPrice) && Number(filters.priceMax !== '') && Number(filters.priceMin !== '')) {
      onFilterChange({
        ...filters,
        // priceMax: minPrice.toString()
        priceMax: '',
      });
      toast.warn('Максимальная цена не должна быть меньше минимальной');
    }

    if (Number(value) < Number(filters.priceMin !== '' ? filters.priceMin : minPrice) && filters.priceMin === '' && value !== '') {
      onFilterChange({
        ...filters,
        priceMax: minPrice.toString(),
      });
    }
  };

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueMap: { [key: string]: string } = {
      beginner: 'Нулевой',
      amateur: 'Любительский',
      professional: 'Профессиональный',
    };

    const value = valueMap[event.target.value] || event.target.value;
    const isChecked = event.target.checked;

    if (filters.levels) {
      const updatedLevels = isChecked ? [...filters.levels || [], value] : filters.levels.filter((lvl) => lvl !== value);
      onFilterChange({
        ...filters,
        levels: updatedLevels
      });
    }
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

    if (filters.types) {
      const updatedTypes = isChecked ? [...filters.types, value] : filters.types.filter((type) => type !== value);
      onFilterChange({
        ...filters,
        types: updatedTypes
      });
    }
  };

  const handleReset = () => {
    onFilterChange({
      category: '',
      types: [],
      levels: [],
      priceMin: '',
      priceMax: ''
    });
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
                  placeholder={`${minPrice}`}
                  value={filters.priceMin}
                  // min={Number(minPrice)}
                  // max={Number(maxPrice)}
                  onChange={handlePriceMinChange}
                  onBlur={onMinPriceBlur}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceMax"
                  placeholder={`${maxPrice}`}
                  value={filters.priceMax}
                  // min={Number(minPrice)}
                  // max={Number(maxPrice)}
                  onChange={handlePriceMaxChange}
                  onBlur={onMaxPriceBlur}
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
                checked={filters.category === 'Фотоаппарат'}
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
                checked={filters.category === 'Видеокамера'}
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
                checked={filters.levels?.includes('Нулевой')}
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
                checked={filters.levels?.includes('Любительский')}
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
                checked={filters.levels?.includes('Профессиональный')}
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
                checked={filters.types?.includes('Цифровая')}
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
                checked={filters.types?.includes('Плёночная')}
                onChange={handleTypeChange}
                disabled={filters.category === 'Видеокамера'}
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
                checked={filters.types?.includes('Моментальная')}
                onChange={handleTypeChange}
                disabled={filters.category === 'Видеокамера'}
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
                checked={filters.types?.includes('Коллекционная')}
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


// // import { useState, useEffect, ChangeEvent } from 'react';
// // import { Filters } from '../../types/filters';

// // type FilterFormProps = {
// //   onFilterChange: (filters: Filters) => void;
// //   filters: Filters;
// //   minPrice: number;
// //   maxPrice: number;
// // };

// // // TODO: Доработать фильтрацию

// // const FilterForm = ({ onFilterChange, filters, minPrice, maxPrice }: FilterFormProps): JSX.Element => {
// //   const [category, setCategory] = useState(filters.category || '');
// //   const [types, setTypes] = useState<string[]>(filters.types || []);
// //   const [levels, setLevels] = useState<string[]>(filters.levels || []);
// //   const [priceMin, setPriceMin] = useState(filters.priceMin || '');
// //   const [priceMax, setPriceMax] = useState(filters.priceMax || '');

// //   useEffect(() => {
// //     onFilterChange({ category, types, levels, priceMin, priceMax });
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [category, types, levels, priceMin, priceMax]);

// //   const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     const value = event.target.value;

// //     if (value === 'videocamera') {
// //       setCategory('Видеокамера');
// //       setTypes((prevTypes) => prevTypes.filter((type) => type !== 'Плёночная' && type !== 'Моментальная'));
// //     } else {
// //       setCategory('Фотоаппарат');
// //     }
// //   };

// //   const handlePriceMinChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     const value = event.target.value;
// //     setPriceMin(value);
// //   };

// //   const handlePriceMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     const value = event.target.value;
// //     setPriceMax(value);
// //   };

// //   const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     const valueMap: { [key: string]: string } = {
// //       beginner: 'Нулевой',
// //       amateur: 'Любительский',
// //       professional: 'Профессиональный',
// //     };

// //     const value = valueMap[event.target.value] || event.target.value;
// //     const isChecked = event.target.checked;

// //     setLevels((prevLevels) =>
// //       isChecked ? [...prevLevels, value] : prevLevels.filter((lvl) => lvl !== value)
// //     );
// //   };

// //   const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     const valueMap: { [key: string]: string } = {
// //       digital: 'Цифровая',
// //       film: 'Плёночная',
// //       snapshot: 'Моментальная',
// //       collection: 'Коллекционная',
// //     };

// //     const value = valueMap[event.target.value] || event.target.value;
// //     const isChecked = event.target.checked;

// //     setTypes((prevTypes) =>
// //       isChecked ? [...prevTypes, value] : prevTypes.filter((type) => type !== value)
// //     );
// //   };

// //   const handleReset = () => {
// //     setCategory('');
// //     setTypes([]);
// //     setLevels([]);
// //     setPriceMin('');
// //     setPriceMax('');
// //   };

// //   return (
// //     <div className="catalog-filter">
// //       <form>
// //         <h2 className="visually-hidden">Фильтр</h2>
// //         <fieldset className="catalog-filter__block">
// //           <legend className="title title--h5">Цена, ₽</legend>
// //           <div className="catalog-filter__price-range">
// //             <div className="custom-input">
// //               <label>
// //                 <input
// //                   type="number"
// //                   name="priceMin"
// //                   placeholder={`${minPrice}`}
// //                   value={priceMin}
// //                   onChange={handlePriceMinChange}
// //                 />
// //               </label>
// //             </div>
// //             <div className="custom-input">
// //               <label>
// //                 <input
// //                   type="number"
// //                   name="priceMax"
// //                   placeholder={`${maxPrice}`}
// //                   value={priceMax}
// //                   onChange={handlePriceMaxChange}
// //                 />
// //               </label>
// //             </div>
// //           </div>
// //         </fieldset>
// //         <fieldset className="catalog-filter__block">
// //           <legend className="title title--h5">Категория</legend>
// //           <div className="custom-radio catalog-filter__item">
// //             <label>
// //               <input
// //                 type="radio"
// //                 name="category"
// //                 value="photocamera"
// //                 checked={category === 'Фотоаппарат'}
// //                 onChange={handleCategoryChange}
// //               />
// //               <span className="custom-radio__icon" />
// //               <span className="custom-radio__label">Фотокамера</span>
// //             </label>
// //           </div>
// //           <div className="custom-radio catalog-filter__item">
// //             <label>
// //               <input
// //                 type="radio"
// //                 name="category"
// //                 value="videocamera"
// //                 checked={category === 'Видеокамера'}
// //                 onChange={handleCategoryChange}
// //               />
// //               <span className="custom-radio__icon" />
// //               <span className="custom-radio__label">Видеокамера</span>
// //             </label>
// //           </div>
// //         </fieldset>
// //         <fieldset className="catalog-filter__block">
// //           <legend className="title title--h5">Уровень</legend>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="level"
// //                 value="beginner"
// //                 onChange={handleLevelChange}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Нулевой</span>
// //             </label>
// //           </div>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="level"
// //                 value="amateur"
// //                 onChange={handleLevelChange}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Любительский</span>
// //             </label>
// //           </div>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="level"
// //                 value="professional"
// //                 onChange={handleLevelChange}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Профессиональный</span>
// //             </label>
// //           </div>
// //         </fieldset>
// //         <fieldset className="catalog-filter__block">
// //           <legend className="title title--h5">Тип</legend>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="type"
// //                 value="digital"
// //                 checked={types.includes('Цифровая')}
// //                 onChange={handleTypeChange}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Цифровая</span>
// //             </label>
// //           </div>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="type"
// //                 value="film"
// //                 checked={types.includes('Плёночная')}
// //                 onChange={handleTypeChange}
// //                 disabled={category === 'Видеокамера'}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Плёночная</span>
// //             </label>
// //           </div>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="type"
// //                 value="snapshot"
// //                 checked={types.includes('Моментальная')}
// //                 onChange={handleTypeChange}
// //                 disabled={category === 'Видеокамера'}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Моментальная</span>
// //             </label>
// //           </div>
// //           <div className="custom-checkbox catalog-filter__item">
// //             <label>
// //               <input
// //                 type="checkbox"
// //                 name="type"
// //                 value="collection"
// //                 checked={types.includes('Коллекционная')}
// //                 onChange={handleTypeChange}
// //               />
// //               <span className="custom-checkbox__icon" />
// //               <span className="custom-checkbox__label">Коллекционная</span>
// //             </label>
// //           </div>
// //         </fieldset>
// //         <button
// //           type="button"
// //           className="btn catalog-filter__reset-btn"
// //           onClick={handleReset}
// //         >
// //           Сбросить фильтры
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default FilterForm;
