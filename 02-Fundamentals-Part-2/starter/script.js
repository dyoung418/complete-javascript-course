'use strict';

let hasDriversLicense = false;
const passTest = true;

// if variable hasDriversLicense is
// misspelled, use strict will catch it
if (passTest) hasDriversLicense = true;

if (hasDriversLicense) {
    console.log(`I can drive`);
}

//const interface = 'Audio'; // reserved word
//const private = 342; // reserved word


// function declaration (can be called before it is declared)
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

// function expression (cannot be called before the expression)
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}


// Arrow function
// (arrow functions don't get a 'this' keyword)
const calcAge3 = birthYear => 2037 - birthYear;

// Arrow functions with more than one parameter or more than one line of code
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`;
}

console.log(calcAge1(1991),
    calcAge2(1991),
    calcAge3(1991),
    yearsUntilRetirement(1991, 'Jonas'));


// Coding Challenge 1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let dolphinAvg = calcAverage(44, 23, 71);
let koalasAvg = calcAverage(65, 54, 49);

const checkWinner = function (team1, team1Avg, team2, team2Avg) {
    if (team1Avg >= team2Avg * 2) {
        return `${team1} wins (${team1Avg} vs ${team2Avg})`;
    } else if (team2Avg >= team1Avg * 2) {
        return `${team2} wins (${team2Avg} vs ${team1Avg})`;
    } else {
        return `Neither team wins`;
    }
}

console.log(checkWinner('Dolphins', dolphinAvg, 'Koalas', koalasAvg));