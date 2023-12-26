(()=>{var m=e=>t=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),x=e=>t=>Math.floor(Math.random()*(t-e+1)+e),v=e=>e[Math.floor(Math.random()*e.length)],y=e=>-e;var b=e=>e/2,O=e=>b(e.dimension),J=e=>t=>m(e)(t)<=O(e)+O(t),T=e=>t=>i=>J(e)(t)&&void i(),z=e=>(e.x+=e.speed.x,e.y+=e.speed.y),k=e=>t=>(e.x=t.x,e.y=t.y),N=e=>t=>e.sprite=t,E=e=>({x:x(e)(innerWidth-e),y:x(e)(innerHeight-e)}),S=e=>(e.x=x(e.dimension)(innerWidth-e.dimension),e.y=x(e.dimension)(innerHeight-e.dimension)),W=e=>t=>(e.value+=t,e.sprite.innerHTML=~~e.value),H=e=>t=>m(e)({x:e.x,y:t.y})<=e.dimension||m(e)({x:e.x,y:t.y})-t.y>0?e.speed.y=y(e.speed.y):(m(e)({x:t.x,y:e.y})<=e.dimension||m(e)({x:t.x,y:e.y})-t.x>0)&&(e.speed.x=y(e.speed.x)),g=e=>({sprite:t,x:i,y:c,w:l,h:f,dimension:h})=>e.ctx.drawImage(t,i,c,l??h,f??h),p=({x:e,y:t})=>i=>c=>l=>({x:e,y:t,sprite:c,dimension:i,speed:{x:l,y:l}}),A=e=>t=>i=>(requestAnimationFrame(()=>A(e)(t)(i)),e.ctx.clearRect(0,0,e.width,e.height),i(t)),$=({SCORE_FONT:e,START_SCREEN_TITLE_FONT:t,START_SCREEN_TEXT_FONT:i,START_TEXT_A:c,START_TEXT_B:l,DISPLAY_SCORE:f,GAME_TITLE:h,START_SCREEN:U,CURSOR:R,SPRITES:_,AUDIOS:X,BG_COLOR_HEX:Y,FG_COLOR_HEX:Z,FILTER:I})=>{document.querySelector("main").innerHTML+=`
<canvas>
  ${_.map(n=>`<img id="${n.split("/").pop().split(".")[0]}" width="0" height="0" src=${n} />`)}
</canvas>

<p id="score" ${f?"visible":"hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${h}</h1>
  <p id="start-screen-text">${c}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${Y};
    --phantom-foreground-color: ${Z};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: ${R?"default":"none"}; 
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
    cursor: ${R?"default":"none"}; 
  }
  
  #start-screen { 
    display: ${U?"flex":"none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${I};
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
    filter: ${I};w
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
    white-space: nowrap;
    font-family: ${e}; 
    bottom: 50%; 
    left: 50%; 
    mix-blend-mode: difference;
    transform: translate(-50%, 50%); 
    color: var(--phantom-foreground-color); 
  }
  
  canvas > img { 
    mix-blend-mode: exclusion;
    image-rendering: pixelated; 
  }
</style>
`;let L=_.reduce((n,r)=>({...n,[r.split("/").pop().split(".")[0]]:document.getElementById(r.split("/").pop().split(".")[0])}),{score:document.getElementById("score")}),w=document.getElementById("start-screen"),M=document.getElementById("start-screen-text"),s=document.querySelector("canvas");s.ctx=s.getContext("2d"),s.width=innerWidth,s.height=innerHeight;let o={x:s.width/2,y:s.height/2},G={value:0,sprite:L.score},V=X.reduce((n,r)=>{let P=new Audio(r.url);return P.volume=r.volume,{...n,[r.url.split("/").pop().split(".")[0]]:P}},{});return setInterval(()=>M.innerHTML=M.innerHTML===c?l:c,2e3),addEventListener("resize",()=>(s.width=innerWidth,s.height=innerHeight)),addEventListener("mousemove",({clientX:n,clientY:r})=>(o.x=n,o.y=r)),addEventListener("touchmove",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY-120),{passive:!1}),addEventListener("touchstart",n=>(o.x=n.touches[0].clientX,o.y=n.touches[0].clientY),{passive:!1}),addEventListener("keydown",n=>n.key==="Enter"&&w.remove()),addEventListener("keydown",n=>n.key==="ArrowUp"&&(o.y-=60)),addEventListener("keydown",n=>n.key==="ArrowRight"&&(o.x+=60)),addEventListener("keydown",n=>n.key==="ArrowDown"&&(o.y+=60)),addEventListener("keydown",n=>n.key==="ArrowLeft"&&(o.x-=60)),addEventListener("click",()=>w.remove()),addEventListener("touchstart",()=>w.remove()),{c:s,mouse:o,sound:V,score:G,sprites:L}};if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){let e=document.getElementById("main"),t=document.createElement("style");throw t.textContent=`
    #main {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.4rem;
    }
    strong {
      font-size: 1.9rem;
    }
  `,document.head.appendChild(t),e.innerHTML=`<strong>"PHANTOM PIZZA"</strong><br>is not available on mobile.<br><br>Try it on a desktop browser.${e.innerHTML} `,new Error("Phantom pizza is not available on mobile.")}var B=document.createElement("style");B.textContent=`
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
`;document.head.appendChild(B);var F=[-5,-4,-5,2,3,4,5],D={x:0,y:0},a=50,K=Math.pow(a,2)/(innerHeight*innerWidth)*1e3,Q=["Wicked<i>\uFF01</i>","Pie-wack<i>\uFF01</i>","Slice 'n' dice<i>\uFF01</i>","Mamma mia<i>\uFF01</i>","Pizza-boo<i>\uFF01</i>","Sizzle and fizzle<i>\uFF01</i>","Pie 'n' die<i>\uFF01</i>","\u30D1\u30A4\u3084\u3070\u3063<i>\uFF01</i>","\u51C4\u8155\u30D4\u30B6<i>\uFF01</i>","\u9003\u3052\u308D\u30FC<i>\uFF01</i>","\u30D1\u30A4\u9003\u907F<i>\uFF01</i>"],{sprites:d,score:q,sound:j,mouse:C,c:u}=$({GAME_TITLE:"SIDIOUS.PIZZA",DISPLAY_SCORE:!0,START_SCREEN:!0,START_SCREEN_TITLE_FONT:"var(--font-family-title)",START_SCREEN_TEXT_FONT:"var(--font-family)",SCORE_FONT:"var(--font-family-title)",BG_COLOR_HEX:"#0d1117",FG_COLOR_HEX:"var(--venom)",FILTER:"var(--filter-invert)",START_TEXT_A:'<em style="filter: var(--filter-invert)">ENTER</em> AT YOUR OWN PERIL',START_TEXT_B:'\u5371\u967A\u30BE\u30FC\u30F3\u306B <em style="filter: var(--filter-invert)">\u6295\u5165</em>',SPRITES:["/assets/images/enemyl.png","/assets/images/enemyr.png","/assets/images/swoosh.png","/assets/images/player.gif"],AUDIOS:[{url:"/assets/music/swoosh.wav",volume:.3},{url:"/assets/music/death.wav",volume:.9},{url:"/assets/music/phantompizza.wav",volume:.8}]}),ee={player:p(C)(a)(d.player)(D),swoosh:p(E(a))(a)(d.swoosh)(D),enemies:[p(E(a))(a)(d.enemyr)(v(F))],sound:j,score:q,mouse:C};requestAnimationFrame(()=>{A(u)(ee)(e=>(e.score.value===0&&(document.getElementById("score").innerHTML="START!",e.sound.phantompizza.pause()),e.score.value>1&&e.sound.phantompizza.play().catch(()=>{}),k(e.player)(e.mouse),g(u)(e.player),T(e.swoosh)(e.player)(()=>(W(e.score)(K),~~e.score.value%3?document.getElementById("score").style.animation="none":(document.getElementById("score").style.animation="shake .5s infinite",q.sprite.innerHTML=v(Q).toUpperCase()),S(e.swoosh),e.sound.swoosh.play().catch(()=>{}),e.enemies.push(p(E(a))(a)(d.enemyr)(v(F))))),g(u)(e.swoosh),e.enemies.map(t=>(e.enemy=t,T(t)(e.player)(()=>(S(e.swoosh),e.score.value=0,e.enemies.length=0,e.sound.death.play().catch(()=>{}))),z(t),N(t)(t.speed.x<0?d.enemyl:d.enemyr),H(t)({x:innerWidth,y:innerHeight}),g(u)(t)))))});})();
