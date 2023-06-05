/**
 * @version 1.0
 */

import { list_to_tree } from "../data-structures/trees";

Object.defineProperty(Array.prototype, 'toTree', {
  value: function() { return list_to_tree(this)  }
});

