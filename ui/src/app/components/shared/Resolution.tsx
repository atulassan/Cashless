import React,{useState} from 'react';
import { Link } from 'react-router-dom';
//import { getData} from "../../services/main-service";



interface MyProps {cid:any }

function Resolution(props:React.PropsWithChildren<MyProps>)
{
  
    const [viewStyle, setViewStyle] = useState("");
    const [editStyle, setEditStyle] = useState("");
    setViewStyle('block');
    setEditStyle('none');
   console.log(props.cid);

    async function editOpen(){
        setViewStyle('block');
        setEditStyle('none');
    }
     
    return(
    <div>
        <div className="ticketcolum_right_scroll">
        <div  style={{display:editStyle}}>
        <div className="row" >
            <div className="col-lg-12">
              <div className="media p20">
                  <div className="mediaImg font13">AS</div>
                  <div className="media-body ">
                    <h5 className="mt-2 hint-title">Saved text</h5>
                    <div className="slideFormAppHeader">
                        12 Jan 2021 07:12 AM
                    </div>
                    <span className="tabRightdrop dropdown">
                    <Link to="#"   id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="r90 fa fa-ellipsis-v" /></Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to="#" className="dropdown-item" onClick={() =>{ editOpen()}}><i className="fa fa-pencil mr-2" />test Editieren</Link>
                    <Link to="#" className="dropdown-item"><i className="fa fa-trash mr-2" />Löschen</Link>
                    </div>
                </span>
                  </div>
                </div>
                
            </div>
        </div>
        </div>
        <div  style={{display:viewStyle}}>
            <div className="row" >
            <div className="col-lg-12">
                <div className="media p20">
                <div className="mediaImg font13">AS</div>
                <div className="media-body ">
                    <textarea className="form-control ticketcolumTxtarea" defaultValue={""} />
                </div>
                </div>
            </div>
            </div>
            <div className="ticketcolum_right_nr_btns">
            <div className="row">
                <div className="col-lg-5">
                <label className="ix-checkbox-label"><input type="checkbox" className="ix-checkbox" /><mark className="mr-1" /> Kontakt benachrichtigen</label>
                </div>
                <div className="col-lg-7 text-right ">
                <Link to="" className="btn-theme btn-sm mr-2">Speichern</Link>
                <Link to="" className="btn-theme btn-sm mr-2">Speichern und Artikel hinzufügen</Link>
                <Link to="" className="btn-white btn-sm">Löschen</Link>
                </div>
            </div>
            </div>
        </div>
      </div>
      <div className="ticketcolum_right_fxd_btns">
        <div className="row">
          <div className="col-lg-5">
            <Link to="" className="link-blue"><i className="lnr-cog" /> Makro anwenden</Link>
            <Link to="" className="link-blue"><i className="lnr-screen" /> Fernunterstützung</Link>
          </div>
          <div className="col-lg-7 text-right pr-5">
            <Link to="" className="link-blue bg_light_blue">Ticket schließen</Link>
          </div>
        </div>
      </div> 
    </div>

    )
    
}

export default Resolution;