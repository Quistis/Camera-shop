import { Outlet, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../store/slices/cart';
import { AppRoutes } from '../../const';
import SearchForm from '../search-form/search-form';

const Layout = (): JSX.Element => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <Link
            className="header__logo"
            to={AppRoutes.Main}
            aria-label="Переход на главную"
          >
            <svg width={100} height={36} aria-hidden="true">
              <use xlinkHref="#icon-logo" />
            </svg>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="main-nav__link" to={AppRoutes.Main}>
                  Каталог
                </Link>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Гарантии
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Доставка
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          <SearchForm/>
          <Link className="header__basket-link" to={AppRoutes.Cart}>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            {cartItems.length !== 0 &&
            <span className="header__basket-count">{cartItems.length}</span>}

          </Link>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <a
              className="footer__logo"
              href="index.html"
              aria-label="Переход на главную"
            >
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </a>
            <p className="footer__description">
              Интернет-магазин фото- и видеотехники
            </p>
            <ul className="social">
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу вконтатке"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-vk" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу pinterest"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-pinterest" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="link" href="#" aria-label="Переход на страницу reddit">
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-reddit" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Каталог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Гарантии
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Доставка
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    О компании
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Курсы операторов
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Блог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Сообщество
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    FAQ
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Задать вопрос
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
