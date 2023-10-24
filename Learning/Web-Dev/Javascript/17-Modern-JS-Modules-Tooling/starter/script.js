import add from './shoppingCart.js';
import {cart as sC} from './shoppingCart.js'
import * as ShoppingCart from './shoppingCart.js';

console.log('Exporting module')

ShoppingCart.addToCart('bread', 5);
ShoppingCart.totalQuantity;
ShoppingCart.totalPrice;

add('milk', 5);

// we can use a top level await but that is only possible in 