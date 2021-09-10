import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { login } from "../../redux/actions/auth.action";
import { Row, Col } from "react-bootstrap";

type FormData = {
	loginname: string,
	password: string,
	companyCode:string,
};


function Login(props:any) {

	const [oldPasswordType, setoldPasswordType] = useState(true);

	//render() {
		const { register, errors, handleSubmit } = useForm<FormData>({
			criteriaMode: "all"
		});
		//const [formData, setFormData] = React.useState<FormData>()
	
		const onSubmit = async (data: FormData) => {
			console.log('data',data);
			//props.dispatch(login(data.loginname, data.password));
			props.dispatch(login(data.loginname, data.password,data.companyCode));
		}

		const changeoldPasswordType = async ()=> {
			console.log(oldPasswordType);
			console.log('testing');
			if(oldPasswordType) {
			  setoldPasswordType(false);
			} else {
			  setoldPasswordType(true);
			}
		  }

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
							<img src="/assets/images/login-logo.png" alt="logo" title="Memoria-Cashless" />
						</div>
							<div className="loginForm">
								<form onSubmit={handleSubmit(onSubmit)}>
									<h1>Anmelden</h1>
									<div className="row">
									<div className="col-lg-12 col-md-12 ">
													<div className="form-group">
														<label>Org. Code</label>
														<input type="text" name="companyCode" ref={register({ required: "This input is required." })} className="form-control" placeholder="" />
														{/* <span class="errorMsg">Field is Required</span>*/}
														<ErrorMessage
															errors={errors}
															name="companyCode"
															render={({ messages }) => {
																return messages
																	? Object.entries(messages).map(([type, message]) => (
																		<span className="errorMsg" key={type}>{message}</span>
																	))
																	: null;
															}}
														/>
													</div>

												</div>

										<div className="col-lg-12 col-md-12 ">
											<div className="form-group">
												<label>Benutzername</label>
												<input type="text" name="loginname"  ref={register({ required: "This input is required." })} className="form-control" placeholder="" />
												<ErrorMessage
														errors={errors}
														name="loginname"
														render={({ messages }) => {
															return messages
																? Object.entries(messages).map(([type, message]) => (
																	<span className="errorMsg" key={type}>{message}</span>
																))
																: null;
														}}
													/>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 ">
											<div className="form-group">
												<label>Passwort</label>
												<div className="form-icon-base">
													<input name="password" type={oldPasswordType ? "password" : "text"} ref={register({ required: "This input is required." })} className="form-control" placeholder="" />
													<span className="form-icon"><img onClick={changeoldPasswordType} src={oldPasswordType ? "/assets/images/svg/eye-hide.svg" : "/assets/images/svg/eye-view.svg"} alt="eye1" /> {/* <img src="/assets/images/svg/eye-view.svg" /> */}</span>
													{/*<span className="form-icon"><img src="/assets/images/svg/eye-hide.svg" /></span>*/}
												</div>
												<ErrorMessage
														errors={errors}
														name="password"
														render={({ messages }) => {
															return messages
																? Object.entries(messages).map(([type, message]) => (
																	<span className="errorMsg" key={type}>{message}</span>
																))
																: null;
														}}
													/>
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
													{/* <Link to="home" className="btn-theme btn-block">Anmelden</Link> */}
													<input className="btn-theme btn-block" style={{cursor: "pointer"}} value="Anmelden" type="submit" /> 
												</div>
											</div>
										</div>
									</div>
								</form>
								<div className="LeftBottomIcons">
									<ul>
										<li>
											<img src="/assets/images/sicher.png" alt=""  />
											<span>Sicher</span>
										</li>
										<li>
											<img src="/assets/images/einfach.png" alt=""  />
											<span>Einfach</span>
										</li>
										<li>
											<img src="/assets/images/flexibel.png" alt=""  />
											<span>Flexibel</span>
										</li>
									</ul>
								</div>
							</div>
						</Col>
						<Col lg={6} md={6} sm={6} xs={12}  className="LoginRight">
							<img src="/assets/images/cashless-login-img.jpg" alt=""  />
						</Col>
					</Row>
				</div>
			</div>
        
        )
    }

function mapStateToProps(state: any) {
	console.log('statta', state);
	const { isLoggedIn } = state.client.isLoggedIn;
	const { message } = state.messages;
	return {
		isLoggedIn,
		message
	};
}
export default connect(mapStateToProps)(Login);
