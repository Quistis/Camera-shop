import { useEffect, useState } from 'react';
import CartItem from '../../components/cart-item/cart-item';
import RemoveCartItemModal from '../../components/remove-cart-item-modal/remove-cart-item-modal';
import EmptyProducts from '../../components/empty-products/empty-products';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectCameraCards } from '../../store/slices/cameras';
import { selectPromosData } from '../../store/slices/promos';
import { selectCartItems } from '../../store/slices/cart';
import { postOrder } from '../../store/api-actions';
import { AppRoutes } from '../../const';
import { TCamerasCard } from '../../types/cameras';
import { TCartItem } from '../../store/slices/cart';

//TODO: Изменения тут для подсчета кол-ва,цены и тд, тут в переменной cartCards тот же самый тип что и TCamerasCard, только есть поле quantity, надо сделать под него тип
const CartPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cardsData = useAppSelector(selectCameraCards);
  const cartItems = useAppSelector(selectCartItems);
  const promoItems = useAppSelector(selectPromosData);

  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const cartCards = cardsData.filter((card) =>
    cartItems.some((item) => item.id === card.id)
  ).map((card) => ({
    ...card,
    quantity: cartItems.find((item) => item.id === card.id)?.quantity || 1,
  }));

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const cartItemsIds = cartItems.map((items) => items.id);
  const promoItemsIds = promoItems.map((item) => item.id);
  const cartItemsWithoutPromos = cartItems.filter((item) => !promoItemsIds.some((promoId) => promoId === item.id));

  const calculateDiscount = (products: TCartItem[]): number => {

    let discountValue = 0;

    const totalQuantity = products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    const totalPriceWithoutPromos = products.reduce((total, item) => total + item.price * item.quantity, 0);

    if (totalQuantity === 2) {
      // console.log('Общее количество:' + totalQuantity);
      discountValue = 3;
      // console.log('Скидка:' + discountValue.toString());
    }

    if (totalQuantity >= 3 && totalQuantity <= 5) {
      // console.log('Общее количество:' + totalQuantity);
      discountValue = 5;
      // console.log('Скидка:' + discountValue.toString());
    }

    if (totalQuantity >= 6 && totalQuantity <= 10) {
      // console.log('Общее количество:' + totalQuantity);
      discountValue = 10;
      // console.log('Скидка:' + discountValue.toString());
    }

    if (totalQuantity > 10) {
      // console.log('Общее количество:' + totalQuantity);
      discountValue = 15;
      // console.log('Скидка:' + discountValue.toString());
    }

    if (totalQuantity > 1) {
      if (totalPriceWithoutPromos >= 10000 && totalPriceWithoutPromos < 20000) {
        // console.log('Общая цена:' + totalPrice1);
        discountValue -= 1;
        // console.log('Скидка:' + discountValue.toString());
      }

      if (totalPriceWithoutPromos >= 20000 && totalPriceWithoutPromos < 30000) {
        // console.log('Общая цена:' + totalPrice1);
        discountValue -= 2;
        // console.log('Скидка:' + discountValue.toString());
      }

      if (totalPriceWithoutPromos > 30000) {
        // console.log('Общая цена:' + totalPrice1);
        discountValue -= 3;
        //console.log('Скидка:' + discountValue.toString());
      }
    }

    const discountAmount = Math.round((totalPriceWithoutPromos / 100) * discountValue);
    // console.log(totalPriceWithoutPromos);
    // console.log(discountValue);
    // console.log(discountAmount);

    return discountAmount;
  };

  const discount = calculateDiscount(cartItemsWithoutPromos);
  const finalPrice = totalPrice - discount;

  useEffect(() => {
    // Прокрутка страницы наверх при монтировании компонента
    window.scrollTo(0, 0);
  }, []);
  //TODO: Избавиться от этой штуки, мы можем попадать в корзину если она пуста, переход нужно делать, только
  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     navigate(AppRoutes.Main);
  //     toast.warn('Корзина пуста, переходим в каталог');
  //   }
  // }, [cartItems.length, navigate]);

  const handleRemoveCartItemButtonClick = (product?: TCamerasCard) => {
    if (product) {
      setActiveProduct(product);
      setIsModalActive(true);
    }
  };

  const handleCrossButtonClick = () => {
    setIsModalActive(false);
  };
  //TODO: Доработать, нужно показывать модальное окно по нажатию,а не просто отправлять запрос на сервер
  const handlePostOrder = () => {
    dispatch(postOrder({
      camerasIds: [...cartItemsIds],
      coupon: null,
    }));
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
            {cartItems.length === 0 && <EmptyProducts />}
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
                  <span className={`basket__summary-value ${discount > 0 ? 'basket__summary-value--bonus' : ''}`}>
                    {calculateDiscount(cartItemsWithoutPromos).toLocaleString('ru-RU')} ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">
                    К оплате:
                  </span>
                  <span className="basket__summary-value basket__summary-value--total">
                    {finalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </p>
                <button
                  className="btn btn--purple"
                  type="submit"
                  onClick={handlePostOrder}
                  disabled={cartItems.length === 0}
                >
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
