(()=>{var m=e=>t=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),x=e=>t=>Math.floor(Math.random()*(t-e+1)+e),v=e=>e[Math.floor(Math.random()*e.length)],y=e=>-e;var K=e=>e/2,L=e=>K(e.dimension),Q=e=>t=>m(e)(t)<=L(e)+L(t),T=e=>t=>i=>Q(e)(t)&&void i(),k=e=>(e.x+=e.speed.x,e.y+=e.speed.y),N=e=>t=>(e.x=t.x,e.y=t.y),W=e=>t=>e.sprite=t,E=e=>({x:x(e)(innerWidth-e),y:x(e)(innerHeight-e)}),S=e=>(e.x=x(e.dimension)(innerWidth-e.dimension),e.y=x(e.dimension)(innerHeight-e.dimension)),H=e=>t=>(e.value+=t,e.sprite.innerHTML=~~e.value),$=e=>t=>m(e)({x:e.x,y:t.y})<=e.dimension||m(e)({x:e.x,y:t.y})-t.y>0?e.speed.y=y(e.speed.y):(m(e)({x:t.x,y:e.y})<=e.dimension||m(e)({x:t.x,y:e.y})-t.x>0)&&(e.speed.x=y(e.speed.x)),u=e=>({sprite:t,x:i,y:c,w:l,h:g,dimension:h})=>e.ctx.drawImage(t,i,c,l??h,g??h),p=({x:e,y:t})=>i=>c=>l=>({x:e,y:t,sprite:c,dimension:i,speed:{x:l,y:l}}),A=e=>t=>i=>(requestAnimationFrame(()=>A(e)(t)(i)),e.ctx.clearRect(0,0,e.width,e.height),i(t)),C=({SCORE_FONT:e,START_SCREEN_TITLE_FONT:t,START_SCREEN_TEXT_FONT:i,START_TEXT_A:c,START_TEXT_B:l,DISPLAY_SCORE:g,GAME_TITLE:h,START_SCREEN:X,CURSOR:_,SPRITES:I,AUDIOS:Y,BG_COLOR_HEX:Z,FG_COLOR_HEX:G,FILTER:M})=>{document.querySelector("main").innerHTML+=`
<canvas>
  ${I.map(n=>`<img alt="an in-game sprite" id="${n.split("/").pop().split(".")[0]}" width="0" height="0" src=${n} />`)}
</canvas>

<p id="score" ${g?"visible":"hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${h}</h1>
  <p id="start-screen-text">${c}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${Z};
    --phantom-foreground-color: ${G};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: ${_?"default":"none"}; 
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
    cursor: ${_?"default":"none"}; 
  }
  
  #start-screen { 
    display: ${X?"flex":"none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${M};
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
    filter: ${M};w
  }

  @media (max-width: 600px) {
    #start-screen-title {
      font-size: 30px;
    }
  }

  #start-screen-text {
    font-family: ${i}, monospace; 
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
`;let O=I.reduce((n,r)=>({...n,[r.split("/").pop().split(".")[0]]:document.getElementById(r.split("/").pop().split(".")[0])}),{score:document.getElementById("score")}),w=document.getElementById("start-screen"),P=document.getElementById("start-screen-text"),s=document.querySelector("canvas");s.ctx=s.getContext("2d"),s.width=innerWidth,s.height=innerHeight;let o={x:s.width/2,y:s.height/2},V={value:0,sprite:O.score},J=Y.reduce((n,r)=>{let z=new Audio(r.url);return z.volume=r.volume,{...n,[r.url.split("/").pop().split(".")[0]]:z}},{});return setInterval(()=>P.innerHTML=P.innerHTML===c?l:c,2e3),addEventListener("resize",()=>(s.width=innerWidth,s.height=innerHeight)),addEventListener("mousemove",({clientX:n,clientY:r})=>(o.x=n,o.y=r)),addEventListener("touchmove",n=>(o.x=n.touches[0].clientX-17,o.y=n.touches[0].clientY-90),{passive:!1}),addEventListener("touchstart",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY),{passive:!1}),addEventListener("keydown",n=>n.key==="Enter"&&w.remove()),addEventListener("keydown",n=>n.key==="ArrowUp"&&(o.y-=60)),addEventListener("keydown",n=>n.key==="ArrowRight"&&(o.x+=60)),addEventListener("keydown",n=>n.key==="ArrowDown"&&(o.y+=60)),addEventListener("keydown",n=>n.key==="ArrowLeft"&&(o.x-=60)),addEventListener("click",()=>w.remove()),addEventListener("touchstart",()=>w.remove()),{c:s,mouse:o,sound:J,score:V,sprites:O}};var R=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);if(R){let e=document.createElement("style");e.textContent=`
    #main {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.4rem;
    }
    #score {
      font-size: 1.7rem !important;
    }
  `,document.head.appendChild(e)}var F=document.createElement("style");F.textContent=`
  #score { 
    animation: shake .5s infinite;
  }
  @keyframes shake {
      0%, 100% {
      transform: translate(calc(-50%), 50%);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translate(calc(-50% - 2px), 50%);
    }
    20%, 40%, 60%, 80% {
      transform: translate(-50%, calc(50% + 2px));
    }
  }
`;document.head.appendChild(F);var U=[-5,-4,-5,2,3,4,5],D={x:0,y:0},a=R?30:50,b=Math.pow(a,2)/(innerHeight*innerWidth)*1e3,j=["Wicked<i>\uFF01</i>","Pie-wack<i>\uFF01</i>","Slice 'n' dice<i>\uFF01</i>","Mamma mia<i>\uFF01</i>","Pizza-boo<i>\uFF01</i>","Sizzle and fizzle<i>\uFF01</i>","Pie 'n' die<i>\uFF01</i>","\u30D1\u30A4\u3084\u3070\u3063<i>\uFF01</i>","\u51C4\u8155\u30D4\u30B6<i>\uFF01</i>","\u9003\u3052\u308D\u30FC<i>\uFF01</i>","\u30D1\u30A4\u9003\u907F<i>\uFF01</i>"],ee=/phantompizza/i.test(location.href),{sprites:d,score:q,sound:te,mouse:B,c:f}=C({GAME_TITLE:ee?"PHANTOM PIZZA":"SIDIOUS.PIZZA",DISPLAY_SCORE:!0,START_SCREEN:!0,START_SCREEN_TITLE_FONT:"var(--font-family-title)",START_SCREEN_TEXT_FONT:"var(--font-family)",SCORE_FONT:"var(--font-family-title)",BG_COLOR_HEX:"#0d1117",FG_COLOR_HEX:"var(--venom)",FILTER:"var(--filter-invert)",START_TEXT_A:R?"<em>TOUCH</em> TO START":'<em style="filter: var(--filter-invert)">ENTER</em> AT YOUR OWN PERIL',START_TEXT_B:'\u5371\u967A\u30BE\u30FC\u30F3\u306B <em style="filter: var(--filter-invert)">\u6295\u5165</em>',SPRITES:["/assets/images/enemyl.webp","/assets/images/enemyr.webp","/assets/images/swoosh.webp","/assets/images/player.gif"],AUDIOS:[{url:"/assets/music/swoosh.wav",volume:.3},{url:"/assets/music/death.wav",volume:.9},{url:"/assets/music/phantompizza.wav",volume:.8}]}),ne={player:p(B)(a)(d.player)(D),swoosh:p(E(a))(a)(d.swoosh)(D),enemies:[p(E(a))(a)(d.enemyr)(v(U))],sound:te,score:q,mouse:B};requestAnimationFrame(()=>{A(f)(ne)(e=>(e.score.value===0&&(document.getElementById("score").innerHTML="START!",e.sound.phantompizza.pause()),e.score.value>1&&e.sound.phantompizza.play().catch(()=>{}),N(e.player)(e.mouse),u(f)(e.player),T(e.swoosh)(e.player)(()=>(H(e.score)(b),~~e.score.value%3?document.getElementById("score").style.animation="none":(document.getElementById("score").style.animation="shake .5s infinite",q.sprite.innerHTML=v(j).toUpperCase()),S(e.swoosh),e.sound.swoosh.play().catch(()=>{}),e.enemies.push(p(E(a))(a)(d.enemyr)(v(U))))),u(f)(e.swoosh),e.enemies.map(t=>(e.enemy=t,T(t)(e.player)(()=>(S(e.swoosh),e.score.value=0,e.enemies.length=0,e.sound.death.play().catch(()=>{}))),k(t),W(t)(t.speed.x<0?d.enemyl:d.enemyr),$(t)({x:innerWidth,y:innerHeight}),u(f)(t)))))});})();
