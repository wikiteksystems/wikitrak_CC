import{p as Be,q as ze,w as M,x as ye,y as ne,z as Ge,A as qe,B as He,r as i,C as Ue,D as H,j as e,E as K,F as We,H as be,I as ee,J as te,K as Ye,L as pe,M as U,N as ue,O as Ie,T as G,a as _,G as Z,c as q,u as oe,P as je,t as Xe,Q as Je,R as Ke,S as Se,i as re,U as Qe,V as ae,W as Ze,X as et,Y as we,Z as le,$ as tt,_ as z,b as Ce,l as ot,m as rt,n as st,o as nt,v as at}from"./index-ImRGZxZ3.js";import{L as lt}from"./LightModeOutlined-Bm82HmS9.js";import{s as ie}from"./Socket-0N_gnJcr.js";import{p as it,R as ct,L as dt,X as pt,Y as ut,a as ht,b as gt,T as xt}from"./LineChart-COzBkgJ4.js";import{t as W,d as ft}from"./Search-CqS6wYQA.js";import{B as m,C as he}from"./CircularProgress-C4L2CX71.js";import{P as mt}from"./Paper-OIuWFxaJ.js";import{c as vt,S as yt}from"./Switch-UIfEPrEV.js";import{c as bt,I as jt}from"./IconButton-BiThzxaF.js";import{r as St,m as wt,a as Ct}from"./mergeSlotProps-BBjg1OrS.js";import{C as Ae}from"./index-CYDuYZoL.js";import{d as Pe}from"./index-B1uKzKmB.js";import{u as Fe,f as Le,F as Pt,I as kt,O as Dt,a as It}from"./OutlinedInput-B4IOSYvQ.js";import{D as At}from"./DateTimePicker-Dt-L66Kh.js";import{r as se}from"./createSvgIcon-BrWK8oXA.js";import{T as Ft,a as Lt,d as Rt,b as Mt,c as ce}from"./TableRow-WeXuHEwA.js";import{T as Tt}from"./TopBar-ByOyLuKI.js";import{G as _t}from"./GeofencAlert-YRMO1Wy4.js";import{V as Et,F as Nt,P as $t,f as ke,S as Ot,I as Vt,M as Bt,T as zt,O as Gt,a as qt,b as Ht}from"./Vector-BEQdHjna.js";import{u as Ut}from"./esm-9J5758WO.js";import"./index-CC3gLPsj.js";import"./roundedArrow-DWYdho3l.js";import"./button-CLCxN-li.js";import"./NotificationsNone-Bp1nPhXq.js";const Wt=["component","direction","spacing","divider","children","className","useFlexGap"],Yt=Be(),Xt=ze("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,o)=>o.root});function Jt(t){return We({props:t,name:"MuiStack",defaultTheme:Yt})}function Kt(t,o){const s=i.Children.toArray(t).filter(Boolean);return s.reduce((n,u,l)=>(n.push(u),l<s.length-1&&n.push(i.cloneElement(o,{key:`separator-${l}`})),n),[])}const Qt=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],Zt=({ownerState:t,theme:o})=>{let s=M({display:"flex",flexDirection:"column"},ye({theme:o},ne({values:t.direction,breakpoints:o.breakpoints.values}),n=>({flexDirection:n})));if(t.spacing){const n=Ge(o),u=Object.keys(o.breakpoints.values).reduce((y,p)=>((typeof t.spacing=="object"&&t.spacing[p]!=null||typeof t.direction=="object"&&t.direction[p]!=null)&&(y[p]=!0),y),{}),l=ne({values:t.direction,base:u}),x=ne({values:t.spacing,base:u});typeof l=="object"&&Object.keys(l).forEach((y,p,f)=>{if(!l[y]){const P=p>0?l[f[p-1]]:"column";l[y]=P}}),s=qe(s,ye({theme:o},x,(y,p)=>t.useFlexGap?{gap:be(n,y)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${Qt(p?l[p]:t.direction)}`]:be(n,y)}}))}return s=He(o.breakpoints,s),s};function eo(t={}){const{createStyledComponent:o=Xt,useThemeProps:s=Jt,componentName:n="MuiStack"}=t,u=()=>ee({root:["root"]},y=>te(n,y),{}),l=o(Zt);return i.forwardRef(function(y,p){const f=s(y),h=Ue(f),{component:P="div",direction:C="column",spacing:a=0,divider:S,children:c,className:k,useFlexGap:I=!1}=h,g=H(h,Wt),A={direction:C,spacing:a,useFlexGap:I},D=u();return e.jsx(l,M({as:P,ownerState:A,ref:p,className:K(D.root,k)},g,{children:S?Kt(c,S):c}))})}const to=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],oo=["component","slots","slotProps"],ro=["component"];function so(t,o){const{className:s,elementType:n,ownerState:u,externalForwardedProps:l,getSlotOwnerState:x,internalForwardedProps:d}=o,y=H(o,to),{component:p,slots:f={[t]:void 0},slotProps:h={[t]:void 0}}=l,P=H(l,oo),C=f[t]||n,a=St(h[t],u),S=wt(M({className:s},y,{externalForwardedProps:t==="root"?P:void 0,externalSlotProps:a})),{props:{component:c},internalRef:k}=S,I=H(S.props,ro),g=Ye(k,a==null?void 0:a.ref,o.ref),A=x?x(I):{},D=M({},u,A),b=t==="root"?c||p:c,F=Ct(C,M({},t==="root"&&!p&&!f[t]&&d,t!=="root"&&!f[t]&&d,I,b&&{as:b},{ref:g}),D);return Object.keys(A).forEach(L=>{delete F[L]}),[C,F]}const no=bt(e.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function ao(t){return te("MuiAvatar",t)}pe("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const lo=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],io=vt(),co=t=>{const{classes:o,variant:s,colorDefault:n}=t;return ee({root:["root",s,n&&"colorDefault"],img:["img"],fallback:["fallback"]},ao,o)},po=U("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:s}=t;return[o.root,o[s.variant],s.colorDefault&&o.colorDefault]}})(({theme:t})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:M({color:(t.vars||t).palette.background.default},t.vars?{backgroundColor:t.vars.palette.Avatar.defaultBg}:M({backgroundColor:t.palette.grey[400]},t.applyStyles("dark",{backgroundColor:t.palette.grey[600]})))}]})),uo=U("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(t,o)=>o.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),ho=U(no,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(t,o)=>o.fallback})({width:"75%",height:"75%"});function go({crossOrigin:t,referrerPolicy:o,src:s,srcSet:n}){const[u,l]=i.useState(!1);return i.useEffect(()=>{if(!s&&!n)return;l(!1);let x=!0;const d=new Image;return d.onload=()=>{x&&l("loaded")},d.onerror=()=>{x&&l("error")},d.crossOrigin=t,d.referrerPolicy=o,d.src=s,n&&(d.srcset=n),()=>{x=!1}},[t,o,s,n]),u}const xo=i.forwardRef(function(o,s){const n=io({props:o,name:"MuiAvatar"}),{alt:u,children:l,className:x,component:d="div",slots:y={},slotProps:p={},imgProps:f,sizes:h,src:P,srcSet:C,variant:a="circular"}=n,S=H(n,lo);let c=null;const k=go(M({},f,{src:P,srcSet:C})),I=P||C,g=I&&k!=="error",A=M({},n,{colorDefault:!g,component:d,variant:a}),D=co(A),[b,F]=so("img",{className:D.img,elementType:uo,externalForwardedProps:{slots:y,slotProps:{img:M({},f,p.img)}},additionalProps:{alt:u,src:P,srcSet:C,sizes:h},ownerState:A});return g?c=e.jsx(b,M({},F)):l||l===0?c=l:I&&u?c=u[0]:c=e.jsx(ho,{ownerState:A,className:D.fallback}),e.jsx(po,M({as:d,ownerState:A,className:K(D.root,x),ref:s},S,{children:c}))}),fo=xo,mo=eo({createStyledComponent:U("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,o)=>o.root}),useThemeProps:t=>ue({props:t,name:"MuiStack"})}),vo=mo;function yo(t){return te("MuiFormControlLabel",t)}const bo=pe("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),J=bo,jo=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],So=t=>{const{classes:o,disabled:s,labelPlacement:n,error:u,required:l}=t,x={root:["root",s&&"disabled",`labelPlacement${Ie(n)}`,u&&"error",l&&"required"],label:["label",s&&"disabled"],asterisk:["asterisk",u&&"error"]};return ee(x,yo,o)},wo=U("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:s}=t;return[{[`& .${J.label}`]:o.label},o.root,o[`labelPlacement${Ie(s.labelPlacement)}`]]}})(({theme:t,ownerState:o})=>M({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${J.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${J.label}`]:{[`&.${J.disabled}`]:{color:(t.vars||t).palette.text.disabled}}})),Co=U("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(t,o)=>o.asterisk})(({theme:t})=>({[`&.${J.error}`]:{color:(t.vars||t).palette.error.main}})),Po=i.forwardRef(function(o,s){var n,u;const l=ue({props:o,name:"MuiFormControlLabel"}),{className:x,componentsProps:d={},control:y,disabled:p,disableTypography:f,label:h,labelPlacement:P="end",required:C,slotProps:a={}}=l,S=H(l,jo),c=Fe(),k=(n=p??y.props.disabled)!=null?n:c==null?void 0:c.disabled,I=C??y.props.required,g={disabled:k,required:I};["checked","name","onChange","value","inputRef"].forEach(E=>{typeof y.props[E]>"u"&&typeof l[E]<"u"&&(g[E]=l[E])});const A=Le({props:l,muiFormControl:c,states:["error"]}),D=M({},l,{disabled:k,labelPlacement:P,required:I,error:A.error}),b=So(D),F=(u=a.typography)!=null?u:d.typography;let L=h;return L!=null&&L.type!==G&&!f&&(L=e.jsx(G,M({component:"span"},F,{className:K(b.label,F==null?void 0:F.className),children:L}))),e.jsxs(wo,M({className:K(b.root,x),ownerState:D,ref:s},S,{children:[i.cloneElement(y,g),I?e.jsxs(vo,{display:"block",children:[L,e.jsxs(Co,{ownerState:D,"aria-hidden":!0,className:b.asterisk,children:[" ","*"]})]}):L]}))}),ko=Po;function Do(t){return te("MuiFormGroup",t)}pe("MuiFormGroup",["root","row","error"]);const Io=["className","row"],Ao=t=>{const{classes:o,row:s,error:n}=t;return ee({root:["root",s&&"row",n&&"error"]},Do,o)},Fo=U("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:s}=t;return[o.root,s.row&&o.row]}})(({ownerState:t})=>M({display:"flex",flexDirection:"column",flexWrap:"wrap"},t.row&&{flexDirection:"row"})),Lo=i.forwardRef(function(o,s){const n=ue({props:o,name:"MuiFormGroup"}),{className:u,row:l=!1}=n,x=H(n,Io),d=Fe(),y=Le({props:n,muiFormControl:d,states:["error"]}),p=M({},n,{row:l,error:y.error}),f=Ao(p);return e.jsx(Fo,M({className:K(f.root,u),ownerState:p,ref:s},x))}),Ro=Lo,Mo=({imeiNo:t})=>{const{selectedVehicle:o,parameterData:s,ivnPid:n,locationData:u,vehicleList:l,onlineVehicle:x}=_(b=>b.liveMap),{ivnParameters:d,mode:y}=_(b=>b.dashboard),p=W(y),[f,h]=i.useState(),[P,C]=i.useState(!1),[a,S]=i.useState();i.useState({mainInputVoltage:0,ignition:0,speed:0});const[c,k]=i.useState("Not Available"),[I,g]=i.useState("Offline");i.useEffect(()=>{A()},[o]);const A=()=>{var b,F,L,E;if((u==null?void 0:u.length)>0){console.log("locationData",u);let j=u==null?void 0:u.find(T=>T.latestDocument.imei===o.imei);j?(h((b=j==null?void 0:j.latestDocument)==null?void 0:b.speed),C((F=j==null?void 0:j.latestDocument)==null?void 0:F.ignition),S((L=j==null?void 0:j.latestDocument)==null?void 0:L.mainInputVoltage),k((E=j==null?void 0:j.latestDocument)==null?void 0:E.venderId)):(h(0),C(0),S(0),k("Not Available"))}else h(0),C(0),S(0),k("Not Available")};i.useEffect(()=>{Object.keys(o).length>0&&D()},[o]);const D=()=>{if(Object.keys(o).length>0)if(x&&x.length>0){const b=x.some(F=>parseInt(F)===parseInt(o==null?void 0:o.imei));g(b?"Online":"Offline")}else g("Offline");else g("Offline")};return e.jsxs(e.Fragment,{children:[e.jsx(m,{sx:{mx:"10px",pt:"10px",color:p.grey[400]},children:e.jsx("b",{children:o==null?void 0:o.reg_id})}),e.jsx(m,{sx:{backgroundColor:p.grey[200],height:"12vh",borderRadius:"8px",p:"5px"},children:e.jsx(m,{sx:{},children:e.jsx(Z,{container:!0,spacing:3,mt:"2.5px",children:e.jsx(Z,{item:!0,xs:12,children:e.jsx(Z,{container:!0,justifyContent:"space-around",spacing:3,children:[{label:"VenderId",value:c},{label:"Speed",value:f,unit:"km/h"},{label:"Main Input Voltage",value:parseFloat(a).toFixed(2),unit:"voltage"},{label:"Current Status",value:I}].map((b,F)=>e.jsx(Z,{item:!0,children:e.jsxs(mt,{sx:{height:70,width:250,backgroundColor:p.grey[100],color:p.grey[400],display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 10px"},children:[e.jsxs(m,{children:[e.jsx(G,{variant:"h6",sx:{fontSize:"12px"},children:b.label}),e.jsxs(G,{variant:"h6",sx:{fontSize:"18px",fontWeight:"bold"},children:[b.value," ",b==null?void 0:b.unit]})]}),e.jsx(fo,{src:it,sx:{width:20,height:20}})]})},F))})})})})})]})},de=({title:t,selectedTripData:o})=>{const{mode:s,loading:n}=_(p=>p.dashboard),{selectedVehicle:u}=_(p=>p.liveMap),[l,x]=i.useState([]);i.useEffect(()=>{let p=o.map(h=>{let P={...h};return P.ignition=P.ignition?1:0,P});const f=y(p);x(f)},[o]);const d=W(s),y=p=>{let f=null;return p.forEach(h=>{const P=new Date(h.createdAt);f&&f.toDateString()===P.toDateString()?(h.date=q(h.createdAt).format("HH:mm:ss"),h.ignition=h.ignition?1:0):(h.date=q(h.createdAt).format("DD-MM-YYYY"),h.ignition=h.ignition?1:0),f=P}),p};return e.jsx(m,{sx:{ml:"2rem",border:d.grey[300],fontSize:"13px",height:"24vh",color:d.grey[400],backgroundColor:d.grey[100],borderRadius:"5px"},children:l&&l.length>0?e.jsx(ct,{children:e.jsxs(dt,{data:l,margin:{top:15,right:10,left:-25,bottom:0},children:[e.jsx(pt,{dataKey:"date",stroke:d.grey[400]}),e.jsx(ut,{stroke:d.grey[400]}),e.jsx(ht,{type:"monotone",dataKey:t,dot:!1,stroke:"#EF5B05",strokeWidth:2}),e.jsx(gt,{layout:"horizontal",verticalAlign:"top",align:"center"}),e.jsx(xt,{})]})}):e.jsx(Ae,{style:{background:d.grey[100],width:"400px",height:"100px",margin:"auto",marginTop:"10px"},children:Object.keys(u).length===0?e.jsx(G,{textAlign:"center",align:"center",mt:"20px",color:d.grey[600],children:"Please Select a Vehicle"}):n?e.jsx(he,{style:{position:"absolute",left:"40%",top:"38%",zIndex:9999}}):e.jsx(G,{textAlign:"center",color:d.grey[600],children:"Sorry! No Trips Available"})})})},To=({vehicleData:t})=>{const o=["Engine RPM","Engine coolant temperature","Battery Potential"],s=oe(),{selectedVehicle:n,loading:u}=_(c=>c.liveMap),{startDate:l,endDate:x,mode:d}=_(c=>c.dashboard),[y,p]=i.useState(""),f=W(d),h=i.useRef(null),P=i.useRef(0),C=t.length>0&&t.filter(c=>c.label.toLowerCase().includes(y.toLowerCase())),a=c=>{p(c.target.value)},S=async c=>{var A;h.current&&(P.current=h.current.scrollTop),s(Je({imei:c.value,reg_id:c.label})),c.value,Pe().subtract(5,"day"),Pe();let k=c.label;const I=await s(Ke({registration_id:k}));let g=[];if(I&&I.payload.length>0&&((A=I.payload)==null||A.map(D=>{D.ivn_parameter.length>0&&g.push(D.ivn_parameter[0])})),g.length>0){let D=g.filter(b=>o.includes(b.pid_description));s(Se(D))}else s(Se([]));setTimeout(()=>{h.current&&(h.current.scrollTop=P.current)},0)};return i.useEffect(()=>{h.current&&(h.current.scrollTop=P.current)},[u,C,n]),e.jsx(e.Fragment,{children:u?e.jsx("div",{children:e.jsx(m,{sx:{display:"flex",justifyContent:"center",height:"88vh",alignItems:"center"},children:e.jsx(he,{})})}):e.jsxs("div",{ref:h,style:{overflowY:"auto",height:"90vh"},children:[e.jsx(m,{sx:{align:"center",my:"15px",ml:"20px"},children:e.jsxs(Pt,{sx:{width:"90%",backgroundColor:"white",borderRadius:"5px"},variant:"outlined",children:[e.jsx(kt,{htmlFor:"outlined-adornment-password",style:{marginTop:"-8px"},children:"Search"}),e.jsx(Dt,{onChange:c=>a(c),inputProps:{style:{padding:7}},id:"outlined-adornment-password",type:"text",endAdornment:e.jsx(It,{position:"end",children:e.jsx(jt,{"aria-label":"toggle password visibility",edge:"end",children:e.jsx(ft,{})})}),label:"Search"})]})}),e.jsx(m,{sx:{align:"center",my:"8px",ml:"20px"},children:e.jsxs(je,{variant:"outlined",sx:{width:"90%",color:f.grey[400],"&:hover":{color:"#DAE0EE"}},children:["Total Vehicle: ",C.length]})}),C.length>0&&C.map((c,k)=>e.jsx(m,{sx:{align:"center",my:"8px",ml:"20px"},children:e.jsx(je,{variant:"outlined",onClick:()=>S(c),sx:{width:"90%",bgcolor:c.label===n.reg_id?Xe.bgColor:"undefined",color:c.label===n.reg_id?"#DAE0EE":f.grey[400]},children:c.label})},k))]})})};var ge={},_o=re;Object.defineProperty(ge,"__esModule",{value:!0});var Re=ge.default=void 0,Eo=_o(se()),No=e;Re=ge.default=(0,Eo.default)((0,No.jsx)("path",{d:"M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6z"}),"NavigateNextOutlined");var xe={},$o=re;Object.defineProperty(xe,"__esModule",{value:!0});var Me=xe.default=void 0,Oo=$o(se()),Vo=e;Me=xe.default=(0,Oo.default)((0,Vo.jsx)("path",{d:"M15.61 7.41 14.2 6l-6 6 6 6 1.41-1.41L11.03 12z"}),"NavigateBeforeOutlined");var fe={},Bo=re;Object.defineProperty(fe,"__esModule",{value:!0});var Te=fe.default=void 0,zo=Bo(se()),De=e;Te=fe.default=(0,zo.default)([(0,De.jsx)("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7M7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9"},"0"),(0,De.jsx)("circle",{cx:"12",cy:"9",r:"2.5"},"1")],"LocationOnOutlined");var me={},Go=re;Object.defineProperty(me,"__esModule",{value:!0});var _e=me.default=void 0,qo=Go(se()),Ho=e;_e=me.default=(0,qo.default)((0,Ho.jsx)("path",{d:"m22 12-4-4v3H3v2h15v3z"}),"TrendingFlat");const Uo=()=>{const t=oe(),o=Qe(),{tripList:s,selectedTripData:n,loading:u,trips:l,activeIndex:x,searchText:d,mode:y}=_(r=>r.dashboard),{selectedVehicle:p}=_(r=>r.liveMap),[f,h]=i.useState(0),[P,C]=i.useState(0),[a,S]=i.useState(0),[c,k]=i.useState(0),[I,g]=i.useState("0"),[A,D]=i.useState(0),[b,F]=i.useState(!1),L=W(y),E=()=>{h(r=>r+3)},j=()=>{h(r=>Math.max(r-5,0))};i.useEffect(()=>{const r=T(s);if(r.length>0){t(ae(r[0]));const v=s&&s.length>0&&s.filter(w=>w.formatedDate.toLowerCase().includes(d.toLowerCase()));v.length>0&&X(0,v[0])}t(Ze(r))},[s]),i.useEffect(()=>{if(n.length>0){const r=n.map(w=>({lat:parseFloat(w.lat),lng:parseFloat(w.lng)})),v=new window.google.maps.Polygon({paths:r});ve(v)}},[n]);const T=r=>{const v=new Set,w=[];return r.forEach(R=>{v.has(R.formatedDate)||(v.add(R.formatedDate),w.push(R.formatedDate))}),w},N=s&&s.length>0&&s.filter(r=>r.formatedDate.toLowerCase().includes(d.toLowerCase())),Y=r=>{if(N&&N.length>0){const v=s&&s.length>0&&s.filter(w=>w.formatedDate.toLowerCase().includes(r.toLowerCase()));t(le(0)),t(ae(r)),X(0,v[0])}else t(le(null)),t(ae(r))},X=async(r,v)=>{var $;let w={imei:p.imei,startDate:v.startDate,endDate:v.endDate};F(!0);const R=await et(w);(($=R==null?void 0:R.data)==null?void 0:$.documents.length)>0?(t(we(R.data.documents[0].data)),Ee(R.data.documents[0].data),F(!1)):(k(0),S(0),D(0),C(0),g("0"),t(we([])),F(!1)),t(le(r))},Ee=r=>{let v=0,w=0;r.map((O,Q)=>{O.packetType==="HB"&&v++,O.packetType==="HA"&&w++}),C(v),S(w);let R=Ne(new Date(r[0].createdAt).toISOString(),new Date(r[r.length-1].createdAt).toISOString());console.log("hours: ",R),g(R);const $=$e(r);D($);const V=r.map(O=>({lat:parseFloat(O.lat),lng:parseFloat(O.lng)})),B=new window.google.maps.Polygon({paths:V});ve(B)};function Ne(r,v){var w=q(r),R=q(v);console.log("startDate-------->",r,v);let $=q.duration(R.diff(w)),V=$.hours(),B=$.minutes(),O=$.seconds(),Q=`${V}h ${B}m ${O}s`;return console.log("string",Q),Q}function $e(r){let v=0;for(let w=0;w<r.length-1;w++){const R=r[w].lat,$=r[w].lng,V=r[w+1].lat,B=r[w+1].lng;v+=Oe(R,$,V,B)}return v}function Oe(r,v,w,R){const V=(w-r)*Math.PI/180,B=(R-v)*Math.PI/180,O=Math.sin(V/2)*Math.sin(V/2)+Math.cos(r*Math.PI/180)*Math.cos(w*Math.PI/180)*Math.sin(B/2)*Math.sin(B/2);return 6371*(2*Math.atan2(Math.sqrt(O),Math.sqrt(1-O)))}const ve=r=>{if(!window.google||!window.google.maps.geometry){console.log("not loaded");return}const w=window.google.maps.geometry.spherical.computeArea(r.getPath())/4046.86;k(w)},Ve=r=>{console.log("activeIndex",x),console.log("i",r),x!==null?r===x?(t(tt(!0)),o("/trip-monitor")):z.error("Trip not selected"):z.error("Please select the trip")};return e.jsxs(e.Fragment,{children:[e.jsxs(m,{sx:{width:"95%",display:"flex",overflow:"auto",mx:"10px"},children:[e.jsx("div",{style:{display:"flex"},children:l&&l.length>0&&l.slice(f,f+5).map((r,v)=>e.jsx(m,{sx:{backgroundColor:d===r?"#EF5B05":"white",color:d===r?"white":"#EF5B05",mx:"5px",p:"5px",borderRadius:"5px",width:"90px",height:"25px",textAlign:"center",cursor:"pointer"},onClick:()=>{Y(r)},children:r},v))}),f!==0&&e.jsx("button",{onClick:j,style:{marginLeft:"5px",backgroundColor:"white",color:"black"},disabled:f===0,children:e.jsx(Me,{})}),!(f+5>=l.length)&&e.jsx("button",{onClick:E,style:{marginLeft:"5px",backgroundColor:"white",color:"black"},disabled:f+5>=l.length,children:e.jsx(Re,{})})]}),e.jsx(m,{children:N&&N.length>0?e.jsx(Ft,{sx:{maxHeight:210,height:210,width:"98%",ml:"10px",mt:"10px",borderRadius:"5px",border:"1px solid #dbdad5"},children:e.jsx(Lt,{stickyHeader:!0,"aria-label":"sticky table",children:e.jsx(Rt,{children:N&&N.length>0&&N.map((r,v)=>{var w,R;return e.jsxs(Mt,{sx:{backgroundColor:x===v?"#DAE0EE":L.grey[100]},children:[e.jsxs(ce,{align:"left",style:{fontSize:"12px",padding:10,color:x===v?"black":L.grey[400],cursor:"pointer"},onClick:()=>{X(v,r)},children:[v+1,". ",`${(w=r==null?void 0:r.startLocation)==null?void 0:w.display_name}`," ",e.jsx(m,{component:"span",sx:{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"middle"},children:e.jsx(_e,{})}),`${(R=r==null?void 0:r.endLocation)==null?void 0:R.display_name}`]}),e.jsxs(ce,{align:"right",style:{fontSize:"12px",padding:10,color:x===v?"black":L.grey[400]},children:[r!=null&&r.startDate?q(new Date(r.startDate).toISOString()).format("LT"):""," ","to"," ",r!=null&&r.endDate?q(new Date(r.endDate).toISOString()).format("LT"):"----"]}),e.jsx(ce,{align:"right",style:{fontSize:"12px",padding:10,color:x===v?"black":L.grey[400]},children:e.jsx("span",{title:"Navigate to map",style:{cursor:"pointer"},onClick:()=>{Ve(v)},children:e.jsx(Te,{})})})]},v)})})})}):e.jsx(m,{sx:{height:210,display:"flex",justifyContent:"center",alignItems:"center",color:L.grey[400],margin:"auto"},children:e.jsx(Ae,{style:{background:L.grey[100],width:"400px",height:"100px"},children:Object.keys(p).length===0?e.jsx(G,{textAlign:"center",align:"center",mt:"20px",color:L.grey[600],children:"Please Select a Vehicle"}):u?e.jsx(he,{style:{position:"absolute",left:"40%",top:"38%",zIndex:9999}}):e.jsx(G,{textAlign:"center",color:L.grey[600],children:"Sorry! No Trips Available"})})})}),n.length>0&&e.jsx(m,{sx:{my:"0px"},children:e.jsxs(m,{sx:{display:"flex",mx:"5px",mt:"5px"},children:[e.jsxs(m,{sx:{backgroundColor:"#EF5B05",color:"white",fontSize:"15px",height:"45px",pt:"5px",borderRadius:"5px",textAlign:"center",width:"25%",ml:"5px"},children:[e.jsx("div",{children:"Harsh Braking"}),e.jsx("div",{children:"0"})]}),e.jsxs(m,{sx:{backgroundColor:"#EF5B05",color:"white",fontSize:"15px",height:"45px",pt:"5px",borderRadius:"5px",textAlign:"center",width:"25%",ml:"5px"},children:[e.jsx("div",{children:"Harsh Acceleration"}),e.jsx("div",{children:"0"})]}),e.jsxs(m,{sx:{backgroundColor:"#EF5B05",color:"white",fontSize:"15px",height:"45px",pt:"5px",borderRadius:"5px",textAlign:"center",width:"25%",ml:"5px"},children:[e.jsx("div",{children:"Running Hrs"}),e.jsx("div",{children:I})]}),e.jsxs(m,{sx:{backgroundColor:"#EF5B05",color:"white",fontSize:"15px",height:"45px",pt:"5px",borderRadius:"5px",textAlign:"center",width:"25%",ml:"5px"},children:[e.jsx("div",{children:"Distance"}),e.jsx("div",{children:parseFloat(parseFloat(A).toFixed(2))})]})]})})]})},Wo=()=>{const{mode:t}=_(s=>s.dashboard),o=W(t);return e.jsxs(m,{children:[e.jsxs(m,{sx:{display:"flex",ml:"5px"},children:[e.jsx(m,{sx:{m:"5px",fontSize:"20px",width:"60%",color:o.grey[400]},children:e.jsx("b",{children:"Trip History"})}),e.jsx(m,{children:e.jsx(At,{})})]}),e.jsx(m,{sx:{my:"5px"},children:e.jsx(Uo,{})})]})},Yo=()=>{const t=oe(),{center:o,selectedParameterList:s,selectedVehicle:n,vehicleList:u,tractorIcon:l,icons:x,locationData:d,ivnPid:y,placesData:p}=_(j=>j.liveMap),{mode:f}=_(j=>j.dashboard),{isLoaded:h,loadError:P}=Ut({googleMapsApiKey:"AIzaSyA_S7GfAh6rJYWQ5X4n4X-3poo3vymuspU"}),[C,a]=i.useState(null),[S,c]=i.useState(!0),[k,I]=i.useState(5),[g,A]=i.useState(),D=W(f),b=i.useRef(null),F=i.useRef(new Et),L=()=>new Bt({target:b.current,layers:[new zt({source:new Gt,attributions:""}),new qt({source:F.current})],view:new Ht({center:ke([78,21]),zoom:k}),controls:[]});i.useEffect(()=>{h&&a(window.google.maps)},[h]),i.useEffect(()=>{if(S)A(d);else{let j=d==null?void 0:d.filter(T=>(T==null?void 0:T._id)===(n==null?void 0:n.imei));A(j)}},[d,n,S]),i.useEffect(()=>{if(b.current&&C){const j=L();return b.current=j,()=>{j&&j.setTarget(null)}}},[C]),i.useEffect(()=>{b.current&&g&&g.length>0&&(F.current.clear(),g.forEach(j=>{const{lat:T,lng:N}=j.latestDocument,Y=new Nt({geometry:new $t(ke([N,T]))});Y.setStyle(new Ot({image:new Vt({src:"http://maps.google.com/mapfiles/ms/icons/red-dot.png",scale:1})})),F.current.addFeature(Y)}))},[g]);const E=()=>{if(!S)t(Ce({lat:21,lng:78})),I(4),c(T=>!T);else{const j=d.find(T=>T.latestDocument.imei===n.imei);if(j){const{lat:T,lng:N}=j.latestDocument;t(Ce({lat:T,lng:N})),I(12),c(X=>!X)}else z.error("Data is not available for selected vehicle")}};return P?"Error loading maps":h?C?e.jsxs("div",{children:[e.jsxs(m,{sx:{ml:"10px",fontSize:"20px",display:"flex",justifyContent:"space-between",color:D.grey[400]},children:[e.jsx("b",{children:"Live Map"}),e.jsx(Ro,{sx:{marginLeft:0,paddingTop:0,color:D.grey[400]},children:e.jsx(ko,{control:e.jsx(yt,{checked:S,onChange:E}),label:S?"Group":"Individual"})})]}),e.jsx("div",{ref:b,style:{height:"41.5vh",width:"99%",marginTop:"0px",marginLeft:"10px"}})]}):"No map":"Loading maps"},br=()=>{const{w_customer_id:t}=_(a=>a.auth),{mode:o,selectedTripData:s}=_(a=>a.dashboard),[n,u]=i.useState(()=>{const a=sessionStorage.getItem("imeiNo");return a?JSON.parse(a):[]}),l=oe(),x=W(o),[d,y]=i.useState([]),[p,f]=i.useState(!1),[h,P]=i.useState(!1);i.useEffect(()=>{C()},[]),i.useEffect(()=>{sessionStorage.setItem("imeiNo",JSON.stringify(n))},[n]),i.useEffect(()=>{ie.on("geofenceAlert",a=>{(a==null?void 0:a.imei)!==null&&n.find(k=>parseInt(k)===(a==null?void 0:a.imei))&&(console.log("geofence"),z.error(`Type: ${a==null?void 0:a.type} ${a==null?void 0:a.msg} ${a==null?void 0:a.imei}`,{id:"geofence",autoClose:5e3}))}),ie.on("speedAlert",a=>{(a==null?void 0:a.imei)!==null&&n.find(k=>parseInt(k)===(a==null?void 0:a.imei))&&z.error(`${a==null?void 0:a.msg} ${a==null?void 0:a.imei}`,{id:"speed",autoClose:5e3})})},[ie]);const C=async()=>{try{let a=[],S=[];const c=await l(ot({w_customer_id:t}));if(Array.isArray(c.payload)){c.payload.forEach(g=>{var A,D;Array.isArray(g.imei)&&g.imei.length>0?(a.push({id:g.id,label:g.registration_id,value:(A=g==null?void 0:g.imei[0])==null?void 0:A.mac_id}),S.push((D=g.imei[0])==null?void 0:D.mac_id)):(console.error("IMEI data not found for item:",g),z.error(`IMEI Number not found for the vehicle: ${g==null?void 0:g.registration_id}`))}),u(S);const k="one",I=S;S.length>0&&(l(rt({type:k,imei:I})),l(st(I))),y(a),l(nt({w_customer_id:t})),l(at({}))}else console.error("Unexpected data format:",c),z.error("Unexpected data format:")}catch(a){console.error("Error fetching vehicle data:",a),z.error(`Error fetching vehicle data: ${a}`)}};return e.jsxs("div",{className:"app",children:[e.jsx(lt,{}),e.jsxs("main",{className:"content",style:{width:"100%",background:"#dad6d626"},children:[e.jsx(Tt,{title:"Dashboard",showVehicles:p,setShowVehicles:f,setShowNotification:P,showNotification:h}),e.jsxs("div",{style:{height:"92vh",backgroundColor:x.grey[100],padding:"10px"},children:[p&&e.jsx(m,{sx:{position:"fixed",width:"250px",right:"0px",height:"90vh",zIndex:9999,backgroundColor:x.grey[100],overflowY:"auto",scrollBehavior:"smooth",scrollbarWidth:"thin"},children:e.jsx(To,{vehicleData:d})}),h&&e.jsx(m,{sx:{position:"fixed",width:"300px",right:"0px",height:"90vh",zIndex:9999,backgroundColor:x.grey[100]},children:e.jsx(_t,{})}),e.jsx(m,{sx:{height:"21%"},children:e.jsx(Mo,{imeiNo:n})}),e.jsxs(m,{sx:{display:"flex",height:"50%"},children:[e.jsx(m,{sx:{width:"50%",border:"1px solid #E8E8E8",padding:"2px",borderRadius:"5px"},children:e.jsx(Wo,{})}),e.jsx(m,{sx:{width:"50%"},children:e.jsx(Yo,{})})]}),e.jsxs(m,{sx:{display:"flex",height:"30%",mt:"5px",pt:"10px"},children:[e.jsx(m,{style:{width:"33%"},children:e.jsx(de,{title:"speed",selectedTripData:s})}),e.jsx(m,{style:{width:"33%"},children:e.jsx(de,{title:"mainInputVoltage",selectedTripData:s})}),e.jsx(m,{style:{width:"33%"},children:e.jsx(de,{title:"ignition",selectedTripData:s})})]})]})]})]})};export{br as default};