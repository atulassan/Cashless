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

const Home = (props) => {
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
	                    <li className="mm-active">
	                        <Link to="/home"><i className="metismenu-icon lnr-layers" /> <span>Dashboard</span></Link>
	                    </li>
	                    <li>
	                        <Link to="transaktionen"><i className="metismenu-icon lnr-briefcase" /> <span>Transaktionen</span></Link>
	                    </li>
	                    <li>
	                        <Link to="support"><i className="metismenu-icon lnr-bubble" /> <span>Support</span></Link>
	                    </li>
	                    <li>
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
		                        <h1><i class="lnr-layers mr-1"></i> Dashboard  </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody grey-bg dashboard">
				            <Row>
				              	<Col lg={6} md={6} sm={6} xs={12}>
					                <div className="kpi-item borderleft-green">
										<div className="media">
										    <div className="kpi_icon">
										      <img className="mr-3" src="images/svg/coins.svg" alt="" />
										    </div>
										    <div className="media-body">
										      <h5 className="mt-0">Aktueller Saldo</h5>
										      <p>CHF 23.00</p>
										    </div>
										</div>
									</div>
					            </Col>

					            <Col lg={6} md={6} sm={6} xs={12}>
						            <div class="kpi-item borderleft-red">
						                <div className="media">
											<div className="kpi_icon">
											    <img className="mr-3" src="images/svg/low-battery.svg" alt="" />
											</div>
											<div className="media-body">
											    <a href className="btn-theme btn-rounded">Aufladen</a> 
											</div>
										</div>
									</div>

					            </Col>
					            <Col lg={12} md={12} sm={12} xs={12}>
						            
					            	<div className="card dash_min_height">
										  <div className="card-header">
										    	Verlauf (CHF)
										  </div>
										  <div className="card-body">
											    <div className="table-responsive">
											      <table className="table verlauf">
											        <tbody>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Web Aufladung</h5>
											              <p>18.11.2020   <span className="time">10:20</span></p>
											            </td>
											            <td className="text-right"><span className="green">+ 20.00</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Kiosk EG</h5>
											              <p>15.11.2020   <span className="time">16:43</span></p>
											            </td>
											            <td className="text-right"><span className="red">- 5.20</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Mensa OG</h5>
											              <p>12.11.2020   <span className="time">09:15</span></p>
											            </td>
											            <td className="text-right"><span className="red">-12.20</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Kiosk Aufladung</h5>
											              <p>02.11.2020   <span className="time">13:08</span></p>
											            </td>
											            <td className="text-right"><span className="green">+ 30.00</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Web Aufladung</h5>
											              <p>18.11.2020   <span className="time">10:20</span></p>
											            </td>
											            <td className="text-right"><span className="green">+ 20.00</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Kiosk EG</h5>
											              <p>15.11.2020   <span className="time">16:43</span></p>
											            </td>
											            <td className="text-right"><span className="red">- 5.20</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Mensa OG</h5>
											              <p>12.11.2020   <span className="time">09:15</span></p>
											            </td>
											            <td className="text-right"><span className="red">-12.20</span></td>
											          </tr>
											          <tr>
											            <td>
											              <div className="icon"><img src="images/pos-icon.jpg" alt="" /></div>
											              <h5>Kiosk Aufladung</h5>
											              <p>02.11.2020   <span className="time">13:08</span></p>
											            </td>
											            <td className="text-right"><span className="green">+ 30.00</span></td>
											          </tr>
											        </tbody>
											      </table>
											    </div>
										  </div>
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
export default Home;
