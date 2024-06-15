import { useState, useEffect, ChangeEvent } from 'react';

type Filters = {
  category: string;
  type: string;
  level: string;
  priceMin: string;
  priceMax: string;
};

type FilterFormProps = {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
};

//TODO: Доработать фильтрацию

const FilterForm = ({ onFilterChange, filters }: FilterFormProps): JSX.Element => {
  const [category, setCategory] = useState(filters.category || '');
  const [type, setType] = useState(filters.type || '');
  const [level, setLevel] = useState(filters.level || '');
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');

  useEffect(() => {
    onFilterChange({ category, type, level, priceMin, priceMax });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, type, level, priceMin, priceMax]);

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === 'videocamera') {
      setCategory('Видеокамера');
    } else {
      setCategory('Фотоаппарат');
    }

    if (value === 'videocamera') {
      if (type === 'film' || type === 'snapshot') {
        setType('');
      }
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

  const handleReset = () => {
    setCategory('');
    setType('');
    setLevel('');
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
                onChange={(e) => setLevel(e.target.checked ? 'beginner' : '')}
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
                onChange={(e) => setLevel(e.target.checked ? 'amateur' : '')}
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
                onChange={(e) => setLevel(e.target.checked ? 'professional' : '')}
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
                checked={type === 'digital'}
                onChange={(e) => setType(e.target.checked ? 'digital' : '')}
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
                checked={type === 'film'}
                onChange={(e) => setType(e.target.checked ? 'film' : '')}
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
                checked={type === 'snapshot'}
                onChange={(e) => setType(e.target.checked ? 'snapshot' : '')}
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
                checked={type === 'collection'}
                onChange={(e) => setType(e.target.checked ? 'collection' : '')}
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


// import { useState, useEffect, ChangeEvent } from 'react';

// type Filters = {
//   category: string;
//   type: string[] | null;
//   level: string[] | null;
//   priceMin: string;
//   priceMax: string;
// };

// type FilterFormProps = {
//   onFilterChange: (filters: Filters) => void;
//   filters: Filters;
// };

// const FilterForm = ({ onFilterChange, filters }: FilterFormProps) => {
//   const [category, setCategory] = useState<string>(filters.category || '');
//   const [type, setType] = useState<string[]>(filters.type || []);
//   const [level, setLevel] = useState<string[]>(filters.level || []);
//   const [priceMin, setPriceMin] = useState<string>(filters.priceMin || '');
//   const [priceMax, setPriceMax] = useState<string>(filters.priceMax || '');

//   useEffect(() => {
//     onFilterChange({ category, type, level, priceMin, priceMax });
//   }, [category, type, level, priceMin, priceMax, onFilterChange]);

//   const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;

//     if (value === 'photocamera') {
//       setCategory('Фотоаппарат');
//     } else {
//       setCategory('Видеокамера');
//     }

//     if (value === 'videocamera') {
//       // Сброс типа при изменении категории на Видеокамеру
//       setType([]);
//     }
//   };

//   const handlePriceMinChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setPriceMin(value);
//   };

//   const handlePriceMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setPriceMax(value);
//   };

//   const handleReset = () => {
//     setCategory('');
//     setType([]);
//     setLevel([]);
//     setPriceMin('');
//     setPriceMax('');
//   };

//   const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     const isChecked = event.target.checked;

//     if (isChecked) {
//       setLevel((prevLevels) => [...prevLevels, value]);
//     } else {
//       setLevel((prevLevels) => prevLevels.filter((lvl) => lvl !== value));
//     }

//   };

//   const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     const isChecked = event.target.checked;

//     if (isChecked) {
//       setType((prevTypes) => [...prevTypes, value]);
//     } else {
//       setType((prevTypes) => prevTypes.filter((typ) => typ !== value));
//     }
//   };

//   return (
//     <div className="catalog-filter">
//       <form>
//         <h2 className="visually-hidden">Фильтр</h2>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Цена, ₽</legend>
//           <div className="catalog-filter__price-range">
//             <div className="custom-input">
//               <label>
//                 <input
//                   type="number"
//                   name="priceMin"
//                   placeholder="от"
//                   value={priceMin}
//                   onChange={handlePriceMinChange}
//                 />
//               </label>
//             </div>
//             <div className="custom-input">
//               <label>
//                 <input
//                   type="number"
//                   name="priceMax"
//                   placeholder="до"
//                   value={priceMax}
//                   onChange={handlePriceMaxChange}
//                 />
//               </label>
//             </div>
//           </div>
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Категория</legend>
//           <div className="custom-radio catalog-filter__item">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="photocamera"
//                 defaultChecked
//                 // checked={category === 'Фотоаппарат'}
//                 onChange={handleCategoryChange}
//               />
//               <span className="custom-radio__icon" />
//               <span className="custom-radio__label">Фотокамера</span>
//             </label>
//           </div>
//           <div className="custom-radio catalog-filter__item">
//             <label>
//               <input
//                 type="radio"
//                 name="category"
//                 value="videocamera"
//                 checked={category === 'Видеокамера'}
//                 onChange={handleCategoryChange}
//               />
//               <span className="custom-radio__icon" />
//               <span className="custom-radio__label">Видеокамера</span>
//             </label>
//           </div>
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Уровень</legend>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="level"
//                 value="beginner"
//                 checked={level.includes('beginner')}
//                 onChange={handleLevelChange}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Нулевой</span>
//             </label>
//           </div>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="level"
//                 value="amateur"
//                 checked={level.includes('amateur')}
//                 onChange={handleLevelChange}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Любительский</span>
//             </label>
//           </div>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="level"
//                 value="professional"
//                 checked={level.includes('professional')}
//                 onChange={handleLevelChange}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Профессиональный</span>
//             </label>
//           </div>
//         </fieldset>
//         <fieldset className="catalog-filter__block">
//           <legend className="title title--h5">Тип</legend>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="type"
//                 value="digital"
//                 checked={type.includes('digital')}
//                 onChange={handleTypeChange}
//                 disabled={category === 'Видеокамера'}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Цифровая</span>
//             </label>
//           </div>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="type"
//                 value="film"
//                 checked={type.includes('film')}
//                 onChange={handleTypeChange}
//                 disabled={category === 'videocamera'}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Плёночная</span>
//             </label>
//           </div>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="type"
//                 value="snapshot"
//                 checked={type.includes('snapshot')}
//                 onChange={handleTypeChange}
//                 disabled={category === 'videocamera'}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Моментальная</span>
//             </label>
//           </div>
//           <div className="custom-checkbox catalog-filter__item">
//             <label>
//               <input
//                 type="checkbox"
//                 name="type"
//                 value="collection"
//                 checked={type.includes('collection')}
//                 onChange={handleTypeChange}
//               />
//               <span className="custom-checkbox__icon" />
//               <span className="custom-checkbox__label">Коллекционная</span>
//             </label>
//           </div>
//         </fieldset>
//         <button
//           type="button"
//           className="btn catalog-filter__reset-btn"
//           onClick={handleReset}
//         >
//           Сбросить фильтры
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FilterForm;
