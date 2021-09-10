import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Modal } from "react-bootstrap";
import { format } from 'date-fns';
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';
import { getData, postData } from '../../services/main-service';
import { priceFormat } from "../../utils"
import { connect } from 'react-redux';
import { SET_MESSAGE } from "../../redux/types";
import queryString from 'query-string';
declare var Datatrans: any
//import axios from 'axios';

//import { Base64 } from 'js-base64';

//const API_URL = process.env.API_URL+'/memoria';

export class Home extends Component<any, any> {
  
  constructor(props:any) {
      super(props);
      this.state = {
        loading: false,
        transaktionen: [],
        cardBalance: 0,
        rechargeAmount: "",
        cards: [],
        paymentModal:false,
        choosePrice: [
        {price: 200, selected: false}, 
        {price: 100, selected: false}, 
        {price: 50, selected: false}, 
        {price: 20, selected: false}],        
      }
      //this.handleShowModal = this.handleShowModal.bind(this);
      this.handlePayment = this.handlePayment.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChoosePrice = this.handleChoosePrice.bind(this);
	}

	componentDidMount() {
		this.setState({loading: true});
		this.fetchItems();
	  }
	
	async fetchItems() {

    //console.log("Props++++++++++++++++++++++++++", this.props.user.user.id);

    let params:any = queryString.parse(this.props.location.search);
		let id:any = this.props.user.userAddress.id;
    let props:any =  this.props;
		
    //console.log("Parameters+++++++++++++", params, params.datatransTrxId);
    if(Object.keys(params).length > 0 && params.datatransTrxId != '') {

        console.log("Parameters+++++++++++++", params);

        let data:any = { datatransTrxId: params.datatransTrxId };
        console.log("Transaction Data++++++++++++++++++", data);

        let paymentDetails:any = await postData(`/memoria/transaction`, data);

        console.log("payment details+++++++++++++++", paymentDetails);

        if( paymentDetails.status === 200) {
            
          let transactionId:any =  paymentDetails['data']['transactionId'];
          let amount:any = parseFloat(paymentDetails['data']['history'][0]['amount'])/100;
          //let cardInfo:any = paymentDetails['data']['card'];
          let alias:any = paymentDetails['data']['card'].hasOwnProperty('alias') ? paymentDetails['data']['card']['alias'] : 0;
          let expiryMonth:any = paymentDetails['data']['card']['expiryMonth'];
          let expiryYear:any = paymentDetails['data']['card']['expiryYear'];
          let paymentMethod:any = paymentDetails['data']['paymentMethod'];
          let bookingText:any = JSON.stringify({"transactionId":transactionId, "bookingText":"Testing Book Text"});
          let masked:any = paymentDetails['data']['card']['masked'];
          
          let payment:any = await postData(`/memoria/postMethod?url=/CustomerCard/bookCustomerCard&AddressID=${parseInt(id)}&Amount=${amount}&BookingText=${bookingText}`, {});
          console.log("Payment INFO++++++++++++++++++++++++++", payment);
          console.log("Alias INFO++++++++++++++++++++++++++", alias);
          if(alias) {
            let cardData:any = [{
              "id": 0,
              "addressID": parseInt(id),
              "alias": alias,
              "ccNumber": masked.toString(),
              "active": true,
              "expiryMonth": parseInt(expiryMonth),
              "expiryYear": parseInt(expiryYear),
              "paymentMethods": paymentMethod,
            }];
            console.log("save card Data+++++++++++++++++++++++++++++", cardData);
            let saveCard:any = await postData(`/memoria/putMethod?url=/CreditCardAlias/setCreditCardAliases`, cardData);
            console.log("Saved Card INFO++++++++++++++++++++++++++", saveCard);
          }
          if(payment['status'] === 200 && payment['data']) {
            props.dispatch({
              type: SET_MESSAGE,
              payload: { message:  "Transaction Successful", variant: 'success' },
            });
          }

        }

    }

    let transHistory:any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardHistory&AddressID=${id}`);
		let cardbalance:any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardBalance&AddressID=${id}`);
    let saveCards:any = await getData(`/memoria/getMethod?url=/CreditCardAlias/getCreditCardAliasesByAddressID&AddressID=${id}`);
    console.log("CartBalanace+++++++++++++>", cardbalance);
    console.log("CartHistory+++++++++++++>", transHistory);
    console.log("Saved Cards+++++++++++++>", saveCards);
    let cardListing:any = (saveCards['status'] === 200 && Array.isArray(saveCards['data'])) ? saveCards['data'].filter((card:any) => { return card.active === true }) : [];
    console.log("Card Listing++++++++++",cardListing);
    this.setState({
        loading: false, 
        transaktionen: await transHistory['status'] === 200 ? Array.isArray(transHistory['data']) ? transHistory['data'].slice(0, 10) : [] : [],
        cardBalance: await cardbalance['status'] === 200 ? parseFloat(cardbalance['data']) : 0,
        cards: await cardListing.length > 0 ? cardListing : [],
      });
    
		console.log( "Transcation History++++++++++++", this.state.transaktionen );
    console.log( "Card Balance++++++++++++", this.state.cardBalance );

	}


  async handleShowModal() {
		await this.setState({paymentModal: true});		
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

      let { loading, transaktionen, cardBalance, paymentModal, rechargeAmount, choosePrice, cards } = this.state;
      console.log("card listing++++++++++", cards);

        return (

            <div>

              <Header />
              <Leftsidemenu />
                 
                <div className="mainWrapper active">
                  <Row no-gutters>
                    <Col sm={12}>
                      <div className="menu-category-bar active">
                        <Container fluid>
                          <div className="menu-category-title">
                                  <h1><i className="lnr-layers mr-1"></i> Dashboard  </h1>
                              </div>
                        </Container> 
                      </div>
                      <div className="mainWrapperBody dashboard">
                          <Row>
                              <Col lg={6} md={6} sm={6} xs={12}>
                                <div className="kpi-item borderleft-green">
                          <div className="media">
                              <div className="kpi_icon">
                                <img className="mr-3" src="/assets/images/svg/coins.svg" alt="" />
                              </div>
                              <div className="media-body">
                                <h5 className="mt-0">Aktueller Saldo</h5>
                                <p>
                                  CHF { priceFormat(cardBalance) }
                                </p>
                              </div>
                          </div>
                        </div>
                            </Col>

                            <Col lg={6} md={6} sm={6} xs={12}>
                              <div className="kpi-item borderleft-red">
                                  <div className="media">
                            <div className="kpi_icon">
                                <img className="mr-3" src="/assets/images/svg/low-battery.svg" alt="" />
                            </div>
                            <div className="media-body">
                                <Row>
                                  <Col lg={6} md={6} sm={6} xs={12}>
                                    {/* <input type="text" placeholder="Aufladebetrag" className="form-control" name="rechargeAmount" value={rechargeAmount} onChange={this.handleChange} /> */}
                                    <button style={{cursor:"pointer", top:"0px"}}  onClick={() =>{this.setState({ paymentModal: true})} } className="btn-theme btn-rounded">Aufladen</button> 
                                  </Col>
                                  { /* parseInt(rechargeAmount) > 0 &&
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                      <Row>
                                          <Col lg={6} md={6} sm={6} xs={12}>
                                            <button style={{cursor:"pointer", top:"0px"}} onClick={ ()=>this.handlePayment(false, 0, 0, 0, 0) } className="btn-theme btn-rounded">Aufladen</button> 
                                          </Col>
                                          <Col lg={6} md={6} sm={6} xs={12}>
                                            { cards.length > 0 && 
                                              <ul>
                                                { cards.map((card:any, idx:any) => {
                                                  return (
                                                    <Fragment key={idx}>
                                                      <li key={idx}>
                                                        <span onClick={ ()=>this.handlePayment(true, card['alias'], card['expiryMonth'], card['expiryYear'], card['paymentMethods']) }>
                                                          <img style={{height: '45px', borderRadius:"5px", cursor:"pointer", marginTop:"5px", marginLeft:"10px" }} src={`/assets/images/${card.paymentMethods}.jpg`} alt="" />
                                                        </span>
                                                      </li>
                                                    </Fragment>
                                                    )
                                                  })
                                                }
                                              </ul>
                                            }
                                          </Col>
                                        </Row> 
                                    </Col>
                                          */ }
                                </Row>
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
                                { loading ? <span>Loading...</span> :
							                      transaktionen ? 

                                  <table className="table verlauf">
                                    <tbody>
                                      { transaktionen.map((trans:any, idx:any) => {
                                          //console.log(visitCheck[idx]);
                                          //let bTxt:any = JSON.parse(trans.bookingText);
                                          let bTxt:any = {};
                                          try {
                                            bTxt = JSON.parse(trans.bookingText);
                                          } catch (error) {
                                            console.log(error);
                                          }
                                          return (
                                          <Fragment key={`${idx}`}>
                                            <tr>
                                              <td>
                                                <div className="icon"><img src="/assets/images/pos-icon.jpg" alt="" /></div>
                                                  <h5>{bTxt.bookingText}</h5>
                                                  <p>{ format(new Date(trans.date), 'dd.MM.yyyy')} <span className="time">{ format(new Date(trans.date), 'hh:MM') }</span></p>
                                              </td>
                                              <td className="text-right">
                                                { trans.amount > 0 ?
                                                  <span className="green">+{priceFormat(trans.amount)}</span>
                                                  : 
                                                  <span className="red">{priceFormat(trans.amount)}</span>
                                                }
                                              </td>
                                            </tr>
                                          </Fragment>
                                                )
                                            })
                                      }
                                    </tbody>
                                  </table>
                                  : <p>No History Found</p>
						                    }
                                </div>
                            </div>
                        </div>

                            </Col>

                          </Row>
                      </div>
                    </Col>
                </Row>
              </div>
              				
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


          </div>
        )
    }
}
//export default Home

const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
    message: state.messages,
	  isAuthenticated: state.client.isLoggedIn,
	  user: state.client.user,
	}
  };
  
export default connect( mapStateToProps )(Home)

