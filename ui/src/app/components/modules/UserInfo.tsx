import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { resultsAriaMessage } from 'react-select/src/accessibility';
import { logout } from "../../redux/actions/auth.action"
import { getData } from '../../services/main-service';

export class UserInfo extends Component<any, any>{
	constructor(props:any) {
		super(props);
		this.state = {
			loading: true,
			userInfo: {},
			userData: {},
			comapnyDetails: [],
		}
	  }

	async componentDidMount() {
		this.fetchItems();
	}
	async fetchItems() {
		//console.log("User Info", this.props.user.user);	
		await this.setState({loading:false, userInfo: this.props.user.userAddress});
		//console.log("User deatails",  this.state.userInfo );
		await this.setState({userData: this.state.userInfo.user});
		let result: any = await getData(`/memoria/getMethod?url=/MasterData/getClientInfo&ID=${this.state.userData.id}`);
		this.setState({ comapnyDetails: result.data[0] });
	}
	logout(){
		this.props?.dispatch(logout());
	  }

    render(){

		let { userData,comapnyDetails } = this.state;
		//console.log("userInfo------->",userInfo.user);
		// console.log("userInfo Data------->",userData.id);
		// console.log("comapnyDetails------->",comapnyDetails);
		// console.log("comapnyDetails Name------->",comapnyDetails.companyName);
        return(
            <div id="userInfo" className="slide-form">
			  <div id="userMenuClose" className="slideFormClose">×</div>
			  <div className="userInfoHeader">
			    <div className="userTitle  chat_status online"><img src="/assets/images/default-image.png" alt="default" /></div>
			    <div className="profile-section">
			      <span className="profile-name mt-3">{userData.firstname} {userData.lastname}</span>
			      { /*
			      	<span ><Link to="#" className ="profile-email" href="mailto:oneixswiss@gmail.com">oneixswiss@gmail.com</Link></span>
			      	<span className="profile-user-id">CEO - Kundendienstadministrator</span>
			      	<span className="profile-user-id">One ix User ID: 20072693861</span>
			      	<Link to="#" className ="link">Mein Profil</Link>. <Link to="#" className ="link">Voreinstellungen</Link>
			      */ }
			    </div>
			  </div>
			  <div className="profile-content-wrap flex1">
			    <div className="profile_details ">
			      <div className="upBxDv">
			        <ul>
			          	<li><Link to="#" ><i className="lnr lnr-apartment" />{comapnyDetails.companyName!="" && comapnyDetails.companyName!=null && comapnyDetails.companyName!=undefined?comapnyDetails.companyName:''}</Link></li>
					    <li><Link to="#" ><i className="lnr lnr-map-marker" /> {comapnyDetails.street!="" && comapnyDetails.street!=null && comapnyDetails.street!=undefined?comapnyDetails.street:''}</Link></li>
					    <li><Link to="#" ><i className="lnr lnr-list" /> {comapnyDetails.zip!="" && comapnyDetails.zip!=null && comapnyDetails.zip!=undefined?comapnyDetails.zip:''} {comapnyDetails.city!="" && comapnyDetails.city!=null && comapnyDetails.city!=undefined?comapnyDetails.city:''}</Link></li>
					    <li><Link to="#" ><i className="lnr lnr-envelope" />{comapnyDetails.mail!="" && comapnyDetails.mail!=null && comapnyDetails.mail!=undefined?comapnyDetails.mail:''}</Link></li>
					    <li><Link to="#" ><i className="lnr lnr-phone-handset" /> {comapnyDetails.phone!="" && comapnyDetails.phone!=null && comapnyDetails.phone!=undefined?comapnyDetails.phone:''}</Link></li>
					    <li><Link to="#" ><i className="lnr lnr-earth" /> {comapnyDetails.website!="" && comapnyDetails.website!=null && comapnyDetails.website!=undefined?comapnyDetails.website:''}</Link></li>
			        </ul>
			      </div>
			    </div>
			  </div>
			  { /*
			  <div className="profile-content-wrap flex1">
			    <div className="profile_details ">
			      <div className="upBxDv">
			        <div className="upBxHdr">Agentenstatus 
			          <label className="switch ml-3 switch-pos">
			            <input type="checkbox" />
			            <span className="slider round" />
			          </label>
			        </div>
			        <ul>
			          <li><Link to="#" ><i className="lnr lnr-envelope" /> E-Mail</Link></li>
			          <li className="text-right">
			            <Link to="#" className ="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			              <span className="online_status online mr-2" /> Online <i style={{position: 'relative', left: '5px', top: '1px'}} className="lnr lnr-chevron-down" />
			            </Link>
			            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			              <Link to="" className="dropdown-item active"><span className="online_status online mr-2" /> Online</Link>
			              <Link to="" className="dropdown-item"><span className="online_status offline mr-2" /> Offline</Link>
			            </div>
			          </li>
			          <li><Link to="#" ><i className="lnr lnr-bubble" /> Chat</Link></li>
			          <li className="text-right">
			            <span className="online-mute lnr lnr-volume mr-2" />
			            <Link to="#" className ="dropdown"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			              <span className="online_status offline mr-2" /> Offline <i style={{position: 'relative', left: '5px', top: '1px'}} className="lnr lnr-chevron-down" />
			            </Link>
			            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			              <Link to="" className="dropdown-item active"><span className="online_status online mr-2" /> Online</Link>
			              <Link to="" className="dropdown-item"><span className="online_status offline mr-2" /> Offline</Link>
			            </div>
			          </li>
			        </ul>
			      </div>
			      <div className="upBxDv">
			        <div className="upBxHdr">Agentenstatus</div>
			        <ul>
			          <li><Link to="#" ><i className="lnr lnr-users" /> Community</Link></li>
			          <li><Link to="#" ><i className="lnr lnr-bubble" /> Talk with us</Link></li>
			          <li><Link to="#" ><i className="lnr lnr-smartphone" /> Mobilapps</Link></li>
			          <li><Link to="#" ><i className="lnr lnr-envelope" /> Write to us</Link></li>
			          <li><Link to="#" ><i className="lnr lnr-user" /> Ressourcen</Link></li>
			          <li><Link to="#" ><i className="lnr lnr-bubble" /> WhatsApp Us</Link></li>
			        </ul>
			      </div>
			    </div>
			  </div> */ }
			  <div className="userBottom">
			    <ul className="upBtmBnd">
			      <li><Link  to="#"  onClick={()=>{this.logout()}} className ="link"><i className="lnr lnr-power-switch" /> Abmelden</Link></li>
			    </ul>
			  </div>
			</div>
        )
    }

}

const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
	  isAuthenticated: state.client.isLoggedIn,
	  user: state.client,
	  messages: state.messages
	}
  };
  
export default connect(
	mapStateToProps
  )(UserInfo)

