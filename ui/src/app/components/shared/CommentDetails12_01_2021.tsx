import React, {useEffect,useState} from 'react';
import { Link, } from 'react-router-dom';
//import { Editor } from '@tinymce/tinymce-react';
//import { getData} from "../../services/main-service";
import RichTextEditor from 'react-rte';

interface MyProps {id:any }
// const CommentDetails = (props:any) => {
//     const ticket = props.ticket;
 function CommentDetails(props:React.PropsWithChildren<MyProps>)
 {
    const [fromAddress, setFromAddress] = useState("");
    const [toAddress, setToAddress] = useState("");
    const [ccAddress, setCcAddress] = useState("");
    const [tId, settId] = useState("");
    
    //const [editorValue, setEditorValue] = useState<any | []>([]);
    const [commentList, setCommentList] = useState<any | []>([]);
   console.log("propsticket- child",props.id)
     // alert(commentList);
    // async function handleEditorChange(e:any)  {
    //     console.log(
    //         'Content was updated:',
    //         e.target.getContent()
    //       );
    //       alert(e.target.getContent());
    //       await setEditorValue(e.target.getContent())
    //   }
    // async function handleEditorChange(content:any, editor:any) {
    //     console.log('Content was updated:', content);
    //     alert(content);
    //     alert(editor);
    //     await setEditorValue(content)
    //   }
    useEffect(() => {
         setFromAddress("one ix gmbh<support@oneixgmbh377.oneixdesk.eu>");
        // setToAddress("");
        setCcAddress("support@oneixgmbh377.oneixdesk.eu");
        settId(props.id);
        async function fetchData()
        {
            console.log(fromAddress);
            console.log(toAddress);
            console.log(ccAddress);
            alert("tId"+tId);
            setCommentList("");
            console.log(commentList);
            // let resultComment1:any =  getData(`/comments/ticket/${tId}`);
            //  setCommentList(resultComment1.data.response['data']);
            // console.log("----------------getdata data---------------------")
            // console.log(commentList);
            // alert(resultComment1);
            // console.log("----------------getdata data---------------------")
            
         }
	fetchData()
        
    },[]);
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());
    const onChange = (value:any) => {
      setValue(value);
      
      console.log("value",value);
      console.log("valuehtml",value.toString('html'));
      alert(value);
      alert(value.toString('html'));
    //   if (props.onChange) {
    //     props.onChange(value.toString('html'));
    //   }
    }
    async function ticketComment(event:any) {
		let data:any ={};
		data["ticketId"] = props.id;
        data["fromAddress"] = fromAddress;
        data["toAddress"] = toAddress;
        data["ccAddress"] = ccAddress;
        //data["comments"] = editorValue;
        data["type"] = 1;
        data["commentType"] = 1;
        data["clientId"] = "1";
        data["createdBy"] = "1";
        console.log("get type data",data);
        //let ticketId = props.id;
		// if(ticketId!="" && ticketId!=undefined && ticketId!=null)
		// {
        //     let result:any = await postData('/comments/add', data);
            
		// 	if(result.status === 200)
		// 	{
        //         //console.log(result.data.message);
        //         console.log("----------------return data---------------------")
        //         console.log(result);
        //         console.log("----------------return data---------------------")
        //     //     let resultComment:any = await getData(`/comments/ticket/${ticketId}`);
        //     //     await setCommentList(resultComment.data.response['data']);
        //     //    //await setCommentList("");
        //     //     console.log("----------------List data---------------------")
        //     //     console.log(resultComment);
        //     //     console.log(commentList);
        //     //     console.log("----------------list data---------------------")
		// 	}
		// 	else{
		// 	console.log(result.data.message);
		//    }
		// }
		// else{
		//   console.log("Invalid Id");
		// }
    }
    // const onChangeEditor = (e:any) => {
    //     alert(e.target.value);
    //     //this.setState({value});
    //     // if (this.props.onChange) {
    //     //   // Send the changes up to the parent component as an HTML string.
    //     //   // This is here to demonstrate using `.toString()` but in a real app it
    //     //   // would be better to avoid generating a string on each change.
    //     //   this.props.onChange(
    //     //     value.toString('html')
    //     //   );
    //     // }
    //   };
    return(
                            
            <div className="ticketcolum_right_scroll">
                <div className="replySection" style={{display: 'none'}}>
                    <div className="rplyHeader p20">
                    <ul>
                        <li><span className="rplyLeft">Von</span> <input type="text" id="fromAddress" defaultValue="one ix gmbh<support@oneixgmbh377.oneixdesk.eu> " onChange={e => setFromAddress(e.target.value)}/>
                        <span className="dropdown rplyRight">
                            {/* <Link to="#"   id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Gespeichert @ 10:21 AM <i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" />
                            </Link> */}
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link to="" className="dropdown-item"><i className="fa fa-pencil mr-2" /> Entwurf verwerfen</Link>
                            </div>
                        </span>
                        </li>
                            <li><span className="rplyLeft">An</span> <input type="text"  id="toAddress" placeholder="Empfänger-E-Mail-Adresse eingeben" onChange={e => setToAddress(e.target.value)}/> {/*<span className="rplyRight">BCC</span>*/}</li>
                        <li><span className="rplyLeft">Cc</span> <input type="text"  id="ccAddress" defaultValue="support@oneixgmbh377.oneixdesk.eu" data-role="tagsinput" onChange={e => setCcAddress(e.target.value)} /></li>
                    </ul>
                    </div>
                    <div className="rplyContent">
                    {/* <textarea id="editor" defaultValue={""} /> */}
                    <RichTextEditor
                        value={value}
                        onChange={()=>{onChange}}
                    />
                    <div className="p20">
                        <p className="link-blue font15">How would you rate our customer service?</p>
                        <div className="replyRating">
                        <ul>
                            <li><Link to="" className="good"><img src="/assets/images/emoji-smile.png" alt="emoji-smile" /> Good</Link></li>
                            <li><Link to="" className="bad"><img src="/assets/images/emoji-bad.png" alt="emoji-bad" /> Bad</Link></li>
                        </ul>
                        </div>
                        <div className="form-control rplyContentTxt">
                        <p>---- On  Mon, 28 Sep 2020 08:36:48 +0200 support@oneixsupport.com  wrote ----</p>
                        <p>Hallo</p>
                        <p>Willkommen beim neuen vereinheitlichten Ticketbildschirm von Oneix Desk. Hier sehen Sie den vollständigen Kontext des Tickets. Ihr erstes Ticket liegt schon vor. Haben Sie gemerkt, dass dieses Ticket mit Ihnen verknüpft wurde? Wenn Sie auf dieses Ticket clever reagieren möchten, schauen Sie sich einmal die automatisch vorgeschlagenen Lösungen im linken Feld an.</p>
                        <p>Wenn Sie mit dem Verfassen Ihrer Reaktion fertig sind, können Sie das Ticket senden und schließen.</p>
                        <p>Welche Aktion Sie auch ausführen – alles lässt sich jederzeit über den Ticketverlauf verfolgen. Ein weiterer Schritt zu einem Kundendienst der Extraklasse!</p>
                        <p>Gruß; <br /> Team Oneix Desk <br /> 1 888 900 9646 </p>
                        </div>
                    </div>
                    </div>
                    <div className="ticketcolum_right_fxd_btns">
                    <div className="row">
                        <div className="col-lg-5">
                        {/* <Link to="" className="link-blue"><i className="lnr-paperclip" /></Link> */}
                        </div>
                        <div className="col-lg-7 text-right pr-5">
                        <Link to="#" onClick={(event) => {ticketComment(event)}} className="link-blue bg_light_blue hideReplySection">Senden</Link>
                        <Link to="/tickets" className="link-blue hideReplySection">Abbrechen</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="replySectionList">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="media p20">
                        {/* {commentList.length>0?commentList.map((el:any, key:any) => 
                        
                        <div className="mediaImg font13">SA <span className="indicateIcon green"><i className="fa fa-reply" /></span></div>
                        
                        ):""} */}
                        <div className="mediaImg font13">SA <span className="indicateIcon green"><i className="fa fa-reply" /></span></div>
                        <div className="media-body">
                            <h5 className="mt-0 hint-title smTitle mt-2">Sar <span>01 Okt 03:38 PM ( 21 Stunden zuvor ) </span></h5>
                            <p>Hallo</p>
                            <p>Willkommen beim neuen vereinheitlichten Ticketbildschirm von Oneix Desk. Hier sehen Sie den vollständigen Kontext des Tickets. Ihr erstes Ticket liegt schon vor. Haben Sie gemerkt, dass dieses Ticket mit Ihnen verknüpft wurde? Wenn Sie auf dieses Ticket clever reagieren möchten, schauen Sie sich einmal die automatisch vorgeschlagenen Lösungen im linken Feld an.</p>
                            <p>Wenn Sie mit dem Verfassen Ihrer Reaktion fertig sind, können Sie das Ticket senden und schließen.</p>
                            <p>Welche Aktion Sie auch ausführen – alles lässt sich jederzeit über den Ticketverlauf verfolgen. Ein weiterer Schritt zu einem Kundendienst der Extraklasse!</p>
                            <p>Gruß; <br />Team Oneix Desk<br />1 888 900 9646</p>
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
                </div>
                               
    )
    
}
CommentDetails.defaultProps = {
    onChange:()=>{}
  };
export default CommentDetails;