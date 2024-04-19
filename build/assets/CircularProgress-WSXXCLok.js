import{aX as w,aY as E,r as D,aT as F,B as U,C as _,j as h,q as d,D as R,L as j,aZ as z,aW as K,aQ as W,I as G,ab as I,J as k,M as f,ac as T,K as H,H as L}from"./index-yugurC9t.js";const Z=["className","component"];function q(e={}){const{themeId:r,defaultTheme:s,defaultClassName:a="MuiBox-root",generateClassName:n}=e,m=w("div",{shouldForwardProp:t=>t!=="theme"&&t!=="sx"&&t!=="as"})(E);return D.forwardRef(function(g,c){const i=F(s),u=U(g),{className:v,component:l="div"}=u,x=_(u,Z);return h.jsx(m,d({as:l,ref:c,className:R(v,n?n(a):a),theme:r&&i[r]||i},x))})}const J=j("MuiBox",["root"]),Q=J,V=z(),X=q({themeId:K,defaultTheme:V,defaultClassName:Q.root,generateClassName:W.generate}),ne=X;function Y(e){return G("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const A=["className","color","disableShrink","size","style","thickness","value","variant"];let p=e=>e,b,N,B,M;const o=44,O=I(b||(b=p`
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
`)),re=e=>{const{classes:r,variant:s,color:a,disableShrink:n}=e,m={root:["root",s,`color${f(a)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,n&&"circleDisableShrink"]};return L(m,Y,r)},se=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${f(s.color)}`]]}})(({ownerState:e,theme:r})=>d({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&T(B||(B=p`
      animation: ${0} 1.4s linear infinite;
    `),O)),ae=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),te=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${f(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>d({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&T(M||(M=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),ee)),oe=D.forwardRef(function(r,s){const a=H({props:r,name:"MuiCircularProgress"}),{className:n,color:m="primary",disableShrink:y=!1,size:t=40,style:g,thickness:c=3.6,value:i=0,variant:u="indeterminate"}=a,v=_(a,A),l=d({},a,{color:m,disableShrink:y,size:t,thickness:c,value:i,variant:u}),x=re(l),C={},P={},S={};if(u==="determinate"){const $=2*Math.PI*((o-c)/2);C.strokeDasharray=$.toFixed(3),S["aria-valuenow"]=Math.round(i),C.strokeDashoffset=`${((100-i)/100*$).toFixed(3)}px`,P.transform="rotate(-90deg)"}return h.jsx(se,d({className:R(x.root,n),style:d({width:t,height:t},P,g),ownerState:l,ref:s,role:"progressbar"},S,v,{children:h.jsx(ae,{className:x.svg,ownerState:l,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:h.jsx(te,{className:x.circle,style:C,ownerState:l,cx:o,cy:o,r:(o-c)/2,fill:"none",strokeWidth:c})})}))}),ce=oe;export{ne as B,ce as C};
