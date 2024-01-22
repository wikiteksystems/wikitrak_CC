import WeatherForecast from "../WeatherForecast";

const MarkerItem2 = ({ item }) => {
  console.log(item,"markeritem")
  // if (item?.latestDocument?.venderId === "GT-06") {
  if (item?.latestDocument?.venderId === "WTK4G06") {


    return (
      <div style={{ display: "flex", gap: "30px", padding: "20px 10px" }}>


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
          
          {/* <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Ignition status :</p>
            <p>{item?.latestDocument?.ignition}</p>
          </div> */}

          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Ignition status :</p>
            <p style={{ color: item?.latestDocument?.ignition ? "green" : "red", fontWeight: "600" }}>
              {item?.latestDocument?.ignition ? "On" : "Off"}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <p style={{ color: "black", fontWeight: "600" }}>Battery volts :</p>
            <p>{item?.latestDocument?.mainInputVoltage}</p>
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

