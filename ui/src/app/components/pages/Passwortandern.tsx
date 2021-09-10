import React, { useState, useRef  } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { connect } from "react-redux";
import { SET_MESSAGE } from "../../redux/types";
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';
import { getData, postData } from '../../services/main-service';
var md5 = require('md5');
import { format } from 'date-fns';

type FormData = {
	oldPassword:string,
	newPassword:string,
};

function Passwortandern(props:any) {

	const [oldPasswordType, setoldPasswordType] = useState(true);
	const [oldPasswordType2, setoldPasswordType2] = useState(true);

	const { register, errors, handleSubmit, watch } = useForm<FormData>({
		criteriaMode: "all"
	  });
	const password = useRef({});
	password.current = watch("password", "");

	const changeoldPasswordType = async ()=> {
		console.log(oldPasswordType);
		console.log('testing');
		if(oldPasswordType) {
		  setoldPasswordType(false);
		} else {
		  setoldPasswordType(true);
		}
	  }

	  const changeoldPasswordType2 = async ()=> {
		console.log(oldPasswordType2);
		console.log('testing');
		if(oldPasswordType2) {
		  setoldPasswordType2(false);
		} else {
		  setoldPasswordType2(true);
		}
	  }

	const onSubmit = async (data: FormData) => {
		console.log(data);
		let id:any = props.user.userAddress.id;
		let getUser:any = await getData(`/memoria/getMethod?url=/Addresses/getAddressByID&ID=${id}&Fields=memoriaWebPassword`);
		if(getUser['status'] === 200 && getUser['data']['fields'].length > 0) {
			console.log("Get User+++++++++++++++++>", getUser);
			
			let oldPassword = getUser['data']['fields']['0']['value'];
			console.log(md5(data['oldPassword']),'==', (oldPassword.split("-").join("").toLowerCase()))
			if (md5(data['oldPassword']) == (oldPassword.split("-").join("").toLowerCase())) {
				//let parts:any = md5(data['newPassword']).match(/.{1,2}/g).join("-").toUpperCase();
				let newPassword:any = md5(data['newPassword']).match(/.{1,2}/g).join("-").toUpperCase();

				let fData:any = [{
					"id": parseInt(id),
					"masterID": 0,
					'fields': [{field: "memoriaWebPassword", value: newPassword.toString()}],
					"inactive": false,
					"dateCreated": format(new Date(), 'yyyy-MM-dd'),
					"dateLastModified": format(new Date(), 'yyyy-MM-dd'),
					"priceLevel": 0,
				}];
			  
				console.log("Submit Build Data", fData);
			  
				let updUser:any = await postData(`/memoria/putMethod?url=/Addresses/setAddresses`, fData); 

				console.log("Update User+++++++++++++++++>", updUser);

				if(updUser.hasOwnProperty('status') && updUser.status === 200) {
					props.dispatch({
					  type: SET_MESSAGE,
					  payload: { message: "New Password Updated", variant: 'success' },
					  });
				} else {
					props.dispatch({
					  type: SET_MESSAGE,
					  payload: { message: "Error", variant: 'Error' },
					  });
				}

			} else {
				props.dispatch({
					type: SET_MESSAGE,
					payload: { message: "Your Request password Not match or Not available", variant: 'Error' },
					});
			}
			//console.log("Old Password+++++++++++++>", oldPassword);
		}
	}

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
		                        <h1><i className="lnr-cog mr-1"></i> Passwort ändern </h1>
		                    </div>
				          </Container>
				        </div>
				        <div className="mainWrapperBody dashboard">
				            <Row>
					            <Col lg={12} md={12} sm={12} xs={12}>
					            	<div className="password-change">
									  	<form onSubmit={handleSubmit(onSubmit)}>
										    <div className="row">
										      <div className="col-lg-6 col-md-6 ">
										        <div className="form-group">
										          <div className="form-icon-base">
										            <input id="pass2" type={ oldPasswordType ? "password" : "text" } name="oldPassword" ref={register({ required: "Diese Eingabe ist erforderlich." })} className="form-control" placeholder="Neues Kennwort" />
										            <span className="form-icon"><img onClick={changeoldPasswordType} src={oldPasswordType ? "/assets/images/eye2.svg" : "/assets/images/eye1.svg"} alt="eye1" /></span>
												</div>
												<p style={{marginTop:'10px'}}><ErrorMessage
													errors={errors}
													name="oldPassword"
													render={({ messages }) => {
														return messages
														? Object.entries(messages).map(([type, message]) => (
															<span className="text-danger error" key={type}>{message}</span>
														))
														: null;
													}}
													/></p>
										          {/* <span className="errorMsg">Field is Required</span>*/}
										        </div>
										      </div>
										      <div className="col-lg-6 col-md-6 ">
										        <div className="form-group">
										          <div className="form-icon-base">
										            <input id="pass3" type={ oldPasswordType2 ? "password" : "text" } name="newPassword" ref={register({ required: "Diese Eingabe ist erforderlich." })} className="form-control" placeholder="Kennwort bestätigen" />
										            <span className="form-icon"><img onClick={changeoldPasswordType2} src={oldPasswordType2 ? "/assets/images/eye2.svg" : "/assets/images/eye1.svg"} alt="" /></span>
										          </div>
												  <p style={{marginTop:'10px'}}><ErrorMessage
													errors={errors}
													name="newPassword"
													render={({ messages }) => {
														return messages
														? Object.entries(messages).map(([type, message]) => (
															<span className="text-danger error" key={type}>{message}</span>
														))
														: null;
													}}
												 /></p>
										          {/* <span className="errorMsg">Field is Required</span>*/}
										        </div>
										      </div>
										      <div className="col-lg-12 col-md-12 mt-2">
										       	{/*<a className="btn-theme btn-rounded" href="/">Passwort ändern</a>*/}
												<button className="btn-theme btn-rounded" type="submit">Passwort ändern</button>
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
//export default Passwortandern;

  function mapStateToProps(state: any) {
	console.log('statta', state);
	return {
	  	message: state.messages,
		user: state.client.user,
	};
}
export default connect(mapStateToProps)(Passwortandern);