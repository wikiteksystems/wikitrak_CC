import axios from "axios";

class LiveMonitorApi {
    async getTelematicParam() {
        try{
          const result = await axios.get(`${process.env.REACT_APP_API1_URL}/api/v1/fotax/header/?device_type=wtkpltf001`);
            console.log(result)
          return result.data
        }catch(error){
            console.log(error)
            return false;
        }
    }
}

export const liveMonitorApi = new LiveMonitorApi();