import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Letzte extends Component{
    render(){
        return(

                <div id="Letzte" className="slide-form">
                  <div id="LetzteClose" className="slideFormClose">×</div>
                  <div className="notifoHeader">
                    <i className="lnr lnr-clock" /> <span className="pl-2">Letzte Elemente</span>
                  </div>
                  <div className="p20">
                    <ul className="LetzteList">
                      <li>
                        <span className="LetzteIcon"><i className="lnr lnr-users" /></span>
                        <Link to="#" >Oneix <i className="date">28 Okt 2020 10:46 AM</i></Link>
                      </li>
                      <li>
                        <span className="LetzteIcon"><i className="lnr lnr-user" /></span>
                        <Link to="#" >Lawrence <i className="date">28 Okt 2020 10:46 AM</i></Link>
                      </li>
                      <li>
                        <span className="LetzteIcon"><i className="lnr lnr-file-add" /></span>
                        <Link to="#" >#102 Test <i className="date">28 Okt 2020 10:46 AM</i></Link>
                      </li>
                      <li>
                        <span className="LetzteIcon"><i className="lnr lnr-file-add" /></span>
                        <Link to="#" >#101 Here's your first ticket. <i className="date">28 Okt 2020 10:46 AM</i></Link>
                      </li>
                      <li>
                        <span className="LetzteIcon"><i className="lnr lnr-user" /></span>
                        <Link to="#" >Sar <i className="date">28 Okt 2020 10:46 AM</i></Link>
                      </li>
                    </ul>
                  </div>
                </div>


        )
    }

}
export default Letzte

