import{a as E,r as y,u as F,_ as T,a3 as O,j as r,B as z,t as n}from"./index-Bp2Uwo4Z.js";import{d as A}from"./VehicleMenu-DlnHJws7.js";import{C as N,B as f}from"./CircularProgress-CROMX5qy.js";import{F as V,I as M,O as R,a as $}from"./OutlinedInput-BGRJHT6e.js";import{I as q}from"./IconButton-hLHLEhpq.js";const U=({handleParameterChange:j,parametersData:s,setParameterData:v})=>{const{selectedParameterList:i,selectedVehicle:a,loading:w}=E(o=>o.liveMap),[C,k]=y.useState(""),I=F();y.useEffect(()=>{Object.keys(a).length>0?(!s||s.length<=0)&&S(a.reg_id):T.error("Please select a vehicle",{id:"clipboard"})},[s]);const l=s&&s.length>0&&s.filter(o=>o.label.toLowerCase().includes(C.toLowerCase())),P=o=>{k(o.target.value)},S=async o=>{var h;const c=await I(O({w_registration_id:o})),p=[];let B=0;(h=c.payload)==null||h.map(e=>{e[e.parameter_type.toLowerCase()+"_parameter"].forEach(t=>{var u,_,x,m,b;const g=e.parameter_type==="Telematic"?t.short_name:e.parameter_type==="IVN"?t.pid_description:t.spn;p.push({reg_id:a.reg_id,imei:a.imei,id:t.id,_id:e.id,key:B++,label:g,param_type:e.parameter_type,param_header:(u=t==null?void 0:t.header)==null?void 0:u.device_header,unit:t==null?void 0:t.unit,param_id:e.id,vehicle_reg:(_=e==null?void 0:e.vehicle)==null?void 0:_.vin,param_group_id:(x=e.parameter_group[0])==null?void 0:x.id,param_group_name:(m=e.parameter_group[0])==null?void 0:m.group_name,param_group_color:(b=e.parameter_group[0])==null?void 0:b.color,checked:i[0].params.length>0&&i[0].params.some(L=>L.label===g)})})}),v(p)};return r.jsx(r.Fragment,{children:r.jsxs("div",{style:{backgroundColor:"white",position:"relative",height:"95vh"},children:[w&&r.jsx(N,{style:{position:"absolute",left:"50%",top:"50%",zIndex:9999}}),r.jsx(f,{sx:{align:"center",my:"15px",ml:"20px"},children:r.jsxs(V,{sx:{width:"90%"},variant:"outlined",children:[r.jsx(M,{htmlFor:"outlined-adornment-password",style:{marginTop:"-9px"},children:"Search"}),r.jsx(R,{onChange:P,inputProps:{style:{padding:7}},id:"outlined-adornment-password",type:"text",endAdornment:r.jsx($,{position:"end",children:r.jsx(q,{"aria-label":"toggle password visibility",edge:"end",children:r.jsx(A,{})})}),label:"Search"})]})}),l&&l.length>0&&l.map((o,d)=>r.jsx(f,{sx:{align:"center",my:"6px",ml:"20px"},children:r.jsx(z,{variant:"outlined",sx:{width:"90%",bgcolor:o.checked?n.bgColor:"undefined",color:o.checked?"white":"black",border:`1px solid ${n.bgColor}`,fontSize:"12px","&:hover":{color:"black",border:"1px solid black",bgcolor:n.bgShadow}},onClick:c=>{j(o)},children:o.label})},d))]})})};export{U as P};