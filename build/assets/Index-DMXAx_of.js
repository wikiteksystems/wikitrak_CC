import{c as le,j as e,B as $,i as H,k as y,r as c,I as Y,aT as Z,aQ as J,ah as ie,w as D,aj as ce,P as X,ac as de,aF as ue,aO as he,aV as pe,aU as K,T as Q,aW as me,t as te,aw as ge,W as ee,K as xe,L as fe,O as be,N as we}from"./index-C_wM5jQm.js";import{L as _e}from"./LiveMapTopBar-_piD0xEk.js";import{V as je}from"./VehicleMenu-B2e3CAER.js";import{L as ke,t as Ce}from"./LeftSideBar2-BL42KEV5.js";import"./Loader-cw9GEQHs.js";import"./LiveMapServices-De-rPIJh.js";import"./Socket-0N_gnJcr.js";import{P as ve}from"./Parameters-SZg3H1Tx.js";/* empty css           */import"./proj-XQwXs9DQ.js";import{D as re,a as ae,b as ye,T as Se}from"./TablePagination-CF9QGP_D.js";import{D as ne,a as Be,E as De,T as Le}from"./Edit-2sOflnM1.js";import{B as P}from"./menu2-BdQ5f_y8.js";import{T as Pe,a as Te}from"./TableHead-BQskxLbQ.js";import{T as Ae,b as oe,a as Ie}from"./TableRow-C76zo8Qh.js";import{T as E}from"./TableCell-DbbSGxQ8.js";import{d as Ve}from"./Close-DufSUzIU.js";import{d as Fe}from"./Add-yNTD09Nl.js";import{u as Ee}from"./formik.esm-CyUsC1-G.js";import{c as We,a as W}from"./index.esm-Dy2tBCAJ.js";import{A as se}from"./Autocomplete-HZTCyOki.js";import{T as q}from"./TextField-CcpknjZm.js";import{S as qe}from"./SearchInput-UpP7DSuu.js";import{V as Oe}from"./VehicleGroups-CinLmt8m.js";import"./jcb-aCHXMCXy.js";import"./index-Cb83Qq9a.js";import"./createSvgIcon-wbSKSw2F.js";import"./useControlled-Cz6D0bD1.js";import"./index-CnImclZf.js";import"./Card-QPrVShgG.js";import"./Skeleton-lnw-on63.js";import"./CardContent-BSlRgzuF.js";const Re=le(e.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete"),$e=({open:h,onClose:x,onConfirm:f})=>e.jsxs(re,{open:h,onClose:x,children:[e.jsx(ne,{children:"Confirm Deletion"}),e.jsx(ae,{children:e.jsxs(Be,{children:["Are you sure you want to delete this vehicle data?"," ",e.jsx("span",{style:{color:"red"},children:"This action cannot be undone."})]})}),e.jsxs(ye,{children:[e.jsx($,{onClick:x,color:"primary",children:"Cancel"}),e.jsx($,{onClick:f,color:"secondary",children:"Delete"})]})]}),Ge="http://134.209.145.234/api/v1",Me={display:"flex",alignItems:"left",justifyContent:"left",gap:"8px"},Ne=({breakdownData:h})=>{const x=H(),{isUpdateBreakdown:f}=y(g=>g.equipment),{w_customer_id:l}=y(g=>g.auth),[m,p]=c.useState(!1),k=()=>{console.log("breakdownData",h),localStorage.getItem("role"),x(Z(!f)),x(J(h))},j=()=>{console.log("dlt btn clicked");const g=localStorage.getItem("role");ie.includes(g)?p(!0):D.error(`Sorry! Your role is ${g}. You're not allowed to add, edit or delete the vehicle`)},b=async()=>{console.log("breakdownData data deleting");try{await ce.delete(`${Ge}/vehicles/breakdown/create/${h.id}/`),D.success("breakdownData data deleted successfully!"),x(X(l))}catch(g){console.error("Error deleting breakdown data:",g),D.error("Failed to delete breakdown data. Please try again.")}p(!1)},L=()=>{p(!1)},C={color:"#686868"};return e.jsxs(P,{sx:Me,children:[e.jsx(Y,{onClick:k,children:e.jsx(De,{sx:C})}),e.jsx(Y,{onClick:j,children:e.jsx(Re,{sx:C})}),e.jsx($e,{open:m,onClose:L,onConfirm:b})]})},He=[{id:"BDID",label:"BDID"},{id:"User",label:"User"},{id:"SubmissionDate",label:"Submission Date"},{id:"WorkshopGroup",label:"Workshop Group"},{id:"Status",label:"Status"},{id:"Actions",label:"Actions"}],ze=()=>{const{breakdowns:h}=y(t=>t.breakdown),{searchTerm:x}=y(t=>t.inspection),[f,l]=c.useState("asc"),[m,p]=c.useState("BDID"),[k,j]=c.useState(0),[b,L]=c.useState(5),[C,g]=c.useState({id:"",status:"",workshop:"",user:""}),I=t=>{l(m===t&&f==="asc"?"desc":"asc"),p(t)},T=(t,o)=>{j(o)},v=t=>{L(parseInt(t.target.value,10)),j(0)},s=(t,o,a)=>t.filter(n=>{const i=new Date,u=new Date(n.submission_date);if(i.setHours(0,0,0,0),u.setHours(0,0,0,0),(a==null?void 0:a.toLowerCase())==="overdue"&&u<i&&n.status.toLowerCase()==="open")return!0;const w=a.toLowerCase(),d=n.breakdown_id.toLowerCase().includes(w),_=`${n.user.us_user.first_name} ${n.user.us_user.last_name}`.toLowerCase().includes(w),S=n.status.toLowerCase().includes(w),M=n.workshop_group.group_name.toLowerCase().includes(w);return!(a&&!(d||_||S||M)||o.id&&!n.breakdown_id.includes(o.id)||o.status&&n.status!==o.status||o.workshop&&n.workshop_group.group_name!==o.workshop||o.user&&!n.user.us_user.first_name.toLowerCase().includes(o.user.toLowerCase())&&!n.user.us_user.last_name.toLowerCase().includes(o.user.toLowerCase()))}),G=(t,o,a,n)=>{if(n==="User"){const i=`${t.user.us_user.first_name} ${t.user.us_user.last_name}`.toLowerCase(),u=`${o.user.us_user.first_name} ${o.user.us_user.last_name}`.toLowerCase();return a==="asc"?i.localeCompare(u):u.localeCompare(i)}if(n==="WorkshopGroup"){const i=t.workshop_group.group_name.toLowerCase(),u=o.workshop_group.group_name.toLowerCase();return a==="asc"?i.localeCompare(u):u.localeCompare(i)}if(n==="BDID"){const i=parseInt(t.breakdown_id.replace("BD-",""),10),u=parseInt(o.breakdown_id.replace("BD-",""),10);return a==="asc"?i-u:u-i}if(n==="SubmissionDate"){const i=new Date(t.submission_date),u=new Date(o.submission_date);return a==="asc"?i-u:u-i}if(n==="Status"){const i={Open:1,Close:2,Rejected:3},u=i[t.status]||0,w=i[o.status]||0;return a==="asc"?u-w:w-u}return 0},A=s(h.slice(),C,x).sort((t,o)=>G(t,o,f,m)),V=A.slice(k*b,k*b+b),O={fontSize:"14px",fontWeight:"bold",fontFamily:"Ubuntu",color:"black",cursor:"pointer",background:"#f2f2f2"};return e.jsx(P,{sx:{m:"10px"},children:e.jsxs(de,{children:[e.jsx(Pe,{sx:{height:"73vh",bgcolor:"white",borderRadius:"10px"},children:e.jsxs(Ae,{stickyHeader:!0,children:[e.jsx(Te,{children:e.jsx(oe,{children:He.map(t=>e.jsx(E,{sx:O,children:e.jsx(Le,{active:m===t.id,direction:m===t.id?f:"asc",onClick:()=>I(t.id),children:t.label})},t.id))})}),e.jsx(Ie,{children:V.map((t,o)=>e.jsxs(oe,{children:[e.jsx(E,{children:t.breakdown_id}),e.jsx(E,{children:`${t.user.us_user.first_name} ${t.user.us_user.last_name}`}),e.jsx(E,{children:t.submission_date||"N/A"}),e.jsx(E,{children:t.workshop_group.group_name}),e.jsx(E,{sx:{color:t.status==="Open"?"blue":t.status==="Close"?"green":"red"},children:t.status}),e.jsx(E,{children:e.jsx(Ne,{breakdownData:t})})]},o))})]})}),e.jsx(Se,{component:"div",count:A.length,page:k,onPageChange:T,rowsPerPage:b,onRowsPerPageChange:v,rowsPerPageOptions:[5,10,15]})]})})},Ue=ze;function Ye(){var O,t;const{vehicles_details:h}=y(o=>o.dashboard),{w_customer_id:x}=y(o=>o.auth),{breakdownTopics:f,UpdatedBreakdownData:l}=y(o=>o.breakdown),[m,p]=c.useState(null),[k,j]=c.useState(""),[b,L]=c.useState(!1),[C,g]=c.useState(!1),[I,T]=c.useState("");let v=H();c.useEffect(()=>{l&&(p(l.attachment),j("edit"))},[l]);const s=Ee({initialValues:{vehicle:((O=l==null?void 0:l.vehicle)==null?void 0:O.id)||"",breakdown_topic:((t=l==null?void 0:l.breakdown_topic)==null?void 0:t.id)||"",odometer_reading:(l==null?void 0:l.odometer_reading)||"",description:(l==null?void 0:l.description)||"",mob_no:(l==null?void 0:l.mob_no)||"",email:(l==null?void 0:l.email)||"",attachment:(l==null?void 0:l.attachment)||"",location:(l==null?void 0:l.location)||""},validationSchema:We({vehicle:W().required("Vehicle is required"),breakdown_topic:W().required("Breakdown Topic is required"),odometer_reading:W().required("Odometer Reading is required"),description:W().required("Description is required"),mob_no:W().matches(/^\d{10,11}$/,"Mobile number must be 10-11 digits").required("Mobile number is required"),email:W().email("Invalid email format").required("Email is required"),location:W().required("Location is required")}),onSubmit:async(o,{resetForm:a})=>{var n,i,u;try{L(!0),console.log("Submitted values:",o);const w=A(o.vehicle);o.user=w[0].user.id,o.status="Open",o.workshop_group=(u=(i=(n=w[0])==null?void 0:n.workShop)==null?void 0:i.group_name)==null?void 0:u.id,o.submission_date=new Date().toISOString().split("T")[0];let d;if(l){let _=await ue(l.attachment);console.log("file conversion",_),o.attachment=_;const S=l.id;d=await v(he({values:o,id:S}))}else d=await v(pe(o));if(d.payload.success)D.success("Breakdown submitted successfully!"),a(),j(""),p(null),v(J(null)),v(Z(!1)),v(K(!1)),v(X(x)),L(!1);else throw L(!1),new Error(d.payload.error||"Failed to submit breakdown")}catch(w){console.error("Submission Error:",w),D.error("Failed to submit breakdown. Please try again.")}}}),G=async()=>{g(!0),navigator.geolocation?navigator.geolocation.getCurrentPosition(async o=>{const{latitude:a,longitude:n}=o.coords;try{const i=await me(a,n);s.setFieldValue("location",i)}catch(i){console.error("Error fetching address:",i),D.error("Failed to convert coordinates to address.")}finally{g(!1)}},o=>{console.error("Geolocation Error:",o),D.error("Failed to retrieve location. Please try again."),g(!1)}):(D.error("Geolocation is not supported by this browser."),g(!1))},A=o=>(h==null?void 0:h.length)>0&&h.filter(n=>n.id===o),V=o=>{const a=o.currentTarget.files[0];if(s.setFieldValue("attachment",a),j((a==null?void 0:a.name)||""),a&&a.type.startsWith("image/")){const n=new FileReader;n.onload=()=>p(n.result),n.readAsDataURL(a)}else p(null)};return e.jsx(P,{sx:{p:3,maxWidth:600,margin:"auto"},children:b?e.jsx(Q,{children:"Submitted the form data..."}):e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:s.handleSubmit,children:[e.jsx(se,{options:h,getOptionLabel:o=>o.registration_id,value:h.find(o=>o.id===s.values.vehicle)||null,onChange:(o,a)=>s.setFieldValue("vehicle",(a==null?void 0:a.id)||""),renderInput:o=>e.jsx(q,{...o,label:"Vehicle",error:s.touched.vehicle&&!!s.errors.vehicle,helperText:s.touched.vehicle&&s.errors.vehicle,fullWidth:!0})}),e.jsx(se,{options:f,getOptionLabel:o=>o.topic,value:f.find(o=>o.id===s.values.breakdown_topic)||null,onChange:(o,a)=>s.setFieldValue("breakdown_topic",(a==null?void 0:a.id)||""),renderOption:(o,a)=>c.createElement("li",{...o,key:a.id},a.topic),renderInput:o=>e.jsx(q,{...o,label:"Breakdown Topic",error:s.touched.breakdown_topic&&!!s.errors.breakdown_topic,helperText:s.touched.breakdown_topic&&s.errors.breakdown_topic,fullWidth:!0,sx:{mt:2}})}),e.jsx(q,{label:"Odometer Reading",name:"odometer_reading",value:s.values.odometer_reading,onChange:s.handleChange,onBlur:s.handleBlur,error:s.touched.odometer_reading&&!!s.errors.odometer_reading,helperText:s.touched.odometer_reading&&s.errors.odometer_reading,fullWidth:!0,sx:{mt:2}}),e.jsx(q,{label:"Description",name:"description",value:s.values.description,onChange:s.handleChange,onBlur:s.handleBlur,error:s.touched.description&&!!s.errors.description,helperText:s.touched.description&&s.errors.description,fullWidth:!0,sx:{mt:2}}),e.jsx(q,{label:"Mobile Number",name:"mob_no",value:s.values.mob_no,onChange:s.handleChange,onBlur:s.handleBlur,error:s.touched.mob_no&&!!s.errors.mob_no,helperText:s.touched.mob_no&&s.errors.mob_no,fullWidth:!0,sx:{mt:2}}),e.jsx(q,{label:"Email",name:"email",type:"email",value:s.values.email,onChange:s.handleChange,onBlur:s.handleBlur,error:s.touched.email&&!!s.errors.email,helperText:s.touched.email&&s.errors.email,fullWidth:!0,sx:{mt:2}}),e.jsx(q,{label:"Location",name:"location",value:I||s.values.location,onChange:o=>{T(o.target.value),s.setFieldValue("location",o.target.value)},onBlur:s.handleBlur,error:s.touched.location&&!!s.errors.location,helperText:s.touched.location&&s.errors.location,fullWidth:!0,sx:{mt:2}}),e.jsx($,{variant:"outlined",onClick:G,disabled:C,sx:{mt:2},children:C?"Fetching Location...":"Use Current Location"}),e.jsxs($,{component:"label",sx:{mt:2,border:"1px solid #f5f5f5",color:"black"},children:["Upload Attachment",e.jsx("input",{type:"file",hidden:!0,onChange:V})]}),k&&e.jsxs(Q,{variant:"body2",sx:{mt:1},children:["Uploaded File: ",k]}),m&&e.jsx(P,{component:"img",src:m,alt:"Image Preview",sx:{mt:1,width:"100%",maxHeight:200}}),e.jsx($,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,sx:{mt:3},children:"Submit"})]})})})}function Ke({where:h}){const{isAddBreakdown:x,isUpdateBreakdown:f,UpdatedBreakdownData:l}=y(b=>b.breakdown);let m=H();const p=()=>{m(K(!1)),m(Z(!1)),m(J(null))},k=()=>{m(K(!x))},j={fontSize:"18px",fontWeight:500,lineHeight:"18.38px",textAlign:"center",paddingTop:"5px",fontFamily:"ubuntu"};return e.jsxs(P,{sx:{bgcolor:"white",m:"10px",display:"flex",textAlign:"left",justifyContent:"space-between",alignItems:"center",borderRadius:"6px",padding:"20px"},children:[e.jsx(Q,{variant:"h6",sx:j,children:h==="breakdown"?"Breakdown New Request":"New Breakdown Requests"}),e.jsx(qe,{}),h==="breakdown"&&e.jsxs($,{onClick:k,sx:{color:"black",background:te.bgColor},children:[e.jsx(Fe,{}),"Breakdown"]}),e.jsxs(re,{open:x||f,onClose:p,maxWidth:"md",fullWidth:!0,children:[e.jsxs(ne,{children:[f?"Update":"Add"," Breakdown",e.jsx(Y,{"aria-label":"close",onClick:p,sx:{position:"absolute",right:8,top:8,color:b=>b.palette.grey[500]},children:e.jsx(Ve,{})})]}),e.jsx(ae,{children:e.jsx(Ye,{})})]})]})}function Lo(){const{locationData:h,selectedVehicle:x,selectedParameterList:f,onlineVehicle:l}=y(d=>d.liveMap),{mode:m,selectedVehicleGroup:p,vehicleZone:k}=y(d=>d.dashboard),j=Ce(m),[b,L]=c.useState([]),{w_customer_id:C}=y(d=>d.auth),[g,I]=c.useState(),[T,v]=c.useState(!1),[s,G]=c.useState(!1),[A,V]=c.useState([]);c.useState(!0);const[O,t]=c.useState(!1),[o,a]=c.useState(!1);let n=H();c.useEffect(()=>{i(),n(ge()),n(X(C))},[]),c.useEffect(()=>{console.log("selectedVehicleGroup",p)},[p]),c.useEffect(()=>{V([]),n(ee([{reg_id:"",imei:"",params:[]}]))},[x]);const i=async()=>{try{t(!0);let d=[],_=[];const S=await n(xe({w_customer_id:C}));if(Array.isArray(S.payload)){S.payload.forEach(r=>{var R,F,U,B;Array.isArray(r.imei)&&r.imei.length>0&&((R=r.imei[0])!=null&&R.mac_id)?(d.push({id:r.id,label:r.registration_id,value:(F=r.imei[0])==null?void 0:F.mac_id,vehilce_type:r==null?void 0:r.segment,chassis_no:r==null?void 0:r.chassis_no,engine_no:r==null?void 0:r.engine_no,workShop:r==null?void 0:r.workshop,registration_id:r==null?void 0:r.registration_id,sell_date:r==null?void 0:r.sell_date,customer_name:r==null?void 0:r.customer_name,vehicle_model:(U=r==null?void 0:r.vehicle_model)==null?void 0:U.name,user:r==null?void 0:r.user,vehicle_group:r==null?void 0:r.vehicle_group}),_.push((B=r.imei[0])==null?void 0:B.mac_id)):console.error("IMEI data not found for item:",r)});const M="one",z=_;_.length>0&&n(fe({type:M,imei:z})),L(d),n(be({w_customer_id:C})),n(we(d)),t(!1)}else t(!1),console.error("Unexpected data format:",S),D.error("Unexpected data format:")}catch(d){console.error("Error fetching vehicle data:",d),D.error(`Error fetching vehicle data: ${d}`)}},u=async d=>{const{label:_,imei:S,id:M,reg_id:z,checked:r}=d;I(B=>B.map(N=>N.id===M?{...N,checked:!r}:N));let R=[...A],F=[...A];if(!r)h.forEach(B=>{B.latestDocument.imei===S&&(R.push({label:_,value:B.latestDocument[_==="maininputvoltage"?"mainInputVoltage":_]}),F=R,V(R))});else{let B=A.filter(N=>N.label!==_);F=B,V(B)}console.log("tempParamList",F),n(ee([{reg_id:z,imei:S,params:F}]))},w=b.filter(d=>Object.keys(p).length===0||d.vehicle_group===p.id);return e.jsxs("div",{className:"app",children:[e.jsx(ke,{}),e.jsxs("main",{className:"content",style:{width:"100%",background:"#dad6d626"},children:[e.jsx(_e,{title:"Breakdown",setShowVehicles:v,showVehicles:T,setShowVehiclesGroup:a,showVehiclesGroup:o}),e.jsx(Oe,{setShowVehiclesGroup:a,showVehiclesGroup:o}),e.jsxs(P,{style:{display:"flex",width:"100%",height:"95vh"},children:[e.jsxs(P,{style:{width:T||s?"80%":"100%",background:te.bgShadow},children:[e.jsx(Ke,{where:"breakdown"}),e.jsx(Ue,{})]}),T&&e.jsx(P,{style:{width:"20%",backgroundColor:j.grey[100]},children:e.jsx(je,{vehicleData:w,title:"Inspections",setParameterData:I,loadingVehicle:O,setShowVehicles:v,showVehicles:T,showParameters:s,setShowParameters:G})}),s&&e.jsx(P,{style:{width:"20%",backgroundColor:j.grey[100]},children:e.jsx(ve,{parametersData:g,setParameterData:I,handleParameterChange:u})})]})]})]})}export{Lo as default};