import{b0 as E,b1 as T,r as D,aY as F,C as U,D as _,j as h,w as d,E as R,L as j,b2 as z,a$ as G,aV as K,J as L,ad as I,M as k,O as f,ae as w,N as V,I as W}from"./index-C_4gHeOh.js";const H=["className","component"];function J(e={}){const{themeId:r,defaultTheme:s,defaultClassName:t="MuiBox-root",generateClassName:n}=e,m=E("div",{shouldForwardProp:a=>a!=="theme"&&a!=="sx"&&a!=="as"})(T);return D.forwardRef(function(g,c){const i=F(s),u=U(g),{className:v,component:l="div"}=u,x=_(u,H);return h.jsx(m,d({as:l,ref:c,className:R(v,n?n(t):t),theme:r&&i[r]||i},x))})}const O=j("MuiBox",["root"]),Y=O,Z=z(),q=J({themeId:G,defaultTheme:Z,defaultClassName:Y.root,generateClassName:K.generate}),ne=q;function A(e){return L("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Q=["className","color","disableShrink","size","style","thickness","value","variant"];let p=e=>e,S,N,M,B;const o=44,X=I(S||(S=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),ee=I(N||(N=p`
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
`)),re=e=>{const{classes:r,variant:s,color:t,disableShrink:n}=e,m={root:["root",s,`color${f(t)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,n&&"circleDisableShrink"]};return W(m,A,r)},se=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${f(s.color)}`]]}})(({ownerState:e,theme:r})=>d({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&w(M||(M=p`
      animation: ${0} 1.4s linear infinite;
    `),X)),te=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),ae=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${f(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>d({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&w(B||(B=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),ee)),oe=D.forwardRef(function(r,s){const t=V({props:r,name:"MuiCircularProgress"}),{className:n,color:m="primary",disableShrink:y=!1,size:a=40,style:g,thickness:c=3.6,value:i=0,variant:u="indeterminate"}=t,v=_(t,Q),l=d({},t,{color:m,disableShrink:y,size:a,thickness:c,value:i,variant:u}),x=re(l),C={},P={},b={};if(u==="determinate"){const $=2*Math.PI*((o-c)/2);C.strokeDasharray=$.toFixed(3),b["aria-valuenow"]=Math.round(i),C.strokeDashoffset=`${((100-i)/100*$).toFixed(3)}px`,P.transform="rotate(-90deg)"}return h.jsx(se,d({className:R(x.root,n),style:d({width:a,height:a},P,g),ownerState:l,ref:s,role:"progressbar"},b,v,{children:h.jsx(te,{className:x.svg,ownerState:l,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:h.jsx(ae,{className:x.circle,style:C,ownerState:l,cx:o,cy:o,r:(o-c)/2,fill:"none",strokeWidth:c})})}))}),ce=oe;export{ne as B,ce as C};
