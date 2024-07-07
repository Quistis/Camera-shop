// import { Link } from 'react-router-dom';

// type PaginationItemProps = {
//   pageNumber: number | string;
// };

// const PaginationItem = ({pageNumber}: PaginationItemProps): JSX.Element => (
//   <Link className="pagination__item" to={''}>
//     <a className="pagination__link pagination__link--active">
//       {pageNumber}
//     </a>
//   </Link>
// );

// export default PaginationItem;

type PaginationItemProps = {
  pageNumber: number | string;
  isActive?: boolean;
  onClick: () => void;
};

const PaginationItem = ({ pageNumber, isActive, onClick }: PaginationItemProps): JSX.Element => (
  <li className="pagination__item">
    <a className={`pagination__link${isActive ? ' pagination__link--active' : ''}`} onClick={onClick}>
      {pageNumber}
    </a>
  </li>
);

export default PaginationItem;
