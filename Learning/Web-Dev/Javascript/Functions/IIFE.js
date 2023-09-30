// Immediately Invoked Function Expressions 
'use strict';

(function(){
  console.log('This will never run again');
})();

(() => console.log('this Will never run Again'))();
