const MarkerItem2 = ({ item }) => {
    if (item?.latestDocument?.venderId === "GT-06") {
      return (
        <div style={{ display: "flex", gap: "30px", padding: "20px 10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
              <h2 style={{ color: "black", fontWeight: "600" }}>Device Type :</h2>
              <p>{item?.latestDocument?.venderId}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
              <h2 style={{ color: "black", fontWeight: "600" }}>Imei :</h2>
              <p>{item?.latestDocument?.imei}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
              <h2 style={{ color: "black", fontWeight: "600" }}>Packet Header :</h2>
              <p>{item?.latestDocument?.packetHeader}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
              <h2 style={{ color: "black", fontWeight: "600" }}>Speed :</h2>
              <p>{item?.latestDocument?.speed}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  
  export default MarkerItem2;
  