import axios from "axios";

class LoginApi {
    async getImeiToReg(data) {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API2_URL}/ccServer/login/getImeiToReg`,data);
          return result.data
        }catch(error){
            console.log(error)
            return false;
        }
    }


}

export const loginApi = new LoginApi();