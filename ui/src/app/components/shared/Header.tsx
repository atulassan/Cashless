import React, { Component } from 'react';
import { logout } from '../../redux/actions/auth.action';
import { connect } from 'react-redux';
import { postData } from '../../services/main-service';
import { Navbar, Nav, Modal, Media } from 'react-bootstrap';
declare var Datatrans: any

export class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      //userInfo: {},
	  rechargeAmount: "",
      notifiShow: false,
	  paymentModal:false,
	  userModal:false,
	  choosePrice: [
		{price: 200, selected: false}, 
		{price: 100, selected: false}, 
		{price: 50, selected: false}, 
		{price: 20, selected: false}],        
    };
	this.handlePayment = this.handlePayment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChoosePrice = this.handleChoosePrice.bind(this);
  }
  async componentDidMount() {
    this.fetchItems();
  }
  async fetchItems() {
    //console.log("User Info", this.props.user.user);
    await this.setState({ loading: false});//, userInfo: this.props.user.userAddress });
	console.log("Header Props++++++++++++++++++", this.props);
  }
  logout() {
    this.props?.dispatch(logout());
  }

  async handlePayment(useCard: any, alias:any, exMonth:any, exYear:any, paymentMethods:any) {

    console.log("Testing Testing Testing"); 
    
    await this.setState({ paymentModal: false });

    let { rechargeAmount } = this.state;
    
    let data:any = {
      amount: rechargeAmount,
      useCard: useCard,
      alias: alias,
      exMonth: exMonth,
      exYear:exYear,
      paymentMethods: paymentMethods
    };

    let generatePayment:any = await postData(`/memoria/payment`, data);
    console.log("generate Payment+++++++++++++", generatePayment);
    if(generatePayment['status'] === 200 && generatePayment['data'].hasOwnProperty('transactionId')) {
      //let Datatrans:any = {};
	  console.log("Loading++++++++++++++++++++++");
      Datatrans.startPayment({
        transactionId: generatePayment['data']['transactionId'],
        redirect: {
          successUrl: 'http://localhost:3003/home',
          errorUrl: 'http://localhost:3003/cancelled',
          cancelUrl: 'http://localhost:3003/failure'
        }
      });
	  console.log("Loading Done++++++++++++++++++++++++++");
    }

  }

  async handleChange( e:any ) {
    let { value } = e.target;
    this.setState({rechargeAmount: parseFloat(value).toFixed(2)});   
  }

  async handleChoosePrice(price:any, idx:any) {
      let { choosePrice } = this.state;
      console.log("Price value++++++++++++++", price, idx);
      choosePrice.forEach((price:any, imx:any) => {
        if(imx == idx) {
          choosePrice[imx].selected = true    
        } else {
          choosePrice[imx].selected = false    
        }
      });
      console.log("Price+++++>", price, "choosePrice++++++++++>", choosePrice);
      await this.setState({rechargeAmount: parseFloat(price).toFixed(2), choosePrice: choosePrice});
      console.log("Price+++++>", this.state.rechargeAmount, "choosePrice++++++++++>", this.state.choosePrice);
  }

  render() {
    
	let {  notifiShow, paymentModal, rechargeAmount, choosePrice, userModal } = this.state;

		//console.log("User Info++++++++++++++>", userInfo?.fields[0],userInfo?.fields[3]['value']);

		return (
			
			<React.Fragment>
				<Navbar fixed="top" variant="dark" expand="md" className="top-header">
					<Navbar.Brand href="/home" className="dash-logo">
						<img src="/assets/images/logo-color.png" alt="logo" title="Memoria-Cashless" />
					</Navbar.Brand>
					<Nav className="rhs-menu">
						<Nav className="btn-theme btn-rounded top-aufladen" onClick={() =>{this.setState({ paymentModal: true})} } >Aufladen</Nav>
						<Nav.Link onClick={() =>{this.setState({ notifiShow: true})} }>
							<i className="lnr lnr-alarm" />
						</Nav.Link>
						<Nav.Link className="userMenu" onClick={() =>{this.setState({ userModal: true})} }>
							<img src="/assets/images/default-image.png" alt="" />
						</Nav.Link>

						{/* <NavDropdown title={this.props.user?.userAddress?.fields[3]['value']?.charAt(0).toUpperCase() + this.props.user?.userAddress?.fields[3]['value']?.charAt(1).toUpperCase()} id="basic-nav-dropdown">
							<NavDropdown.Item onClick={()=>{this.logout()}} href="/">Ausloggen</NavDropdown.Item>
						</NavDropdown> */}
						
					</Nav>
				</Navbar>

				<Modal
					show={notifiShow}
					onHide={() => {this.setState({ notifiShow: false})}} 
					className="modal-slide"
					>
					<Modal.Header closeButton>
					<Modal.Title>Benachrichtigungen</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="notifiList">
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
							<Media className="mediaList">
								<img
									width={64}
									height={64}
									className="mr-3"
									src="/assets/images/notiImg.png"
									alt=""
								/>
								<Media.Body>
									<h5>Benachrichtigungen Title</h5>
									<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
									ante sollicitudin commodo.
									</p>
								</Media.Body>
							</Media>
						</div>
					</Modal.Body>
				</Modal>

				
				<Modal
                show={paymentModal}
                onHide={() => {this.setState({ paymentModal: false})}} 
                className="modal-slide payment-slide"
                >
                <Modal.Header closeButton>
                <Modal.Title>Aufladen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="PaymentBase">
                    <div className="PaymentInput">
                      <span className="amntLabel">Eigener Betrag</span>
                      <input type="number" placeholder="CHF 00" className="form-control" name="rechargeAmount" value={rechargeAmount} onChange={this.handleChange} />
                      <span className="amntRatio">Min 20 / Max 500</span>
                    </div>
                    <div className="PaymentIcons">
                      <ul>
                        { choosePrice.map((tick:any, idx:any) =>
                          <React.Fragment key={`${idx}`}>
                            <li onClick={()=>this.handleChoosePrice(tick.price, idx)} className={tick['selected'] ? "active" : ""}>
                              <label className="ix-checkbox-label">
                                <input type="radio" name=""className="rating-checkbox" /><mark />
                              </label>
                              <span className="selectedTick">
                                <img src="/assets/images/selectedTick.png" alt="" />
                              </span>
                              <img className="selectedBgImg" src={`/assets/images/franc-${tick.price}.png`} alt="" />
                              <div className="rcb-amount">
                                <h3>{tick.price} <span>CHF</span></h3>
                              </div>
                            </li>
                          </React.Fragment>
                          )
                        }
                      </ul>
                    </div>
                    
                    <div className="PaymentPopBtn">
                      { (parseInt(rechargeAmount) >= 20 && parseInt(rechargeAmount) <= 500) ?
                        <button style={{cursor:"pointer", top:"0px", width:"100%"}} className="btn-theme btn-rounded" onClick={ ()=>this.handlePayment(false, 0, 0, 0, 0) }>Aufladen</button> 
                        : null
                      }
                    </div>
                  
                  </div>
                </Modal.Body>
              </Modal>

			  <Modal
                show={userModal}
                onHide={() => {this.setState({ userModal: false})}} 
                className="modal-slide"
                >
                <Modal.Header closeButton>
                <Modal.Title>Prifil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
					<div className="userInfoHeader">
						<div className="userTitle  chat_status online">
							<img src="/assets/images/default-image.png" alt="" />
						</div>
						<div className="profile-section">
							<span className="profile-name mt-3">
							{this.props.user?.userAddress?.fields[3]['value']?.charAt(0).toUpperCase() + this.props.user?.userAddress?.fields[3]['value']?.charAt(1).toUpperCase()}
							</span>
						</div>
					</div>
					<div className="profile-content-wrap flex1">
					<div className="profile_details ">
						<ul>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-apartment" /> {this.props.user?.userAddress?.fields[3]['value']}
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-map-marker" /> {this.props.user?.userAddress?.addressLine}
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-list" /> 4658 Däniken
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-envelope" /> {this.props.user?.userAddress?.contactFields[0]['value']}
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-phone-handset" /> {this.props.user?.userAddress?.contactFields[4]['value']}
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="lnr lnr-earth" /> {this.props.user?.userAddress?.contactFields[2]['value']}
								</a>
							</li>
						</ul>
					</div>
					<div className="userBottom">
						<ul className="upBtmBnd">
							<li>
								<a
								className="link"
								href="javascript:void(0);"
								onClick={()=>{this.logout()}}
								>
								<i className="lnr lnr-power-switch"></i> Abmelden
								</a>
							</li>
						</ul>
					</div>
					</div>
                </Modal.Body>
              </Modal>
			</React.Fragment>
		)
  	}
}

//export default Header;

const mapStateToProps = (state: any) => {
  console.log('header', state);
  return {
    isAuthenticated: state.client.isLoggedIn,
    user: state.client.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Header);
