import{u as M,a as d,j as e,t as v,P as t,s as C,h as _,_ as F}from"./index-C_4gHeOh.js";import{d as I,a as T,h as z,b as L,c as R}from"./LightModeOutlined--znN02Bn.js";import{d as S}from"./Search-CWG6crCq.js";import{j as $}from"./jcb-aCHXMCXy.js";import{B as r}from"./CircularProgress-D3m1apge.js";import{T as u}from"./index-Bt78598f.js";import{b as B}from"./OutlinedInput-DH688o9S.js";import{I as j}from"./IconButton-ikx-DoFd.js";function J({title:o,showVehicles:s,setShowVehicles:a,setShowParameters:n,showParameters:x,setShowCard:y,showCard:l,setSideBarTrip:h,sideBarTrip:p}){const m=M(),{collapsed:g}=d(i=>i.auth),{selectedVehicle:c}=d(i=>i.liveMap);JSON.parse(localStorage.getItem("w_userDetails"));const{mode:b}=d(i=>i.dashboard),f=()=>{m(_(!g))},w=()=>{Object.keys(c).length>0?(h(!p),a(!1)):F.error("Please Select Vehicle",{id:"trip date"})},k={fontSize:"26px",fontWeight:500,lineHeight:"18.38px",color:"#fff",textAlign:"center",paddingTop:"5px",fontFamily:"ubuntu"};return e.jsxs(r,{style:{display:"flex",justifyContent:"space-between",paddingRight:"20px",backgroundColor:v.bgColor,alignItems:"center",textAlign:"center",height:"60px",color:"white"},children:[e.jsxs(r,{style:{display:"flex",justifyContent:"space-between",gap:"10px",alignItems:"center"},children:[g?e.jsx(t,{onClick:f,sx:{color:"white"},children:e.jsx(I,{style:{width:"30px",height:"30px"}})}):e.jsx(t,{onClick:f,sx:{color:"white"},children:e.jsx(T,{style:{width:"30px",height:"30px"}})}),e.jsx(r,{children:e.jsx("img",{src:`${z}`,style:{width:"36px",height:"36px"}})}),e.jsx(u,{style:{fontSize:"20px",fontFamily:"ubuntu",fontWeight:"500",color:"#FFFFFF"},children:"WIKITREK"}),e.jsxs(r,{border:"1px solid white",backgroundColor:"white",borderRadius:"3px",sx:{my:"6px",ml:"90px"},children:[e.jsx(B,{sx:{my:.5,mx:2},placeholder:"Search"}),e.jsx(j,{type:"button",sx:{p:1},children:e.jsx(S,{})})]}),e.jsx(u,{style:k,children:o})]}),e.jsxs(r,{style:{display:"flex",gap:"5px"},children:[(o==="Live Map"||o==="Parameter Monitor"||"Trip Monitor")&&e.jsxs(t,{variant:"outlined",size:"small",sx:{color:s?"white":"black",backgroundColor:s?"transparent":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"150px",height:"40px","&:hover":{color:"white",border:"1px solid black"}},onClick:()=>{a(!s),o==="Live Map"&&n(!1),o==="Trip Monitor"&&h(!1),o==="Parameter Monitor"&&n(!1)},children:[e.jsx("img",{src:$,style:{marginRight:"5px"}}),Object.keys(c).length>0?c.reg_id:"Vehicles"]}),(o==="Live Map"||o==="Parameter Monitor")&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:x?"white":"black",backgroundColor:x?"":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px","&:hover":{border:"1px solid black",color:"white"}},onClick:()=>{n(!x),a(!1)},children:"Parameter"}),o==="Trip Monitor"&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:p?"white":"black",bgcolor:"white",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px","&:hover":{border:"1px solid black",color:"white"},background:p?"transparent":"white"},onClick:()=>{w()},children:"Date"}),(o==="Live Map"||o==="Parameter Monitor"||"Trip Monitor")&&e.jsx(t,{variant:"outlined",size:"small",sx:{color:l?"white":"black",mt:"6px",mx:"5px",border:"1px solid white",width:"100px",height:"40px",bgcolor:l?"transparent":"white","&:hover":{color:"white",border:"1px solid black"}},onClick:()=>{y(!l)},children:l?"Hide":"Show"}),e.jsx(j,{onClick:()=>{m(C(!b))},sx:{color:"white"},children:b?e.jsx(L,{}):e.jsx(R,{})})]})]})}export{J as L};