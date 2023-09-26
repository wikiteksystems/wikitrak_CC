

const MarkerItem1 = ({item}) =>{
    return ( 
     <div style={{display:"flex",flexDirection:"column",gap:"20px",padding:"10px 0px"}} >

      <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>Veh Reg No :</h2>
          <p>{item?.latestDocument?.registrationNumber}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>Imei :</h2>
          <p>{item?.latestDocument?.imei}</p>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>Gsm Strength :</h2>
          <p>{item?.latestDocument?.gsmStrength}</p>
        </div>
       
  
       
  
        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"15px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>Int Battery :</h2>
          <p>{item?.latestDocument?.internalBatteryVoltage}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"10px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>speed :</h2>
          <p>{item?.latestDocument?.speed}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"10px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>altitude :</h2>
          <p>{item?.latestDocument?.altitude}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"10px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>IGN Status :</h2>
          <p>{item?.latestDocument?.ignition?"True":"False"}</p>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"10px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>DIG IN St :</h2>
          <p>{item?.latestDocument?.digitalInputStatus}</p>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"40px",justifyContent:"space-between",borderBottom:"1px solid rgba(0,0,0,0.3)",paddingBottom:"10px"}}>
          <h2 style={{color:"black",fontWeight:"600"}}>ANA IN St :</h2>
          <p>{item?.latestDocument?.digitaloutputStatus}</p>
        </div>
     

    </div>
    )
  }

  export default MarkerItem1