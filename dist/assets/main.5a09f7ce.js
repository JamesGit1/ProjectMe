import{S as e,P as n,W as o,T as t,M as i,B as s,a as d,b as a,A as c,C as r,G as l,c as p,d as w,e as m,O as u,f as y,g as h,h as f}from"./vendor.dfb8925c.js";var g="/assets/volume_off.6f2cd501.svg";const v=document.getElementById("loadingScreen"),x=document.getElementById("wordleScreen"),b=document.getElementById("phoneNotifcation");window.addEventListener("resize",(function(){P.setPixelRatio(window.devicePixelRatio),P.setSize(window.innerWidth,window.innerHeight),P.render(E,C)}));const E=new e,C=new n(75,window.innerWidth/window.innerHeight,.1,2e3),P=new o({canvas:document.querySelector("#bg")});P.setPixelRatio(window.devicePixelRatio),P.setSize(window.innerWidth,window.innerHeight),P.render(E,C);const z=(new t).load("/assets/meCutout.b1a43770.png"),B=new i(new s(3,3,3),new d({map:z}));B.position.set(1.8,0,-4),E.add(B);const S=new a(16777215);S.position.set(5,5,5);const _=new c(16777215);E.add(S,_),Array(200).fill().forEach((function(){const e=new y(.25,24,24),n=new h({color:16777215}),o=new i(e,n),[t,s,d]=Array(3).fill().map((()=>f.randFloatSpread(100)));o.position.set(t,s,d),E.add(o)}));const A=new r(463667);let H,W,I;E.background=A;let N=j("/sailing_boat/scene.gltf").then((e=>{H=e.scene.children[0]})),R=j("/low_poly_fish/scene.gltf").then((e=>{W=e.scene.children[0]})),T=j("/low_poly_fish/scene.gltf").then((e=>{I=e.scene.children[0]})),k=fetch("https://wordleapi.herokuapp.com/todaysWordle").then((e=>e.json())).then((e=>function(e){if(Array.isArray(e.answer)){console.log(e);const n=document.createElement("H2"),o=document.createTextNode(`Day ${e.dayNumber}, I scored ${e.score}`);n.appendChild(o),x.appendChild(n),e.answer.forEach((e=>{const n=document.createElement("p"),o=document.createTextNode(e);n.style.cssText="margin-bottom: 0px; margin-top: 0px;",n.appendChild(o),x.appendChild(n)}))}else{console.log(e);const n=document.createElement("H2"),o=document.createTextNode(e.answer);n.appendChild(o),x.appendChild(n)}}(e)));function j(e){return new Promise((n=>{(new l).load(e,n,(function(e){console.log(e.loaded/e.total*100+"% loaded")}))}))}Promise.all([N,R,T,k]).then((()=>{H.position.set(-10,-10,-4),H.scale.set(.1,.1,.1),W.position.set(10,0,13),W.rotation.z-=.4,I.rotation.z+=2.2,I.position.set(-1,-2,13),E.add(H),E.add(W),E.add(I),v.style.display="none"})),document.body.onscroll=function(){var e=document.body.getBoundingClientRect().top;e>0&&(e=0),C.position.x=-.001*e,C.position.y=-1e-4*e,C.position.z=-.01*e};const q=new p;C.add(q);const F=new w(q);(new m).load("/assets/tenderness.b7f9c4d1.mp3",(function(e){F.setVolume(.05),F.setBuffer(e),F.setLoop(!0)}));var L=document.getElementById("volumeBtn");L.src=g,L.onclick=function(){F.isPlaying?(L.src=g,F.pause()):(L.src="/assets/volume_mute.f83b9c8e.svg",F.play())};const $=new u(C,P.domElement);$.update();var D=!1;window.innerHeight>window.innerWidth&&b.style.setProperty("display","block"),function e(){requestAnimationFrame(e),C.position.z>15&&(void 0!==W&&(W.position.x-=.01),void 0!==I&&(I.position.x+=.01)),B.position.y<.4&&!D?(B.position.y+=.01,void 0!==H&&(H.position.y+=.01)):B.position.y>=.4&&(D=!0),D&&B.position.y>-1?(B.position.y-=.01,H.position.y-=.01):B.position.y<=-1&&(D=!1),B.rotation.x+=.005,B.rotation.y+=-.005,B.rotation.z+=.005,$.update(),P.render(E,C)}();
