import * as variable from './variable.js';
import { DateTime } from '../node_modules/luxon/src/luxon.js';

export const timeFunction = () => {
  variable.date.textContent = DateTime.now().toFormat('LLL dd yyyy HH:mm:ss');
}