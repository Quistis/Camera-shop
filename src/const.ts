export const AppRoutes = {
  Main: '/',
  Product: '/camera/:id',
  Cart: '/cart',
} as const;

export enum APIRoute {
  Cameras = '/cameras',
  Order = '/orders',
  Promo = '/promo',
  Coupon = '/coupons',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Reviews = 'REVIEWS',
  Promos = 'PROMOS',
  Cart = 'CART',
}
