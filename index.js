import {navBarListener} from './module/navbar.js';
import * as bookController from './module/bookOperations.js';

navBarListener();
bookController.displayBook();
bookController.addBookListener();
bookController.deleteBookListener();
