import{a as s,r as i,j as t,a6 as c,T as n,P as d,a7 as u,a8 as h}from"./index-Df49Wuj5.js";import{C as l}from"./Card-DazE0H6e.js";import"./Paper-DeeinfJ6.js";const j=()=>{const{w_userToken:a}=s(e=>e.auth),[r,p]=i.useTransition(),o=()=>{r(()=>{window.location.href="/login"})};return a?t.jsx(h,{}):t.jsx(c,{maxWidth:"sm",sx:{marginTop:"2rem"},children:t.jsxs(l,{sx:{padding:"2rem",textAlign:"center"},children:[t.jsx(n,{variant:"h4",gutterBottom:!0,children:"Unauthorized Access"}),t.jsx(n,{variant:"body1",paragraph:!0,children:"You are not authorized to access this page."}),!a&&t.jsx(d,{variant:"contained",component:u,to:"/login",onClick:o,children:"Go to Login Page"})]})})};export{j as default};