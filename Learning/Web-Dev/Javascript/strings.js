const airline = "TAP Air Germany";
const plane = "A320";

// just like with arrays we can get the charachter if a string by accesing the index
airline[1];

// we can also get the length property of strings. this will return the amount of 
// charachters we have in the string
airline.length;

// we can get the index of a charachter with the index of function (it will return the first index of the occurence):
airline.indexOf('r'); // 6 becouse T(0) A(1) P(2)  (3) A(4) I(5) //! R(6)

// we can also get the last index of a charachter
airline.lastIndexOf('r') // 10 i wont count all of that ngl

// we can slice the string
// that means that we can call a function wich returns us a substring
airline.slice(4); // this will return us a string from the index 4 until the string ends so: "Air Germany";
// now we can also specify an end parameter but this one will be exclusive so the slice method wont include that
airline.slice(4, 7); // this will return Air without the space!

// now a lot of the times we get a string where we dont know what size it is so
// lets try to extract the first word only without even knowing what the string is
const str = "Hello my name is Salar";
const firstWord = str.slice(0, str.indexOf(' '));
console.log(firstWord);

// now lets do the opposite
const lastWord = str.slice(str.lastIndexOf(' ') + 1);

// we can even define a negative starting point
str.slice(-5); // this will then start counting from behind and will the last 5 letters
str.slice(1, -1) // this will start from the index 1 and exclude the last letter

const middleSeat = str => str.slice(-1) === 'B' || str.slice(-1) === 'E';

console.log(middleSeat("23B"))