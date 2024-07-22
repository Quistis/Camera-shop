import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import RemoveCartItemModal from '../../components/remove-cart-item-modal/remove-cart-item-modal';
import { useAppSelector } from '../../hooks';
import { selectCameraCards } from '../../store/slices/cameras';
import { selectCartItems } from '../../store/slices/cart';
import { AppRoutes } from '../../const';
import { toast } from 'react-toastify';
import { TCamerasCard } from '../../types/cameras';

//TODO: Изменения тут для подсчета кол-ва,цены и тд, тут в переменной cartCards тот же самый тип что и TCamerasCard, только есть поле quantity, надо сделать под него тип
const CartPage = (): JSX.Element => {
  const navigate = useNavigate();
  const cardsData = useAppSelector(selectCameraCards);
  const cartItems = useAppSelector(selectCartItems);

  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const cartCards = cardsData.filter((card) =>
    cartItems.some((item) => item.id === card.id)
  ).map((card) => ({
    ...card,
    quantity: cartItems.find((item) => item.id === card.id)?.quantity || 1,
  }));

  const totalPrice = cartCards.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate(AppRoutes.Main);
      toast.warn('Корзина пуста, переходим в каталог');
    }
  }, [cartItems.length, navigate]);

  const handleRemoveCartItemButtonClick = (product?: TCamerasCard) => {
    if (product) {
      setActiveProduct(product);
      setIsModalActive(true);
    }
  };

  const handleCrossButtonClick = () => {
    setIsModalActive(false);
  };

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href={AppRoutes.Main}>
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href={AppRoutes.Main}>
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Корзина
                </span>
              </li>
            </ul>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {cartCards.map((card) => <CartItem key={card.id} product={card} onCartItemRemoveButtonClick={handleRemoveCartItemButtonClick} />)}
            </ul>
            <div className="basket__summary">
              <div className="basket__promo">
                {/*<p class="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                <div class="basket-form">
                  <form action="#">
                    <div class="custom-input">
                      <label><span class="custom-input__label">Промокод</span>
                        <input type="text" name="promo" placeholder="Введите промокод">
                      </label>
                      <p class="custom-input__error">Промокод неверный</p>
                      <p class="custom-input__success">Промокод принят!</p>
                    </div>
                    <button class="btn" type="submit">Применить
                    </button>
                  </form>
                </div>*/}
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className="basket__summary-value basket__summary-value--bonus">
                    0 ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">
                    К оплате:
                  </span>
                  <span className="basket__summary-value basket__summary-value--total">
                    111 390 ₽
                  </span>
                </p>
                <button className="btn btn--purple" type="submit">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <RemoveCartItemModal
        product={activeProduct}
        isModalActive={isModalActive}
        onCrossButtonClick={handleCrossButtonClick}
      />
    </main>

  );
};

export default CartPage;
