import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Suche extends Component{
    render(){
        return(
            <div id="searchPopup" className="searchPopup">
		        <div className="searchPopupBox">
		          <div className="input-group">
		            <div className="input-group-prepend dropdown">
		              <Link to="#" className ="btn" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <i className="lnr lnr-menu" /> <i style={{position: 'absolute', right: '-2px', top: '20px', fontSize: '10px'}} className="lnr lnr-chevron-down" />
		              </Link> 
		              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		                <div className="listMenuContainer">
		                  <Link	to="#" className="dropdown-item active">Alle Module</Link>
		                  <Link  to="#" className="dropdown-item">Tickets</Link>
		                  <Link  to="#"  className="dropdown-item">Aufgaben</Link>
		                  <Link  to="#"  className="dropdown-item">Kunden</Link>
		                  <Link  to="#"  className="dropdown-item">Kontakte</Link>
		                </div>
		              </div>
		              <input type="text" className="form-control" placeholder="Suche" aria-label="search" />
		              <div className="searchSubmit">
		              	<button><i className="lnr lnr-magnifier" /></button>
		              </div>
		              {/*<div id="searchPopupBoxClose" className="slideFormClose">× <span>Esc</span></div>*/}
		            </div>
		          </div>
		        </div>
		      </div>
        )
    }

}
export default Suche

