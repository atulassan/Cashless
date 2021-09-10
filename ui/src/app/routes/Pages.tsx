import * as React from "react";
//import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Login from '../components/pages/Login';
import Home from '../components/pages/Home';
import Passwortandern from '../components/pages/Passwortandern';
import Support from '../components/pages/Support';
import Transaktionen from "../components/pages/Transaktionen";
import Zahlungsmethoden from "../components/pages/Zahlungsmethoden";
import Success from "../components/pages/Success";
import Failure from "../components/pages/Failure";
import Cancelled from "../components/pages/Cancelled";
import LoggedOutRoute from "./LoggedOutRoute";
import LoggedInRoute from "./LoggedInRoute";
import AccessDenied from "../components/pages/AccessDenied";
import { connect } from "react-redux";

import jwt from 'jsonwebtoken';
import { logout } from "app/redux/actions/auth.action";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Pages = (props: any) => {
  const globalId = process.env.COOKIE_GLOBAL_KEY ? process.env.COOKIE_GLOBAL_KEY : 'oneix-sid';
  console.log('cookieeee', globalId, jwt.decode(cookies.get(globalId)));
  React.useEffect(() => {
   
    if (props.isAuthenticated == false) {
      if (cookies.get(globalId) != 'undefined' && cookies.get(globalId) != ''  && jwt.decode(cookies.get(globalId))!=null) {
        let userData: any = {}
        userData = jwt.decode(cookies.get(globalId));
        console.log('userData',userData,userData.exp)
        localStorage.setItem("user", JSON.stringify({ ...userData, token: cookies.get(globalId) }));
        if (userData.exp < (new Date().getTime() + 1) / 1000) {
          props.dispatch(logout());
        }
        location.reload();
      }
    }
    else {
      if (cookies.get(globalId) == 'undefined' || cookies.get(globalId) == ''  || jwt.decode(cookies.get(globalId))==null) {
        props.dispatch(logout());
      }
      else{
        let userData:any = jwt.decode(cookies.get(globalId));
        console.log('userData',userData,userData.exp,Object.keys(userData.userAddress).length)
        if (userData.exp < (new Date().getTime() + 1) / 1000) {
          props.dispatch(logout());
        }

        // if(Object.keys(userData.userAddress).length<=0){
          
        //   const history = useHistory()
        //   history.push(`/${userData.companyCode}/AccessDenied`);
        // }
      }
    }
  }, []);
  return (
    <Switch>
      <LoggedOutRoute path={["/", "/login"]} exact={true} component={Login} />
      <LoggedInRoute path={["/:companyName/", "/:companyName/home"]} exact={true} component={Home} />
      <LoggedInRoute path="/:companyName/passwortandern" exact={true} component={Passwortandern} /> 
      <LoggedInRoute path="/:companyName/support" exact={true} component={Support} /> 
      <LoggedInRoute path="/:companyName/transaktionen" exact={true} component={Transaktionen} />
      <LoggedInRoute path="/:companyName/zahlungsmethoden" exact={true} component={Zahlungsmethoden} />
      <LoggedInRoute path="/:companyName/success" exact={true} component={Success} />
      <LoggedInRoute path="/:companyName/failure" exact={true} component={Failure} />
      <LoggedInRoute path="/:companyName/Cancelled" exact={true} component={Cancelled} />
      <Route path="/:companyName/AccessDenied" exact={true} component={AccessDenied} />
    </Switch>
  );
};


const mapStateToProps = (state: any) => {
  console.log('loggedin pages', state)
  return {
    isAuthenticated: state.client.isLoggedIn,
    messages: state.messages
  }
};

export default connect(
  mapStateToProps
)(Pages);
//export default Pages;
