(()=>{var d=e=>t=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),p=e=>t=>Math.floor(Math.random()*(t-e+1)+e),R=e=>e[Math.floor(Math.random()*e.length)],l=e=>-e,C=e=>t=>e+t/2,k=e=>e/2,E=e=>k(e.dimension),A=e=>t=>d(e)(t)<=E(e)+E(t),$=e=>t=>r=>A(e)(t)&&void r(),b=e=>(e.x+=e.speed.x,e.y+=e.speed.y),W=e=>t=>(e.x=t.x,e.y=t.y),_=e=>t=>e.sprite=t,z=e=>({x:p(e)(innerWidth-e),y:p(e)(innerHeight-e)}),O=e=>(e.x=p(e.dimension)(innerWidth-e.dimension),e.y=p(e.dimension)(innerHeight-e.dimension)),B=e=>t=>(e.value+=t,e.sprite.innerHTML=String(~~e.value)),D=e=>t=>d(e)({x:e.x,y:t.y})<=e.dimension||d(e)({x:e.x,y:t.y})-t.y>0?e.speed.y=l(e.speed.y):(d(e)({x:t.x,y:e.y})<=e.dimension||d(e)({x:t.x,y:e.y})-t.x>0)&&(e.speed.x=l(e.speed.x)),N=e=>({sprite:t,x:r,y:i,dimension:a})=>e?.getContext("2d")?.drawImage(t,r,i,a,a),F=({x:e,y:t})=>r=>i=>a=>({x:e,y:t,sprite:i,dimension:r,speed:{x:a,y:a}}),I=e=>t=>r=>(requestAnimationFrame(()=>I(e)(t)(r)),e?.getContext("2d")?.clearRect(0,0,e.width,e.height),r(t)),G=({scoreFont:e,startScreenTextFont:t,startScreenTitleFont:r,startTextA:i,startTextB:a,displayScore:f,gameTitle:w,sprites:x,filter:h,audios:M,startScreen:T,cursor:u,bgColorHex:L,fgColorHex:S})=>{document.querySelector("main").innerHTML+=`
<canvas>
  ${x.map(n=>`<img alt="an in-game sprite" id="${n.split("/").pop().split(".")[0]}" width="0" height="0" src=${n} />`)}
</canvas>

<p id="score" ${f?"visible":"hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${w}</h1>
  <p id="start-screen-text">${i}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${L};
    --phantom-foreground-color: ${S};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: ${u?"default":"none"}; 
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
    cursor: ${u?"default":"none"}; 
  }
  
  #start-screen { 
    display: ${T?"flex":"none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${h};
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
    font-family: ${r}, monospace; 
    font-size: 40px;
    font-weight: 100;
    filter: ${h};w
  }

  @media (max-width: 600px) {
    #start-screen-title {
      font-size: 30px;
    }
  }

  #start-screen-text {
    font-family: ${t}, monospace; 
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
`;let g=x.reduce((n,s)=>({...n,[s.split("/").pop().split(".")[0]]:document.getElementById(s.split("/").pop().split(".")[0])}),{score:document.getElementById("score")}),c=document.getElementById("start-screen"),y=document.getElementById("start-screen-text"),m=document.querySelector("canvas");m.width=innerWidth,m.height=innerHeight;let o={x:m.width/2,y:m.height/2},H={value:0,sprite:g.score},P=M.reduce((n,s)=>{let v=new Audio(s.url);return v.volume=s.volume,{...n,[s.url.split("/").pop().split(".")[0]]:v}},{});return setInterval(()=>y.innerHTML=y.innerHTML===i?a:i,2e3),addEventListener("resize",()=>(m.width=innerWidth,m.height=innerHeight)),addEventListener("mousemove",({clientX:n,clientY:s})=>(o.x=n,o.y=s)),addEventListener("touchmove",n=>(o.x=n.touches[0].clientX-17,o.y=n.touches[0].clientY-90),{passive:!1}),addEventListener("touchstart",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY),{passive:!1}),addEventListener("keydown",n=>n.key==="Enter"&&c.remove()),addEventListener("keydown",n=>n.key==="ArrowUp"&&(o.y-=60)),addEventListener("keydown",n=>n.key==="ArrowRight"&&(o.x+=60)),addEventListener("keydown",n=>n.key==="ArrowDown"&&(o.y+=60)),addEventListener("keydown",n=>n.key==="ArrowLeft"&&(o.x-=60)),addEventListener("click",()=>c.remove()),addEventListener("touchstart",()=>c.remove()),{c:m,mouse:o,sound:P,score:H,sprites:g}};})();
