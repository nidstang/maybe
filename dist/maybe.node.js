!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("maybe",[],n):"object"==typeof exports?exports.maybe=n():t.maybe=n()}(global,function(){return r={},u.m=e=[function(t,n,e){"use strict";e.r(n);function f(u){function o(){return null==u}return{isNothing:o,withDefault:function(t){return o()?t:u},withDefaultFn:function(t){return o()?t():u},map:function(t){return o()?f(null):f(t(u))},filter:function(t){return o()?f(null):t(u)?f(u):f(null)},andThen:function(t){return o()?f(null):t(u)},safe:function(t){return o()?{}:t(u)},caseof:function(t){var n=f(t).filter(function(t){var n=t.Just,e=t.Nothing;return!!n&&!!e}).withDefaultFn(function(){throw new Error("Pattern malformed")}),e=n.Just,r=n.Nothing;return o()?r():e(u)}}}f.Just=function(t){return f(t)},f.Nothing=function(){return f(null)},f.from=f.Just,n.default=f}],u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(n,t){if(1&t&&(n=u(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)u.d(e,r,function(t){return n[t]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="",u(u.s=0);function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}var e,r});