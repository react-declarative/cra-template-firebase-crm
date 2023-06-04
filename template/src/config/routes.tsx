import { ISwitchItem } from 'react-declarative';

import TodoListPage from '../pages/TodoListPage';
import TodoOnePage from '../pages/TodoOnePage';

import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';

import ioc from '../lib/ioc';

interface IRouteItem extends ISwitchItem {
  sideMenu?: string;
}

export const routes: IRouteItem[] = [
  {
    path: '/',
    sideMenu: "root.example.todo_list",
    prefetch: async () => {
      await ioc.firebaseService.prefetch();
    },
    redirect: () => {
      if (ioc.firebaseService.isAuthorized) {
        return "/todo_list";
      }
      return "/login-page";
    },
  },
  {
    path: '/todo_list',
    sideMenu: "root.example.todo_list",
    element: TodoListPage,
  },
  {
    path: '/todo_list/:id',
    sideMenu: "root.example.todo_list",
    element: TodoOnePage,
  },
  {
    path: '/error-page',
    element: ErrorPage,
  },
  {
    path: '/login-page',
    element: LoginPage,
  },
  {
    path: '/unauthorized-page',
    element: ErrorPage,
  }
];

export const sideMenuClickMap: Record<string, string> = {
  "root.example.todo_list": "/todo_list",
};

export default routes;
