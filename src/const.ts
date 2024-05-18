export const AppRoutes = {
  Main: '/',
  Product: '/product/:id',
} as const;

export enum APIRoute {
  Cameras = '/cameras',
  Order = '/order',
  Promo = '/promo',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Reviews = 'REVIEWS',
  Promos = 'PROMOS',
}
