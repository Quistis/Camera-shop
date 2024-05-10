import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import { AppRoutes } from '../../const';

const App = (): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route
            index
            element={<CatalogPage />}
          />
          <Route
            path={AppRoutes.Product}
            element={<ProductPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>

);

export default App;
