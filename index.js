import { navBarListener } from './module/navbar.js';
import * as bookController from './module/bookOperations.js';
import { timeFunction } from './module/time.js';

navBarListener();
setInterval(() => timeFunction(), 1000);
bookController.displayBook();
bookController.addBookListener();
bookController.deleteBookListener();
