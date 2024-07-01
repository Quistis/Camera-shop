import { Link } from 'react-router-dom';

type PaginationItemProps = {
  pageNumber: number;
};

const PaginationItem = ({pageNumber}: PaginationItemProps): JSX.Element => (
  <Link className="pagination__item" to={''}>
    <a className="pagination__link pagination__link--active">
      {pageNumber}
    </a>
  </Link>
);

export default PaginationItem;
