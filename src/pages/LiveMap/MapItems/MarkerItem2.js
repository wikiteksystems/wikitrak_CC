import WeatherForecast from "../WeatherForecast";

  



const MarkerItem2 = ({ item }) => {
  
  if (item?.latestDocument?.venderId === "GT-06") {
    // console.log(item,"WWWWWWWWWWWWWWWWW")
    return (
      <div style={{ display: "flex", gap: "30px", padding: "20px 10px"}}>
        

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
           
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Device Type :</p>
            <p>wikitrak mini</p>
          </div>
         
          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Imei :</p>
            <p>{item?.latestDocument?.imei}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Packet Header :</p>
            <p>{item?.latestDocument?.packetHeader}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Speed :</p>
            <p>{item?.latestDocument?.speed}</p>
          </div>
          <WeatherForecast classname="mb-5" center={{ lat: item?.latestDocument?.lat, lng: item?.latestDocument?.lng }} />
        </div>
        
      </div>
      
    );
  } else {
    
    return null;
  }
};

export default MarkerItem2;

