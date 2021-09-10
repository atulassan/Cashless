
import React from 'react';

function Alert(props: any) {
  
  if (props.show) {
    return (

      <div >
        <div className={"alert alert-" + (props.variant ? props.variant : 'danger') + ' active'}>
          <div className="alert-close">&times;</div>
          <span className="icon"><i className="fa fa-check" /></span> {props.message}
                </div>
      </div>
    );
  }
  return null;



}
export default Alert