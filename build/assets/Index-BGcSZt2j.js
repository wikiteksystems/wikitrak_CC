import{i as He,j as e,a as b,r as i,u as Y,t as N,P as L,T as D,as as xe,s as it,h as ct,at as dt,au as ee,_,av as xt,aw as gt,G as ze,v as pt,l as ht,m as ut,a1 as ft}from"./index-Df49Wuj5.js";import{d as mt,a as jt,m as wt,b as bt,c as yt,L as St}from"./LightModeOutlined-Uktosini.js";import{r as Ve}from"./createSvgIcon-DAjcSmbg.js";import{d as vt}from"./NotificationsNone-D6hGs_Xx.js";import{j as At}from"./jcb-aCHXMCXy.js";import{B as a}from"./CircularProgress-DF5t95eu.js";import{I as pe}from"./IconButton-CaCHrN1x.js";import{V as Ct}from"./VehicleMenu-Dn-KQHtD.js";import{G as kt}from"./GeofencAlert-B5UggBMB.js";import{u as Dt,c as Rt,a as Be,b as It,d as Ot,V as Xe,e as Ue}from"./Form-DWSmBp3Y.js";import{t as q}from"./RegionSelector-CioWQAvq.js";import{T as Je}from"./TextField-75MXW8X4.js";import{a as Ke}from"./OutlinedInput-qdLl67vo.js";import{m as te,f as Ye}from"./4W-CSnZ3_ps.js";import{u as Et,G as Pt,C as Ft,b as Lt,M as _t}from"./esm-BpQt63IN.js";import{S as ge}from"./Switch-s1Oc-t9t.js";import{I as Nt}from"./Select-Di3oj_01.js";import{t as Gt}from"./3W-fvB8OITn.js";/* empty css           */import"./proj-XQwXs9DQ.js";import"./Modal-BNRJWbpB.js";import"./Paper-DeeinfJ6.js";var he={},Mt=He;Object.defineProperty(he,"__esModule",{value:!0});var qe=he.default=void 0,Wt=Mt(Ve()),zt=e;qe=he.default=(0,Wt.default)((0,zt.jsx)("path",{d:"M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"}),"PersonOutlined");var ue={},Bt=He;Object.defineProperty(ue,"__esModule",{value:!0});var Qe=ue.default=void 0,Xt=Bt(Ve()),Ut=e;Qe=ue.default=(0,Xt.default)((0,Ut.jsx)("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"}),"Place");const Jt=({title:s,setShowContent:p,showContent:n,showMap:h,setShowMap:r,setShowGfBar:w,showGfBar:A,setShowGfAlert:d,showGfAlert:f})=>{const{collapsed:m}=b(k=>k.auth),{selectedVehicle:j}=b(k=>k.liveMap),{vehicleSideBar:x}=b(k=>k.geofence);i.useState(!1);const{mode:y}=b(k=>k.dashboard);JSON.parse(localStorage.getItem("w_userDetails"));const g=Y(),O=()=>{g(ct(!m))},S=()=>{p({...n,vehicle:!n.vehicle}),w(!1),d(!1),g(xe({data:!x}))};return e.jsxs(a,{display:"flex",justifyContent:"space-between",p:1,sx:{bgcolor:N.bgColor,border:"1px solid white",borderRadius:"4px",height:"55px"},children:[e.jsxs(a,{style:{display:"flex",justifyContent:"space-between",gap:"10px",alignItems:"center"},children:[m?e.jsx(L,{onClick:O,sx:{color:"white"},children:e.jsx(mt,{style:{width:"30px",height:"30px"}})}):e.jsx(L,{onClick:O,sx:{color:"white"},children:e.jsx(jt,{style:{width:"30px",height:"30px"}})}),e.jsx(a,{children:e.jsx("img",{src:`${wt}`,style:{width:"36px",height:"36px"}})}),e.jsx(D,{style:{fontSize:"20px",fontFamily:"ubuntu",fontWeight:"500",color:"#FFFFFF"},children:"WIKITRAK"})]}),e.jsx(a,{children:e.jsx(D,{variant:"h6",color:"white",fontWeight:"bold",sx:{ml:"15px",mt:"15px"},children:Object.keys(j).length>0&&h?`${s} - Geofence (${j.reg_id})`:e.jsxs(e.Fragment,{children:[s," ",Object.keys(j).length>0&&j.reg_id]})})}),e.jsxs(a,{sx:{display:"flex"},children:[e.jsxs(L,{variant:"outlined",size:"small",sx:{color:n.vehicle?"white":"black",backgroundColor:n.vehicle?"transparent":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"150px",height:"40px","&:hover":{color:"white",border:"1px solid black"}},onClick:S,children:[e.jsx("img",{src:At,style:{marginRight:"5px"}}),Object.keys(j).length>0?j.reg_id:"Vehicles"]}),h&&e.jsx(a,{children:e.jsx(L,{variant:"outlined",size:"small",sx:{color:A?"white":"black",backgroundColor:A?"transparent":"white",mt:"6px",mx:"5px",border:"1px solid white",width:"150px",height:"40px","&:hover":{color:"white",border:"1px solid black"}},onClick:()=>{d(!1),w(!A),g(xe({data:!1}))},children:"Geofence"})}),e.jsx(a,{sx:{color:"white",mr:"10px"},children:e.jsxs(a,{sx:{display:"flex",marginTop:"14px",gap:"10px"},children:[e.jsx(a,{onClick:()=>{w(!1),d(!f),g(xe({data:!1}))},children:e.jsx(vt,{sx:{cursor:"pointer",width:"30px",height:"30px"}})}),e.jsx(a,{onClick:()=>{p({...n,user:!n.user}),r(!1)},children:n.user?e.jsx(Qe,{sx:{mr:"2px",cursor:"pointer",width:"30px",height:"30px"}}):e.jsx(qe,{sx:{mr:"2px",cursor:"pointer",width:"30px",height:"30px"}})})]})}),e.jsx(pe,{onClick:()=>{g(it(!y))},sx:{color:"white"},children:y?e.jsx(bt,{}):e.jsx(yt,{})})]})]})},Kt=Jt,Ht=()=>{const s=Y(),p=Dt("(min-width:600px)"),[n,h]=i.useState(!1),[r,w]=i.useState(!1),{mode:A}=b(x=>x.dashboard),d=q(A),f={new_password:"",confirmPassword:""},m=Rt().shape({new_password:Be().required("Password is required").min(8,"Password must be at least 8 characters"),confirmPassword:Be().oneOf([It("new_password"),null],"Passwords must match").required("Confirm password is required")}),j=x=>{console.log("values",x);let y=x.confirmPassword;s(dt({new_password:y}))};return e.jsx(a,{sx:{display:"flex",justifyContent:"center"},children:e.jsxs(a,{sx:{width:"30%"},children:[e.jsx(a,{sx:{align:"center"},children:e.jsx(D,{variant:"h5",sx:{mt:"25px",my:"",fontWeight:"bold",align:"center",color:d.grey[400]},children:"Change Password"})}),e.jsx(Ot,{onSubmit:j,initialValues:f,validationSchema:m,children:({values:x,errors:y,touched:g,handleBlur:O,handleChange:S,handleSubmit:k})=>e.jsxs("form",{onSubmit:k,children:[e.jsxs(a,{display:"grid",gap:"15px",gridTemplateColumns:"repeat(4, minmax(0, 1fr))",sx:{"& > div":{gridColumn:p?void 0:"span 4"}},marginTop:"20px",children:[e.jsx(Je,{fullWidth:!0,variant:"outlined",type:n?"text":"password",label:"New Password",onBlur:O,onChange:S,value:x.new_password,name:"new_password",error:!!g.new_password&&!!y.new_password,helperText:g.new_password&&y.new_password,sx:{gridColumn:"span 4",backgroundColor:"white",borderRadius:"5px"},InputProps:{endAdornment:e.jsx(Ke,{position:"end",children:e.jsx(pe,{"aria-label":"toggle password visibility",onClick:()=>h(!n),edge:"end",children:n?e.jsx(Xe,{}):e.jsx(Ue,{})})})}}),e.jsx(Je,{fullWidth:!0,variant:"outlined",type:r?"text":"password",label:"Confirm Password",onBlur:O,onChange:S,value:x.confirmPassword,name:"confirmPassword",error:!!g.confirmPassword&&!!y.confirmPassword,helperText:g.confirmPassword&&y.confirmPassword,sx:{gridColumn:"span 4",backgroundColor:"white",borderRadius:"5px"},InputProps:{endAdornment:e.jsx(Ke,{position:"end",children:e.jsx(pe,{"aria-label":"toggle password visibility",onClick:()=>w(!r),edge:"end",children:r?e.jsx(Xe,{}):e.jsx(Ue,{})})})}})]}),e.jsx(a,{sx:{my:"29px"},children:e.jsx(L,{type:"submit",sx:{background:N.bgColor,width:"100%",p:"10px","&:hover":{background:N.bgShadow,color:d.grey[100]}},variant:"contained",children:"submit"})})]})})]})})},Vt=()=>{const s=JSON.parse(localStorage.getItem("w_userDetails")),{mode:p}=b(h=>h.dashboard),n=q(p);return e.jsxs(a,{children:[e.jsxs(a,{sx:{backgroundColor:n.grey[200],m:"10px",borderRadius:"5px",height:"150px"},children:[e.jsx(a,{sx:{pl:"20px",pt:"10px",mb:"10px",color:`${n.grey[400]}`},children:e.jsx("b",{children:"User Settings"})}),e.jsxs(a,{sx:{display:"flex"},children:[e.jsx(a,{sx:{ml:"23px",mt:"11px",height:"70px",width:"70px",backgroundColor:"white",borderRadius:"50%"}}),e.jsxs(a,{sx:{height:"80px",width:"200px",display:"flex",justifyContent:"center",flexDirection:"column",mx:"20px",color:n.grey[400]},children:[e.jsx(a,{sx:{fontWeight:"bold",fontSize:"1.2rem"},children:s&&e.jsxs(e.Fragment,{children:[s.first_name.charAt(0).toUpperCase()+s.first_name.slice(1).toLowerCase()," ",s.last_name.charAt(0).toUpperCase()+s.last_name.slice(1).toLowerCase()]})}),e.jsx(a,{children:s&&s.role})]})]})]}),e.jsx(a,{sx:{marginTop:"9%",alignContent:"center",textAlign:"center"},children:e.jsx(Ht,{})})]})},Yt=Vt,qt="/assets/3W-KvFQeYgh.jpeg",Qt="data:image/png;base64,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";function Tt({shapeType:s,setShapeType:p}){const n=h=>{console.log("selectedType",h),p(h)};return e.jsxs(a,{children:[e.jsx(L,{onClick:()=>{n("circular")},style:{background:s==="circular"?N.bgColor:"transparent",color:s==="circular"?"white":ee[400],margin:"0 5px"},children:"Circle"}),e.jsx(L,{onClick:()=>{n("polygon")},style:{background:s==="polygon"?N.bgColor:"transparent",color:s==="polygon"?"white":ee[400],margin:"0 5px"},children:"Polygon"})]})}function Zt({shapeType:s,center:p,radius:n,active:h,setActive:r,setInward:w,inward:A,setSpeedLimit:d,speedLimit:f,setSpeedValue:m,handleGeofence:j,speedValue:x}){const{selectedVehicle:y,locationData:g,tractorIcon:O}=b(S=>S.liveMap);return e.jsxs(a,{sx:{display:"flex",padding:"15px",flexDirection:"column",gap:"10px",color:ee[600]},children:[e.jsx(D,{sx:{fontWeight:"bold",fontSize:"16px"},children:"Geofence Setting"}),e.jsxs(D,{sx:{fontWeight:"400",fontSize:"14px",textTransform:"capitalize"},children:["Type: ",s]}),s==="circular"&&e.jsxs(e.Fragment,{children:[e.jsx(D,{sx:{color:"#686868"},children:"Centered At "}),e.jsxs(D,{sx:{color:"#686868"},children:["Lat: ",p.lat.toFixed(2)]}),e.jsxs(D,{sx:{color:"#686868"},children:["Lng: ",p.lng.toFixed(2)]}),e.jsxs(D,{sx:{color:"#686868",border:"1px solid #686868",borderRadius:"4px",padding:"8px"},children:["Radius ( ",(n/1e3).toFixed(2)," in km)"]})]}),e.jsxs(a,{display:"flex",alignItems:"center",children:[e.jsx(D,{variant:"body1",component:"b",children:h?"Active":"Inactive"}),e.jsx(ge,{defaultChecked:h,onChange:()=>{r(!h)},color:"primary",inputProps:{"aria-label":"toggle active state"}})]}),e.jsxs(a,{display:"flex",alignItems:"center",children:[e.jsx(D,{variant:"body1",component:"b",children:A?"Inward":"Outward"}),e.jsx(ge,{checked:A,onChange:()=>{w(!A)},color:"primary",inputProps:{"aria-label":"toggle direction"}})]}),e.jsxs(a,{display:"flex",alignItems:"center",children:[e.jsx(ge,{checked:f,onChange:()=>{d(!f)},color:"primary",inputProps:{"aria-label":"toggle direction"}}),e.jsx(D,{variant:"body1",component:"b",children:"Speed Limit"})]}),f&&e.jsx(a,{sx:{},children:e.jsx(Nt,{sx:{width:"100%",color:ee[600],border:"none","&:focus":{outline:"none"}},value:x,placeholder:"Enter Speed Limit",type:"number",onChange:S=>{const k=Math.max(0,parseInt(S.target.value));m(k)}})}),e.jsx(L,{disabled:Object.keys(y).length===0&&!1,variant:"outlined",size:"small",sx:{color:"white",backgroundColor:N.bgColor,mt:"6px",mx:"5px",border:"1px solid white",height:"40px",width:"100%","&:hover":{color:"black",background:N.bgShadow,border:"1px solid black"},letterSpacing:"1.5px",fontSize:"16px"},onClick:()=>{if(Object.keys(y).length===0)return _.error("please select a vehicle.");j()},children:"SUBMIT"})]})}const $t="http://139.59.37.47:3031",es="AIzaSyD8TrUWS9FRTu-MRP339mJF_iWlORvEGUA",ts=({showGfBar:s,showGfAlert:p})=>{const{isLoaded:n,loadError:h}=Et({googleMapsApiKey:`${es}`}),{selectedVehicle:r,locationData:w,tractorIcon:A}=b(o=>o.liveMap),{geofence:d,vehicleSideBar:f}=b(o=>o.geofence),{mode:m,styles:j,vehicles_details:x}=b(o=>o.dashboard),{collapsed:y}=b(o=>o.auth),[g,O]=i.useState(null),[S,k]=i.useState(null),[c,R]=i.useState(1e3),[u,se]=i.useState([]),[B,l]=i.useState(!0),[G,M]=i.useState(!1),[P,ae]=i.useState(!1),[v,Q]=i.useState({lat:18.516726,lng:73.856255}),[oe,re]=i.useState(50),[E,ne]=i.useState("circular"),[fe,T]=i.useState([{lat:v.lat+.01,lng:v.lng},{lat:v.lat-.01,lng:v.lng-.01},{lat:v.lat-.01,lng:v.lng+.01}]),[le,ie]=i.useState(!1),Te=i.useRef(null),ce=i.useRef(!1),Z=i.useRef(null);let Ze=Y();i.useEffect(()=>{$e()},[r]),i.useEffect(()=>{le&&T([{lat:v.lat+.01,lng:v.lng},{lat:v.lat-.01,lng:v.lng-.01},{lat:v.lat-.01,lng:v.lng+.01}])},[le]),i.useEffect(()=>{var o,I,C,X,U,J,K,H;if(w.length>0&&Object.keys(r).length>0){let F=w.filter($=>{var V;return((V=$.latestDocument)==null?void 0:V.imei)===r.imei});se(F),Q({lat:(I=(o=F[0])==null?void 0:o.latestDocument)==null?void 0:I.lat,lng:(X=(C=F[0])==null?void 0:C.latestDocument)==null?void 0:X.lng});let W=(J=(U=F[0])==null?void 0:U.latestDocument)==null?void 0:J.lat,z=(H=(K=F[0])==null?void 0:K.latestDocument)==null?void 0:H.lng;le&&T([{lat:W+.01,lng:z},{lat:W-.01,lng:z-.01},{lat:W-.01,lng:z+.01}])}},[r,w,E]),i.useEffect(()=>{g&&S&&g.fitBounds(S)},[g,S]);const $e=async()=>{var o,I,C,X,U,J,K,H,F,W,z,$,V,je,we,be,ye,Se,ve,Ae,Ce,ke,De,Re,Ie,Oe,Ee,Pe,Fe,Le,_e,Ne,Ge,Me,We;if(Object.keys(r).length>0)try{const t=await xt.get(`${$t}/api/get/geofance/${r==null?void 0:r.imei}`);if(console.log(t.data.geofenceData,"result"),((I=(o=t==null?void 0:t.data)==null?void 0:o.geofenceData)==null?void 0:I.area_type)==="circular")if(ne("circular"),ie(!0),(X=(C=t==null?void 0:t.data)==null?void 0:C.geofenceData)!=null&&X.lat)Q({lat:(J=(U=t==null?void 0:t.data)==null?void 0:U.geofenceData)==null?void 0:J.lat,lng:(H=(K=t==null?void 0:t.data)==null?void 0:K.geofenceData)==null?void 0:H.long}),R((W=(F=t==null?void 0:t.data)==null?void 0:F.geofenceData)==null?void 0:W.radius),l(($=(z=t==null?void 0:t.data)==null?void 0:z.geofenceData)==null?void 0:$.isActive_Geofance),M(((je=(V=t==null?void 0:t.data)==null?void 0:V.geofenceData)==null?void 0:je.type)==="inward"),ae((be=(we=t==null?void 0:t.data)==null?void 0:we.geofenceData)==null?void 0:be.isActive_Speed),re((Se=(ye=t==null?void 0:t.data)==null?void 0:ye.geofenceData)==null?void 0:Se.speed);else return _.success("No Geofence For Selected Vehicle",{id:"getting geofence"});else((Ae=(ve=t==null?void 0:t.data)==null?void 0:ve.geofenceData)==null?void 0:Ae.area_type)==="polygon"&&(ie(!1),ne("polygon"),console.log("get for polygon",(Ce=t==null?void 0:t.data)==null?void 0:Ce.geofenceData),T((De=(ke=t==null?void 0:t.data)==null?void 0:ke.geofenceData)==null?void 0:De.polygon_points),re((Ie=(Re=t==null?void 0:t.data)==null?void 0:Re.geofenceData)==null?void 0:Ie.speed),l((Ee=(Oe=t==null?void 0:t.data)==null?void 0:Oe.geofenceData)==null?void 0:Ee.isActive_Geofance),M(((Fe=(Pe=t==null?void 0:t.data)==null?void 0:Pe.geofenceData)==null?void 0:Fe.type)==="inward"),Q({lat:(_e=(Le=t==null?void 0:t.data)==null?void 0:Le.geofenceData)==null?void 0:_e.lat,lng:(Ge=(Ne=t==null?void 0:t.data)==null?void 0:Ne.geofenceData)==null?void 0:Ge.long}),ae((We=(Me=t==null?void 0:t.data)==null?void 0:Me.geofenceData)==null?void 0:We.isActive_Speed))}catch(t){ie(!0),console.log("vehicleDetail",u),console.log(t,"error while getting geofence"),_.error("Error while getting geofence",{id:"getting geofence"})}},et=o=>{O(o)},tt=()=>{if(Object.keys(r).length>0){let o;E==="circular"?o={imei:r.imei,area_type:E,type:G?"inward":"outward",lat:v.lat,long:v.lng,radius:c,isActive_Geofance:B,isActive_Speed:!!P,speed:P?oe:5}:E==="polygon"&&(o={imei:r.imei,area_type:E,type:G?"inward":"outward",polygon_points:fe,isActive_Geofance:B,isActive_Speed:!!P,speed:P?oe:50}),Ze(gt({data:o})),_.success("Successful Saved",{id:"geofence"})}else _.error("Please Select Vehicle",{id:"geofence"})},st=()=>{if(!ce.current){ce.current=!0;const o=de.getRadius();console.log("newRadius",o),R(o),ce.current=!1}},at=o=>{console.log("New Center:",o.toJSON()),Q(o.toJSON())},ot=()=>{if(Z.current&&Z.current.getPath){const I=Z.current.getPath().getArray().map(C=>({lat:C.lat(),lng:C.lng()}));T(I),console.log("newVertices",I)}},rt=o=>{Z.current=o},nt=o=>{const I=x&&(x==null?void 0:x.length)>0&&x.find(C=>(C==null?void 0:C.value)===o&&(C==null?void 0:C.vehilce_type));return I?I.vehilce_type:null},me={paths:fe,options:{strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,draggable:!0,editable:!0}};if(h)return"Error loading maps";if(!n)return"Loading maps";const lt={width:"100%",height:"86.8vh"};let de;return e.jsxs(e.Fragment,{children:[e.jsx(Tt,{setShapeType:ne,shapeType:E}),e.jsxs(a,{sx:{display:"flex",flexDirection:"row"},children:[e.jsxs(Pt,{ref:Te,mapContainerStyle:lt,zoom:15,center:v,onLoad:et,options:{mapTypeControl:!1,styles:m?j:""},children:[E==="circular"&&e.jsx(Ft,{center:v,radius:c,options:{strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,draggable:!0,editable:!0},onLoad:o=>{de=o,de.addListener("radius_changed",st)},onDragEnd:o=>at(o.latLng)}),E==="polygon"&&e.jsx(Lt,{paths:me.paths,options:me.options,draggable:!0,editable:!0,onDragEnd:ot,onLoad:rt}),u&&u.length>0&&u.map((o,I)=>{const C=nt(o.latestDocument.imei);return e.jsx(_t,{position:{lat:o.latestDocument.lat,lng:o.latestDocument.lng},icon:{url:(()=>{switch(C){case"2W":return te;case"3W":return Gt;case"4W":return Ye;default:return te}})(),fillColor:"red",fillOpacity:2,strokeWeight:1,size:new window.google.maps.Size(55,55),scaledSize:new window.google.maps.Size(55,55),scale:2}},I)})]}),s&&!p&&!f&&v&&e.jsx(a,{sx:{width:y?"25%":"20%"},children:e.jsx(Zt,{shapeType:E,center:v,radius:c,active:B,setActive:l,setInward:M,inward:G,setSpeedLimit:ae,speedLimit:P,setSpeedValue:re,handleGeofence:tt,speedValue:oe})})]})]})},ss=({findTypeVehicle:s,statusVehicle:p})=>{var A,d,f;const{selectedVehicle:n}=b(m=>m.liveMap),{mode:h}=b(m=>m.dashboard),r=q(h),w=[{label:"Reg Number",value:(n==null?void 0:n.reg_id)||"NA"},{label:"IMEI Number",value:(n==null?void 0:n.imei)||"NA"},{label:"Chassis Number",value:(s==null?void 0:s.chassis_no)||"NA"},{label:"Engine Number",value:(s==null?void 0:s.engine_no)||"NA"},{label:"Date of Sell",value:(s==null?void 0:s.sell_date)||"NA"},{label:"Workshop Name",value:((A=s==null?void 0:s.workShop)==null?void 0:A.name)+`(City:${(f=(d=s==null?void 0:s.workShop)==null?void 0:d.city)==null?void 0:f.name})`||"NA"},{label:"Customer Name",value:(s==null?void 0:s.customer_name)||"NA"},{label:"Status",value:p?"On":"Off"}];return e.jsx(a,{sx:{padding:"20px"},children:e.jsx(ze,{container:!0,spacing:2,children:w.map((m,j)=>e.jsx(ze,{item:!0,xs:12,sm:6,md:4,children:e.jsxs(a,{sx:{padding:"20px",borderRadius:"8px",boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",textAlign:"center"},children:[e.jsx(D,{sx:{fontWeight:"bold",color:r.grey[600]},children:m.label}),e.jsx(D,{sx:{color:r.grey[300]},children:Object.keys(n).length>0?m.value:"Please select vehicle"})]})},j))})})},as=({showMap:s,setShowMap:p,showGfBar:n,showGfAlert:h})=>{const{selectedVehicle:r,onlineVehicle:w}=b(c=>c.liveMap),{mode:A,vehicles_details:d}=b(c=>c.dashboard),f=q(A),[m,j]=i.useState(!1),[x,y]=i.useState();let g=Y();i.useEffect(()=>{console.log("onlineVehicle",w),console.log("selectedVehicle",r);let c=w.find(R=>R==r.imei);console.log("isActive",c),c?j(!0):(j(!1),console.log("Vehicle is not active"))},[w,r]),i.useEffect(()=>{if(g(pt({})),Object.keys(r).length>0){let c=S(r==null?void 0:r.imei);console.log("result",c),y(c)}},[r]);const O=c=>{const R=d&&(d==null?void 0:d.length)>0&&d.find(u=>(u==null?void 0:u.value)===c&&(u==null?void 0:u.vehilce_type));return R?R.vehilce_type:null},S=c=>{const R=d&&(d==null?void 0:d.length)>0&&d.find(u=>(u==null?void 0:u.value)===c&&u);return R||null},k=Object.keys(r).length>0?O(r.imei):null;return`${f.grey[300]}`,f.grey[300],e.jsx(e.Fragment,{children:s?e.jsx(ts,{showGfBar:n,showGfAlert:h}):e.jsxs(e.Fragment,{children:[e.jsxs(a,{sx:{display:"flex",justifyContent:"space-between",background:f.grey[200],margin:"10px",padding:"10px",borderRadius:"8px"},children:[e.jsxs(a,{sx:{},children:[e.jsx(D,{sx:{fontWeight:"bold",fontSize:"16px",margin:"4px",color:f.grey[400]},children:"Vehicle Settings"}),e.jsx(a,{sx:{display:"flex"},children:e.jsx(a,{sx:{border:"2px solid white",padding:"10px",borderRadius:"5px",background:"white",marginRight:"5px"},children:e.jsx("img",{src:(()=>{switch(k){case"2W":return te;case"3W":return qt;case"4W":return Ye;default:return te}})(),alt:"vehicleIcon",style:{width:"80px",height:"75px",borderRadius:"5px",marginRight:"20px"}})})})]}),e.jsxs(a,{onClick:()=>{p(!s)},sx:{cursor:"pointer",marginTop:"50px"},children:[e.jsx("img",{src:Qt,alt:"tractorIcon",style:{width:"80px",height:"75px",borderRadius:"5px",marginRight:"20px"}}),e.jsx(D,{sx:{fontSize:"12px",color:f.grey[400]},children:"Set Geofence"})]})]}),e.jsx(ss,{findTypeVehicle:x,statusVehicle:m})]})})};function ks(){const{w_customer_id:s}=b(c=>c.auth),{vehicleSideBar:p}=b(c=>c.geofence),{collapsed:n}=b(c=>c.auth),{mode:h}=b(c=>c.dashboard),r=q(h),[w,A]=i.useState([]);i.useState([]);const[d,f]=i.useState({user:!0,vehicle:!1}),[m,j]=i.useState(!1),[x,y]=i.useState(!1),[g,O]=i.useState(!1);let S=Y();i.useEffect(()=>{k()},[]);const k=async()=>{try{let c=[],R=[];const u=await S(ht({w_customer_id:s}));if(u.payload&&Array.isArray(u.payload)){u.payload.forEach(l=>{var G,M,P;l.imei&&Array.isArray(l.imei)&&l.imei.length>0&&((G=l.imei[0])!=null&&G.mac_id)?(c.push({id:l.id,label:l.registration_id,value:(M=l.imei[0])==null?void 0:M.mac_id,vehilce_type:l==null?void 0:l.segment,chassis_no:l==null?void 0:l.chassis_no,engine_no:l==null?void 0:l.engine_no,workShop:l==null?void 0:l.workshop,registration_id:l==null?void 0:l.registration_id,sell_date:l==null?void 0:l.sell_date}),R.push((P=l.imei[0])==null?void 0:P.mac_id)):(console.error("IMEI data not found for item:",l),_.error(`IMEI Number not found for the vehicle: ${l==null?void 0:l.registration_id}`))});const se="one",B=R;R.length>0&&S(ut({type:se,imei:B})),A(c),S(ft(c))}else console.error("Unexpected data format or empty payload:",u),_.error("Unexpected data format:")}catch(c){console.error("Error fetching vehicle data:",c),_.error(`Error fetching vehicle data: ${c}`)}};return e.jsxs("div",{className:"app",children:[e.jsx(St,{}),e.jsxs("main",{className:"content",style:{width:"100%",background:r.grey[100]},children:[e.jsx(Kt,{title:"Settings",setShowContent:f,showContent:d,showMap:m,setShowMap:j,showGfBar:x,setShowGfBar:y,showGfAlert:g,setShowGfAlert:O}),e.jsxs(a,{style:{display:"flex",width:"100%",height:"95vh"},children:[e.jsx(a,{style:{width:p?"80%":"100%",border:`1px solid ${r.grey[800]}`,borderRadius:"2px"},children:d.user?e.jsx(Yt,{}):e.jsx(as,{showMap:m,setShowMap:j,showGfBar:x,showGfAlert:g})}),!g&&!x&&p&&e.jsx(a,{style:{width:"20%"},children:e.jsx(Ct,{vehicleData:w,title:"Setting"})}),g&&!x&&!p&&e.jsx(a,{sx:{width:n?"25%":"20%"},children:e.jsx(kt,{})})]})]})]})}export{ks as default};