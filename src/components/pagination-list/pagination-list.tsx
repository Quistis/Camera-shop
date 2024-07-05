// import PaginationItem from '../pagination-item/pagination-item';

// type PaginationListProps = {
//   pagesCount: number;
// };

// const PaginationList = ({pagesCount}: PaginationListProps): JSX.Element => {
//   const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

//   return (
//     <div className="pagination">
//       <ul className="pagination__list">
//         {pages.map((page) => <PaginationItem key={page} pageNumber={page}/>)}
//         <li className="pagination__item">
//           <a className="pagination__link pagination__link--text">
//             Далее
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default PaginationList;

// import { useCallback } from 'react';
// import PaginationItem from '../pagination-item/pagination-item';

// type PaginationListProps = {
//   pagesCount: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// };

// const getPaginationPages = (totalPages:number, currentPage:number) => {
//   const pages = [];

//   if (totalPages <= 3) {
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else if (currentPage <= 2) {
//     pages.push(1, 2, 3, 'Далее');
//   } else if (currentPage >= totalPages - 1) {
//     pages.push('Назад', totalPages - 2, totalPages - 1, totalPages);
//   } else {
//     pages.push('Назад', currentPage - 1, currentPage, currentPage + 1, 'Далее');
//   }

//   return pages;
// };

// const PaginationList = ({ pagesCount, currentPage, onPageChange }: PaginationListProps): JSX.Element => {
//   const pages = getPaginationPages(pagesCount, currentPage);

//   const handlePageClick = useCallback((page:number | string) => {
//     if (page === 'Далее') {
//       onPageChange(currentPage + 1);
//     } else if (page === 'Назад') {
//       onPageChange(currentPage - 1);
//     } else {
//       onPageChange(Number(page));
//     }

//   }, [currentPage, onPageChange]);

//   return (
//     <div className="pagination">
//       <ul className="pagination__list">
//         {pages.map((page) => (
//           <PaginationItem
//             key={page}
//             pageNumber={page}
//             isActive={page === currentPage}
//             onClick={() => handlePageClick(page)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PaginationList;

// import { useCallback } from 'react';
// import PaginationItem from '../pagination-item/pagination-item';

// type PaginationListProps = {
//   pagesCount: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// };

// const getVisiblePages = (totalPages:number, currentPage:number) => {
//   const pages = [];
//   const startPage = Math.floor((currentPage - 1) / 3) * 3 + 1;
//   const endPage = Math.min(startPage + 2, totalPages);

//   for (let i = startPage; i <= endPage; i++) {
//     pages.push(i);
//   }

//   return pages;
// };

// const PaginationList = ({ pagesCount, currentPage, onPageChange }: PaginationListProps): JSX.Element => {

//   const pages = getVisiblePages(pagesCount, currentPage);

//   const handlePageClick = useCallback((page: string | number) => {
//     if (page === 'Далее') {
//       onPageChange(Math.min(currentPage + 3, pagesCount));
//     } else if (page === 'Назад') {
//       onPageChange(Math.max(currentPage - 3, 1));
//     } else {
//       onPageChange(Number(page));
//     }
//   }, [currentPage, pagesCount, onPageChange]);

//   return (
//     <div className="pagination">
//       <ul className="pagination__list">
//         {currentPage !== 1 && <PaginationItem
//           pageNumber="Назад"
//           isActive={false}
//           onClick={() => handlePageClick('Назад')}
//         />}
//         {pages.map((page) => (
//           <PaginationItem
//             key={page}
//             pageNumber={page}
//             isActive={page === currentPage}
//             onClick={() => handlePageClick(page)}
//           />
//         ))}
//         {currentPage < pagesCount - 2 && <PaginationItem
//           pageNumber="Далее"
//           isActive={false}
//           onClick={() => handlePageClick('Далее')}
//         />}
//       </ul>
//     </div>
//   );
// };

// export default PaginationList;

import PaginationItem from '../pagination-item/pagination-item';

type PaginationListProps = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationList = ({ pagesCount, currentPage, onPageChange }: PaginationListProps): JSX.Element => {
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const currentGroup = Math.ceil(currentPage / 3);

  const handlePrevClick = () => {
    const prevPage = (currentGroup - 1) * 3;
    onPageChange(prevPage);
  };

  const handleNextClick = () => {
    const nextPage = currentGroup * 3 + 1;
    onPageChange(nextPage);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentGroup > 1 && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" onClick={handlePrevClick}>
              Назад
            </a>
          </li>
        )}
        {pages.slice((currentGroup - 1) * 3, currentGroup * 3).map((page) => (
          <PaginationItem key={page} pageNumber={page} isActive={page === currentPage} onClick={() => onPageChange(page)} />
        ))}
        {currentGroup * 3 < pagesCount && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" onClick={handleNextClick}>
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginationList;
