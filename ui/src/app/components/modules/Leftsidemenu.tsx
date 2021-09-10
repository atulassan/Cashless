import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Leftsidemenu extends Component<any, any>{
    render(){
        return(
                <React.Fragment>
                    <div className="left-sidebar sidebar-shadow active">
						<div className="left-sidebar-inner">
							<ul className="vertical-nav-menu">
								<li className="mm-active">
									<NavLink activeClassName="selected mm-active" to="/home"><i className="metismenu-icon lnr-layers" /> <span>Dashboard</span></NavLink>
								</li>
								<li>
									<NavLink activeClassName="selected mm-active" to="transaktionen"><i className="metismenu-icon lnr-briefcase" /> <span>Transaktionen</span></NavLink>
								</li>
								<li>
									<NavLink activeClassName="selected mm-active" to="zahlungsmethoden"><i className="metismenu-icon lnr-license" /> <span>Zahlungsmethoden Verwalten</span></NavLink>
								</li>
								<li>
									<NavLink activeClassName="selected mm-active" to="support"><i className="metismenu-icon lnr-bubble" /> <span>Support</span></NavLink>
								</li>
								<li>
									<NavLink activeClassName="selected mm-active" to="passwortandern"><i className="metismenu-icon lnr-cog" /><span>Passwort ändern</span></NavLink>
								</li>
							</ul>
						</div>
					</div>
                </React.Fragment>

        )
    }

}
export default Leftsidemenu

