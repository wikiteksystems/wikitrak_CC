import{a as v,r as c,u as N,j as r,P as C,_ as g,t as s,b as Q,Q as _,R as W,aL as k}from"./index-iFlNtnfj.js";import{d as Y,t as q}from"./Search-CupkSYyv.js";import{B as h,C as z}from"./CircularProgress-oAvwT9cK.js";import{F as G,I as H,O as J,a as K}from"./OutlinedInput-ChjyX_i1.js";import{I as U}from"./IconButton-ZKaR5vEv.js";const le=({vehicleData:p,title:b,setParameterData:L,loadingVehicle:S})=>{const{selectedVehicle:n,locationData:t,loading:u}=v(e=>e.liveMap),{mode:V}=v(e=>e.dashboard),l=q(V),[T,I]=c.useState(""),i=c.useRef(null),x=c.useRef(0);let d=N();c.useEffect(()=>{console.log("loading",u)},[u]),c.useEffect(()=>{i.current&&setTimeout(()=>{i.current.scrollTop=x.current},0)});const m=p.length>0&&p.filter(e=>e.label.toLowerCase().includes(T.toLowerCase())),R=async e=>{var y,j;if(i.current&&(x.current=i.current.scrollTop),(t==null?void 0:t.length)<=0)return g.error("Data not available for this vehicle",{id:"clipboard"});const o=t==null?void 0:t.filter(a=>a.latestDocument.imei===e.value);if((o==null?void 0:o.length)<=0)return g.error("Data not available for this vehicle",{id:"clipboard"});const{lat:F,lng:O}=((y=o==null?void 0:o[0])==null?void 0:y.latestDocument)??{},P={lat:F||k.lat,lng:O||k.lat};d(Q(P)),d(_({imei:e.value,reg_id:e.label}));const M=e.label,D=await d(W({w_registration_id:M})),f=[];let $=0;(j=D.payload)==null||j.map(a=>{a[a.parameter_type.toLowerCase()+"_parameter"].forEach(w=>{f.push({reg_id:e.label,imei:e.value,id:w.id,_id:a.id,key:$++,label:a.parameter_type==="Telematic"&&w.short_name})})}),b==="Live Map"&&L(f)},A=e=>{I(e.target.value)},B=()=>{d(_({}))},E={backgroundColor:l.grey[100],position:"relative",width:"100%",float:"right",height:"90vh",overflowY:"auto",scrollBehavior:"smooth",scrollbarWidth:"thin"};return r.jsx(r.Fragment,{children:r.jsx("div",{ref:i,style:E,children:u||S?r.jsx(h,{sx:{display:"flex",justifyContent:"center",height:"88vh",alignItems:"center"},children:r.jsx(z,{})}):r.jsxs(r.Fragment,{children:[r.jsx(h,{sx:{align:"center",my:"15px",ml:"20px"},children:r.jsxs(G,{sx:{width:"90%",backgroundColor:l.grey[500],borderRadius:"5px"},variant:"outlined",children:[r.jsx(H,{htmlFor:"outlined-adornment-password",style:{marginTop:"-8px",color:l.grey[400]},children:"Search"}),r.jsx(J,{onChange:e=>A(e),inputProps:{style:{padding:7,color:l.grey[400]}},id:"outlined-adornment-password",type:"text",endAdornment:r.jsx(K,{position:"end",children:r.jsx(U,{"aria-label":"toggle password visibility",edge:"end",children:r.jsx(Y,{style:{color:l.grey[400]}})})}),label:"Search"})]})}),b==="Live Map"&&r.jsx(h,{sx:{align:"center",my:"8px",ml:"20px"},children:r.jsx(C,{variant:"outlined",onClick:()=>{if(Object.keys(n).length>0)B();else return g.success("Already Selected To View All Vehicle Location.",{id:"already selected"})},sx:{width:"90%",bgcolor:Object.keys(n).length===0?s.bgColor:"undefined",color:Object.keys(n).length===0?"white":l.grey[400],border:`1px solid ${s.bgColor}`,"&:hover":{color:"black",border:"1px solid black",bgcolor:s.bgShadow}},children:"View All Vehicle Location"})}),m.length>0&&m.map((e,o)=>r.jsx(h,{sx:{align:"center",my:"8px",ml:"20px"},children:r.jsx(C,{variant:"outlined",onClick:()=>{R(e)},sx:{width:"90%",bgcolor:e.label===n.reg_id?s.bgColor:"undefined",color:e.label===n.reg_id?"white":l.grey[400],border:`1px solid ${s.bgColor}`,"&:hover":{color:"black",border:"1px solid black",bgcolor:s.bgShadow}},children:e.label})},o))]})})})};export{le as V};