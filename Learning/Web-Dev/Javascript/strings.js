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

// yourw also able to change the case of a string (lower/upper) but this wont apply to the original string will
// only return a string with a all lowercase/ all uppercase
airline.toLowerCase();
airline.toUpperCase();

// Fix captilization in name
const passenger = 'sAlaR';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing email
const email = "hello@jonas.io";
const loginEmail = '  Hello@Jonas.Io \n';

// the trim method removes any white spaces or new line charachters or special charachters like that that trigger white spaces
const correctEmail = loginEmail.toLowerCase().trim();
const EmailComparer = (correctEmail, compareEmail) => correctEmail === compareEmail;
console.log(correctEmail);

// replacing parts of string
const priceGB = '288,97$'
// the replace method replaces a given string (first arg) and then replaces the string that youve provided in the parameters with 
// the second argument that youve provided! Ans we can also chain thos replace methods
const priceEU = priceGB.replace(',', '.').replace('$', '€');

// the replace only replaces the first occurence of that given string!
const announcement = 'All passengers come to barding door 23. Barding door 23';
console.log(announcement.replace("door", 'gate'));
console.log(priceEU);

// Boolean methods

// tells us if a certain substring in another string
console.log(plane.includes('A3'));

plane.startsWith('A32');
plane.endsWith('0');
