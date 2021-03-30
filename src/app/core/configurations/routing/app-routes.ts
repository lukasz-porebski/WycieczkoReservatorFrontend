export const AppRoutes = {
  user: {
    path: 'user',
    children: {
      logIn: 'log-in',
      registration: 'registration',
      passwordReminder: 'password-reminder'
    }
  },
  home: {
    path: 'home',
  },
  admin: {
    path: 'admin',
    children: {
      usersList: 'users-list'
    }
  }
};
