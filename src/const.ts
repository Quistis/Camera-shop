export const AppRoutes = {
  Main: '/',
  Product: '/product/:id',
} as const;

export enum APIRoute {
  Cameras = '/cameras',

}

export enum NameSpace {
  Cameras = 'CAMERAS',
}
