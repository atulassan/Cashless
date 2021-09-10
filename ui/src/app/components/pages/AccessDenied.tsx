import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { } from 'react-router-dom';
//import Leftsidemenu from '../modules/Leftsidemenu';
// import Header from '../shared/Header';
//import Alert from '../shared/Alert'

import { logout } from '../../redux/actions/auth.action';

function AccessDenied(props: any) {
  const history = useHistory();
  const logoutFunc = function () {
    props.dispatch(logout());
  };
  if (props.isAuthenticated === false) {
    history.push('/');
    return null;
    // alert("this is a logged in route, you are logged out, redirected to log in");
  }
  return (
    <div>
      {/* <Header /> */}
      <div className="mainWrapper pl-0">
        <div className="row no-gutters">
          <div className="col-lg-12">
            <div className="mainWrapperBody">
              <div className="not-found-base">
                <div className="not-found AccessDenied">
                  <div className="AccessDeniedLogo">
                    <img src="/assets/images/Access-Denied.jpg" alt="" title="" />
                  </div>
                  <h1>Access Denied</h1>
                  <p>
                    <a className="AccessDeniedBtn btn-theme" href="#" onClick={() => logoutFunc()}>
                      Logout
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  console.log('logout', state);
  return {
    isAuthenticated: state.client.isLoggedIn,
    user: state.client.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(AccessDenied);
//export default AccessDenied;
