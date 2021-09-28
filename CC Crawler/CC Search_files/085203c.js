/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{192:function(e,t,n){(function(){"use strict";var n=this,r=n.buildUrl,o=function(param){return null===param?"":encodeURIComponent(String(param).trim())},c=function(e,t){var n,r,c,l=[];if(c=!(!t||!t.lowerCase)&&!!t.lowerCase,null===e?r="":"object"==typeof e?(r="",t=e):r=e,t){if(t.path){r&&"/"===r[r.length-1]&&(r=r.slice(0,-1));var f=String(t.path).trim();c&&(f=f.toLowerCase()),0===f.indexOf("/")?r+=f:r+="/"+f}if(t.queryParams){for(n in t.queryParams){var param;if(t.queryParams.hasOwnProperty(n)&&void 0!==t.queryParams[n])if(t.disableCSV&&Array.isArray(t.queryParams[n])&&t.queryParams[n].length)for(var i=0;i<t.queryParams[n].length;i++)param=t.queryParams[n][i],l.push(n+"="+o(param));else param=c?t.queryParams[n].toLowerCase():t.queryParams[n],l.push(n+"="+o(param))}r+="?"+l.join("&")}t.hash&&(r+=c?"#"+String(t.hash).trim().toLowerCase():"#"+String(t.hash).trim())}return r};c.noConflict=function(){return n.buildUrl=r,c},e.exports&&(t=e.exports=c),t.buildUrl=c}).call(this)},195:function(e,t,n){"use strict";n.d(t,"a",(function(){return F}));var r=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'],o=r.join(","),c="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;function l(e,t){t=t||{};var i,n,r,l=[],d=[],h=e.querySelectorAll(o);for(t.includeContainer&&c.call(e,o)&&(h=Array.prototype.slice.apply(h)).unshift(e),i=0;i<h.length;i++)f(n=h[i])&&(0===(r=v(n))?l.push(n):d.push({documentOrder:i,tabIndex:r,node:n}));return d.sort(y).map((function(a){return a.node})).concat(l)}function f(e){return!(!d(e)||function(e){return function(e){return m(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t=function(e){for(var i=0;i<e.length;i++)if(e[i].checked)return e[i]}(e.ownerDocument.querySelectorAll('input[type="radio"][name="'+e.name+'"]'));return!t||t===e}(e)}(e)||v(e)<0)}function d(e){return!(e.disabled||function(e){return m(e)&&"hidden"===e.type}(e)||function(e){return null===e.offsetParent||"hidden"===getComputedStyle(e).visibility}(e))}l.isTabbable=function(e){if(!e)throw new Error("No node provided");return!1!==c.call(e,o)&&f(e)},l.isFocusable=function(e){if(!e)throw new Error("No node provided");return!1!==c.call(e,h)&&d(e)};var h=r.concat("iframe").join(",");function v(e){var t=parseInt(e.getAttribute("tabindex"),10);return isNaN(t)?function(e){return"true"===e.contentEditable}(e)?0:e.tabIndex:t}function y(a,b){return a.tabIndex===b.tabIndex?a.documentOrder-b.documentOrder:a.tabIndex-b.tabIndex}function m(e){return"INPUT"===e.tagName}var w,E=l,k=function(){for(var e={},i=0;i<arguments.length;i++){var source=arguments[i];for(var t in source)x.call(source,t)&&(e[t]=source[t])}return e},x=Object.prototype.hasOwnProperty;var T,S=(T=[],{activateTrap:function(e){if(T.length>0){var t=T[T.length-1];t!==e&&t.pause()}var n=T.indexOf(e);-1===n||T.splice(n,1),T.push(e)},deactivateTrap:function(e){var t=T.indexOf(e);-1!==t&&T.splice(t,1),T.length>0&&T[T.length-1].unpause()}});function A(e){return setTimeout(e,0)}var O=function(element,e){var t=document,n="string"==typeof element?t.querySelector(element):element,r=k({returnFocusOnDeactivate:!0,escapeDeactivates:!0},e),o={firstTabbableNode:null,lastTabbableNode:null,nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1},c={activate:function(e){if(o.active)return;O(),o.active=!0,o.paused=!1,o.nodeFocusedBeforeActivation=t.activeElement;var n=e&&e.onActivate?e.onActivate:r.onActivate;n&&n();return f(),c},deactivate:l,pause:function(){if(o.paused||!o.active)return;o.paused=!0,d()},unpause:function(){if(!o.paused||!o.active)return;o.paused=!1,O(),f()}};return c;function l(e){if(o.active){clearTimeout(w),d(),o.active=!1,o.paused=!1,S.deactivateTrap(c);var t=e&&void 0!==e.onDeactivate?e.onDeactivate:r.onDeactivate;return t&&t(),(e&&void 0!==e.returnFocus?e.returnFocus:r.returnFocusOnDeactivate)&&A((function(){var e;F((e=o.nodeFocusedBeforeActivation,h("setReturnFocus")||e))})),c}}function f(){if(o.active)return S.activateTrap(c),w=A((function(){F(v())})),t.addEventListener("focusin",m,!0),t.addEventListener("mousedown",y,{capture:!0,passive:!1}),t.addEventListener("touchstart",y,{capture:!0,passive:!1}),t.addEventListener("click",T,{capture:!0,passive:!1}),t.addEventListener("keydown",x,{capture:!0,passive:!1}),c}function d(){if(o.active)return t.removeEventListener("focusin",m,!0),t.removeEventListener("mousedown",y,!0),t.removeEventListener("touchstart",y,!0),t.removeEventListener("click",T,!0),t.removeEventListener("keydown",x,!0),c}function h(e){var n=r[e],o=n;if(!n)return null;if("string"==typeof n&&!(o=t.querySelector(n)))throw new Error("`"+e+"` refers to no known node");if("function"==typeof n&&!(o=n()))throw new Error("`"+e+"` did not return a node");return o}function v(){var e;if(!(e=null!==h("initialFocus")?h("initialFocus"):n.contains(t.activeElement)?t.activeElement:o.firstTabbableNode||h("fallbackFocus")))throw new Error("Your focus-trap needs to have at least one focusable element");return e}function y(e){n.contains(e.target)||(r.clickOutsideDeactivates?l({returnFocus:!E.isFocusable(e.target)}):r.allowOutsideClick&&r.allowOutsideClick(e)||e.preventDefault())}function m(e){n.contains(e.target)||e.target instanceof Document||(e.stopImmediatePropagation(),F(o.mostRecentlyFocusedNode||v()))}function x(e){if(!1!==r.escapeDeactivates&&function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e))return e.preventDefault(),void l();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){if(O(),e.shiftKey&&e.target===o.firstTabbableNode)return e.preventDefault(),void F(o.lastTabbableNode);if(!e.shiftKey&&e.target===o.lastTabbableNode)e.preventDefault(),F(o.firstTabbableNode)}(e)}function T(e){r.clickOutsideDeactivates||n.contains(e.target)||r.allowOutsideClick&&r.allowOutsideClick(e)||(e.preventDefault(),e.stopImmediatePropagation())}function O(){var e=E(n);o.firstTabbableNode=e[0]||v(),o.lastTabbableNode=e[e.length-1]||v()}function F(e){e!==t.activeElement&&(e&&e.focus?(e.focus(),o.mostRecentlyFocusedNode=e,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(e)&&e.select()):F(v()))}},F={props:{active:{type:Boolean,default:!0},escapeDeactivates:{type:Boolean,default:!0},returnFocusOnDeactivate:{type:Boolean,default:!0},allowOutsideClick:{type:Boolean,default:!0},initialFocus:[String,Function],fallbackFocus:[String,Function]},model:{event:"update:active",prop:"active"},mounted:function(){var e=this;this.$watch("active",(function(t){t?(e.trap=O(e.$el,{escapeDeactivates:e.escapeDeactivates,allowOutsideClick:function(){return e.allowOutsideClick},returnFocusOnDeactivate:e.returnFocusOnDeactivate,onActivate:function(){e.$emit("update:active",!0),e.$emit("activate")},onDeactivate:function(){e.$emit("update:active",!1),e.$emit("deactivate")},initialFocus:e.initialFocus||function(){return e.$el},fallbackFocus:e.fallbackFocus}),e.trap.activate()):e.trap&&e.trap.deactivate()}),{immediate:!0})},beforeDestroy:function(){this.trap&&this.trap.deactivate(),this.trap=null},methods:{activate:function(){this.trap.activate()},deactivate:function(){this.trap.deactivate()}},render:function(){var content=this.$slots.default;if(!content||!content.length||content.length>1)throw new Error("FocusTrap requires exactly one child");return content[0]}}},354:function(e,t,n){(function(){"use strict";var t=function(s,e){return e=e||"",s.replace(/(^|-)/g,"$1\\u"+e).replace(/,/g,"\\u"+e)},n=t("20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7","00"),r="a-z"+t("DF-F6,F8-FF","00"),o="A-Z"+t("C0-D6,D8-DE","00"),c=function(e,t,c,l){return e=e||n,t=t||r,c=c||o,l=l||"A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via",{capitalize:new RegExp("(^|["+e+"])(["+t+"])","g"),pascal:new RegExp("(^|["+e+"])+(["+t+c+"])","g"),fill:new RegExp("["+e+"]+(.|$)","g"),sentence:new RegExp('(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")(['+t+"])","g"),improper:new RegExp("\\b("+l+")\\b","g"),relax:new RegExp("([^"+c+"])(["+c+"]*)(["+c+"])(?=[^"+c+"]|$)","g"),upper:new RegExp("^[^"+t+"]+$"),hole:/[^\s]\s[^\s]/,apostrophe:/'/g,room:new RegExp("["+e+"]")}},l=c(),f={re:l,unicodes:t,regexps:c,types:[],up:String.prototype.toUpperCase,low:String.prototype.toLowerCase,cap:function(s){return f.up.call(s.charAt(0))+s.slice(1)},decap:function(s){return f.low.call(s.charAt(0))+s.slice(1)},deapostrophe:function(s){return s.replace(l.apostrophe,"")},fill:function(s,e,t){return null!=e&&(s=s.replace(l.fill,(function(t,n){return n?e+n:""}))),t&&(s=f.deapostrophe(s)),s},prep:function(s,e,t,n){if(s=null==s?"":s+"",!n&&l.upper.test(s)&&(s=f.low.call(s)),!e&&!l.hole.test(s)){var r=f.fill(s," ");l.hole.test(r)&&(s=r)}return t||l.room.test(s)||(s=s.replace(l.relax,f.relax)),s},relax:function(e,t,n,r){return t+" "+(n?n+" ":"")+r}},d={_:f,of:function(s){for(var i=0,e=f.types.length;i<e;i++)if(d[f.types[i]].apply(d,arguments)===s)return f.types[i]},flip:function(s){return s.replace(/\w/g,(function(e){return(e==f.up.call(e)?f.low:f.up).call(e)}))},random:function(s){return s.replace(/\w/g,(function(e){return(Math.round(Math.random())?f.up:f.low).call(e)}))},type:function(e,t){d[e]=t,f.types.push(e)}},h={lower:function(s,e,t){return f.fill(f.low.call(f.prep(s,e)),e,t)},snake:function(s){return d.lower(s,"_",!0)},constant:function(s){return d.upper(s,"_",!0)},camel:function(s){return f.decap(d.pascal(s))},kebab:function(s){return d.lower(s,"-",!0)},upper:function(s,e,t){return f.fill(f.up.call(f.prep(s,e,!1,!0)),e,t)},capital:function(s,e,t){return f.fill(f.prep(s).replace(l.capitalize,(function(e,t,n){return t+f.up.call(n)})),e,t)},header:function(s){return d.capital(s,"-",!0)},pascal:function(s){return f.fill(f.prep(s,!1,!0).replace(l.pascal,(function(e,t,n){return f.up.call(n)})),"",!0)},title:function(s){return d.capital(s).replace(l.improper,(function(small,p,i,s){return i>0&&i<s.lastIndexOf(" ")?f.low.call(small):small}))},sentence:function(s,e,t){return s=d.lower(s).replace(l.sentence,(function(e,t,n){return t+f.up.call(n)})),e&&e.forEach((function(e){s=s.replace(new RegExp("\\b"+d.lower(e)+"\\b","g"),f.cap)})),t&&t.forEach((function(abbr){s=s.replace(new RegExp("(\\b"+d.lower(abbr)+"\\. +)(\\w)"),(function(e,t,n){return t+f.low.call(n)}))})),s}};for(var v in h.squish=h.pascal,d.default=d,h)d.type(v,h[v]);var y="function"==typeof y?y:function(){};y(e.exports?e.exports=d:this.Case=d)}).call(this)},357:function(e,t,n){var r;r=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(object,e){return Object.prototype.hasOwnProperty.call(object,e)},n.p="",n(n.s=6)}([function(e,t){e.exports=function(element){var e;if("SELECT"===element.nodeName)element.focus(),e=element.value;else if("INPUT"===element.nodeName||"TEXTAREA"===element.nodeName){var t=element.hasAttribute("readonly");t||element.setAttribute("readonly",""),element.select(),element.setSelectionRange(0,element.value.length),t||element.removeAttribute("readonly"),e=element.value}else{element.hasAttribute("contenteditable")&&element.focus();var n=window.getSelection(),r=document.createRange();r.selectNodeContents(element),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}},function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function o(){r.off(e,o),t.apply(n,arguments)}return o._=t,this.on(e,o,n)},emit:function(e){for(var data=[].slice.call(arguments,1),t=((this.e||(this.e={}))[e]||[]).slice(),i=0,n=t.length;i<n;i++)t[i].fn.apply(t[i].ctx,data);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],o=[];if(r&&t)for(var i=0,c=r.length;i<c;i++)r[i].fn!==t&&r[i].fn._!==t&&o.push(r[i]);return o.length?n[e]=o:delete n[e],this}},e.exports=n,e.exports.TinyEmitter=n},function(e,t,n){var r=n(3),o=n(4);e.exports=function(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!r.string(t))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(e))return function(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}(e,t,n);if(r.nodeList(e))return function(e,t,n){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,n)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,n)}))}}}(e,t,n);if(r.string(e))return function(e,t,n){return o(document.body,e,t,n)}(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var n=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"==typeof e||e instanceof String},t.fn=function(e){return"[object Function]"===Object.prototype.toString.call(e)}},function(e,t,n){var r=n(5);function o(element,e,t,n,r){var o=c.apply(this,arguments);return element.addEventListener(t,o,r),{destroy:function(){element.removeEventListener(t,o,r)}}}function c(element,e,t,n){return function(t){t.delegateTarget=r(t.target,e),t.delegateTarget&&n.call(element,t)}}e.exports=function(e,t,n,r,c){return"function"==typeof e.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(element){return o(element,t,n,r,c)})))}},function(e,t){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}e.exports=function(element,e){for(;element&&9!==element.nodeType;){if("function"==typeof element.matches&&element.matches(e))return element;element=element.parentNode}}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.resolveOptions(t),this.initSelection()}return l(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=o()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=o()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":c(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}(),d=n(1),h=n.n(d),v=n(2),y=n.n(v),m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),E=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.resolveOptions(n),r.listenClick(e),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),w(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===m(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=y()(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new f({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return k("action",e)}},{key:"defaultTarget",value:function(e){var t=k("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return k("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach((function(e){n=n&&!!document.queryCommandSupported(e)})),n}}]),t}(h.a);function k(e,element){var t="data-clipboard-"+e;if(element.hasAttribute(t))return element.getAttribute(t)}t.default=E}]).default},e.exports=r()}}]);