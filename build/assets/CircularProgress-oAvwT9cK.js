import{a_ as w,a$ as E,r as B,aW as F,C as U,D,j as h,w as d,E as R,L as j,b0 as z,aZ as W,aT as G,J as K,aa as I,M as k,O as f,ab as T,N as L,I as Z}from"./index-iFlNtnfj.js";const H=["className","component"];function J(e={}){const{themeId:r,defaultTheme:s,defaultClassName:a="MuiBox-root",generateClassName:n}=e,m=w("div",{shouldForwardProp:t=>t!=="theme"&&t!=="sx"&&t!=="as"})(E);return B.forwardRef(function(g,c){const i=F(s),u=U(g),{className:v,component:l="div"}=u,x=D(u,H);return h.jsx(m,d({as:l,ref:c,className:R(v,n?n(a):a),theme:r&&i[r]||i},x))})}const O=j("MuiBox",["root"]),V=O,q=z(),A=J({themeId:W,defaultTheme:q,defaultClassName:V.root,generateClassName:G.generate}),ne=A;function Q(e){return K("MuiCircularProgress",e)}j("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const X=["className","color","disableShrink","size","style","thickness","value","variant"];let p=e=>e,S,N,M,_;const o=44,Y=I(S||(S=p`
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
`)),re=e=>{const{classes:r,variant:s,color:a,disableShrink:n}=e,m={root:["root",s,`color${f(a)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,n&&"circleDisableShrink"]};return Z(m,Q,r)},se=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`color${f(s.color)}`]]}})(({ownerState:e,theme:r})=>d({display:"inline-block"},e.variant==="determinate"&&{transition:r.transitions.create("transform")},e.color!=="inherit"&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&T(M||(M=p`
      animation: ${0} 1.4s linear infinite;
    `),Y)),ae=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),te=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.circle,r[`circle${f(s.variant)}`],s.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>d({stroke:"currentColor"},e.variant==="determinate"&&{transition:r.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&T(_||(_=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),ee)),oe=B.forwardRef(function(r,s){const a=L({props:r,name:"MuiCircularProgress"}),{className:n,color:m="primary",disableShrink:y=!1,size:t=40,style:g,thickness:c=3.6,value:i=0,variant:u="indeterminate"}=a,v=D(a,X),l=d({},a,{color:m,disableShrink:y,size:t,thickness:c,value:i,variant:u}),x=re(l),C={},P={},$={};if(u==="determinate"){const b=2*Math.PI*((o-c)/2);C.strokeDasharray=b.toFixed(3),$["aria-valuenow"]=Math.round(i),C.strokeDashoffset=`${((100-i)/100*b).toFixed(3)}px`,P.transform="rotate(-90deg)"}return h.jsx(se,d({className:R(x.root,n),style:d({width:t,height:t},P,g),ownerState:l,ref:s,role:"progressbar"},$,v,{children:h.jsx(ae,{className:x.svg,ownerState:l,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:h.jsx(te,{className:x.circle,style:C,ownerState:l,cx:o,cy:o,r:(o-c)/2,fill:"none",strokeWidth:c})})}))}),ce=oe;export{ne as B,ce as C};
