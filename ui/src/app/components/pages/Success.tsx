import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';

//import axios from 'axios';
//import { Base64 } from 'js-base64';

//const API_URL = process.env.API_URL+'/memoria';

export class Success extends Component<any, any> {
  
  constructor(props:any) {
      super(props);
      this.state = {
        loading: false,
      }
	}

	componentDidMount() {
		this.setState({loading: true});
		//this.fetchItems();
    console.log(this.props);
	  }
	
    render() {

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
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <p>Success</p>                              
                            </Col>
                          </Row>
                      </div>
                    </Col>
                </Row>
              </div>
          </div>
        )
    }
}

export default Success


/*const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
	  isAuthenticated: state.client.isLoggedIn,
	  user: state.client.user,
	}
  };
  
export default connect( mapStateToProps )(Home)*/