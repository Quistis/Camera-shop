import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { fetchCameras, fetchPromos } from './store/api-actions';
import { setCartProducts } from './store/slices/cart';
import { loadCartState } from './utils/cartLocalStorage';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
//TODO: Изменения тут, чтобы хранить количество
const cartProductIds = loadCartState();

store.dispatch(setCartProducts(cartProductIds));
store.dispatch(fetchCameras());
store.dispatch(fetchPromos());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
