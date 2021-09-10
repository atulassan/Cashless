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

const Support = (props) => {
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
	                    <li className="mm-active">
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
		                        <h1><i class="lnr-bubble mr-1"></i> Support </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody grey-bg dashboard">
				            <Row>
					            <Col lg={12} md={12} sm={12} xs={12}>
					            	<div className="chatBase">
									  <div className="chat-box-inner page-scroll">
									    <div className="messages">
									      <ul>
									        <li>
									          <div className="chat-date">20.07.2020</div>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li>
									          <div className="chat-date">Heute</div>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									      </ul>
									    </div>
									  </div>
									  <div className="basket-order-button">
									    <div className="message-input">
									      <div className="input-group">
									        <input type="text" className="form-control" placeholder="Eine Nachricht schreiben" />
									        <div className="input-group-append">
									          <button className="btn btn-success " type="button"><i className="lnr lnr-rocket" /></button>
									        </div>
									      </div>
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
export default Support;
