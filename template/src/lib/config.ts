import { provide } from 'react-declarative';

import FirebaseService from './services/base/FirebaseService';
import AlertService from './services/base/AlertService';
import RouterService from './services/base/RouterService';
import ErrorService from './services/base/ErrorService';

import TodoDbService from './services/db/TodoDbService';

import TodoViewService from './services/view/TodoViewService';

import TYPES from './types';

provide(TYPES.firebaseService, () => new FirebaseService());
provide(TYPES.alertService, () => new AlertService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.errorService, () => new ErrorService());

provide(TYPES.todoDbService, () => new TodoDbService());

provide(TYPES.todoViewService, () => new TodoViewService());
