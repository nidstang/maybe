!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("maybe",[],t):"object"==typeof exports?exports.maybe=t():n.maybe=t()}(window,function(){return e={},u.m=r=[function(n,t,r){"use strict";function e(n){return function(){throw new Error("".concat(n," must be implemented"))}}r.r(t);var u=e("isNothing"),i=e("contains"),o=e("expect"),f=e("unwrap"),a=e("unwrapOr"),c=e("unwrapOrElse"),p=e("withDefault"),l=e("withDefaultFn"),s=e("map"),m=e("mapOr"),h=e("mapOrElse"),d=e("map2"),w=(e("ap"),e("filter")),y=e("andThen"),O=e("and"),b=e("or"),g=e("safe"),v=e("caseof"),x=e("zip"),j=e("zipWith"),E=(e("lift"),e("lift2"),{isNothing:u,contains:i,expect:o,unwrap:f,unwrapOr:a,unwrapOrElse:c,withDefault:p,withDefaultFn:l,map:s,mapOr:m,mapOrElse:h,map2:d,filter:w,andThen:y,and:O,or:b,safe:g,caseof:v,zip:x,zipWith:j});function z(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var r=[],e=!0,u=!1,i=void 0;try{for(var o,f=n[Symbol.iterator]();!(e=(o=f.next()).done)&&(r.push(o.value),!t||r.length!==t);e=!0);}catch(n){u=!0,i=n}finally{try{e||null==f.return||f.return()}finally{if(u)throw i}}return r}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function N(n){this.name="UnwrapException",this.message=n}function P(){return{isNothing:function(){return!0},contains:function(n){return!1},expect:function(n){throw new N(n)},unwrap:function(){throw new N("Tried to unwrap a Nothing value")},unwrapOr:function(n){return n},unwrapOrElse:function(n){return n()},withDefault:function(n){return n},withDefaultFn:function(n){return n()},map:function(){return P()},map2:function(n,t){return P()},mapOr:function(n,t){return n},mapOrElse:function(n,t){return n()},ap:function(n){return P()},filter:function(){return P()},andThen:function(){return P()},and:function(n){return P()},or:function(n){return n},safe:function(){},caseof:function(n){var t=n.Just,r=n.Nothing;if(!t||!r)throw new Error("Pattern malformed");return r()},zip:function(n){return P()},zipWith:function(n,t){return P()},zipN:function(){return P()}}}function D(e){return{isNothing:function(){return!1},contains:function(n){return n===e},expect:function(n){return e},unwrap:function(){return e},unwrapOr:function(){return e},unwrapOrElse:function(){return e},withDefault:function(){return e},withDefaultFn:function(){return e},map:function(n){return T(n(e))},map2:function(n,u){return this.zip(n).map(function(n){var t=z(n,2),r=t[0],e=t[1];return u(r,e)})},mapOr:function(n,t){return T(t(e))},mapOrElse:function(n,t){return T(t(e))},ap:function(n){return n.map(e)},filter:function(n){return n(e)?D(e):P()},andThen:function(n){return n(e)},and:function(n){return n.isNothing()?P():n},or:function(){return this},safe:function(n){return n(e)},caseof:function(n){var t=n.Just,r=n.Nothing;if(!t||!r)throw new Error("Pattern malformed");return t(e)},zip:function(n){return n.map(function(n){return[e,n]})},zipWith:function(n,t){return this.zip(n).map(t)}}}var T=function(n){return null==n?P():D(n)};T.lift=function(t){return function(n){return n.map(t)}},T.lift2=function(r){return function(n,t){return n.map2(t,r)}},T.Just=function(n){return Object.assign({},E,D(n))},T.Nothing=function(){return Object.assign({},E,P())},((T.from=T).of=T).toPromise=function(n){return n.caseof({Just:function(n){return Promise.resolve(n)},Nothing:function(){return Promise.reject()}})};t.default=T}],u.c=e,u.d=function(n,t,r){u.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},u.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)u.d(r,e,function(n){return t[n]}.bind(null,e));return r},u.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return u.d(t,"a",t),t},u.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},u.p="",u(u.s=0);function u(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}var r,e});