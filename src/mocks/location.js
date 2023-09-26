import axios from "axios";

class LocationsApi {
    async getImeiToReg(imei) {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/location/getImeiToReg`,imei);
          return result.data
        }catch(error){
            console.log(error)
            return false;
        }
    }
}

export const locationsApi = new LocationsApi();