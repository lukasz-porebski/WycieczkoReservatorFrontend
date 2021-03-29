export const AppRoutes = {
  account: {
    path: 'account',
    children: {
      logIn: 'log-in',
      registration: 'registration',
      passwordReminder: 'password-reminder'
    }
  },
  home: {
    path: 'home',
  },
};
