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
const cartItems = loadCartState();

// store.dispatch(setCartProducts(cartItems));
store.dispatch(fetchCameras())
  .then((response) => {
    //Это нужно чтобы корзина заполнялась только если данные о товарах успешно загружены,
    //чтобы не было ситуации когда товары не загрузили,а в корзине что-то есть
    if (response.meta.requestStatus === 'fulfilled') {
      store.dispatch(setCartProducts(cartItems));
    }
  });
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
