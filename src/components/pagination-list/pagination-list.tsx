import PaginationItem from '../pagination-item/pagination-item';

type PaginationListProps = {
  pagesCount: number;
};

const PaginationList = ({pagesCount}: PaginationListProps): JSX.Element => {
  const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map((page) => <PaginationItem key={page} pageNumber={page}/>)}
        <li className="pagination__item">
          <a className="pagination__link pagination__link--text">
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PaginationList;

