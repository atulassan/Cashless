import React, { } from 'react';
import { Link } from 'react-router-dom';

import {
 Navbar,
 Nav,
 Container,
 Row,
 Col,
 NavDropdown
} from "react-bootstrap";

const Passwortandern = (props) => {
        return(
            <div>
                <Navbar fixed="top" variant="dark" expand="md" className="top-header">
			      	<Navbar.Brand href="#home" className="dash-logo">
					  <img src="images/logo-color.png" alt="logo" title="Memoria-Cashless" />
			      	</Navbar.Brand>
			      	<Nav className="rhs-menu">
			      		<NavDropdown title="Anitha Sivakumar" id="basic-nav-dropdown">
					        <NavDropdown.Item href="#">Ausloggen</NavDropdown.Item>
					    </NavDropdown>
			         	<Nav.Link href="#"><i class="lnr lnr-alarm" /></Nav.Link>
			       	</Nav>
			   	</Navbar>
                <div className="left-sidebar sidebar-shadow active">
	                <div className="left-sidebar-inner">
	                  <ul className="vertical-nav-menu">
	                    <li>
	                        <Link to="/home"><i className="metismenu-icon lnr-layers" /> <span>Dashboard</span></Link>
	                    </li>
	                    <li>
	                        <Link to="transaktionen"><i className="metismenu-icon lnr-briefcase" /> <span>Transaktionen</span></Link>
	                    </li>
	                    <li>
	                        <Link to="support"><i className="metismenu-icon lnr-bubble" /> <span>Support</span></Link>
	                    </li>
	                    <li className="mm-active">
	                        <Link to="passwortandern"><i className="metismenu-icon lnr-cog" /><span>Passwort ändern</span></Link>
	                    </li>
	                  </ul>
	                </div>
	            </div>

                <div className="mainWrapper active">
				  	<Row no-gutters>
				      <Col sm={12}>
				        <div className="menu-category-bar active">
				          <Container fluid>
				            <div class="menu-category-title">
		                        <h1><i class="lnr-cog mr-1"></i> Passwort ändern </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody grey-bg dashboard">
				            <Row>
					            <Col lg={12} md={12} sm={12} xs={12}>
					            	<div className="password-change">
									  	<form>
										    <div className="row">
										      <div className="col-lg-6 col-md-6 ">
										        <div className="form-group">
										          <div className="form-icon-base">
										            <input id="pass2" type="password" className="form-control" placeholder="Neues Kennwort" />
										            <span className="form-icon"><img id="pas_visible2" src="images/eye2.svg" alt="" /></span>
										          </div>
										          {/* <span class="errorMsg">Field is Required</span>*/}
										        </div>
										      </div>
										      <div className="col-lg-6 col-md-6 ">
										        <div className="form-group">
										          <div className="form-icon-base">
										            <input id="pass3" type="password" className="form-control" placeholder="Kennwort bestätigen" />
										            <span className="form-icon"><img id="pas_visible3" src="images/eye2.svg" alt="" /></span>
										          </div>
										          {/* <span class="errorMsg">Field is Required</span>*/}
										        </div>
										      </div>
										      <div className="col-lg-12 col-md-12 mt-2">
										        <a className="btn-theme btn-rounded" href>Passwort ändern</a>
										      </div>
										    </div>
									  	</form>
									</div>
					            </Col>
				            </Row>
				        </div>
				      </Col>
					</Row>
            	</div>


		  </div>
        )
    }
export default Passwortandern;
