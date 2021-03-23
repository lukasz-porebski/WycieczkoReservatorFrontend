export const AppRoutes = {
  account: {
    path: 'account',
    children: {
      logIn: 'log-in',
      registration: 'registration'
    }
  },
  home: {
    path: 'home',
  },
};
