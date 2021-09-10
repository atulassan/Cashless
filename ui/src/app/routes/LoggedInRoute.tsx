import * as React from "react";
import { connect } from "react-redux";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";
import Alert from '../components/modules/Alert'
import { Header, Footer } from '../components'

interface IProps {
  exact?: boolean;
  isAuthenticated?: boolean | null;
  path: any;
  messages?: any;
  user:any;
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  messages,
  user,
  ...otherProps
}: IProps) => {
  const history = useHistory()
  const location = useLocation()
  console.log(history)
  if (isAuthenticated === false) {
    history.push("/");
    return null;
    // alert("this is a logged in route, you are logged out, redirected to log in");
  }

  let params: any = {};
  params = useParams();
  if((user.companyCode =='' || user.companyCode== undefined) && (params.companyName =='' || params.companyName == undefined)){
    //dispatch(logout());
    history.push("/login");
    return null;
  }

  if (isAuthenticated === true) {
    console.log('locationlocation',location,user)
    if(location.pathname.indexOf(`/${user.companyCode}/`)<0){
      history.push(`/${user.companyCode}${location.pathname}`);
    }
    if(Object.keys(user.userAddress).length<=0){
        

          history.push(`/${user.companyCode}/AccessDenied`);
          return null;
        }
   // history.push("/");
    
    // alert("this is a logged in route, you are logged out, redirected to log in");
  }
  //useEffect(() => {

    console.log('params', params)
    otherProps.path = '/' + (params.companyName?params.companyName:'') + otherProps.path;
  //});
  
  const loadAlert = () => {
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
      <Header isAuthenticated={isAuthenticated}  {...otherProps} />
      <Route  {...otherProps}
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      <Footer />
      {/* <footer>
        Logged In Footer
      </footer> */}
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log('loggedin', state)
  return {
    isAuthenticated: state.client.isLoggedIn,
    user:state.client.user,
    messages: state.messages
  }
};

export default connect(
  mapStateToProps
)(LoggedInRoute);
