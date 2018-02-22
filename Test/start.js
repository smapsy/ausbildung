//= require folder/a.js
//= require_self
//= require folder/b.js
//= require folder/c.js

console.log("start")

// a, b, c, start (ohne require self)
// a, start, b, c (mit require self)
