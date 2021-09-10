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

const Login = (props) => {
        return(
            <div className="loginBg">
				{/* <div class="left-content">
					<div class="text-left">
						<h4>Von unterschiedlichen Anwendungen zum einheitlichen Betriebssystem</h4>
						<p>Ersetzen Sie Ihr Flickwerk aus Cloud-Anwendungen, veralteten Tools und papierbasierten Prozessen durch ein einziges Betriebssystem für Ihr gesamtes Unternehmen.</p>
					</div>
				</div> */}
				<div className="col-body-content">
					<Row>
						<Col lg={6} md={6} sm={6} xs={12}>
						<div className="login-logo">
							<img src="images/login-logo.png" alt="logo" title="Memoria-Cashless" />
						</div>
							<div className="loginForm">
								<form>
									<h1>Anmelden</h1>
									<div className="row">
										<div className="col-lg-12 col-md-12 ">
											<div className="form-group">
												<label>Benutzername</label>
												<input type="text" name="loginname"  className="form-control" placeholder="" />
											</div>
										</div>
										<div className="col-lg-12 col-md-12 ">
											<div className="form-group">
												<label>Passwort</label>
												<div className="form-icon-base">
													<input name="password" type="password" className="form-control" placeholder="" />
													<span className="form-icon"><img src="/images/svg/eye-view.svg" /></span>
													{/*<span className="form-icon"><img src="/images/svg/eye-hide.svg" /></span>*/}
												</div>
											</div>
										</div>
									</div>

									<div className="btnFooter">
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<p className="mb-3 mt-3 PasswortSpeichern"><label className="ix-checkbox-label"><input type="checkbox" className="ix-checkbox" /><mark className="mr-2" />  Passwort speichern</label></p>
												</div>
											</div>
											<div className="col-lg-12 col-md-12 ">
												<div className="form-group">
													<Link to="home" className="btn-theme btn-block">Anmelden</Link>
													{/* <input className="btn-theme btn-block" value="Anmelden" type="submit" /> */}
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</Col>
						<Col lg={6} md={6} sm={6} xs={12}>
							<img src="images/cashless-login-img.jpg" alt=""  />
						</Col>
					</Row>
				</div>
			</div>
        )
    }
export default Login;
