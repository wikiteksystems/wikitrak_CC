import{g as W,a as X,s as F,aY as Y,_ as i,aX as A,r as D,b as G,j as x,e as H,az as J,f as K}from"./index-C_wM5jQm.js";import{u as M}from"./menu2-BdQ5f_y8.js";import{u as Q}from"./useControlled-Cz6D0bD1.js";function T(e){return W("PrivateSwitchBase",e)}X("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const V=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Z=e=>{const{classes:t,checked:d,disabled:r,edge:a}=e,l={root:["root",d&&"checked",r&&"disabled",a&&`edge${J(a)}`],input:["input"]};return K(l,T,t)},ee=F(Y)(({ownerState:e})=>i({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),se=F("input",{shouldForwardProp:A})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),oe=D.forwardRef(function(t,d){const{autoFocus:r,checked:a,checkedIcon:l,className:w,defaultChecked:h,disabled:y,disableFocusRipple:p=!1,edge:R=!1,icon:S,id:P,inputProps:I,inputRef:v,name:j,onBlur:f,onChange:g,onFocus:m,readOnly:z,required:E=!1,tabIndex:N,type:c,value:b}=t,U=G(t,V),[k,_]=Q({controlled:a,default:!!h,name:"SwitchBase",state:"checked"}),o=M(),L=s=>{m&&m(s),o&&o.onFocus&&o.onFocus(s)},q=s=>{f&&f(s),o&&o.onBlur&&o.onBlur(s)},O=s=>{if(s.nativeEvent.defaultPrevented)return;const C=s.target.checked;_(C),g&&g(s,C)};let n=y;o&&typeof n>"u"&&(n=o.disabled);const $=c==="checkbox"||c==="radio",u=i({},t,{checked:k,disabled:n,disableFocusRipple:p,edge:R}),B=Z(u);return x.jsxs(ee,i({component:"span",className:H(B.root,w),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:L,onBlur:q,ownerState:u,ref:d},U,{children:[x.jsx(se,i({autoFocus:r,checked:a,defaultChecked:h,className:B.input,disabled:n,id:$?P:void 0,name:j,onChange:O,readOnly:z,ref:v,required:E,ownerState:u,tabIndex:N,type:c},c==="checkbox"&&b===void 0?{}:{value:b},I)),k?l:S]}))}),ce=oe;export{ce as S};