import{r as f,w as ee,j as h,a0 as O,a as E,am as ne,_ as H,t as A,T as L,P,M as Y,u as te,l as ae,m as oe,n as ie,o as le,v as re}from"./index-BLTSkyD3.js";import{_ as se,n as U,E as ce,e as F,D as q,g as de,m as he,u as I,r as ue,Q as ge,T as pe,C as fe,I as me,z as be,L as Se}from"./LightModeOutlined-CV0nfEuY.js";import{t as R}from"./Search-B221YW2R.js";import{T as ve}from"./TopBar-2oyrhlg-.js";import{V as xe}from"./VehicleMenu-CaNsONMR.js";import{d as z,S as we,D as ye}from"./index-CN_OjuCk.js";import{B as j,C as Ce}from"./CircularProgress-BkiAViEu.js";import{W as $e,L as ke}from"./button-BPQQeUi4.js";import{c as V}from"./roundedArrow-CWX4A8Lm.js";import{C as Ie}from"./index-ppFs2Y8g.js";import{c as je,t as _,b as B,T as De,a as Ee,d as Me}from"./TableRow-Bw5NLcyl.js";import{P as Te}from"./Paper-j9WU9A90.js";import{T as Ae}from"./TableHead-GSo2ZgTg.js";import"./createSvgIcon-BjDhD_1D.js";import"./IconButton-C-3Pc1cI.js";import"./NotificationsNone-Bm49Ih5H.js";import"./OutlinedInput-BdnXUG3S.js";var He=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],X=f.forwardRef(function(e,a){var l,o=e.prefixCls,g=o===void 0?"rc-switch":o,u=e.className,i=e.checked,d=e.defaultChecked,r=e.disabled,n=e.loadingIcon,t=e.checkedChildren,c=e.unCheckedChildren,s=e.onClick,p=e.onChange,b=e.onKeyDown,y=se(e,He),m=U(!1,{value:i,defaultValue:d}),$=ce(m,2),x=$[0],v=$[1];function D(w,k){var C=x;return r||(C=w,v(C),p==null||p(C,k)),C}function M(w){w.which===V.LEFT?D(!1,w):w.which===V.RIGHT&&D(!0,w),b==null||b(w)}function S(w){var k=D(!x,w);s==null||s(k,w)}var T=F(g,u,(l={},q(l,"".concat(g,"-checked"),x),q(l,"".concat(g,"-disabled"),r),l));return f.createElement("button",ee({},y,{type:"button",role:"switch","aria-checked":x,disabled:r,className:T,ref:a,onKeyDown:M,onClick:S}),n,f.createElement("span",{className:"".concat(g,"-inner")},f.createElement("span",{className:"".concat(g,"-inner-checked")},t),f.createElement("span",{className:"".concat(g,"-inner-unchecked")},c)))});X.displayName="Switch";const Oe=e=>{const{componentCls:a,trackHeightSM:l,trackPadding:o,trackMinWidthSM:g,innerMinMarginSM:u,innerMaxMarginSM:i,handleSizeSM:d,calc:r}=e,n=`${a}-inner`,t=I(r(d).add(r(o).mul(2)).equal()),c=I(r(i).mul(2).equal());return{[a]:{[`&${a}-small`]:{minWidth:g,height:l,lineHeight:I(l),[`${a}-inner`]:{paddingInlineStart:i,paddingInlineEnd:u,[`${n}-checked`]:{marginInlineStart:`calc(-100% + ${t} - ${c})`,marginInlineEnd:`calc(100% - ${t} + ${c})`},[`${n}-unchecked`]:{marginTop:r(l).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`${a}-handle`]:{width:d,height:d},[`${a}-loading-icon`]:{top:r(r(d).sub(e.switchLoadingIconSize)).div(2).equal(),fontSize:e.switchLoadingIconSize},[`&${a}-checked`]:{[`${a}-inner`]:{paddingInlineStart:u,paddingInlineEnd:i,[`${n}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${n}-unchecked`]:{marginInlineStart:`calc(100% - ${t} + ${c})`,marginInlineEnd:`calc(-100% + ${t} - ${c})`}},[`${a}-handle`]:{insetInlineStart:`calc(100% - ${I(r(d).add(o).equal())})`}},[`&:not(${a}-disabled):active`]:{[`&:not(${a}-checked) ${n}`]:{[`${n}-unchecked`]:{marginInlineStart:r(e.marginXXS).div(2).equal(),marginInlineEnd:r(e.marginXXS).mul(-1).div(2).equal()}},[`&${a}-checked ${n}`]:{[`${n}-checked`]:{marginInlineStart:r(e.marginXXS).mul(-1).div(2).equal(),marginInlineEnd:r(e.marginXXS).div(2).equal()}}}}}}},Re=e=>{const{componentCls:a,handleSize:l,calc:o}=e;return{[a]:{[`${a}-loading-icon${e.iconCls}`]:{position:"relative",top:o(o(l).sub(e.fontSize)).div(2).equal(),color:e.switchLoadingIconColor,verticalAlign:"top"},[`&${a}-checked ${a}-loading-icon`]:{color:e.switchColor}}}},Ne=e=>{const{componentCls:a,trackPadding:l,handleBg:o,handleShadow:g,handleSize:u,calc:i}=e,d=`${a}-handle`;return{[a]:{[d]:{position:"absolute",top:l,insetInlineStart:l,width:u,height:u,transition:`all ${e.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:o,borderRadius:i(u).div(2).equal(),boxShadow:g,transition:`all ${e.switchDuration} ease-in-out`,content:'""'}},[`&${a}-checked ${d}`]:{insetInlineStart:`calc(100% - ${I(i(u).add(l).equal())})`},[`&:not(${a}-disabled):active`]:{[`${d}::before`]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},[`&${a}-checked ${d}::before`]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}}}},Le=e=>{const{componentCls:a,trackHeight:l,trackPadding:o,innerMinMargin:g,innerMaxMargin:u,handleSize:i,calc:d}=e,r=`${a}-inner`,n=I(d(i).add(d(o).mul(2)).equal()),t=I(d(u).mul(2).equal());return{[a]:{[r]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:u,paddingInlineEnd:g,transition:`padding-inline-start ${e.switchDuration} ease-in-out, padding-inline-end ${e.switchDuration} ease-in-out`,[`${r}-checked, ${r}-unchecked`]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:`margin-inline-start ${e.switchDuration} ease-in-out, margin-inline-end ${e.switchDuration} ease-in-out`,pointerEvents:"none"},[`${r}-checked`]:{marginInlineStart:`calc(-100% + ${n} - ${t})`,marginInlineEnd:`calc(100% - ${n} + ${t})`},[`${r}-unchecked`]:{marginTop:d(l).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`&${a}-checked ${r}`]:{paddingInlineStart:g,paddingInlineEnd:u,[`${r}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${r}-unchecked`]:{marginInlineStart:`calc(100% - ${n} + ${t})`,marginInlineEnd:`calc(-100% + ${n} - ${t})`}},[`&:not(${a}-disabled):active`]:{[`&:not(${a}-checked) ${r}`]:{[`${r}-unchecked`]:{marginInlineStart:d(o).mul(2).equal(),marginInlineEnd:d(o).mul(-1).mul(2).equal()}},[`&${a}-checked ${r}`]:{[`${r}-checked`]:{marginInlineStart:d(o).mul(-1).mul(2).equal(),marginInlineEnd:d(o).mul(2).equal()}}}}}},Pe=e=>{const{componentCls:a,trackHeight:l,trackMinWidth:o}=e;return{[a]:Object.assign(Object.assign(Object.assign(Object.assign({},ue(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:o,height:l,lineHeight:`${I(l)}`,verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${e.motionDurationMid}`,userSelect:"none",[`&:hover:not(${a}-disabled)`]:{background:e.colorTextTertiary}}),ge(e)),{[`&${a}-checked`]:{background:e.switchColor,[`&:hover:not(${a}-disabled)`]:{background:e.colorPrimaryHover}},[`&${a}-loading, &${a}-disabled`]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${a}-rtl`]:{direction:"rtl"}})}},ze=e=>{const{fontSize:a,lineHeight:l,controlHeight:o,colorWhite:g}=e,u=a*l,i=o/2,d=2,r=u-d*2,n=i-d*2;return{trackHeight:u,trackHeightSM:i,trackMinWidth:r*2+d*4,trackMinWidthSM:n*2+d*2,trackPadding:d,handleBg:g,handleSize:r,handleSizeSM:n,handleShadow:`0 2px 4px 0 ${new pe("#00230b").setAlpha(.2).toRgbString()}`,innerMinMargin:r/2,innerMaxMargin:r+d+d*2,innerMinMarginSM:n/2,innerMaxMarginSM:n+d+d*2}},Ye=de("Switch",e=>{const a=he(e,{switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchLoadingIconSize:e.calc(e.fontSizeIcon).mul(.75).equal(),switchLoadingIconColor:`rgba(0, 0, 0, ${e.opacityLoading})`,switchHandleActiveInset:"-30%"});return[Pe(a),Le(a),Ne(a),Re(a),Oe(a)]},ze);var qe=function(e,a){var l={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&a.indexOf(o)<0&&(l[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var g=0,o=Object.getOwnPropertySymbols(e);g<o.length;g++)a.indexOf(o[g])<0&&Object.prototype.propertyIsEnumerable.call(e,o[g])&&(l[o[g]]=e[o[g]]);return l};const K=f.forwardRef((e,a)=>{const{prefixCls:l,size:o,disabled:g,loading:u,className:i,rootClassName:d,style:r,checked:n,value:t,defaultChecked:c,defaultValue:s,onChange:p}=e,b=qe(e,["prefixCls","size","disabled","loading","className","rootClassName","style","checked","value","defaultChecked","defaultValue","onChange"]),[y,m]=U(!1,{value:n??t,defaultValue:c??s}),{getPrefixCls:$,direction:x,switch:v}=f.useContext(fe),D=f.useContext(me),M=(g??D)||u,S=$("switch",l),T=f.createElement("div",{className:`${S}-handle`},u&&f.createElement(ke,{className:`${S}-loading-icon`})),[w,k,C]=Ye(S),N=be(o),Q=F(v==null?void 0:v.className,{[`${S}-small`]:N==="small",[`${S}-loading`]:u,[`${S}-rtl`]:x==="rtl"},i,d,k,C),J=Object.assign(Object.assign({},v==null?void 0:v.style),r),Z=function(){m(arguments.length<=0?void 0:arguments[0]),p==null||p.apply(void 0,arguments)};return w(f.createElement($e,{component:"Switch"},f.createElement(X,Object.assign({},b,{checked:y,onChange:Z,prefixCls:S,className:Q,style:J,disabled:M,ref:a,loadingIcon:T}))))});K.__ANT_SWITCH=!0;const Ve=K,{RangePicker:W}=ye,_e=()=>{const e=z(),a=e.startOf("day"),l=e.endOf("day");return{defaultStartDate:a,defaultEndDate:l,defaultStartDateString:a.format("MM/DD/YYYY HH:mm:ss"),defaultEndDateString:l.format("MM/DD/YYYY HH:mm:ss")}},Be=({setEndDate:e,setStartDate:a,selectedDate:l})=>{const[o,g]=f.useState(_e()),[u,i]=f.useState([o.defaultStartDate,o.defaultEndDate]);f.useEffect(()=>{if(l){const n=z(),t=n.startOf("day").format("MM/DD/YYYY HH:mm:ss"),c=n.endOf("day").format("MM/DD/YYYY HH:mm:ss");a(t),e(c),i([n.startOf("day"),n.endOf("day")]),console.log(t,"defaultStartDateString"),console.log(c,"defaultEndDateString")}else a(o.defaultStartDateString),e(o.defaultEndDateString),i([o.defaultStartDate,o.defaultEndDate])},[l]);const d=(n,t)=>{n?(a(t[0]),e(t[1]),i(n)):(a(null),e(null),i([]),console.log("Clear date"))},r=n=>n&&n>z().endOf("day");return h.jsx(we,{direction:"vertical",size:12,children:l?h.jsx(W,{showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",onChange:d,disabledDate:r,value:u,disabled:!0,style:{color:"red"}}):h.jsx(W,{showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",onChange:d,disabledDate:r,value:u})})},We=Be;var G={exports:{}};(function(e,a){(function(l,o){o()})(O,function(){function l(n,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob(["\uFEFF",n],{type:n.type}):n}function o(n,t,c){var s=new XMLHttpRequest;s.open("GET",n),s.responseType="blob",s.onload=function(){r(s.response,t,c)},s.onerror=function(){console.error("could not download file")},s.send()}function g(n){var t=new XMLHttpRequest;t.open("HEAD",n,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function u(n){try{n.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),n.dispatchEvent(t)}}var i=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof O=="object"&&O.global===O?O:void 0,d=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=i.saveAs||(typeof window!="object"||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!d?function(n,t,c){var s=i.URL||i.webkitURL,p=document.createElement("a");t=t||n.name||"download",p.download=t,p.rel="noopener",typeof n=="string"?(p.href=n,p.origin===location.origin?u(p):g(p.href)?o(n,t,c):u(p,p.target="_blank")):(p.href=s.createObjectURL(n),setTimeout(function(){s.revokeObjectURL(p.href)},4e4),setTimeout(function(){u(p)},0))}:"msSaveOrOpenBlob"in navigator?function(n,t,c){if(t=t||n.name||"download",typeof n!="string")navigator.msSaveOrOpenBlob(l(n,c),t);else if(g(n))o(n,t,c);else{var s=document.createElement("a");s.href=n,s.target="_blank",setTimeout(function(){u(s)})}}:function(n,t,c,s){if(s=s||open("","_blank"),s&&(s.document.title=s.document.body.innerText="downloading..."),typeof n=="string")return o(n,t,c);var p=n.type==="application/octet-stream",b=/constructor/i.test(i.HTMLElement)||i.safari,y=/CriOS\/[\d]+/.test(navigator.userAgent);if((y||p&&b||d)&&typeof FileReader<"u"){var m=new FileReader;m.onloadend=function(){var v=m.result;v=y?v:v.replace(/^data:[^;]*;/,"data:attachment/file;"),s?s.location.href=v:location=v,s=null},m.readAsDataURL(n)}else{var $=i.URL||i.webkitURL,x=$.createObjectURL(n);s?s.location=x:location.href=x,s=null,setTimeout(function(){$.revokeObjectURL(x)},4e4)}});i.saveAs=r.saveAs=r,e.exports=r})})(G);var Ue=G.exports;const Fe="http://139.59.37.47:3031";function Xe({showCard:e}){var M;const{mode:a}=E(S=>S.dashboard),{selectedVehicle:l,imeiNumbers:o}=E(S=>S.liveMap),[g,u]=f.useState(),[i,d]=f.useState(),[r,n]=f.useState(!0),[t,c]=f.useState({}),[s,p]=f.useState(!1),[b,y]=f.useState(!0),[m,$]=f.useState();let x=R(a);f.useEffect(()=>{l&&Object.keys(l).length>0&&r&&i&&!b&&v()},[l,i]),f.useEffect(()=>{b&&(o==null?void 0:o.length)>0&&i&&!(m!=null&&m.length)>0&&v()},[b,i,o]);const v=async()=>{var S,T,w;try{p(!0);const k={imei:b?o:[l==null?void 0:l.imei],startDate:g,endDate:i},C=await ne.post(`${Fe}/ccServer/location/getReport`,k),N=((T=(S=C==null?void 0:C.data)==null?void 0:S.data)==null?void 0:T[0].data)||{};b?$((w=C==null?void 0:C.data)==null?void 0:w.data):c(N)}catch(k){console.error(k),H.error("Failed to fetch report data.")}finally{p(!1)}},D={background:r?"white":"transparent",color:r?"black":"white",padding:"5px",border:"1px solid white",borderRadius:"5px",fontWeight:"400"};return h.jsxs(h.Fragment,{children:[e&&h.jsxs(j,{sx:{bgcolor:A.bgColor,position:"relative",color:"white",display:"flex",alignItems:"center",justifyContent:"left",overflowX:"hidden",flexWrap:"wrap",border:"1px solid white",height:"60px",gap:"15px"},children:[h.jsxs(h.Fragment,{children:[h.jsx(Ve,{disabled:Object.keys(l).length===0,defaultChecked:b,onChange:()=>{var S;((S=Object.keys(l))==null?void 0:S.length)!==0?(y(!b),n(!r)):H.error("Please Select A Vehicle")}}),h.jsx(L,{sx:D,children:b?"Individual":"All Vehicle"})]}),h.jsx(We,{setStartDate:u,setEndDate:d,selectedDate:r,individual:b}),h.jsx(P,{disabled:r,sx:{color:"black",background:"white","&:hover":{color:"white"}},onClick:()=>{Object.keys(l).length>0?v():H.error("Please Select Vehicle.")},children:"Generate-Report"})]}),h.jsx(j,{sx:{display:"flex",width:"100%",height:"90vh",justifyContent:"center",alignItems:"center"},children:s?h.jsx(Ie,{style:{background:x.grey[200]},children:h.jsx(Ce,{})}):!b&&((M=Object.keys(l))==null?void 0:M.length)>0?h.jsx(Ke,{item:t,loading:s,setLoading:p}):h.jsx(Ge,{vehicleReport:m})})]})}const Ke=({item:e,loading:a,setLoading:l})=>{const{selectedVehicle:o}=E(t=>t.liveMap),{mode:g}=E(t=>t.dashboard);let u=R(g);const i=()=>{l(!0);const t=n.map(s=>`${s.label}: ${s.value}`).join(`
`),c=new Blob([t],{type:"text/plain;charset=utf-8"});Ue.saveAs(c,"table_content.txt"),l(!1)},d=()=>{const t=document.createElement("a"),c=document.createElement("canvas"),s=c.getContext("2d");c.width=500,c.height=250,s.fillStyle="white",s.fillRect(0,0,c.width,c.height),s.fillStyle="black",s.font="16px Arial";let p=20;n.forEach(y=>{s.fillText(y.label,10,p),s.fillText(y.value,150,p),p+=20});const b=c.toDataURL("image/png");t.href=b,t.download="table_content.png",document.body.appendChild(t),t.click(),document.body.removeChild(t)},r={display:"flex",justifyContent:"space-between",textAlign:"center",height:"40px",background:u.grey[100],padding:"14px",margin:"4px",border:`1px solid ${u.grey[300]}`,borderRadius:"5px",color:u.grey[400],fontWeight:"600","&:hover":{background:u.grey[200]}},n=[{label:"Vehicle IMEI",value:o==null?void 0:o.imei},{label:"Vehicle Number",value:o==null?void 0:o.reg_id},{label:"Total Distance",value:e.totalDistance},{label:"Total Time",value:e.totalTime},{label:"Average Speed",value:e.averageSpeed},{label:"Over Speeding",value:"NA"},{label:"Harsh Break",value:"NA"},{label:"Rash Turn",value:"NA"}];return h.jsxs(j,{sx:{width:"98%",height:"82vh"},children:[n.map((t,c)=>h.jsxs(j,{sx:r,children:[h.jsx(L,{children:t.label}),h.jsx(L,{children:t!=null&&t.value?t==null?void 0:t.value:"NA"})]},c)),h.jsx(P,{onClick:i,disabled:a,sx:{background:A.bgColor,color:"white",m:"4px","&:hover":{background:A.bgShadow,color:"black"}},children:a?"Downloading...":"Download In Text"}),h.jsx(P,{onClick:d,sx:{background:A.bgShadow,color:"black",m:"4px","&:hover":{background:A.bgColor,color:"white"}},children:"Download as Image"})]})},Ge=({vehicleReport:e})=>{const{mode:a}=E(i=>i.dashboard);let l=R(a);const o=Y(je)(({theme:i})=>({[`&.${_.head}`]:{backgroundColor:l.grey[200]},color:l.grey[400],[`&.${_.body}`]:{fontSize:14}})),g=Y(B)(({theme:i})=>({"&:nth-of-type(odd)":{backgroundColor:l.grey[100]},"&:hover":{backgroundColor:A.bgShadow},"&:last-child td, &:last-child th":{border:0}})),u=["Vehicle IMEI","Total Distance","Total Time","Average Speed","Over Speeding","Harsh Break","Rash Turn"];return h.jsx(De,{sx:{width:"98%",height:"82vh",scrollBehavior:"smooth",scrollbarWidth:"thin",background:l.grey[500]},component:Te,children:h.jsxs(Ee,{sx:{minWidth:500},"aria-label":"customized table",children:[h.jsx(Ae,{style:{position:"sticky",top:0},children:h.jsx(B,{children:u==null?void 0:u.map((i,d)=>h.jsx(o,{children:i},d))})}),h.jsx(Me,{children:e==null?void 0:e.map((i,d)=>{var r,n,t,c,s,p;return h.jsxs(g,{children:[h.jsx(o,{component:"th",scope:"row",children:i==null?void 0:i.imei}),h.jsx(o,{children:(r=i==null?void 0:i.data)!=null&&r.totalDistance?(n=i==null?void 0:i.data)==null?void 0:n.totalDistance:"NA"}),h.jsx(o,{children:(t=i==null?void 0:i.data)!=null&&t.totalTime?(c=i==null?void 0:i.data)==null?void 0:c.totalTime:"NA"}),h.jsx(o,{children:(s=i==null?void 0:i.data)!=null&&s.averageSpeed?(p=i==null?void 0:i.data)==null?void 0:p.averageSpeed:"NA"}),h.jsx(o,{children:" NA"}),h.jsx(o,{children:"NA "}),h.jsx(o,{children:" NA"})]},d)})})]})})};function fn(){const{mode:e}=E(c=>c.dashboard),{w_customer_id:a}=E(c=>c.auth),[l,o]=f.useState(!1),[g,u]=f.useState([]),[i,d]=f.useState(!0),r=R(e);let n=te();f.useEffect(()=>{t()},[]);const t=async()=>{try{let c=[],s=[];const p=await n(ae({w_customer_id:a}));if(Array.isArray(p.payload)){p.payload.forEach(m=>{var $,x;Array.isArray(m.imei)&&m.imei.length>0?(c.push({id:m.id,label:m.registration_id,value:($=m==null?void 0:m.imei[0])==null?void 0:$.mac_id}),s.push((x=m.imei[0])==null?void 0:x.mac_id)):(console.error("IMEI data not found for item:",m),H.error(`IMEI Number not found for the vehicle: ${m==null?void 0:m.registration_id}`))});const b="one",y=s;s.length>0&&(n(oe({type:b,imei:y})),n(ie(y))),u(c),n(le({w_customer_id:a})),n(re({}))}else console.error("Unexpected data format:",p),H.error("Unexpected data format:")}catch(c){console.error("Error fetching vehicle data:",c),H.error(`Error fetching vehicle data: ${c}`)}};return h.jsxs("div",{className:"app",children:[h.jsx(Se,{}),h.jsxs("main",{className:"content",style:{width:"100%",background:r.grey[100]},children:[h.jsx(ve,{title:"Report",showVehicles:l,setShowVehicles:o}),h.jsxs(j,{style:{display:"flex",width:"100%",height:"95vh"},children:[h.jsx(j,{style:{display:"flex",width:"100%",height:"95vh"},children:h.jsx(j,{style:{width:l?"85%":"100%"},children:h.jsx(Xe,{showCard:i})})}),l&&h.jsx(j,{sx:{position:"fixed",width:"250px",right:"0px",height:"90vh",zIndex:9999,backgroundColor:r.grey[100]},children:h.jsx(xe,{vehicleData:g})})]})]})]})}export{fn as default};