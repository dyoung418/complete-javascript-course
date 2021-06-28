'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`; // will get 'Jonas' as firstName from global scope
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; //var not block-scoped, so millenial is function-scoped here.
      const firstName = 'Steven';
      let millenial2 = true; //let is block-scoped
      const str = `Oh, and you're a millenial, ${firstName}`; // will use 'Steven' as firstName (first found in scope chain)
      console.log(str); // OK

      function add(a, b) {
        return a + b;
      }

      output = `New Output`; // reassigns outer scope's variable
    }
    console.log(millenial); // OK because declared with var
    //console.log(millenial2); // ReferenceError because declared with let
    //console.log(str)  // ReferenceError
    //console.log(add(2, 3));  // ReferenceError in strict mode, but not if strict mode is not declared.
    console.log(output); // will print 'New Output' because the if block reassigned a value to the printAge output, it did not declare its own 'output' variable (not 'let')
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);

//console.log(age)  // ReferenceError
//printAge();  // ReferenceError

// HOISTING with variables
console.log(me); // OK, but value is 'undefined'
//console.log(job); // ReferenceError: Cannot access 'job' before initialization
//console.log(year); // ReferenceError: Cannot access 'job' before initialization

var me = 'Jonas'; //var will be hoisted but show value as 'undefined', which is confusing and leads to errors.  Don't use var
let job = 'teacher'; //let can't be accessed before declaration
const year = 1991; //const can't be accessed before declaration

// HOISTING with functions
console.log(addDeclaration(2, 3));
//console.log(addExpression(2, 3)); //ReferenceError because was defined with 'const' (if 'var' had been used, it would have had error "TypeError: addExpression is not a function" because it is undefined)
//console.log(addArrow(2, 3)); //ReferenceError

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// THIS KEYWORD

console.log(this); // the 'window' object (if in a browser)

const calcAge2 = function (birthYear) {
  console.log(`calcAge2: ${2037 - birthYear}`);
  console.log(this); //undefined in strict, window in non-strict
};
calcAge2(1980);

const calcAge3 = birthYear => {
  console.log(`calcAge3: ${2037 - birthYear}`);
  console.log(this); //window object because arrow function 'this' points to the *lexical* parent, which is the global context in this case, or 'window'
};
calcAge3(1980);
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(`method calcAge:`);
    console.log(this); // the object calling the method (which isn't the same as the lexical parent - see Matilda example below)
    console.log(2037 - this.year);
    const printWhetherMillenial = function () {
      // this will be undefined because this is a function, not a method
      // if we really wanted to use the object reference in this function-within-a-method, in pre-ES6, we could declare const that = this in the containing method and then reference 'that' inside the embedded function (or call it 'self' instead of 'that').  In ES6, we could just write this embedded function as an arrow function, which will use the 'this' keyword of its parent scope
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    //printWhetherMillenial(); //Cannot read property 'year' of undefined -- because in a regular function, 'this' is undefined.
  },
  greet: () => console.log(`Hey ${this.firstName}`), // 'this' is 'window' because the arrow function is defined in the global scope (this points to lexical parent).  Note that the curly braces for jonas object declaration is not a code block, so 'greet' is being declared in the global scope.
};

jonas.calcAge();
jonas.greet(); // 'Hey undefined'.  No error because this is effectively window.firstName and firstName is undefined in window.  If 'this' had been undefined, then trying to take .firstName off it would have been an error.  Note that if the global scope *did* have a firstName declared with 'var' with a value of, say, 'Bob', this would have printed 'Hey Bob'.  'var' puts a property on 'window', but 'const' and 'let' do not.

const matilda = {
  firstName: 'Matilda',
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // function borrowing

matilda.calcAge(); // 'this' will point to matilda, not jonas

const f = jonas.calcAge;
//f(); // 'this' is undefined, so we get "TypeError: cannot read property 'year' of undefined."

// ARGUMENTS keyword (only for regular functions, not arrow)
const addMany = function () {
  console.log(arguments);
  let sum = 0;
  //argments is not an Array, but it can be converted to one
  //and can be used as an iterator.
  for (let value of arguments) {
    sum += value;
  }
  return sum;
};
console.log(addMany(2, 5, 7));

// TAKEAWAY
// * Never use an arrow function as a method
// * Don't use 'var' -- use 'const' and 'let'
// * use strict;

// Primitive Types
// each one gets a new memory on the call stack
let lastName2 = 'Williams';
let oldlastName2 = lastName2;
lastName2 = 'Davis';
console.log(lastName2, oldlastName2); // Davis Williams

// Reference Types
// are allocated on the heap and variables just hold a
// reference to that address.
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica); // lastName 'Davis'
console.log('After marriage:', marriedJessica); //lastName 'Davis'

// Doing a shallow copy of Objects:
jessica.lastName = 'Williams'; //reset this
const jessicaCopy = Object.assign({}, jessica); // merge the two and return a newly allocated object with all the properties of both.
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Hank');
console.log('Before marriage:', jessica); // lastName 'Williams', but family has Hank added since that is an embedded object
console.log('After marriage:', jessicaCopy); //lastName 'Davis' and family has Hank added
