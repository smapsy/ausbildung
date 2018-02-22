// Hier kommen die ersten Übungs-Codes rein

// Values & Types
/*
var a
console.log(typeof a)  //"undefined"

a = "Hello World"
console.log(typeof a)  // "string"

a = 42
console.log(typeof a)  // "number"

a = true
console.log(typeof a)  // "boolean"

a = null
console.log(typeof a)  // "object" - bug

a = undefined
console.log(typeof a)  // "undefined"

a = {b: "c"}
console.log(typeof a)  // "object"


//Objects

var obj = {
  a: "Hello World",
  b: 42,
  c: true
}

console.log(obj.a, obj.b, obj.c)


var obj = {
  a: "Hello World",
  b: 42,
  c: true
}

var b ="a"
console.log(b, obj.b, obj[b], obj["b"]) 


var arr = [
  "Hello World",
  42,
  true
]

console.log(arr[0], arr.length)


// Funktionen
// Built-In Type Methods 
var a = "hello world"
var b = 3.14159

console.log(a.length, a.toUpperCase(), b.toFixed(4))

// Comparing Values
// Coercion
var a = "42"
var b = Number(a)

console.log(a, b, typeof(a), typeof(b))


//Equality
var a = "42"
var b = Number(a)

a == b  // true
a === b  //false

a!= b  //false
a !== b  //true


//Function scope; nested scope

function foo() {
  var a = 1
  
  if (a >= 1) {
    let b = 2

    while (b < 5) {
      let c = b * 2;
      b++

      console.log(a + c)
    }
  }
  console.log(b)
}
foo()

//Closure
function outer(par) {
  var a = par + 1

  return function(c) {
    console.log(a + c)
  }
}

var x = outer(1)
var d = outer(4)

x(4)
*/
var bbb = ["wort1", "penis", "noch ein wort", "london", "laufen"]
/*
function array_filter (array, filter) {
  for(var i=0; i<array.length; i++) {
    if(!filter(array[i])) {
      array.splice(i, 1)
      i--
    }
  }

  return array
}

function generateFilter(b) {

return function(x) {
  
  if (x.indexOf(b) == -1) {
    return false
  } else {
    return true
  }
}
}
var e = "e"
var meinFilter = generateFilter('wort')
var meinZweiterFilter = generateFilter('laufen')
var o = bbb.filter(meinFilter)

console.log(o)

var o = bbb.filter(meinZweiterFilter)

console.log(o)
*/

// this




