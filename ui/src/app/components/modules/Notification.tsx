import React, { Component } from 'react';
import {  } from 'react-router-dom';

export class Notification extends Component{
    render(){
        return(
            <div id="notifications" className="slide-form">
			  <div id="userMenuClose" className="slideFormClose">×</div>
			  <div className="notifoHeader">
			    Benachrichtigungen
			  </div>
			  <div className="notifications-container">
			    Keine Benachrichtigungen gefunden
			  </div>
			</div>

        )
    }

}
export default Notification

