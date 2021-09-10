import * as React from "react";
import { connect } from "react-redux";
import { Route, useHistory, useParams } from "react-router-dom";

import { logout } from "../redux/actions/auth.action"

import {  Footer } from '../components'
import Alert from '../components/modules/Alert'
interface IProps {
  exact?: boolean;
  isAuthenticated?: boolean | null;
  path: any;
  messages?: any;
  user?:any;
  dispatch:any;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated,
  messages,
  user,
  dispatch,
  ...otherProps
}: IProps) => {
  const history = useHistory()
  if (isAuthenticated === true) {
    if(user.companyCode!='' || user.companyCode!= undefined){
      console.log('companyCode==',user.companyCode)
      if(user.userAddress==null || Object.keys(user.userAddress).length<=0){
        history.push(`/${user.companyCode}/AccessDenied`);
      }else{
      history.push(`/${user.companyCode}/`);
      }
      return null;
    }
    console.log('history', history);
    let params: any = {};
    params = useParams();
    if (params.companyName == '' || params.companyName == undefined) {
      dispatch(logout());
      history.push("/login");
    }
    else{
      history.push(`/${params.companyName}/`);
    }
    //alert("this is a logged out route, you are logged in, redirected to home page");
  }

  const loadAlert = () => {
    console.log('messagesmessages', messages)
    if (typeof messages.message === 'string')
      return (<Alert variant={messages.variant} show={messages.show} message={messages.message} />)
    else {
      const listItems = messages.message.map((msg: any, id: any) => <Alert key={id} variant={messages.variant} show={messages.show} message={msg} />);
      return listItems;
    }

  }
  return (
    <>

      {loadAlert()}
      {/* <Header isAuthenticated={isAuthenticated}  {...otherProps} /> */}
      <Route  {...otherProps}
        render={otherProps => (
          <>

            <Component {...otherProps} />
          </>
        )}
      />
      <Footer />
      {/* <footer>
        Logged Out Footer
      </footer> */}
    </>
  );
};

const mapStateToProps = (state: any) => {
   console.log('logout', state)
  return {
    isAuthenticated: state.client.isLoggedIn,
    user:state.client.user,
    messages: state.messages
  }
};

export default connect(
  mapStateToProps
)(LoggedOutRoute);