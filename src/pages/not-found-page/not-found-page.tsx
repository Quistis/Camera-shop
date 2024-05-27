import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import './not-found-page.css';

const NotFoundPage = (): JSX.Element => (
  <section className="error-screen">
    <Helmet>
      <title>
        Camera Shop. Страница не найдена
      </title>
    </Helmet>
    <h2 className="error-screen--title">404 Страница не найдена</h2>
    <span className="error-screen--back">
      <Link to={AppRoutes.Main}>
        Вернуться на главную
      </Link>
    </span>
  </section>
);

export default NotFoundPage;
