import{g as W,a as A,s as F,a$ as D,_ as i,a_ as G,r as H,b as J,j as x,e as K,aC as M,f as Q}from"./index-K7fz_th8.js";import{u as T}from"./menu2-Dr5aqS6N.js";import{u as V}from"./useControlled-CGi63n3-.js";function X(e){return W("PrivateSwitchBase",e)}A("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Y=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Z=e=>{const{classes:t,checked:d,disabled:r,edge:a}=e,l={root:["root",d&&"checked",r&&"disabled",a&&`edge${M(a)}`],input:["input"]};return Q(l,X,t)},ee=F(D)(({ownerState:e})=>i({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),se=F("input",{shouldForwardProp:G})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),oe=H.forwardRef(function(t,d){const{autoFocus:r,checked:a,checkedIcon:l,className:w,defaultChecked:h,disabled:y,disableFocusRipple:p=!1,edge:R=!1,icon:S,id:P,inputProps:I,inputRef:v,name:j,onBlur:f,onChange:g,onFocus:m,readOnly:_,required:z=!1,tabIndex:E,type:c,value:b}=t,N=J(t,Y),[k,U]=V({controlled:a,default:!!h,name:"SwitchBase",state:"checked"}),o=T(),L=s=>{m&&m(s),o&&o.onFocus&&o.onFocus(s)},$=s=>{f&&f(s),o&&o.onBlur&&o.onBlur(s)},q=s=>{if(s.nativeEvent.defaultPrevented)return;const C=s.target.checked;U(C),g&&g(s,C)};let n=y;o&&typeof n>"u"&&(n=o.disabled);const O=c==="checkbox"||c==="radio",u=i({},t,{checked:k,disabled:n,disableFocusRipple:p,edge:R}),B=Z(u);return x.jsxs(ee,i({component:"span",className:K(B.root,w),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:L,onBlur:$,ownerState:u,ref:d},N,{children:[x.jsx(se,i({autoFocus:r,checked:a,defaultChecked:h,className:B.input,disabled:n,id:O?P:void 0,name:j,onChange:q,readOnly:_,ref:v,required:z,ownerState:u,tabIndex:E,type:c},c==="checkbox"&&b===void 0?{}:{value:b},I)),k?l:S]}))}),ce=oe;export{ce as S};