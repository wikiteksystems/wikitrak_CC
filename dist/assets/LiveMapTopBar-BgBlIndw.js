import{i as C,k as h,j as e,t as _,B as t,I as L,ad as T,ae as z,w as I}from"./index-7_js72w9.js";import{b as O,c as R,w as S,e as B,f as D}from"./LeftSideBar2-DjcI7g_Y.js";import{j as $}from"./jcb-aCHXMCXy.js";import{B as l}from"./menu2-CcQfZPbc.js";import{T as A}from"./index-Dtr3CX23.js";function G({title:o,showVehicles:a,setShowVehicles:s,setShowParameters:n,showParameters:c,setShowCard:j,showCard:r,setSideBarTrip:g,sideBarTrip:x,setShowVehiclesGroup:w,showVehiclesGroup:p}){const m=C(),{collapsed:b}=h(i=>i.auth),{selectedVehicle:d}=h(i=>i.liveMap);JSON.parse(localStorage.getItem("w_userDetails"));const{mode:u,selectedVehicleGroup:f}=h(i=>i.dashboard),k=()=>{m(z(!b))},y=()=>{Object.keys(d).length>0?(g(!x),s(!1)):I.error("Please Select Vehicle",{id:"trip date"})},v=()=>{console.log("vehicles groups"),w(!p)},M={fontSize:"26px",fontWeight:500,lineHeight:"18.38px",color:"#fff",textAlign:"center",paddingTop:"5px",fontFamily:"ubuntu"};return e.jsxs(l,{style:{display:"flex",justifyContent:"space-between",paddingRight:"20px",backgroundColor:_.bgColor,alignItems:"center",textAlign:"center",height:"60px",color:"white"},children:[e.jsxs(l,{style:{display:"flex",justifyContent:"space-between",gap:"10px",alignItems:"center",width:"50%"},children:[e.jsxs(l,{sx:{display:"flex",alignItems:"center"},children:[b?e.jsx(t,{onClick:k,sx:{color:"white"},children:e.jsx(O,{style:{width:"30px",height:"30px"}})}):e.jsx(t,{onClick:k,sx:{color:"white"},children:e.jsx(R,{style:{width:"30px",height:"30px"}})}),e.jsx("img",{src:S,alt:"wikitrak logo"})]}),e.jsx(l,{children:e.jsx(A,{style:M,children:o})})]}),e.jsxs(l,{style:{display:"flex",gap:"5px"},children:[e.jsx(t,{variant:"outlined",size:"small",sx:{color:p?"white":"black",backgroundColor:p?"transparent":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"auto",height:"40px","&:hover":{color:"white",border:"1px solid black"},marginRight:"50px",fontWeight:800},onClick:v,children:Object.keys(f).length>0?f.group_name:"Select Vehicle Groups"}),(o==="Live Map"||o==="Parameter Monitor"||"Trip Monitor")&&e.jsxs(t,{variant:"outlined",size:"small",sx:{color:a?"white":"black",backgroundColor:a?"transparent":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"auto",height:"40px","&:hover":{color:"white",border:"1px solid black"}},onClick:()=>{s(!a),o==="Live Map"&&n(!1),o==="Trip Monitor"&&g(!1),o==="Parameter Monitor"&&n(!1)},children:[e.jsx("img",{src:$,style:{marginRight:"5px"}}),Object.keys(d).length>0?d.reg_id:"Vehicles"]}),(o==="Live Map"||o==="Parameter Monitor")&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:c?"white":"black",backgroundColor:c?"":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px","&:hover":{border:"1px solid black",color:"white"}},onClick:()=>{n(!c),s(!1)},children:"Parameter"}),o==="Trip Monitor"&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:x?"white":"black",bgcolor:"white",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px","&:hover":{border:"1px solid black",color:"white"},background:x?"transparent":"white"},onClick:()=>{y()},children:"Date"}),(o==="Live Map"||o==="Parameter Monitor"||o==="Trip Monitor")&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:r?"white":"black",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px",bgcolor:r?"transparent":"white","&:hover":{color:"white",border:"1px solid black"}},onClick:()=>{j(!r)},children:r?"Hide":"Show"}),e.jsx(L,{onClick:()=>{m(T(!u))},sx:{color:"white"},children:u?e.jsx(B,{}):e.jsx(D,{})})]})]})}export{G as L};