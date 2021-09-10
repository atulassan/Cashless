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

const Transaktionen = (props) => {
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
	                    <li className="mm-active">
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
		                        <h1><i class="lnr-briefcase mr-1"></i> Transaktionen  </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody grey-bg dashboard">
				            <Row>
					            <Col lg={12} md={12} sm={12} xs={12}>
					            	<table className="table table-striped mb-0 order-list-table" cellSpacing={0}>
										<thead>
										    <tr>
										      <th width="20%"># Nummer</th>
										      <th width="20%">Transaktionsnummer</th>
										      <th width="20%">Datum</th>
										      <th width="20%">Gesamt CHF</th>
										      <th className="text-center" width="20%">Aktion</th>
										    </tr>
										</thead>
									  	<tbody>
										    <tr>
										      <td>1</td>
										      <td>0001</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>2</td>
										      <td>0002</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>3</td>
										      <td>0003</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>4</td>
										      <td>0004</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>5</td>
										      <td>0005</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>6</td>
										      <td>0006</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>7</td>
										      <td>0007</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>8</td>
										      <td>0008</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>9</td>
										      <td>0009</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>10</td>
										      <td>0010</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>11</td>
										      <td>0011</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>12</td>
										      <td>0012</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>13</td>
										      <td>0013</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>14</td>
										      <td>0014</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
										    <tr>
										      <td>15</td>
										      <td>0015</td>
										      <td>07.21.2020</td>
										      <td>200 CHF</td>
										      <td className="text-center"><a href className="btn-theme btn-rounded btn-sm"><i className="lnr-eye" /> aussicht </a></td>
										    </tr>
									  	</tbody>
									</table>
					            </Col>
				            </Row>
				        </div>
				      </Col>
					</Row>
            	</div>


		  </div>
        )
    }
export default Transaktionen;
