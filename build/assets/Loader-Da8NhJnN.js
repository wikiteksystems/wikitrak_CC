import{z as P,A as L,D as M,E as k,F as u,r as y,H,I as _,J as i,j as s,m as N,K as S,T as v,M as F,N as A,i as X}from"./index-Bp2Uwo4Z.js";import{P as q}from"./index-CkEbz2hE.js";import{r as K}from"./createSvgIcon-DnUOpLiq.js";import{C as V}from"./Card-DNApD37E.js";import{I as z}from"./IconButton-hLHLEhpq.js";import"./createSvgIcon-isKBiCZo.js";import"./Paper-B42TA3Xc.js";function G(t,e=0,r=1){return L(t,e,r)}function J(t){t=t.slice(1);const e=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let r=t.match(e);return r&&r[0].length===1&&(r=r.map(a=>a+a)),r?`rgb${r.length===4?"a":""}(${r.map((a,n)=>n<3?parseInt(a,16):Math.round(parseInt(a,16)/255*1e3)/1e3).join(", ")})`:""}function W(t){if(t.type)return t;if(t.charAt(0)==="#")return W(J(t));const e=t.indexOf("("),r=t.substring(0,e);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(P(9,t));let a=t.substring(e+1,t.length-1),n;if(r==="color"){if(a=a.split(" "),n=a.shift(),a.length===4&&a[3].charAt(0)==="/"&&(a[3]=a[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(n)===-1)throw new Error(P(10,n))}else a=a.split(",");return a=a.map(o=>parseFloat(o)),{type:r,values:a,colorSpace:n}}function Q(t){const{type:e,colorSpace:r}=t;let{values:a}=t;return e.indexOf("rgb")!==-1?a=a.map((n,o)=>o<3?parseInt(n,10):n):e.indexOf("hsl")!==-1&&(a[1]=`${a[1]}%`,a[2]=`${a[2]}%`),e.indexOf("color")!==-1?a=`${r} ${a.join(" ")}`:a=`${a.join(", ")}`,`${e}(${a})`}function Y(t,e){return t=W(t),e=G(e),(t.type==="rgb"||t.type==="hsl")&&(t.type+="a"),t.type==="color"?t.values[3]=`/${e}`:t.values[3]=e,Q(t)}function Z(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function tt(t){return parseFloat(t)}function et(t){return M("MuiCardContent",t)}k("MuiCardContent",["root"]);const at=["className","component"],rt=t=>{const{classes:e}=t;return S({root:["root"]},et,e)},st=u("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(t,e)=>e.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),nt=y.forwardRef(function(e,r){const a=H({props:e,name:"MuiCardContent"}),{className:n,component:o="div"}=a,l=_(a,at),d=i({},a,{component:o}),c=rt(d);return s.jsx(st,i({as:o,className:N(c.root,n),ownerState:d,ref:r},l))}),ot=nt;function it(t){return M("MuiCardHeader",t)}const lt=k("MuiCardHeader",["root","avatar","action","content","title","subheader"]),U=lt,dt=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],ct=t=>{const{classes:e}=t;return S({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},it,e)},pt=u("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(t,e)=>i({[`& .${U.title}`]:e.title,[`& .${U.subheader}`]:e.subheader},e.root)})({display:"flex",alignItems:"center",padding:16}),ut=u("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(t,e)=>e.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),ht=u("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(t,e)=>e.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),mt=u("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(t,e)=>e.content})({flex:"1 1 auto"}),gt=y.forwardRef(function(e,r){const a=H({props:e,name:"MuiCardHeader"}),{action:n,avatar:o,className:l,component:d="div",disableTypography:c=!1,subheader:w,subheaderTypographyProps:j,title:C,titleTypographyProps:x}=a,R=_(a,dt),h=i({},a,{component:d,disableTypography:c}),p=ct(h);let m=C;m!=null&&m.type!==v&&!c&&(m=s.jsx(v,i({variant:o?"body2":"h5",className:p.title,component:"span",display:"block"},x,{children:m})));let g=w;return g!=null&&g.type!==v&&!c&&(g=s.jsx(v,i({variant:o?"body2":"body1",className:p.subheader,color:"text.secondary",component:"span",display:"block"},j,{children:g}))),s.jsxs(pt,i({className:N(p.root,l),as:d,ref:r,ownerState:h},R,{children:[o&&s.jsx(ut,{className:p.avatar,ownerState:h,children:o}),s.jsxs(mt,{className:p.content,ownerState:h,children:[m,g]}),n&&s.jsx(ht,{className:p.action,ownerState:h,children:n})]}))}),ft=gt;function vt(t){return M("MuiSkeleton",t)}k("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Ct=["animation","className","component","height","style","variant","width"];let b=t=>t,I,E,O,B;const xt=t=>{const{classes:e,variant:r,animation:a,hasChildren:n,width:o,height:l}=t;return S({root:["root",r,a,n&&"withChildren",n&&!o&&"fitContent",n&&!l&&"heightAuto"]},vt,e)},bt=F(I||(I=b`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),yt=F(E||(E=b`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),wt=u("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],r.animation!==!1&&e[r.animation],r.hasChildren&&e.withChildren,r.hasChildren&&!r.width&&e.fitContent,r.hasChildren&&!r.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const r=Z(t.shape.borderRadius)||"px",a=tt(t.shape.borderRadius);return i({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:Y(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${r}/${Math.round(a/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&A(O||(O=b`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),bt),({ownerState:t,theme:e})=>t.animation==="wave"&&A(B||(B=b`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),yt,(e.vars||e).palette.action.hover)),jt=y.forwardRef(function(e,r){const a=H({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:o,component:l="span",height:d,style:c,variant:w="text",width:j}=a,C=_(a,Ct),x=i({},a,{animation:n,component:l,variant:w,hasChildren:!!C.children}),R=xt(x);return s.jsx(wt,i({as:l,ref:r,className:N(R.root,o),ownerState:x},C,{style:i({width:j,height:d},c)}))}),f=jt;var T={},Rt=X;Object.defineProperty(T,"__esModule",{value:!0});var D=T.default=void 0,$t=Rt(K()),Mt=s;D=T.default=(0,$t.default)((0,Mt.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert");function $(t){const{loading:e=!1}=t;return s.jsxs(V,{sx:{maxWidth:"75%",m:2,margin:"auto",padding:"50px"},children:[s.jsx(ft,{avatar:e&&s.jsx(f,{animation:"wave",variant:"circular",width:40,height:40}),action:e?null:s.jsx(z,{"aria-label":"settings",children:s.jsx(D,{})}),title:e?s.jsx(f,{animation:"wave",height:10,width:"80%",style:{marginBottom:6}}):"Loading...",subheader:e?s.jsx(f,{animation:"wave",height:10,width:"40%"}):"Loading, Please wait."}),s.jsx(ot,{children:e?s.jsxs(y.Fragment,{children:[s.jsx(f,{animation:"wave",height:10,style:{marginBottom:6}}),s.jsx(f,{animation:"wave",height:10,width:"80%"})]}):s.jsx(v,{variant:"body2",color:"text.secondary",component:"p",children:"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"})})]})}$.propTypes={loading:q.bool};function At(){return s.jsxs("div",{children:[s.jsx($,{loading:!0}),s.jsx($,{})]})}export{At as default};
