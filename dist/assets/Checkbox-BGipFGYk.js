import{c as h,j as t,a as M,g as P,s as y,a_ as B,aC as l,_ as a,aD as g,r as u,u as _,b as S,e as R,f as H}from"./index-K7fz_th8.js";import{S as U}from"./SwitchBase-D37Jsuiz.js";const E=h(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),O=h(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return P("MuiCheckbox",o)}const N=M("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),x=N,D=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:n,size:r}=o,s={root:["root",c&&"indeterminate",`color${l(n)}`,`size${l(r)}`]},d=H(s,L,e);return a({},e,d)},W=y(U,{shouldForwardProp:o=>B(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,e[`size${l(c.size)}`],c.color!=="default"&&e[`color${l(c.color)}`]]}})(({theme:o,ownerState:e})=>a({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:g(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${x.checked}, &.${x.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${x.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),q=t.jsx(O,{}),w=t.jsx(E,{}),A=t.jsx(V,{}),G=u.forwardRef(function(e,c){var n,r;const s=_({props:e,name:"MuiCheckbox"}),{checkedIcon:d=q,color:f="primary",icon:z=w,indeterminate:i=!1,indeterminateIcon:m=A,inputProps:I,size:p="medium",className:$}=s,j=S(s,D),C=i?m:z,k=i?m:d,v=a({},s,{color:f,indeterminate:i,size:p}),b=F(v);return t.jsx(W,a({type:"checkbox",inputProps:a({"data-indeterminate":i},I),icon:u.cloneElement(C,{fontSize:(n=C.props.fontSize)!=null?n:p}),checkedIcon:u.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:v,ref:c,className:R(b.root,$)},j,{classes:b}))}),Q=G;export{Q as M};