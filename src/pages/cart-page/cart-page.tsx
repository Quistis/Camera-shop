import { useEffect, useState, useRef, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CartItem from '../../components/cart-item/cart-item';
import RemoveCartItemModal from '../../components/remove-cart-item-modal/remove-cart-item-modal';
import PostOrderModal from '../../components/post-order-modal/post-order-modal';
import EmptyProducts from '../../components/empty-products/empty-products';
import UiBlocker from '../../components/ui-blocker/ui-blocker';
import Loader from '../../components/loader/loader';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectCameraCards, selectCardsLoadingStatus, selectCardsErrorStatus } from '../../store/slices/cameras';
import { selectPromosData, selectPromosLoadingStatus } from '../../store/slices/promos';
import { selectCartItems, selectCouponDiscount, selectCouponLoadingStatus, setCartProducts, setCouponDiscount } from '../../store/slices/cart';
import { postOrder, postCoupon } from '../../store/api-actions';
import { saveCouponState, loadCouponState } from '../../utils/cartLocalStorage';
import { AppRoutes } from '../../const';
import { TCamerasCard } from '../../types/cameras';
import { TCartItem } from '../../store/slices/cart';

const calculateDiscount = (products: TCartItem[]): number => {

  let discountValue = 0;

  const totalQuantity = products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
  const totalPriceWithoutPromos = products.reduce((total, item) => total + item.price * item.quantity, 0);

  if (totalQuantity === 2) {
    discountValue = 3;
  }

  if (totalQuantity >= 3 && totalQuantity <= 5) {
    discountValue = 5;
  }

  if (totalQuantity >= 6 && totalQuantity <= 10) {
    discountValue = 10;
  }

  if (totalQuantity > 10) {
    discountValue = 15;
  }

  if (totalQuantity > 1) {
    if (totalPriceWithoutPromos >= 10000 && totalPriceWithoutPromos < 20000) {
      discountValue -= 1;
    }

    if (totalPriceWithoutPromos >= 20000 && totalPriceWithoutPromos < 30000) {
      discountValue -= 2;
    }

    if (totalPriceWithoutPromos > 30000) {
      discountValue -= 3;
    }
  }

  const discountAmount = Math.round((totalPriceWithoutPromos / 100) * discountValue);

  return discountAmount;
};

const CartPage = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cardsData = useAppSelector(selectCameraCards);
  const isCardsDataLoading = useAppSelector(selectCardsLoadingStatus);
  const cardsErrorStatus = useAppSelector(selectCardsErrorStatus);
  const cartItems = useAppSelector(selectCartItems);
  const promoItems = useAppSelector(selectPromosData);
  const isPromosLoading = useAppSelector(selectPromosLoadingStatus);
  const couponDiscount = useAppSelector(selectCouponDiscount);
  const couponLoadingStatus = useAppSelector(selectCouponLoadingStatus);

  const [activeProduct, setActiveProduct] = useState<TCamerasCard | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isPostOrderModalActive, setIsPostOrderModalActive] = useState(false);
  const [couponInputValue, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'valid' | 'invalid' | null>(null);

  const postCouponButtonRef = useRef<HTMLButtonElement>(null);
  const couponInputRef = useRef<HTMLInputElement>(null);

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

  const discountAmount = calculateDiscount(cartItemsWithoutPromos);
  const couponDiscountAmount = Math.round((totalPrice / 100) * couponDiscount);
  const finalDiscountAmount = discountAmount + couponDiscountAmount;
  const finalPrice = totalPrice - finalDiscountAmount;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { couponCode, discount } = loadCouponState();
    if (couponCode && discount && cardsErrorStatus === false) {
      setCouponInput(couponCode);
      setCouponStatus('valid');
      dispatch(setCouponDiscount(discount));
    }
  }, [dispatch, cardsErrorStatus]);


  const handleRemoveCartItemButtonClick = (product?: TCamerasCard) => {
    if (product) {
      setActiveProduct(product);
      setIsModalActive(true);
    }
  };

  const handleCrossButtonClick = () => {
    setIsModalActive(false);
  };

  const handlePostOrder = () => {

    const couponCode = localStorage.getItem('couponCode') ? localStorage.getItem('couponCode') : null;
    setIsPostOrderModalActive(true);

    dispatch(postOrder({
      camerasIds: [...cartItemsIds],
      coupon: couponCode,
    }))
      .then((response) => {

        if (response.meta.requestStatus === 'fulfilled') {
          setTimeout(() => {
            navigate(AppRoutes.Main);
            dispatch(setCartProducts([]));
            dispatch(setCouponDiscount(0));
            localStorage.clear();
          }, 2000);

        }
      });

  };

  const handlePostOrderModalCrossButtonClick = () => {
    setIsPostOrderModalActive(false);
  };

  const handleCouponCodeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/\s/g, '');
    setCouponInput(value);
    setCouponStatus(null);
  };

  const handleCouponInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/\s/g, '');
    setCouponInput(value);
    setCouponStatus(null);
  };

  const handlePostCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCoupon(couponInputValue))
      .then((response) => {

        const couponDiscountValue = response.payload as number;

        if (response.meta.requestStatus === 'fulfilled') {

          setCouponStatus('valid');
          saveCouponState(couponInputValue, couponDiscountValue);

        } else {
          setCouponStatus('invalid');
          saveCouponState('', 0);
          dispatch(setCouponDiscount(0));
        }
      });
  };

  if (isCardsDataLoading || isPromosLoading) {
    return <Loader/>;
  }

  return (
    <main>
      <Helmet>
        <title>
          Camera Shop. Корзина
        </title>
      </Helmet>
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
                <p className="title title--h4">
                  Если у вас есть промокод на скидку, примените его в этом поле
                </p>
                <div className="basket-form">
                  <form action="#" onSubmit={handlePostCouponSubmit}>
                    <div className={`custom-input ${couponStatus === 'valid' ? 'is-valid' : ''} ${couponStatus === 'invalid' ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-input__label">Промокод</span>
                        <input
                          ref={couponInputRef}
                          type="text"
                          name="promo"
                          value={couponInputValue}
                          placeholder="Введите промокод"
                          onChange={handleCouponCodeChange}
                          onBlur={handleCouponInputBlur}
                        />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button
                      ref={postCouponButtonRef}
                      className="btn"
                      type="submit"
                    >
                      Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className={`basket__summary-value ${finalDiscountAmount > 0 ? 'basket__summary-value--bonus' : ''}`}>
                    {finalDiscountAmount.toLocaleString('ru-RU')} ₽
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
      <PostOrderModal
        isModalActive={isPostOrderModalActive}
        onCrossButtonClick={handlePostOrderModalCrossButtonClick}
      />
      <UiBlocker isActive={couponLoadingStatus}/>
    </main>

  );
};

export default CartPage;
