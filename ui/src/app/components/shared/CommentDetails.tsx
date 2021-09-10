import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
//import { Editor } from '@tinymce/tinymce-react';
import { getData } from '../../services/main-service';
import { postData } from '../../services/main-service';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import Parse from 'html-react-parser';

function CommentDetails(props: any) {

  // console.log(props,'this is from comment details');
  const{setShowComments, showComments, setRatingEntry, ratingEntry}=props;    
  //const [cmdShow, setCmdShow] = useState(true);
  const [tId, settId] = useState('');
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [commentList, setCommentList] = useState<any | []>([]);
  console.log('propsticket- child', props.id);
  useEffect(() => {
   async function fetchData() {
     // await setCmdShow(showComments);
      await settId(props.id);
      let resultComment1: any = await getData(`/memoria/getMethod?url=/Tickets/getTicketByID&ID=${props.id}`);
      await setCommentList(resultComment1.data);
      // console.log('ticket data==========',resultComment1);
      console.log('propsticket- child',tId);
      
      if(resultComment1.data["text"]!="" && resultComment1.data["text"]!=null && resultComment1.data["text"]!=undefined)
      {
      setValue(RichTextEditor.createValueFromString(resultComment1.data["text"], 'html'));
      }
                
}
    fetchData();
  }, [props.id]);
 const onChange = (value: any) => {    
      console.log('inside onchange',value);
        
    setValue(value);
    //   console.log("valuehtml",value.toString('html'));
    // if (props.onChange) {
        console.log('inside props.change',value.toString('markdown'));
        
    //   props.onChange(value.toString('html'));
    // }
  }
 async function cmdSubmit() {
    let data1 =[];
    let sData: any = await getData(`/memoria/getMethod?url=/Tickets/getTicketByID&ID=${props.id}`);
      sData.data['text']=value.toString('html');
      await data1.push(sData.data)
      let result:any =await postData('/memoria/putMethod?url=/Tickets/setTickets', data1);
      console.log("post result is ",result);
      if(result.status === 200)
      {
        await setShowComments(true);
        let resultComment1: any = await getData(`/memoria/getMethod?url=/Tickets/getTicketByID&ID=${props.id}`);
        await setCommentList(resultComment1.data);
      }
  }
  return (
  <div>
    <div className="ticketcolum_right_scroll">
    
{showComments?
(<div className="replySectionList rightContentScroll">
        <div className="row">
          <div className="col-lg-12">
            <div className="media p20"> 
              {/* <div className="mediaImg font13">SA <span className="indicateIcon green"><i className="fa fa-reply" /></span></div> */}
                <div className="media-body">
                    {/* <h5 className="mt-0 hint-title smTitle mt-2">Sar <span>01 Okt 03:38 PM ( 21 Stunden zuvor ) </span></h5> */}
                    {commentList.text!="" && commentList.text!=undefined && commentList.text!=null?Parse(commentList.text):"" } 
                    {/* {new DOMParser().parseFromString(commentList.text, 'text/html').getElementsByTagName('p')[1]}{' '} */}
                    
                    <div className="ZeitEintrag ">
                    <a href="javascript:void(0)" onClick={() => {
													setShowComments(!showComments);}}><i className="lnr-pencil" /></a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>):
      (
      <div className="rplyContent">
        <RichTextEditor value={value} onChange={onChange} />
        <div className="text-right pr-2 mt-3">
        <a href="javascript:void(0)" onClick={() => {cmdSubmit()}} className="btn-theme mr-2">
            Speichern
          </a>
          <a href="javascript:void(0)" onClick={() => {
													setShowComments(!showComments);
                        					}}className="btn-theme">
            Abbrechen
          </a>
        </div>
      </div>)}
      <div className="ticketcolum_right_fxd_btns">
      <div className="row">
        <div className="col-lg-5">
          {/*<Link to="" className="link-blue">
            <i className="lnr-cog" /> Auftragsrapport
          </Link>
          <Link to="" className="link-blue">
            <i className="lnr-screen" /> Fernunterstützung
          </Link>*/}
        </div>
        <div className="col-lg-7 text-right pr-5">
          <a href="javascript:void(0)" onClick={() => {
													setRatingEntry(!ratingEntry);
                        					}}className="link-blue bg_light_blue">
            Ticket schließen
          </a>
        </div>
      </div>
    </div>
    </div>
    
  </div>
  );
}
CommentDetails.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  showComments: PropTypes.bool,
  setShowComments: PropTypes.func,
  setRatingEntry: PropTypes.func,
  ratingEntry: PropTypes.bool,
  
};
export default CommentDetails;
