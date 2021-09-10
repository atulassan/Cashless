import React, { Component } from 'react';
import { } from 'react-router-dom';


export class Umbenennen extends Component{
    render(){
        return(

             <div className="modal fade" id="umbenennen" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Module umbenennen : Community</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form  >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Unter Module anzuzeigender Name </label>
                              <input type="text" className="form-control"  defaultValue="Community" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button  className="btn-theme btn-md">Speichern</button>
                      <button  className="btn-theme-white btn-md" data-dismiss="modal">Abbrechen</button>
                    </div>
                  </div>
                </div>
              </div>

        )
    }

}
export default Umbenennen

