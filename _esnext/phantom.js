(()=>{var c=e=>t=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),x=e=>t=>Math.floor(Math.random()*(t-e+1)+e),H=e=>e[Math.floor(Math.random()*e.length)],l=e=>-e,z=e=>t=>e+t/2,R=e=>e/2,E=e=>R(e.dimension),W=e=>t=>c(e)(t)<=E(e)+E(t),D=e=>t=>r=>W(e)(t)&&void r(),N=e=>(e.x+=e.speed.x,e.y+=e.speed.y),O=e=>t=>(e.x=t.x,e.y=t.y),B=e=>t=>e.sprite=t,P=e=>({x:x(e)(innerWidth-e),y:x(e)(innerHeight-e)}),_=e=>(e.x=x(e.dimension)(innerWidth-e.dimension),e.y=x(e.dimension)(innerHeight-e.dimension)),q=e=>t=>(e.value+=t,e.sprite.innerHTML=~~e.value),T=e=>t=>c(e)({x:e.x,y:t.y})<=e.dimension||c(e)({x:e.x,y:t.y})-t.y>0?e.speed.y=l(e.speed.y):(c(e)({x:t.x,y:e.y})<=e.dimension||c(e)({x:t.x,y:e.y})-t.x>0)&&(e.speed.x=l(e.speed.x)),V=e=>({sprite:t,x:r,y:a,w:d,h,dimension:p})=>e.ctx.drawImage(t,r,a,d??p,h??p),Y=({x:e,y:t})=>r=>a=>d=>({x:e,y:t,sprite:a,dimension:r,speed:{x:d,y:d}}),S=e=>t=>r=>(requestAnimationFrame(()=>S(e)(t)(r)),e.ctx.clearRect(0,0,e.width,e.height),r(t)),F=({SCORE_FONT:e,START_SCREEN_TITLE_FONT:t,START_SCREEN_TEXT_FONT:r,START_TEXT_A:a,START_TEXT_B:d,DISPLAY_SCORE:h,GAME_TITLE:p,START_SCREEN:L,CURSOR:y,SPRITES:u,AUDIOS:k,BG_COLOR_HEX:$,FG_COLOR_HEX:A,FILTER:g})=>{document.querySelector("main").innerHTML+=`
<canvas>
  ${u.map(n=>`<img alt="an in-game sprite" id="${n.split("/").pop().split(".")[0]}" width="0" height="0" src=${n} />`)}
</canvas>

<p id="score" ${h?"visible":"hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${p}</h1>
  <p id="start-screen-text">${a}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${$};
    --phantom-foreground-color: ${A};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: ${y?"default":"none"}; 
    touch-action: none;
  }
  
  a { 
    cursor: pointer; 
  }
  
  p { 
    margin: 0; 
    line-height: 30px;
  }
  
  canvas { 
    z-index: -1;  
    position: absolute; 
    top: 0; 
    left: 0; 
    cursor: ${y?"default":"none"}; 
  }
  
  #start-screen { 
    display: ${L?"flex":"none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${g};
    flex-direction: column; 
    text-align: center; 
    align-items: center; 
    justify-content: center; 
    position: absolute; 
    height: 100vh; 
    width: 100vw; 
    z-index: 2; 
    font-size: 30px; 
    & > p {
      color: whitesmoke;
    }
  }
  
  #start-screen-title {
    font-family: ${t}, monospace; 
    font-size: 40px;
    font-weight: 100;
    filter: ${g};w
  }

  @media (max-width: 600px) {
    #start-screen-title {
      font-size: 30px;
    }
  }

  #start-screen-text {
    font-family: ${r}, monospace; 
    font-size: 20px;
  }


  #score { 
    position: absolute; 
    font-size: 3rem; 
    font-family: ${e}; 
    bottom: 50%; 
    left: 50%; 
    mix-blend-mode: difference;
    transform: translate(-50%, 50%); 
    color: var(--phantom-foreground-color); 
    width: 100%;
    text-align: center;
  }
  
  canvas > img { 
    mix-blend-mode: exclusion;
    image-rendering: pixelated; 
  }
</style>
`;let v=u.reduce((n,s)=>({...n,[s.split("/").pop().split(".")[0]]:document.getElementById(s.split("/").pop().split(".")[0])}),{score:document.getElementById("score")}),m=document.getElementById("start-screen"),f=document.getElementById("start-screen-text"),i=document.querySelector("canvas");i.ctx=i.getContext("2d"),i.width=innerWidth,i.height=innerHeight;let o={x:i.width/2,y:i.height/2},M={value:0,sprite:v.score},I=k.reduce((n,s)=>{let w=new Audio(s.url);return w.volume=s.volume,{...n,[s.url.split("/").pop().split(".")[0]]:w}},{});return setInterval(()=>f.innerHTML=f.innerHTML===a?d:a,2e3),addEventListener("resize",()=>(i.width=innerWidth,i.height=innerHeight)),addEventListener("mousemove",({clientX:n,clientY:s})=>(o.x=n,o.y=s)),addEventListener("touchmove",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY-120),{passive:!1}),addEventListener("touchstart",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY),{passive:!1}),addEventListener("keydown",n=>n.key==="Enter"&&m.remove()),addEventListener("keydown",n=>n.key==="ArrowUp"&&(o.y-=60)),addEventListener("keydown",n=>n.key==="ArrowRight"&&(o.x+=60)),addEventListener("keydown",n=>n.key==="ArrowDown"&&(o.y+=60)),addEventListener("keydown",n=>n.key==="ArrowLeft"&&(o.x-=60)),addEventListener("click",()=>m.remove()),addEventListener("touchstart",()=>m.remove()),{c:i,mouse:o,sound:I,score:M,sprites:v}};})();
