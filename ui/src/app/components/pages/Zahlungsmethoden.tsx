import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import { format } from 'date-fns';
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';
//import axios from 'axios';
import { getData, postData, deleteData } from '../../services/main-service';
import { SET_MESSAGE } from "../../redux/types";
import { connect } from 'react-redux';
//import { getData } from '../../services/main-service';
//import { connect } from 'react-redux';

//const API_URL = process.env.API_URL+'/memoria';

class Zahlungsmethoden extends Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      loading: true,
      cards: [],
      id: 0,
    }
    this.handleCardDelete = this.handleCardDelete.bind(this);
    this.handleCardMaintain = this.handleCardMaintain.bind(this);
}

componentDidMount() {
  this.fetchItems();
}

async fetchItems() {

  let id:any = await this.props.user.userAddress.id;
  await this.setState({ id: id });
  let saveCards:any = await getData(`/memoria/getMethod?url=/CreditCardAlias/getCreditCardAliasesByAddressID&AddressID=${id}`);

  /* if(saveCards['status'] === 200 && Array.isArray(saveCards['data'])) {
    let cardUpd:any = [];
    console.log( "saved Cards+++++++++++++++++++++++++++", saveCards );
      saveCards['data'].forEach(async (data:any, inx:any)=> {
        let cardData:any = await getData(`/memoria/cards?alias=${data['alias']}`);
        if(cardData['status'] === 200) {
          let cd:any = {
            id: data['id'],
            alias: data['alias'], 
            expiryMonth: data['expiryMonth'], 
            expiryYear: data['expiryYear'], 
            masked: cardData['data']['masked'], 
            paymentMethods: data['paymentMethods'] 
          };
          cardUpd.push(cd);
        }
        //console.log("Indivitual card Data+++++++++++++++++++++++", cardData);
      });
    console.log("update Cards+++++++++++++++++++++",cardUpd);      
    await this.setState({ cards: cardUpd, loading: false });  
  } else {
    await this.setState({ loading: false });
  } */

  await this.setState({ cards: saveCards['data'], loading: false });  

}

componentDidUpdate(prevProps:any, prevState:any) {
  if(prevProps.match.params.id !=  this.props.match.params.id) {
    this.fetchItems();
  }
 }

async handleCardDelete(id:any) {
    console.log("Aiase id++++++++++++++++", id);
    let deleteCard:any = await deleteData(`/memoria/deleteMethod?url=/CreditCardAlias/delCreditCardAliasByID&ID=${id}`, {});
    console.log("DELETE CARD INFORMATION+++++++++++++++++", deleteCard);
    this.fetchItems();
    this.props.dispatch({
      type: SET_MESSAGE,
      payload: { message:  "Card Delet Successfully", variant: 'success' },
    });
}

getCardName(method:any) {
  let pMethods:any = { ECA:"MasterCard", VIS:"Visa", AMX: "American Express", CUP: "UnionPay", DIN: "Diners", DIS: "Discover", JCB: "JCB", 
                        MAU:"Maestro", DNK: "Dankort", UAP: "Airplus" };
  return pMethods[method];
}

async handleCardMaintain(card:any, status:any) {
  console.log("Card Data++++++++++++++++++++", card, " status+++++++++++++++", status);
  card['active'] = status;
  let updateCard:any = await postData(`/memoria/putMethod?url=/CreditCardAlias/setCreditCardAliases`, [card]);
  console.log("Update Card++++++++++++++++++++", updateCard);
  if(updateCard['status'] === 200) {
    let saveCards:any = await getData(`/memoria/getMethod?url=/CreditCardAlias/getCreditCardAliasesByAddressID&AddressID=${card['addressID']}`);
     await this.setState({ cards: saveCards['data'] });  
  }
}

  render() {

    let { loading, cards, id } = this.state;
    console.log("loading++++++++++++++++++++", id);
    console.log("loading++++++++++++++++++++", loading);
    console.log("Cards Info++++++++++++++++++++", cards);

    return (
      <div onClick={()=>{this.setState({showDatePicker:false})}}>
        <Header />
        <Leftsidemenu />
        <div className="mainWrapper active">
          <Row no-gutters>
            <Col sm={12}>
              <div className="menu-category-bar active">
                <Container fluid>
                  <div className="menu-category-title">
                    <h1>
                      <i className="lnr-license mr-1"></i> Verfügbare Zahlungsmethoden{' '}
                      <div className="zahlunBtns">
                        <a href="/" className="btn-theme btn-rounded btn-sm mr-2">
                          Neue kreditkarte hinzufügen{' '}
                        </a>
                        <a href="/" className="btn-theme btn-rounded btn-sm">
                          Neues paypal konto hinzufügen
                        </a>
                      </div>
                    </h1>
                  </div>
                </Container>
              </div>
              <div className="mainWrapperBody dashboard">
              <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                { loading ? <span>Loading...</span> :
                  Array.isArray(cards) && cards.length > 0 ? 
                    cards.map((card:any, idx:any) => {
                      return(
                            <React.Fragment key={`${idx}`}>
                              <div className="CardList">
                                <Row>
                                  <Col lg={4} md={4} sm={4} xs={12}>
                                    <div className="CardImage">
                                      <img src={`/assets/images/${card['paymentMethods']}.jpg`} alt="" />
                                    </div>
                                    <div className="CardName">
                                      { this.getCardName(card['paymentMethods']) }
                                    </div>
                                  </Col>
                                  <Col lg={8} md={8} sm={8} xs={12}>
                                    <div className="CardNumber">{card['ccNumber']}</div>
                                    <div className="CardDate">{card.expiryMonth}/{card.expiryYear}</div>
                                    <div className="CardBtns">
                                      { card['active'] ?
                                         <span onClick={()=>this.handleCardMaintain(card, false)} className="btn-theme btn-rounded btn-sm" style={{marginRight: '20px', cursor: 'pointer'}}>deaktivieren</span>
                                         :
                                         <span onClick={()=>this.handleCardMaintain(card, true)} className="btn-theme btn-rounded btn-sm" style={{marginRight: '20px', cursor: 'pointer'}}>Aktivate</span>
                                      }
                                      <span className="btn-delete btn-rounded btn-sm" onClick={ ()=>this.handleCardDelete(card.id) } style={{cursor: 'pointer'}}>Löschen</span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </React.Fragment>
                          )
                      }
                    )
                    : <p>No Saved Cards...</p>
                  }
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
    message: state.messages,
	  isAuthenticated: state.client.isLoggedIn,
	  user: state.client.user,
	}
  };
  
export default connect( mapStateToProps )(Zahlungsmethoden)

//export default Zahlungsmethoden;
