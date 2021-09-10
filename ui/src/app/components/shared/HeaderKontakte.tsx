import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import UserInfo from '../modules/UserInfo';

export function HeaderKontakte() {
  
  useEffect(() => {
    var $ = require('jquery');
    var tmenu_h = $('.top-header').height();
    $('.mainWrapper').css({ marginTop: tmenu_h });
    $('.left-sidebar').css({ marginTop: '0px' });
  }, []);

  return (
    <div>
      <div className="top-header">
        <div className="row no-gutters">
          <div className="col-lg-8">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="dash-logo">
                <Link to="/">
                  <img src="/assets/images/m-logo.png" alt="logo" title="memoria desq" />
                </Link>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/tickets">
                      Tickets
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/kunden">
                      Kunden
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/MProdukte">
                      Produkte
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-lg-4">
            <div className="rhs-menu">
              <ul>
                <li>
                  <Link to="#" className="">
                    one ix gmbh
                  </Link>
                </li>
                <li>
                  <Link to="#" className="searchPopupBoxOpen">
                    <i className="lnr lnr-magnifier" />
                  </Link>
                </li>
                <li>
                  <Link to="/addkontakte">
                    <i className="lnr lnr-plus-circle" />
                  </Link>
                </li>
                <li>
                  <Link to="#" className="userNotifi">
                    <i className="lnr lnr-alarm" />
                  </Link>
                </li>
                {/* <li><Link to='#' className="settingPopupOpen"><i className="lnr lnr-cog" /></Link></li>*/}
                <li>
                  <Link to="#" className="userMenu bg-white chat_status online">
                    <img src="/assets/images/default-image.png" alt="default" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <UserInfo />
    </div>
  );
}

export default HeaderKontakte;
