// export module
console.log('Import module');

// those variables are only scoped to the current module so we can only use them here
// if we wanted to use them outside of this module we need to use EXPORT keyword
const shippingCOst = 10;
const cart = [];

// now this function can be accesed from outside!
export const addToCart = function(product, quantity){
  cart.push({product, quantity});
  console.log(`${quantity} ${product} have been added`);
};

// also exports can only be defined on top level code!
const totalPrice = 237;
const totalQuantity = 23;

// we can use the as keywoard to export as other names
export {totalPrice, totalQuantity /* as ... */ }

// we can only use one default export value
export default function(product, quantity){
  cart.push({product, quantity});
  console.log(`${quantity} ${product} have been added`);
};

export {cart};