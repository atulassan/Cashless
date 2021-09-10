import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';


class Support extends Component<any, any> {
  
		render() {

        return(
            <div>
                <Header />
              	<Leftsidemenu />
                <div className="mainWrapper active">
				  	<Row no-gutters>
				      <Col sm={12}>
				        <div className="menu-category-bar active">
				          <Container fluid>
				            <div className="menu-category-title">
		                        <h1><i className="lnr-bubble mr-1"></i> Support </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody dashboard">
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
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li>
									          <div className="chat-date">Heute</div>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
									          <p>When you're backed against the wall, break the god damn thing down.</p>
									        </li>
									        <li className="sent">
									          <div className="chat-image left"><img src="/assets/images/user.jpg" alt="admin icon" /><span className="chat-time">1.00 PM</span></div>
									          <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
									        </li>
									        <li>
									          <div className="chat-date">Gestern</div>
									        </li>
									        <li className="replies ">
									          <div className="chat-image right"><img src="/assets/images/user.jpg" alt="User icon" /><span className="chat-time">1.01 PM</span></div>
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
}

export default Support;
