import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const cookieOption={
  path:"/",
  domain:process.env.COOKIE_DOMAIN?process.env.COOKIE_DOMAIN:'localhost'
}
 const globalId=process.env.COOKIE_GLOBAL_KEY?process.env.COOKIE_GLOBAL_KEY:'oneix-sid';
 

const API_URL = process.env.API_URL+'/memoria';
class AuthService {
  login(username:any, password:any,companyCode:any) {
    return axios
      .post(API_URL + "/login", { loginame:username, password,companyCode })
      .then((response) => {
        console.log('rrsss',response);
        if (response.data.response) {
          localStorage.setItem("user", JSON.stringify(response.data.response));
          cookies.set(globalId, response.data.response.token,cookieOption);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    cookies.remove(globalId, cookieOption)
  }

  register(customerData:any) {
    return axios.post(API_URL + "/signup", customerData);
  }

  myprofile() {
    //localStorage.getItem("user");
    //return axios.get(API_URL + '')
    return "testing";
  }
  checkVerifyToken(data:any) {
    return axios.post(API_URL + "/check-token",data);
  }
  verifyToken(data:any) {
    return axios.post(API_URL + "/create/password",data);
  }

}

export default new AuthService();