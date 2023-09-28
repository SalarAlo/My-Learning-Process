'user strict';

// how to populate a map effectively
const question = new Map(
  [
    ["Question", "What is the best programming language?"],
    [1, "C++"],
    [2, "Java"],
    [3, "Javascript"],
    [true, "Correct"],
    [false, "Try again"],
    ['Correct', 3]
  ]
);

console.log(question.get("Question"));


for(const [key, value] of question)
  if(typeof(key) === "number")
    console.log(`Answer ${key}: ${value}`);
  
const answer = Number(prompt("Enter in your answer"));
console.log(question.get(answer === question.get('Correct')));

// Convert map to an array
const mapToArray = [...question];
console.log(...question);