

const MarkerItem1 = ({ item }) => {

  function intTo4BitBinary(value) {
    if (value >= 0 && value <= 15) {
      return value.toString(2).padStart(4, '0');
    } else {
      return 0;
    }
  }


  function intTo2BitBinary(value) {
    if (value >= 0 && value <= 3) {
      return value.toString(2).padStart(2, '0');
    } else {
      return 'Invalid input. Value must be between 0 and 3.';
    }
  }

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px 10px" }} >
    <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
        <h2 style={{ color: "black", fontWeight: "600" }}>Veh Reg No :</h2>
        <p>{item?.latestDocument?.registrationNumber}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
        <h2 style={{ color: "black", fontWeight: "600" }}>Imei :</h2>
        <p>{item?.latestDocument?.imei}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
        <h2 style={{ color: "black", fontWeight: "600" }}>Device Type :</h2>
        <p>{item?.latestDocument?.venderId}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"  }}>
        <h2 style={{ color: "black", fontWeight: "600" }}>Gsm Strength :</h2>
        <p>{item?.latestDocument?.gsmStrength}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>Int Battery :</h2>
        <p>{item?.latestDocument?.internalBatteryVoltage}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>speed :</h2>
        <p>{item?.latestDocument?.speed}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>altitude :</h2>
        <p>{item?.latestDocument?.altitude}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>IGN Status :</h2>
        <p>{item?.latestDocument?.ignition ? "True" : "False"}</p>
      </div>
      </div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>DIG OUT St 1 :</h2>
        <p>{intTo2BitBinary(item?.latestDocument?.digitaloutputStatus).slice(0, 1)}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>DIG OUT St 2 :</h2>
        <p>{intTo2BitBinary(item?.latestDocument?.digitaloutputStatus).slice(1, 2)}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>ANA IN St :</h2>
        <p>{item?.latestDocument?.analogInput1}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.3)"}}>
        <h2 style={{ color: "black", fontWeight: "600" }}>ANA IN St :</h2>
        <p>{item?.latestDocument?.analogInput2}</p>
      </div>
      </div>
    </div>
  )
}

export default MarkerItem1