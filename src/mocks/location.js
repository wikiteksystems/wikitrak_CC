import axios from "axios";

class LocationsApi {
    async getImeiToReg(data) {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/location/getImeiToReg`,data);
          return result.data
          
        }catch(error){
            console.log(error)
            return false;
        }
    }

    async getTripHistory(data) {
        try{
          console.log(data, "get tripHistory")
          const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/location/findTripHistory`,data);
        //   const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/location/getTripOverspeedingData`,data);

          return result.data
        }catch(error){
            console.log(error)
            return false;
        }
    }
}

export const locationsApi = new LocationsApi();