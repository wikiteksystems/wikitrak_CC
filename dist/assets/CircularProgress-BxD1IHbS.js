import{c8 as E,c9 as T,b as D,bZ as F,e as U,f as M,j as h,_ as d,g as R,o as j,ca as z,bu as G,c7 as K,l as W,c5 as I,p as k,v as f,c6 as w,q as Z,k as q}from"./index-DpJvIU8Z.js";const H=["className","component"];function L(e={}){const{themeId:r,defaultTheme:s,defaultClassName:t="MuiBox-root",generateClassName:n}=e,u=E("div",{shouldForwardProp:a=>a!=="theme"&&a!=="sx"&&a!=="as"})(T);return D.forwardRef(function(g,c){const i=F(s),m=U(g),{className:v,component:l="div"}=m,x=M(m,H);return h.jsx(u,d({as:l,ref:c,className:R(v,n?n(t):t),theme:r&&i[r]||i},x))})}const V=j("MuiBox",["root"]),A=V,J=z(),O=L({themeId:G,defaultTheme:J,defaultClassName:A.root,generateClassName:K.generate}),ne=O;function Q(e){return W("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const X=["className","color","disableShrink","size","style","thickness","value","variant"];let p=e=>e,$,N,_,B;const o=44,Y=I($||($=p`
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
`)),re=e=>{const{classes:r,variant:s,color:t,disableShrink:n}=e,u={root:["root",s,`color${f(t)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,n&&"circleDisableShrink"]};return q(u,Q,r)},se=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${f(s.color)}`]]}})(({ownerState:e,theme:r})=>d({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&w(_||(_=p`
      animation: ${0} 1.4s linear infinite;
    `),Y)),te=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),ae=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${f(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>d({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&w(B||(B=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),ee)),oe=D.forwardRef(function(r,s){const t=Z({props:r,name:"MuiCircularProgress"}),{className:n,color:u="primary",disableShrink:y=!1,size:a=40,style:g,thickness:c=3.6,value:i=0,variant:m="indeterminate"}=t,v=M(t,X),l=d({},t,{color:u,disableShrink:y,size:a,thickness:c,value:i,variant:m}),x=re(l),C={},P={},b={};if(m==="determinate"){const S=2*Math.PI*((o-c)/2);C.strokeDasharray=S.toFixed(3),b["aria-valuenow"]=Math.round(i),C.strokeDashoffset=`${((100-i)/100*S).toFixed(3)}px`,P.transform="rotate(-90deg)"}return h.jsx(se,d({className:R(x.root,n),style:d({width:a,height:a},P,g),ownerState:l,ref:s,role:"progressbar"},b,v,{children:h.jsx(te,{className:x.svg,ownerState:l,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:h.jsx(ae,{className:x.circle,style:C,ownerState:l,cx:o,cy:o,r:(o-c)/2,fill:"none",strokeWidth:c})})}))}),ce=oe;export{ne as B,ce as C};
