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

import { useCallback } from 'react';
import PaginationItem from '../pagination-item/pagination-item';

type PaginationListProps = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getPaginationPages = (totalPages:number, currentPage:number) => {
  const pages = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 2) {
    pages.push(1, 2, 3, 'Далее');
  } else if (currentPage >= totalPages - 1) {
    pages.push('Назад', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push('Назад', currentPage - 1, currentPage, currentPage + 1, 'Далее');
  }

  return pages;
};

const PaginationList = ({ pagesCount, currentPage, onPageChange }: PaginationListProps): JSX.Element => {
  const pages = getPaginationPages(pagesCount, currentPage);

  const handlePageClick = useCallback((page:number | string) => {
    if (page === 'Далее') {
      onPageChange(currentPage + 1);
    } else if (page === 'Назад') {
      onPageChange(currentPage - 1);
    } else {
      onPageChange(Number(page));
    }

  }, [currentPage, onPageChange]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map((page) => (
          <PaginationItem
            key={page}
            pageNumber={page}
            isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PaginationList;
