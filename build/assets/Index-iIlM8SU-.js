import{r as m,w as Z,j as p,a0 as R,a as E,ar as ee,_ as j,t as T,T as H,P as L,u as te,l as ne,m as ae,n as oe,o as ie,v as le}from"./index-ImRGZxZ3.js";import{_ as re,n as W,E as se,e as B,D as z,g as ce,m as de,u as k,r as he,Q as ue,T as ge,C as pe,I as fe,z as me,L as be}from"./LightModeOutlined-Bm82HmS9.js";import{t as P}from"./Search-CqS6wYQA.js";import{T as Se}from"./TopBar-ByOyLuKI.js";import{V as xe}from"./VehicleMenu-SsnahKYn.js";import{d as N,S as ve,D as we}from"./index-B1uKzKmB.js";import{B as C,C as ye}from"./CircularProgress-C4L2CX71.js";import{W as Ce,L as $e}from"./button-CLCxN-li.js";import{c as Y}from"./roundedArrow-DWYdho3l.js";import{C as q}from"./index-CYDuYZoL.js";import"./createSvgIcon-BrWK8oXA.js";import"./IconButton-BiThzxaF.js";import"./NotificationsNone-Bp1nPhXq.js";import"./OutlinedInput-B4IOSYvQ.js";var ke=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],U=m.forwardRef(function(e,n){var o,a=e.prefixCls,g=a===void 0?"rc-switch":a,d=e.className,u=e.checked,r=e.defaultChecked,c=e.disabled,t=e.loadingIcon,l=e.checkedChildren,i=e.unCheckedChildren,s=e.onClick,h=e.onChange,b=e.onKeyDown,S=re(e,ke),f=W(!1,{value:u,defaultValue:r}),w=se(f,2),x=w[0],v=w[1];function I(y,M){var D=x;return c||(D=y,v(D),h==null||h(D,M)),D}function O(y){y.which===Y.LEFT?I(!1,y):y.which===Y.RIGHT&&I(!0,y),b==null||b(y)}function $(y){var M=I(!x,y);s==null||s(M,y)}var A=B(g,d,(o={},z(o,"".concat(g,"-checked"),x),z(o,"".concat(g,"-disabled"),c),o));return m.createElement("button",Z({},S,{type:"button",role:"switch","aria-checked":x,disabled:c,className:A,ref:n,onKeyDown:O,onClick:$}),t,m.createElement("span",{className:"".concat(g,"-inner")},m.createElement("span",{className:"".concat(g,"-inner-checked")},l),m.createElement("span",{className:"".concat(g,"-inner-unchecked")},i)))});U.displayName="Switch";const Ie=e=>{const{componentCls:n,trackHeightSM:o,trackPadding:a,trackMinWidthSM:g,innerMinMarginSM:d,innerMaxMarginSM:u,handleSizeSM:r,calc:c}=e,t=`${n}-inner`,l=k(c(r).add(c(a).mul(2)).equal()),i=k(c(u).mul(2).equal());return{[n]:{[`&${n}-small`]:{minWidth:g,height:o,lineHeight:k(o),[`${n}-inner`]:{paddingInlineStart:u,paddingInlineEnd:d,[`${t}-checked`]:{marginInlineStart:`calc(-100% + ${l} - ${i})`,marginInlineEnd:`calc(100% - ${l} + ${i})`},[`${t}-unchecked`]:{marginTop:c(o).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:r,height:r},[`${n}-loading-icon`]:{top:c(c(r).sub(e.switchLoadingIconSize)).div(2).equal(),fontSize:e.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:d,paddingInlineEnd:u,[`${t}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${t}-unchecked`]:{marginInlineStart:`calc(100% - ${l} + ${i})`,marginInlineEnd:`calc(-100% + ${l} - ${i})`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${k(c(r).add(a).equal())})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${t}`]:{[`${t}-unchecked`]:{marginInlineStart:c(e.marginXXS).div(2).equal(),marginInlineEnd:c(e.marginXXS).mul(-1).div(2).equal()}},[`&${n}-checked ${t}`]:{[`${t}-checked`]:{marginInlineStart:c(e.marginXXS).mul(-1).div(2).equal(),marginInlineEnd:c(e.marginXXS).div(2).equal()}}}}}}},De=e=>{const{componentCls:n,handleSize:o,calc:a}=e;return{[n]:{[`${n}-loading-icon${e.iconCls}`]:{position:"relative",top:a(a(o).sub(e.fontSize)).div(2).equal(),color:e.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:e.switchColor}}}},je=e=>{const{componentCls:n,trackPadding:o,handleBg:a,handleShadow:g,handleSize:d,calc:u}=e,r=`${n}-handle`;return{[n]:{[r]:{position:"absolute",top:o,insetInlineStart:o,width:d,height:d,transition:`all ${e.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:a,borderRadius:u(d).div(2).equal(),boxShadow:g,transition:`all ${e.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${r}`]:{insetInlineStart:`calc(100% - ${k(u(d).add(o).equal())})`},[`&:not(${n}-disabled):active`]:{[`${r}::before`]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${r}::before`]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}}}},Ee=e=>{const{componentCls:n,trackHeight:o,trackPadding:a,innerMinMargin:g,innerMaxMargin:d,handleSize:u,calc:r}=e,c=`${n}-inner`,t=k(r(u).add(r(a).mul(2)).equal()),l=k(r(d).mul(2).equal());return{[n]:{[c]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:d,paddingInlineEnd:g,transition:`padding-inline-start ${e.switchDuration} ease-in-out, padding-inline-end ${e.switchDuration} ease-in-out`,[`${c}-checked, ${c}-unchecked`]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:`margin-inline-start ${e.switchDuration} ease-in-out, margin-inline-end ${e.switchDuration} ease-in-out`,pointerEvents:"none"},[`${c}-checked`]:{marginInlineStart:`calc(-100% + ${t} - ${l})`,marginInlineEnd:`calc(100% - ${t} + ${l})`},[`${c}-unchecked`]:{marginTop:r(o).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${c}`]:{paddingInlineStart:g,paddingInlineEnd:d,[`${c}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${c}-unchecked`]:{marginInlineStart:`calc(100% - ${t} + ${l})`,marginInlineEnd:`calc(-100% + ${t} - ${l})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${c}`]:{[`${c}-unchecked`]:{marginInlineStart:r(a).mul(2).equal(),marginInlineEnd:r(a).mul(-1).mul(2).equal()}},[`&${n}-checked ${c}`]:{[`${c}-checked`]:{marginInlineStart:r(a).mul(-1).mul(2).equal(),marginInlineEnd:r(a).mul(2).equal()}}}}}},Me=e=>{const{componentCls:n,trackHeight:o,trackMinWidth:a}=e;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},he(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:a,height:o,lineHeight:`${k(o)}`,verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${e.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:e.colorTextTertiary}}),ue(e)),{[`&${n}-checked`]:{background:e.switchColor,[`&:hover:not(${n}-disabled)`]:{background:e.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},Re=e=>{const{fontSize:n,lineHeight:o,controlHeight:a,colorWhite:g}=e,d=n*o,u=a/2,r=2,c=d-r*2,t=u-r*2;return{trackHeight:d,trackHeightSM:u,trackMinWidth:c*2+r*4,trackMinWidthSM:t*2+r*2,trackPadding:r,handleBg:g,handleSize:c,handleSizeSM:t,handleShadow:`0 2px 4px 0 ${new ge("#00230b").setAlpha(.2).toRgbString()}`,innerMinMargin:c/2,innerMaxMargin:c+r+r*2,innerMinMarginSM:t/2,innerMaxMarginSM:t+r+r*2}},Te=ce("Switch",e=>{const n=de(e,{switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchLoadingIconSize:e.calc(e.fontSizeIcon).mul(.75).equal(),switchLoadingIconColor:`rgba(0, 0, 0, ${e.opacityLoading})`,switchHandleActiveInset:"-30%"});return[Me(n),Ee(n),je(n),De(n),Ie(n)]},Re);var He=function(e,n){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var g=0,a=Object.getOwnPropertySymbols(e);g<a.length;g++)n.indexOf(a[g])<0&&Object.prototype.propertyIsEnumerable.call(e,a[g])&&(o[a[g]]=e[a[g]]);return o};const F=m.forwardRef((e,n)=>{const{prefixCls:o,size:a,disabled:g,loading:d,className:u,rootClassName:r,style:c,checked:t,value:l,defaultChecked:i,defaultValue:s,onChange:h}=e,b=He(e,["prefixCls","size","disabled","loading","className","rootClassName","style","checked","value","defaultChecked","defaultValue","onChange"]),[S,f]=W(!1,{value:t??l,defaultValue:i??s}),{getPrefixCls:w,direction:x,switch:v}=m.useContext(pe),I=m.useContext(fe),O=(g??I)||d,$=w("switch",o),A=m.createElement("div",{className:`${$}-handle`},d&&m.createElement($e,{className:`${$}-loading-icon`})),[y,M,D]=Te($),K=me(a),G=B(v==null?void 0:v.className,{[`${$}-small`]:K==="small",[`${$}-loading`]:d,[`${$}-rtl`]:x==="rtl"},u,r,M,D),Q=Object.assign(Object.assign({},v==null?void 0:v.style),c),J=function(){f(arguments.length<=0?void 0:arguments[0]),h==null||h.apply(void 0,arguments)};return y(m.createElement(Ce,{component:"Switch"},m.createElement(U,Object.assign({},b,{checked:S,onChange:J,prefixCls:$,className:G,style:Q,disabled:O,ref:n,loadingIcon:A}))))});F.__ANT_SWITCH=!0;const _=F,{RangePicker:V}=we,Oe=()=>{const e=N(),n=e.startOf("day"),o=e.endOf("day");return{defaultStartDate:n,defaultEndDate:o,defaultStartDateString:n.format("MM/DD/YYYY HH:mm:ss"),defaultEndDateString:o.format("MM/DD/YYYY HH:mm:ss")}},Ae=({setEndDate:e,setStartDate:n,selectedDate:o})=>{const[a,g]=m.useState(Oe()),[d,u]=m.useState([a.defaultStartDate,a.defaultEndDate]);m.useEffect(()=>{if(o){const t=N(),l=t.startOf("day").format("MM/DD/YYYY HH:mm:ss"),i=t.endOf("day").format("MM/DD/YYYY HH:mm:ss");n(l),e(i),u([t.startOf("day"),t.endOf("day")]),console.log(l,"defaultStartDateString"),console.log(i,"defaultEndDateString")}else n(a.defaultStartDateString),e(a.defaultEndDateString),u([a.defaultStartDate,a.defaultEndDate])},[o]);const r=(t,l)=>{t?(n(l[0]),e(l[1]),u(t)):(n(null),e(null),u([]),console.log("Clear date"))},c=t=>t&&t>N().endOf("day");return p.jsx(ve,{direction:"vertical",size:12,children:o?p.jsx(V,{showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",onChange:r,disabledDate:c,value:d,disabled:!0,style:{color:"white",padding:"8px"}}):p.jsx(V,{showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",onChange:r,disabledDate:c,value:d,style:{padding:"8px"}})})},Le=Ae;var X={exports:{}};(function(e,n){(function(o,a){a()})(R,function(){function o(t,l){return typeof l>"u"?l={autoBom:!1}:typeof l!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),l={autoBom:!l}),l.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\uFEFF",t],{type:t.type}):t}function a(t,l,i){var s=new XMLHttpRequest;s.open("GET",t),s.responseType="blob",s.onload=function(){c(s.response,l,i)},s.onerror=function(){console.error("could not download file")},s.send()}function g(t){var l=new XMLHttpRequest;l.open("HEAD",t,!1);try{l.send()}catch{}return 200<=l.status&&299>=l.status}function d(t){try{t.dispatchEvent(new MouseEvent("click"))}catch{var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(l)}}var u=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof R=="object"&&R.global===R?R:void 0,r=u.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=u.saveAs||(typeof window!="object"||window!==u?function(){}:"download"in HTMLAnchorElement.prototype&&!r?function(t,l,i){var s=u.URL||u.webkitURL,h=document.createElement("a");l=l||t.name||"download",h.download=l,h.rel="noopener",typeof t=="string"?(h.href=t,h.origin===location.origin?d(h):g(h.href)?a(t,l,i):d(h,h.target="_blank")):(h.href=s.createObjectURL(t),setTimeout(function(){s.revokeObjectURL(h.href)},4e4),setTimeout(function(){d(h)},0))}:"msSaveOrOpenBlob"in navigator?function(t,l,i){if(l=l||t.name||"download",typeof t!="string")navigator.msSaveOrOpenBlob(o(t,i),l);else if(g(t))a(t,l,i);else{var s=document.createElement("a");s.href=t,s.target="_blank",setTimeout(function(){d(s)})}}:function(t,l,i,s){if(s=s||open("","_blank"),s&&(s.document.title=s.document.body.innerText="downloading..."),typeof t=="string")return a(t,l,i);var h=t.type==="application/octet-stream",b=/constructor/i.test(u.HTMLElement)||u.safari,S=/CriOS\/[\d]+/.test(navigator.userAgent);if((S||h&&b||r)&&typeof FileReader<"u"){var f=new FileReader;f.onloadend=function(){var v=f.result;v=S?v:v.replace(/^data:[^;]*;/,"data:attachment/file;"),s?s.location.href=v:location=v,s=null},f.readAsDataURL(t)}else{var w=u.URL||u.webkitURL,x=w.createObjectURL(t);s?s.location=x:location.href=x,s=null,setTimeout(function(){w.revokeObjectURL(x)},4e4)}});u.saveAs=c.saveAs=c,e.exports=c})})(X);var Ne=X.exports;const Pe="http://139.59.37.47:3031";function ze({showCard:e}){const{mode:n}=E(w=>w.dashboard),{selectedVehicle:o}=E(w=>w.liveMap),[a,g]=m.useState(),[d,u]=m.useState(),[r,c]=m.useState(!0),[t,l]=m.useState(!0),[i,s]=m.useState({}),[h,b]=m.useState(!1);let S=P(n);m.useEffect(()=>{console.log(a,"startDate"),console.log(d,"endDate")},[d]),m.useEffect(()=>{o&&Object.keys(o).length>0&&r&&d&&f()},[o,d,t]);const f=async()=>{var w;try{b(!0);const x={imei:[o==null?void 0:o.imei],startDate:a,endDate:d,type:t?"fastest":"latest"};console.log("fastestReport",t),console.log(x,"payload");const v=await ee.post(`${Pe}/ccServer/location/getReport`,x),I=((w=v==null?void 0:v.data)==null?void 0:w.data)||{};s(I)}catch(x){console.error(x),j.error("Failed to fetch report data.")}finally{b(!1)}};return p.jsxs(p.Fragment,{children:[e&&p.jsxs(C,{sx:{bgcolor:T.bgColor,position:"relative",color:"white",display:"flex",alignItems:"center",justifyContent:"left",overflowX:"hidden",flexWrap:"wrap",border:"1px solid white",height:"60px",gap:"15px"},children:[p.jsxs(C,{sx:{display:"flex",alignItems:"center",border:"1px solid white",padding:"3px",borderRadius:"8px",ml:"5px"},children:[p.jsx(_,{defaultChecked:r,onChange:()=>c(!r)}),p.jsx(H,{sx:{color:r?"white":"black",padding:"5px",borderRadius:"5px",fontWeight:"500"},children:r?"Today's Report":"Select Date-Time"})]}),p.jsxs(C,{sx:{display:"flex",alignItems:"center",border:"1px solid white",padding:"3px",borderRadius:"8px",ml:"5px"},children:[p.jsx(_,{disabled:Object.keys(o).length===0,defaultChecked:!t,onChange:()=>{Object.keys(o).length>0?l(!t):j.error("Please Select Vehicle.")}}),p.jsx(H,{sx:{color:t?"white":"black",padding:"5px",borderRadius:"5px",fontWeight:"500"},children:"Get-Latest-Report"})]}),p.jsx(Le,{setStartDate:g,setEndDate:u,selectedDate:r}),p.jsx(L,{disabled:r,sx:{color:"black",background:"white","&:hover":{color:"white"}},onClick:()=>{Object.keys(o).length>0?f():j.error("Please Select Vehicle.")},children:"Generate-Report"})]}),p.jsx(C,{sx:{display:"flex",width:"100%",height:"90vh",justifyContent:"center",alignItems:"center"},children:h?p.jsx(q,{style:{background:S.grey[200]},children:p.jsx(ye,{})}):Object.keys(i).length>0?p.jsx(Ye,{item:i,loading:h,setLoading:b}):p.jsx(q,{style:{background:S.grey[500]},children:p.jsx(H,{color:S.grey[400],children:o?"No Data Available":"Please Select A Vehicle!"})})})]})}const Ye=({item:e,loading:n,setLoading:o})=>{const{selectedVehicle:a}=E(i=>i.liveMap),{mode:g}=E(i=>i.dashboard),[d,u]=m.useState();let r=P(g);m.useEffect(()=>{var i,s,h,b,S,f;console.log("item in TableContent page",e),(e==null?void 0:e.length)>0&&u([{label:"Vehicle IMEI",value:a==null?void 0:a.imei},{label:"Vehicle Number",value:a==null?void 0:a.reg_id},{label:"Total Distance",value:((s=(i=e==null?void 0:e[0])==null?void 0:i.data)==null?void 0:s.totalDistance)||"NA"},{label:"Total Time",value:((b=(h=e==null?void 0:e[0])==null?void 0:h.data)==null?void 0:b.totalTime)||"NA"},{label:"Average Speed",value:((f=(S=e==null?void 0:e[0])==null?void 0:S.data)==null?void 0:f.averageSpeed)||"NA"},{label:"Over Speeding",value:"NA"},{label:"Harsh Break",value:"NA"},{label:"Rash Turn",value:"NA"}])},[e]);const c=()=>{o(!0);const i=d.map(h=>`${h.label}: ${h.value}`).join(`
`),s=new Blob([i],{type:"text/plain;charset=utf-8"});Ne.saveAs(s,"table_content.txt"),o(!1)},t=()=>{const i=document.createElement("a"),s=document.createElement("canvas"),h=s.getContext("2d");s.width=500,s.height=250,h.fillStyle="white",h.fillRect(0,0,s.width,s.height),h.fillStyle="black",h.font="16px Arial";let b=20;d.forEach(f=>{h.fillText(f.label,10,b),h.fillText(f.value,150,b),b+=20});const S=s.toDataURL("image/png");i.href=S,i.download="table_content.png",document.body.appendChild(i),i.click(),document.body.removeChild(i)},l={display:"flex",justifyContent:"space-between",textAlign:"center",height:"40px",background:r.grey[100],padding:"14px",margin:"4px",border:`1px solid ${r.grey[300]}`,borderRadius:"5px",color:r.grey[400],fontWeight:"600","&:hover":{background:r.grey[200]}};return p.jsxs(C,{sx:{width:"85%",height:"80vh"},children:[(d==null?void 0:d.length)>0&&d.map((i,s)=>p.jsxs(C,{sx:l,children:[p.jsx(H,{children:i.label}),p.jsx(H,{children:i.value})]},s)),p.jsx(L,{onClick:c,disabled:n,sx:{background:T.bgColor,color:"white",m:"4px","&:hover":{background:T.bgShadow,color:"black"}},children:n?"Downloading...":"Download In Text"}),p.jsx(L,{onClick:t,sx:{background:T.bgShadow,color:"black",m:"4px","&:hover":{background:T.bgColor,color:"white"}},children:"Download as Image"})]})};function tt(){const{mode:e}=E(i=>i.dashboard),{w_customer_id:n}=E(i=>i.auth),[o,a]=m.useState(!1),[g,d]=m.useState([]),[u,r]=m.useState(!0),c=P(e);let t=te();m.useEffect(()=>{l()},[]);const l=async()=>{try{let i=[],s=[];const h=await t(ne({w_customer_id:n}));if(Array.isArray(h.payload)){h.payload.forEach(f=>{var w,x;Array.isArray(f.imei)&&f.imei.length>0?(i.push({id:f.id,label:f.registration_id,value:(w=f==null?void 0:f.imei[0])==null?void 0:w.mac_id}),s.push((x=f.imei[0])==null?void 0:x.mac_id)):(console.error("IMEI data not found for item:",f),j.error(`IMEI Number not found for the vehicle: ${f==null?void 0:f.registration_id}`))});const b="one",S=s;s.length>0&&(t(ae({type:b,imei:S})),t(oe(S))),d(i),t(ie({w_customer_id:n})),t(le({}))}else console.error("Unexpected data format:",h),j.error("Unexpected data format:")}catch(i){console.error("Error fetching vehicle data:",i),j.error(`Error fetching vehicle data: ${i}`)}};return p.jsxs("div",{className:"app",children:[p.jsx(be,{}),p.jsxs("main",{className:"content",style:{width:"100%",background:c.grey[100]},children:[p.jsx(Se,{title:"Report",showVehicles:o,setShowVehicles:a}),p.jsxs(C,{style:{display:"flex",width:"100%",height:"95vh"},children:[p.jsx(C,{style:{display:"flex",width:"100%",height:"95vh"},children:p.jsx(C,{style:{width:o?"85%":"100%"},children:p.jsx(ze,{showCard:u})})}),o&&p.jsx(C,{sx:{position:"fixed",width:"250px",right:"0px",height:"90vh",zIndex:9999,backgroundColor:c.grey[100]},children:p.jsx(xe,{vehicleData:g})})]})]})]})}export{tt as default};