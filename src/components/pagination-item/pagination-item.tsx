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
