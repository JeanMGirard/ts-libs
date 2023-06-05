/**
 * @version 1.0
 */

import { ArrayWithDepths } from "../data-structures/trees";

Object.defineProperty(Array.prototype, 'getDepths', {
  value: function() { Object.assign(this, ArrayWithDepths(this));  }
});
