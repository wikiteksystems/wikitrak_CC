import{a as s,r as i,j as t,C as c,T as r,B as d,L as u,O as h}from"./index-Dia834ar.js";import{C as l}from"./Card-CuUyhrK_.js";import"./Paper-Cx8BtNu4.js";const j=()=>{const{w_userToken:n}=s(e=>e.auth),[a,p]=i.useTransition(),o=()=>{a(()=>{window.location.href="/login"})};return n?t.jsx(h,{}):t.jsx(c,{maxWidth:"sm",sx:{marginTop:"2rem"},children:t.jsxs(l,{sx:{padding:"2rem",textAlign:"center"},children:[t.jsx(r,{variant:"h4",gutterBottom:!0,children:"Unauthorized Access"}),t.jsx(r,{variant:"body1",paragraph:!0,children:"You are not authorized to access this page."}),!n&&t.jsx(d,{variant:"contained",component:u,to:"/login",onClick:o,children:"Go to Login Page"})]})})};export{j as default};