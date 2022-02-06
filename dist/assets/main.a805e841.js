import{S as e,P as n,W as o,T as t,M as i,B as s,a,b as d,A as c,C as r,G as l,c as p,d as w,e as m,O as u,f,g as y,h}from"./vendor.dfb8925c.js";var g="/assets/volume_off.6f2cd501.svg";const v=document.getElementById("loadingScreen"),x=document.getElementById("wordleScreen");window.addEventListener("resize",(function(){z.setPixelRatio(window.devicePixelRatio),z.setSize(window.innerWidth,window.innerHeight),z.render(b,E)}));const b=new e,E=new n(75,window.innerWidth/window.innerHeight,.1,2e3),z=new o({canvas:document.querySelector("#bg")});z.setPixelRatio(window.devicePixelRatio),z.setSize(window.innerWidth,window.innerHeight),z.render(b,E);const P=(new t).load("/assets/meCutout.b1a43770.png"),B=new i(new s(3,3,3),new a({map:P}));B.position.set(1.8,0,-4),b.add(B);const C=new d(16777215);C.position.set(5,5,5);const S=new c(16777215);b.add(C,S),Array(200).fill().forEach((function(){const e=new f(.25,24,24),n=new y({color:16777215}),o=new i(e,n),[t,s,a]=Array(3).fill().map((()=>h.randFloatSpread(100)));o.position.set(t,s,a),b.add(o)}));const _=new r(463667);let R,W,A;b.background=_;let H=N("/sailing_boat/scene.gltf").then((e=>{R=e.scene.children[0]})),I=N("/low_poly_fish/scene.gltf").then((e=>{W=e.scene.children[0]})),T=N("/low_poly_fish/scene.gltf").then((e=>{A=e.scene.children[0]})),k=fetch("https://wordleapi.herokuapp.com/todaysWordle").then((e=>e.json())).then((e=>function(e){console.log(e);const n=document.createElement("H2"),o=document.createTextNode(`Day ${e.dayNumber}, I scored ${e.score}`);n.appendChild(o),x.appendChild(n),e.answer.forEach((e=>{const n=document.createElement("p"),o=document.createTextNode(e);n.style.cssText="margin-bottom: 0px; margin-top: 0px;",n.appendChild(o),x.appendChild(n)}))}(e)));function N(e){return new Promise((n=>{(new l).load(e,n,(function(e){console.log(e.loaded/e.total*100+"% loaded")}))}))}Promise.all([H,I,T,k]).then((()=>{R.position.set(-10,-10,-4),R.scale.set(.1,.1,.1),W.position.set(10,0,13),W.rotation.z-=.4,A.rotation.z+=2.2,A.position.set(-1,-2,13),b.add(R),b.add(W),b.add(A),v.style.display="none"})),document.body.onscroll=function(){var e=document.body.getBoundingClientRect().top;e>0&&(e=0),E.position.x=-.001*e,E.position.y=-1e-4*e,E.position.z=-.01*e};const j=new p;E.add(j);const q=new w(j);(new m).load("/assets/tenderness.b7f9c4d1.mp3",(function(e){q.setVolume(.05),q.setBuffer(e),q.setLoop(!0)}));var F=document.getElementById("volumeBtn");F.src=g,F.onclick=function(){q.isPlaying?(F.src=g,q.pause()):(F.src="/assets/volume_mute.f83b9c8e.svg",q.play())};const L=new u(E,z.domElement);L.update();var $=!1;!function e(){requestAnimationFrame(e),E.position.z>15&&(void 0!==W&&(W.position.x-=.01),void 0!==A&&(A.position.x+=.01)),B.position.y<.4&&!$?(B.position.y+=.01,void 0!==R&&(R.position.y+=.01)):B.position.y>=.4&&($=!0),$&&B.position.y>-1?(B.position.y-=.01,R.position.y-=.01):B.position.y<=-1&&($=!1),B.rotation.x+=.005,B.rotation.y+=-.005,B.rotation.z+=.005,L.update(),z.render(b,E)}();