import{ca as E,cb as T,b as D,b$ as F,e as U,f as M,j as h,_ as d,g as R,o as j,cc as z,bw as G,c9 as K,l as W,c7 as w,p as k,v as f,c8 as I,q,k as H}from"./index-Cm3TetZZ.js";const L=["className","component"];function V(e={}){const{themeId:r,defaultTheme:s,defaultClassName:t="MuiBox-root",generateClassName:c}=e,u=E("div",{shouldForwardProp:a=>a!=="theme"&&a!=="sx"&&a!=="as"})(T);return D.forwardRef(function(g,n){const i=F(s),m=U(g),{className:v,component:l="div"}=m,x=M(m,L);return h.jsx(u,d({as:l,ref:n,className:R(v,c?c(t):t),theme:r&&i[r]||i},x))})}const Z=j("MuiBox",["root"]),A=Z,J=z(),O=V({themeId:G,defaultTheme:J,defaultClassName:A.root,generateClassName:K.generate}),ce=O;function Q(e){return W("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const X=["className","color","disableShrink","size","style","thickness","value","variant"];let p=e=>e,S,N,_,B;const o=44,Y=w(S||(S=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),ee=w(N||(N=p`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),re=e=>{const{classes:r,variant:s,color:t,disableShrink:c}=e,u={root:["root",s,`color${f(t)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,c&&"circleDisableShrink"]};return H(u,Q,r)},se=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${f(s.color)}`]]}})(({ownerState:e,theme:r})=>d({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&I(_||(_=p`
      animation: ${0} 1.4s linear infinite;
    `),Y)),te=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),ae=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${f(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>d({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&I(B||(B=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),ee)),oe=D.forwardRef(function(r,s){const t=q({props:r,name:"MuiCircularProgress"}),{className:c,color:u="primary",disableShrink:y=!1,size:a=40,style:g,thickness:n=3.6,value:i=0,variant:m="indeterminate"}=t,v=M(t,X),l=d({},t,{color:u,disableShrink:y,size:a,thickness:n,value:i,variant:m}),x=re(l),C={},P={},b={};if(m==="determinate"){const $=2*Math.PI*((o-n)/2);C.strokeDasharray=$.toFixed(3),b["aria-valuenow"]=Math.round(i),C.strokeDashoffset=`${((100-i)/100*$).toFixed(3)}px`,P.transform="rotate(-90deg)"}return h.jsx(se,d({className:R(x.root,c),style:d({width:a,height:a},P,g),ownerState:l,ref:s,role:"progressbar"},b,v,{children:h.jsx(te,{className:x.svg,ownerState:l,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:h.jsx(ae,{className:x.circle,style:C,ownerState:l,cx:o,cy:o,r:(o-n)/2,fill:"none",strokeWidth:n})})}))}),ne=oe;export{ce as B,ne as C};
