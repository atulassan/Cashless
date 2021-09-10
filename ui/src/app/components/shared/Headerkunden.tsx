import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';

export class Header extends Component<any,any>{
  componentDidMount() {
    var $ = require( "jquery" );
    var tmenu_h = $('.top-header').height();
    $('.mainWrapper').css({"marginTop":tmenu_h});
    $('.left-sidebar').css({"marginTop":"0px"});
  }
    render(){
        return(
              <div>
                
                <div className="top-header">
                    <div className="row no-gutters">
                      <div className="col-lg-8">
                        <nav className="navbar navbar-expand-lg navbar-light">
                          <div className="dash-logo">
                            <Link to="/"><img src="/assets/images/menu.svg" alt="logo" title="memoria activity" /></Link>
                          </div>
                          <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                              <li className="nav-item">
                                <NavLink className="nav-link" exact to="/tickets">Tickets</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" exact to="/hilfecenter">Hilfecenter</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" exact to="/kunden">Kunden</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" exact to="/berichte">Berichte</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" exact to="/aktivitäten">Aktivitäten</NavLink>
                              </li>
                            </ul>
                          </div>
                        </nav>
                      </div>
                      <div className="col-lg-4">
                        <div className="rhs-menu">
                          <ul>
                            <li><Link to='#' className="">one ix gmbh</Link></li>
                            <li><Link to='#' className="searchPopupBoxOpen" data-ref="test" data-toggle="tooltip" data-placement="bottom" title="Suche"><i className="lnr lnr-magnifier" /></Link></li>
                            <li><Link to="add-ticket"  ><i className="lnr lnr-plus-circle" /></Link></li>
                            <li><Link to='#' className="userNotifi" data-toggle="tooltip" data-placement="bottom" title="Benachrichtigungen"><i className="lnr lnr-alarm" /></Link></li>
                            <li><Link to='#' className="settingPopupOpen" data-toggle="tooltip" data-placement="bottom" title="Einrichten"><i className="lnr lnr-cog" /></Link></li>
                            <li><Link to='#' className="userMenu bg-white chat_status online"><img src="/assets/images/default-image.png" alt="default" /></Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
        )
    }

    

}
export default Header

