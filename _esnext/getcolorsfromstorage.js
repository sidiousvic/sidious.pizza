(()=>{var s=["zero","venom","fire","void","phantom"];var i=o=>t=>o??t();var d=o=>o[Math.floor(Math.random()*o.length)],c=(...o)=>t=>o.reduce((r,e)=>e(r),t);var p=o=>t=>Object.getOwnPropertyNames(o).reduce((r,e)=>(Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e)),r),t);var a=o=>t=>({...t,...o(t)}),n=o=>t=>(o(t),t);var l={colorsKey:"colors",randomColor:d(s)},m=o=>({userStoredColor:localStorage.getItem(o.colorsKey)}),g=o=>i(o.userStoredColor)(()=>localStorage.setItem(o.colorsKey,o.randomColor)),C=o=>document.documentElement.classList.add(`colors-${o.userStoredColor?o.userStoredColor:o.randomColor}`),S=c(p(l),a(m),n(g),n(C));document.addEventListener("DOMContentLoaded",S);})();