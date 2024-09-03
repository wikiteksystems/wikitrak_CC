import{a8 as M,a9 as X,L as A,J as I,M as v,w as o,r as $,N as U,D as E,T as f,j as s,E as O,I as B,aa as F,ab as H,i as q}from"./index-B9xO1qn8.js";import{P as D}from"./index-C3uJppgg.js";import{r as V}from"./createSvgIcon-Csl_yybN.js";import{C as K}from"./Card-DQ6PgQ6H.js";import{I as J}from"./IconButton-Bvysnsfz.js";import{C as z}from"./CardContent-BE4aEOvi.js";import"./Paper-BB2eFWfO.js";function G(e,t=0,r=1){return X(e,t,r)}function Q(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(a=>a+a)),r?`rgb${r.length===4?"a":""}(${r.map((a,n)=>n<3?parseInt(a,16):Math.round(parseInt(a,16)/255*1e3)/1e3).join(", ")})`:""}function L(e){if(e.type)return e;if(e.charAt(0)==="#")return L(Q(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(M(9,e));let a=e.substring(t+1,e.length-1),n;if(r==="color"){if(a=a.split(" "),n=a.shift(),a.length===4&&a[3].charAt(0)==="/"&&(a[3]=a[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(n)===-1)throw new Error(M(10,n))}else a=a.split(",");return a=a.map(i=>parseFloat(i)),{type:r,values:a,colorSpace:n}}function Y(e){const{type:t,colorSpace:r}=e;let{values:a}=e;return t.indexOf("rgb")!==-1?a=a.map((n,i)=>i<3?parseInt(n,10):n):t.indexOf("hsl")!==-1&&(a[1]=`${a[1]}%`,a[2]=`${a[2]}%`),t.indexOf("color")!==-1?a=`${r} ${a.join(" ")}`:a=`${a.join(", ")}`,`${t}(${a})`}function Z(e,t){return e=L(e),t=G(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Y(e)}function ee(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function te(e){return parseFloat(e)}function ae(e){return I("MuiCardHeader",e)}const re=A("MuiCardHeader",["root","avatar","action","content","title","subheader"]),_=re,se=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],ne=e=>{const{classes:t}=e;return B({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},ae,t)},ie=v("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>o({[`& .${_.title}`]:t.title,[`& .${_.subheader}`]:t.subheader},t.root)})({display:"flex",alignItems:"center",padding:16}),oe=v("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(e,t)=>t.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),le=v("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(e,t)=>t.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),de=v("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(e,t)=>t.content})({flex:"1 1 auto"}),ce=$.forwardRef(function(t,r){const a=U({props:t,name:"MuiCardHeader"}),{action:n,avatar:i,className:l,component:c="div",disableTypography:p=!1,subheader:C,subheaderTypographyProps:w,title:b,titleTypographyProps:x}=a,j=E(a,se),h=o({},a,{component:c,disableTypography:p}),d=ne(h);let u=b;u!=null&&u.type!==f&&!p&&(u=s.jsx(f,o({variant:i?"body2":"h5",className:d.title,component:"span",display:"block"},x,{children:u})));let m=C;return m!=null&&m.type!==f&&!p&&(m=s.jsx(f,o({variant:i?"body2":"body1",className:d.subheader,color:"text.secondary",component:"span",display:"block"},w,{children:m}))),s.jsxs(ie,o({className:O(d.root,l),as:c,ref:r,ownerState:h},j,{children:[i&&s.jsx(oe,{className:d.avatar,ownerState:h,children:i}),s.jsxs(de,{className:d.content,ownerState:h,children:[u,m]}),n&&s.jsx(le,{className:d.action,ownerState:h,children:n})]}))}),pe=ce;function he(e){return I("MuiSkeleton",e)}A("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ue=["animation","className","component","height","style","variant","width"];let y=e=>e,T,S,N,P;const me=e=>{const{classes:t,variant:r,animation:a,hasChildren:n,width:i,height:l}=e;return B({root:["root",r,a,n&&"withChildren",n&&!i&&"fitContent",n&&!l&&"heightAuto"]},he,t)},ge=F(T||(T=y`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),fe=F(S||(S=y`
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
`)),ve=v("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],r.animation!==!1&&t[r.animation],r.hasChildren&&t.withChildren,r.hasChildren&&!r.width&&t.fitContent,r.hasChildren&&!r.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const r=ee(e.shape.borderRadius)||"px",a=te(e.shape.borderRadius);return o({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:Z(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${r}/${Math.round(a/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&H(N||(N=y`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),ge),({ownerState:e,theme:t})=>e.animation==="wave"&&H(P||(P=y`
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
    `),fe,(t.vars||t).palette.action.hover)),be=$.forwardRef(function(t,r){const a=U({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:i,component:l="span",height:c,style:p,variant:C="text",width:w}=a,b=E(a,ue),x=o({},a,{animation:n,component:l,variant:C,hasChildren:!!b.children}),j=me(x);return s.jsx(ve,o({as:l,ref:r,className:O(j.root,i),ownerState:x},b,{style:o({width:w,height:c},p)}))}),g=be;var k={},xe=q;Object.defineProperty(k,"__esModule",{value:!0});var W=k.default=void 0,ye=xe(V()),Ce=s;W=k.default=(0,ye.default)((0,Ce.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert");function R(e){const{loading:t=!1}=e;return s.jsxs(K,{sx:{maxWidth:"75%",m:2,margin:"auto",padding:"50px"},children:[s.jsx(pe,{avatar:t&&s.jsx(g,{animation:"wave",variant:"circular",width:40,height:40}),action:t?null:s.jsx(J,{"aria-label":"settings",children:s.jsx(W,{})}),title:t?s.jsx(g,{animation:"wave",height:10,width:"80%",style:{marginBottom:6}}):"Loading...",subheader:t?s.jsx(g,{animation:"wave",height:10,width:"40%"}):"Loading, Please wait."}),s.jsx(z,{children:t?s.jsxs($.Fragment,{children:[s.jsx(g,{animation:"wave",height:10,style:{marginBottom:6}}),s.jsx(g,{animation:"wave",height:10,width:"80%"})]}):s.jsx(f,{variant:"body2",color:"text.secondary",component:"p"})})]})}R.propTypes={loading:D.bool};function _e(){return s.jsxs("div",{children:[s.jsx(R,{loading:!0}),s.jsx(R,{})]})}export{_e as default};
