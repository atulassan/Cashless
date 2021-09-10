import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Activation extends Component{
    render(){
        return(

                <div id="activation" className="slide-form">
                  <div id="activationClose" className="slideFormClose">×</div>
                  <div className="p20">
                    <ul className="nav nav-tabs TicketInfoTabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <Link to="#" className ="nav-link active show" id="activation1-tab" data-toggle="tab" href="#activation1" role="tab" aria-controls="activation1" aria-selected="true">
                          <i className="fa fa-file-text-o" />
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" className ="nav-link" id="activation2-tab" data-toggle="tab" href="#activation2" role="tab" aria-controls="activation2" aria-selected="false">
                          <i className="fa fa-calendar-check-o" />
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#" className ="nav-link" id="activation3-tab" data-toggle="tab" href="#activation3" role="tab" aria-controls="activation3" aria-selected="false">
                          <i className="fa fa-clock-o" />
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade active show" id="activation1" role="tabpanel" aria-labelledby="activation1-tab">
                        <div className="no-info text-left">
                          <h4>Meine ausstehenden Genehmigungen</h4>
                          <p>Unzureichende Berechtigungen, um diesen Vorgang auszuführen.</p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="activation2" role="tabpanel" aria-labelledby="activation2-tab">
                        <div className="no-info text-left">
                          <h4>Meine überfälligen Aktivitäten</h4>
                          <p>Sie haben keine überfälligen Aktivitäten</p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="activation3" role="tabpanel" aria-labelledby="activation3-tab">
                        <div className="no-info text-left">
                          <h4>Meine aktiven Timer</h4>
                          <p>Sie haben keine überfälligen Aktivitäten</p>
                          <div className="slideFormAppHeader text-left">
                            <div className="mb-3">
                              <h4>#Test 01</h4>
                            </div>
                            <Link to="#" ><i className="fa fa-play" data-toggle="tooltip" data-placement="bottom" data-original-title="Timer starten" /> 00:00:02 <i className="bl fa fa-refresh" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" data-original-title="Timer rücksetzen" /></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

        )
    }

}
export default Activation

