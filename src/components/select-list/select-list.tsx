// import { useEffect, useRef, KeyboardEvent } from 'react';
// import { TCamerasCard } from '../../types/cameras';
// import SelectItem from '../select-item/select-item';

// type SelectListProps = {
//   products: TCamerasCard[];
//   highlightedIndex: number | null;
//   onClick: () => void | null;
//   onItemMouseEnter: (index: number) => void;
//   onItemMouseLeave: () => void;
// };

// //TODO: навигация стрелочками!11!

// const SelectList = ({products, highlightedIndex, onClick, onItemMouseEnter: onMouseEnterItem, onItemMouseLeave: onMouseLeaveItem}: SelectListProps): JSX.Element => {

//   const listRef = useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     if (listRef.current && highlightedIndex !== null) {

//       const activeElement = listRef.current.children[highlightedIndex] as HTMLElement;

//       if (activeElement) {
//         const listRect = listRef.current.getBoundingClientRect();
//         const elementRect = activeElement.getBoundingClientRect();

//         if (elementRect.bottom > listRect.bottom) {
//           listRef.current.scrollTop += elementRect.bottom - listRect.bottom;
//         } else if (elementRect.top < listRect.top) {
//           listRef.current.scrollTop -= listRect.top - elementRect.top;
//         }
//       }
//     }
//   }, [highlightedIndex]);

//   const handleKeyDown = (evt: KeyboardEvent<HTMLUListElement>) => {
//     if (evt.key === 'Tab' && listRef.current) {
//       const firstElement = listRef.current.firstChild as HTMLElement;
//       const lastElement = listRef.current.lastChild as HTMLElement;

//       if (evt.shiftKey && document.activeElement === firstElement) {
//         lastElement.focus();
//         evt.preventDefault();
//       } else if (!evt.shiftKey && document.activeElement === lastElement) {
//         firstElement.focus();
//         evt.preventDefault();
//       }
//     }
//   };

//   return (
//     <ul ref={listRef} onKeyDown={handleKeyDown} className="form-search__select-list scroller">
//       {products.map((product, index) => (
//         <SelectItem
//           key={product.id}
//           product={product}
//           highlightedIndexClass={index === highlightedIndex ? 'highlighted' : ''}
//           highlightedIndex={index}
//           onClick={onClick}
//           onItemMouseEnter={onMouseEnterItem}
//           onItemMouseLeave={onMouseLeaveItem}
//         />
//       ))}
//     </ul>
//   );
// };

// export default SelectList;
import { useEffect, useRef, KeyboardEvent, forwardRef } from 'react';
import { TCamerasCard } from '../../types/cameras';
import SelectItem from '../select-item/select-item';

type SelectListProps = {
  products: TCamerasCard[];
  highlightedIndex: number | null;
  onClick: () => void | null;
  onItemMouseEnter: (index: number) => void;
  onItemMouseLeave: () => void;
};

//TODO: навигация стрелочками!11!

const SelectList = forwardRef<HTMLUListElement, SelectListProps>(({ products, highlightedIndex, onClick, onItemMouseEnter: onMouseEnterItem, onItemMouseLeave: onMouseLeaveItem }, ref) => {
  const internalRef = useRef<HTMLUListElement>(null);
  const listRef = (ref as React.RefObject<HTMLUListElement>) || internalRef;

  useEffect(() => {
    if (listRef.current && highlightedIndex !== null) {
      const activeElement = listRef.current.children[highlightedIndex] as HTMLElement;

      if (activeElement) {
        const listRect = listRef.current.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        if (elementRect.bottom > listRect.bottom) {
          listRef.current.scrollTop += elementRect.bottom - listRect.bottom;
        } else if (elementRect.top < listRect.top) {
          listRef.current.scrollTop -= listRect.top - elementRect.top;
        }
      }
    }
  }, [highlightedIndex, listRef]);

  const handleKeyDown = (evt: KeyboardEvent<HTMLUListElement>) => {
    if (evt.key === 'Tab' && listRef.current) {
      const firstElement = listRef.current.firstChild as HTMLElement;
      const lastElement = listRef.current.lastChild as HTMLElement;

      if (evt.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        evt.preventDefault();
      } else if (!evt.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        evt.preventDefault();
      }
    }
  };

  return (
    <ul ref={listRef} onKeyDown={handleKeyDown} className="form-search__select-list scroller">
      {products.map((product, index) => (
        <SelectItem
          key={product.id}
          product={product}
          highlightedIndexClass={index === highlightedIndex ? 'highlighted' : ''}
          highlightedIndex={index}
          onClick={onClick}
          onItemMouseEnter={onMouseEnterItem}
          onItemMouseLeave={onMouseLeaveItem}
        />
      ))}
    </ul>
  );
});

SelectList.displayName = 'SelectList';

export default SelectList;
