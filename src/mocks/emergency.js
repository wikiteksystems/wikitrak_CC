import axios from "axios";

class EmergencyApi {
    async getImeiToReg(data) {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/emergency/getImeiToReg`,data);
          return result.data
        }catch(error){
            console.log(error)
            return false;
        }
    }
}

export const emergencyApi  = new EmergencyApi();