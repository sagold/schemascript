!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("schemascript",[],r):"object"==typeof exports?exports.schemascript=r():e.schemascript=r()}(global,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";var n=this&&this.__spreadArrays||function(){for(var e=0,r=0,t=arguments.length;r<t;r++)e+=arguments[r].length;var n=Array(e),o=0;for(r=0;r<t;r++)for(var u=arguments[r],i=0,f=u.length;i<f;i++,o++)n[o]=u[i];return n};Object.defineProperty(r,"__esModule",{value:!0}),r.config={IS_TYPE:"isType",SET_REQUIRED:"$required",IS_REQUIRED:"isRequired",DEFINITIONS:"definitions"};var o=Object.prototype.toString,u=function(e){return o.call(e).match(/\s([^\]]+)\]/).pop().toLowerCase()};function i(e){return Object.defineProperty(e,r.config.IS_TYPE,{enumerable:!1,value:!0}),null==e[r.config.SET_REQUIRED]&&Object.defineProperty(e,r.config.SET_REQUIRED,{enumerable:!1,value:function(){return Object.defineProperty(e,r.config.IS_REQUIRED,{enumerable:!1,value:!0})}}),e}function f(){for(var e,t,o=[],u=0;u<arguments.length;u++)o[u]=arguments[u];(e=o).forEach((function(e){Object.keys(e).forEach((function(n){!0===e[n][r.config.IS_TYPE]&&((t=t||{})[n]=e[n],delete e[n])})),e.properties&&(t=Object.assign({},t,e.properties),delete e.properties)})),t&&e.push({properties:t}),o=e;var f=i(Object.assign.apply(Object,n([{}],o,[{type:"object"}])));return function(e,r){if(null==r)return e;var t=e.required||[];return Object.keys(r).forEach((function(e){r[e].isRequired&&!1===t.includes(e)&&t.push(e)})),t.length>0&&(e.required=t),e}(f,f.properties)}function c(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e=e.map((function(e){return Array.isArray(e)||e[r.config.IS_TYPE]?{items:e}:e})),i(Object.assign.apply(Object,n([{}],e,[{type:"array"}])))}function a(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];e=e.map((function(e){return Array.isArray(e)?{enum:e}:e}));var t=i(Object.assign.apply(Object,n([{enum:[]}],e))),o=t.enum.length>0,f=u(t.enum[0]);return t.enum.forEach((function(e){u(e)!==f&&(o=!1)})),o&&(t.type=f),t}function p(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e=e.map((function(e){return"string"===u(e)?{default:e}:e})),i(Object.assign.apply(Object,n([{}],e,[{type:"string"}])))}function l(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e=e.map((function(e){return"number"===u(e)?{default:e}:e})),i(Object.assign.apply(Object,n([{}],e,[{type:"number"}])))}function s(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return i(Object.assign(l.apply(void 0,e),{type:"integer"}))}function b(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e=e.map((function(e){return"boolean"===u(e)?{default:e}:e})),i(Object.assign.apply(Object,n([{}],e,[{type:"boolean"}])))}function y(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e=e.map((function(e){return"string"===u(e)?{$ref:e}:e})),i(Object.assign.apply(Object,n([{}],e)))}function g(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e=e.map((function(e){return"string"===u(e)?{$ref:"#/"+r.config.DEFINITIONS+"/"+e.replace(/^\//,"")}:e})),i(Object.assign.apply(Object,n([{}],e)))}function d(e){var t;return(t={})[r.config.DEFINITIONS]=e,t}r.o=f,r.a=c,r.e=a,r.s=p,r.n=l,r.i=s,r.b=b,r.$ref=y,r.$def=g,r.defs=d;var j={i:s,o:f,n:l,b:b,a:c,s:p,e:a,$ref:y,defs:d,$def:g};r.default=function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];return j[e[0]].apply(j,r)}}])}));