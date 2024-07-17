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
