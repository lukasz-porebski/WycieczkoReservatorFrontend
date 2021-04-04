export const AppRoutes = {
  user: {
    path: 'user',
    children: {
      logIn: 'log-in',
      registration: 'registration',
      passwordReminder: 'password-reminder',
      passwordChanger: 'password-changer'
    }
  },
  home: {
    path: 'home',
  },
  admin: {
    path: 'admin',
    children: {
      usersList: 'users-list',
      tripCreator: 'trip-creator',
    }
  }
};
