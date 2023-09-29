'use strict';

// Callback function 1
const oneWord = function(str)
{
  return str.replace(/ /g, '').toLowerCase();
}

// Callback function 2
const upperFirstWord = function(str)
{
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
}

// Higher Order Function
const transformer = function(str, fun){
  console.log(`Transform string: "${str}". With the function: ${fun.name}`)
  console.log(`string: ${str} looks this way transformed: ${fun(str)}`)
  return fun(str)
}

// the functions that we pass into the parameters are called: 'callback function'
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);