import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { getData } from '../../services/main-service';
import { postData } from "../../services/main-service";
//import Alert from '../shared/Alert'
import PropTypes from 'prop-types';
import { format,parseISO } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SET_MESSAGE } from "../../redux/types";
import { connect } from 'react-redux';


function SubTask(props: any) {
    console.log(props, 'this is from sub task');
    const { setSubTask, subTask, cid, timeEntry, setTimeEntry,setAufgaben } = props;
    const [taskShow, setTaskShow] = useState(true);
    const [subTaskList, setSubTaskList] = useState<any | []>([]);
    const [date, setDate] = useState(new Date());
    const [taskData, setTaskData] = useState<any | {}>({});
    const [userList, setUserList] = useState<any | []>([]);
    const [edate, setEdate] = useState(new Date());
    const [ticketsData, setTickets] = useState<any | []>([]);
const [showtabicon, setshowtabicon] = useState(2);
  


    useEffect(() => {
        async function fetchData() {
            await setTaskShow(subTask);
            console.log(taskShow);
            console.log(timeEntry);
            let resultTicket:any = await getData(`/memoria/getMethod?url=/Tickets/getTicketByID&Fields=Firstname&Fields=Lastname&IncludeDetails=true&ID=${cid}`);
			await setTickets(resultTicket.data);
            //console.log(ttime);
            let resultTask: any = await getData(`/memoria/getMethod?url=/TicketSteps/getTicketSteps&TicketID=${cid}`);
            console.log(resultTask.data);
            let subTaskFullData: any = [];
            for (let i = 0; i < resultTask.data.length; i++) {
                let resultUser1: any = await getData(`/memoria/getMethod?url=/Users/getUsersByID&Fields=Firstname&Fields=Lastname&ID=${resultTask.data[i].userID}`);
                resultTask.data[i]['user'] = await resultUser1.data;
                subTaskFullData.push(resultTask.data[i]);
            }
            setSubTaskList(resultTask.data);
            let resultuser: any = await getData(`/memoria/getMethod?url=/Users/getUsersAll&Fields=Firstname&Fields=Lastname`);
            setUserList(resultuser.data.objects);


        }
        fetchData();
    }, []);
    // console.log("timeEntry------------------1",timeEntry);
    // console.log("sub task timeEntry------->", timeEntry);
     console.log("subTask User   list------->", userList);
    /* DEATEPICKER SETUP*/

    const handledateChange: Function = (date: any) => {
        setDate(date);
        // let getTaskData=taskData;
        // getTaskData["date"]=date;
        // setTaskData(getTaskData);
        // setStdate(format(new Date(date), 'yyyy-MM-dd'));

    }
    const handledateChange1: Function = (date: any) => {
        setEdate(date);
        // let getTaskData=taskData;
        // getTaskData["date"]=date;
        // setTaskData(getTaskData);
        // setStdate(format(new Date(date), 'yyyy-MM-dd'));

    }
    function taskAll(e: any) {
        let taskdata = taskData;
        let { name, value } = e.target;
        taskdata[name] = value;
        setTaskData(taskdata);

    }
    function dateCheck(d1:any,d2:any)
    {
    // const date1:any = new Date('03/13/2021');
    // const date2:any = new Date('03/13/2021');
    // const diffTime = Math.abs(date2 - date1);
    //console.log(d1 + " d1");
    //console.log(d2 + " d2");
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
    let diffDays =0;
    if (new Date(d1) < new Date(d2)) 
    {
        diffDays=1;
    }
    return diffDays;
    }
    async function taskSubmit() {
         let sData = taskData;
        // let data1 = [];
        let d1 = await format(new Date(parseISO(ticketsData.followUpDate)), 'MM/dd/yyyy');
        let d2 = await format(new Date(date), 'MM/dd/yyyy');
        let diffDays:any = await dateCheck(d1,d2);
        //console.log(diffDays + " final data");
        if (!sData.hasOwnProperty('userID') || sData["userID"] === '') {
            // sData["userID"] = 1;
            await props.dispatch({
                type: SET_MESSAGE,
                payload: { message: "Mitarbeiter wählen", variant: 'Error' },
              });
        }
        else if (!sData.hasOwnProperty('text') || sData["text"] === '') {
            await props.dispatch({
                type: SET_MESSAGE,
                payload: { message: "Text eingeben", variant: 'Error' },
              });
        }
        else{
            if(diffDays===1)
            {
                setshowtabicon(1);
            }
            else
            {
                subTaskSubmit("noupdate");
            }
        }
     }
     async function subTaskSubmit(condtionData: any) {
        await setshowtabicon(2);
        //console.log("setshowtabicon++++++++++++++++++++++++++++++++",showtabicon);
            let sData = taskData;
            let data1 = [];
                if (!sData.hasOwnProperty('etime') || sData["etime"] === '') {
                sData["etime"] = "00:00";
                }
                if (!sData.hasOwnProperty('status') || sData["status"] === '') {
                    sData["status"] = "Open";
                }
               
                //let selectEdate:any = await format(new Date(edate), 'dd.MM.yyyy')+' '+sData.etime+':00';
               let newDt=new Date(edate);
                newDt.setHours(sData.etime.split(":")[0]);
                newDt.setMinutes(sData.etime.split(":")[1]);
                newDt.setSeconds(0);
                //console.log("selectEdate++++++++++++",newDt);
               //console.log("selectEdate++++++++++++",new Date(newDt).toISOString());
               await delete sData.etime;
               sData["executionDate"]=new Date(newDt).toISOString() ;
               sData["id"] = 0;
               sData["ticketID"] = parseInt(cid);
               sData["charged"] = false;
               sData["date"] = new Date().toISOString();
               sData["followUp"] = true
               sData["followUpDate"] =new Date(date).toISOString();
               sData["goodwill"] = 0;
               sData["surcharge"] = 0;
               sData["userID"]=parseInt(sData["userID"]);
               sData["workDuration"] = 0;
               sData["note"] = "Note Test1";
             
                await data1.push(taskData)
                console.log("taskData----final-------->", data1);
                await setSubTask(true);
                let result: any = await postData('/memoria/putMethod?url=/TicketSteps/setTicketSteps', data1);
                console.log("Sub task post result is ", result);
                if (result.status === 200) {
                    await setSubTask(true);
                    if (condtionData === "update") {
                        let uData =ticketsData;
                        uData["followUpDate"] = await new Date(date).toISOString();
                        let ccfData = [];
                        await ccfData.push(uData);
                       // console.log("ticket final data----ccfData-------->",ccfData);
                        let resultcc:any =await postData('/memoria/putMethod?url=/Tickets/setTickets', ccfData);
                        console.log("Ticket post result is",resultcc);
                        }
                        await props.dispatch({
                            type: SET_MESSAGE,
                            payload: { message: "Added successfully", variant: 'success' },
                          });
                    let gettaskList: any = await getData(`/memoria/getMethod?url=/TicketSteps/getTicketSteps&TicketID=${cid}`);
                    let subTaskFullData: any = [];
                    for (let i = 0; i < gettaskList.data.length; i++) {
                        let resultUser1: any = await getData(`/memoria/getMethod?url=/Users/getUsersByID&Fields=Firstname&Fields=Lastname&ID=${gettaskList.data[i].userID}`);
                        gettaskList.data[i]['user'] = await resultUser1.data;
                        subTaskFullData.push(gettaskList.data[i]);
                    }
                    setSubTaskList(subTaskFullData);
                    setTaskData({});
    
                }
               
       }
  return(
    <div>
        {subTask==false?(
        
        <div className="AufgabenCommentBox">
           {/* <Alert variant={alertMsg.variant} show={alertMsg.show} message={alertMsg.message}/> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ZeitEintragStatus">
                                <ul>
                                    <li>
                                        <label>Mitarbeiter wählen</label>
                                        <select  className="form-control custom-select"  name="userID" onChange={(e)=>taskAll(e)} >
                                        <option value=" "  >wählen</option>
                                            {userList.map((userList: any, key: any) =>
                                                <option value={userList.id} key={key} >
                                                    {userList.firtsname != "" && userList.firtsname != "" && userList.firtsname != "" ? userList.firtsname : ''} {userList.lastname != "" && userList.lastname != "" && userList.lastname != "" ? userList.lastname : ''}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li>
                                        <label>Nachfassungsdatum</label>
                                        {/* <input type="text" className="form-control" defaultValue="12.01.2021" placeholder="" /> */}
                                        <DatePicker selected={date} dateFormat="dd.MM.yyyy"  className="form-control" onChange={(date) => handledateChange(date)} />
                                    </li>
                                    <li>
                                        <label>Status</label>
                                        <select className="form-control custom-select" name="status" onChange={(e) => taskAll(e)}>
                                            <option value="Open"> Offen</option>
                                            <option value="In_Progress"> In Arbeit</option>
                                            <option value="Closed"> Geschlossen</option>
                                            <option value="Charged"> Verrechnet</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label>Ausführungsdatum</label>
                                        <DatePicker selected={edate} dateFormat="dd.MM.yyyy" className="form-control" onChange={(date) => handledateChange1(date)} />
                                    </li>
                                    <li>
                                        <label>Ausführunszeit</label>
                                        <select className="form-control custom-select" name="etime" onChange={(e) => taskAll(e)}>
                                            <option value="00:00">00:00</option>
                                            <option value="00:15">00:15</option>
                                            <option value="00:30">00:30</option>
                                            <option value="00:45">00:45</option>
                                            <option value="01:00">01:00</option>
                                            <option value="01:15">01:15</option>
                                            <option value="01:30">01:30</option>
                                            <option value="01:45">01:45</option>
                                            <option value="02:00">02:00</option>
                                            <option value="02:15">02:15</option>
                                            <option value="02:30">02:30</option>
                                            <option value="02:45">02:45</option>
                                            <option value="03:00">03:00</option>
                                            <option value="03:15">03:15</option>
                                            <option value="03:30">03:30</option>
                                            <option value="03:45">03:45</option>
                                            <option value="04:00">04:00</option>
                                            <option value="04:15">04:15</option>
                                            <option value="04:30">04:30</option>
                                            <option value="04:45">04:45</option>
                                            <option value="05:00">05:00</option>
                                            <option value="05:15">05:15</option>
                                            <option value="05:30">05:30</option>
                                            <option value="05:45">05:45</option>
                                            <option value="06:00">06:00</option>
                                            <option value="06:15">06:15</option>
                                            <option value="06:30">06:30</option>
                                            <option value="06:45">06:45</option>
                                            <option value="07:00">07:00</option>
                                            <option value="07:15">07:15</option>
                                            <option value="07:30">07:30</option>
                                            <option value="07:45">07:45</option>
                                            <option value="08:00">08:00</option>
                                            <option value="08:15">08:15</option>
                                            <option value="08:30">08:30</option>
                                            <option value="08:45">08:45</option>
                                            <option value="09:00">09:00</option>
                                            <option value="09:15">09:15</option>
                                            <option value="09:30">09:30</option>
                                            <option value="09:45">09:45</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:15">10:15</option>
                                            <option value="10:30">10:30</option>
                                            <option value="10:45">10:45</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:15">11:15</option>
                                            <option value="11:30">11:30</option>
                                            <option value="11:45">11:45</option>
                                            <option value="12:00">12:00</option>
                                            <option value="12:15">12:15</option>
                                            <option value="12:30">12:30</option>
                                            <option value="12:45">12:45</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:15">13:15</option>
                                            <option value="13:30">13:30</option>
                                            <option value="13:45">13:45</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:15">14:15</option>
                                            <option value="14:30">14:30</option>
                                            <option value="14:45">14:45</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:15">15:15</option>
                                            <option value="15:30">15:30</option>
                                            <option value="15:45">15:45</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:15">16:15</option>
                                            <option value="16:30">16:30</option>
                                            <option value="16:45">16:45</option>
                                            <option value="17:00">17:00</option>
                                            <option value="17:15">17:15</option>
                                            <option value="17:30">17:30</option>
                                            <option value="17:45">17:45</option>
                                            <option value="18:00">18:00</option>
                                            <option value="18:15">18:15</option>
                                            <option value="18:30">18:30</option>
                                            <option value="18:45">18:45</option>
                                            <option value="19:00">19:00</option>
                                            <option value="19:15">19:15</option>
                                            <option value="19:30">19:30</option>
                                            <option value="19:45">19:45</option>
                                            <option value="20:00">20:00</option>
                                            <option value="20:15">20:15</option>
                                            <option value="20:30">20:30</option>
                                            <option value="20:45">20:45</option>
                                            <option value="21:00">21:00</option>
                                            <option value="21:15">21:15</option>
                                            <option value="21:30">21:30</option>
                                            <option value="21:45">21:45</option>
                                            <option value="22:00">22:00</option>
                                            <option value="22:15">22:15</option>
                                            <option value="22:30">22:30</option>
                                            <option value="22:45">22:45</option>
                                            <option value="23:00">23:00</option>
                                            <option value="23:15">23:15</option>
                                            <option value="23:30">23:30</option>
                                            <option value="23:45">23:45</option>
                                        </select>
                                        {/* <input type="text" className="form-control" defaultValue="" placeholder="Ausführungsdatum" /> */}
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="media p20">
                                <div className="mediaImg font13">AS</div>
                                <div className="media-body ">
                                    <textarea className="form-control ticketcolumTxtarea" name="text" placeholder="Text eingeben" onChange={(e) => taskAll(e)} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="ticketcolum_right_nr_btns">
                        <div className="row">
                            <div className="col-lg-12 text-right selectBtns">

                                <a href="javascript:void(0)" onClick={() => { taskSubmit() }} className="btn-theme mr-2 ">
                                    <span className="ml-2">Speichern</span>
                                </a>
                                <a href="javascript:void(0)" onClick={() => {
                                    setSubTask(!subTask);
                                }} className="btn-theme ">Abbrechen</a>
                            </div>
                        </div>
                    </div>
                </div>) : null}
            <div className="replySectionList rightContentScroll">
                <div className="subTaskScroll">
                {subTaskList.length > 0 ? subTaskList.map((el: any, key: any) =>
                
               
                    <div className="media p20 AgunenList">
                         {/* {console.log("el++++++++++++++++++++++++++++++++++++++++++++++",el)} */}
                        <div className="mediaImg font13">
                        {el.user.firtsname?el.user.firtsname?.slice(0, 1).toUpperCase():null} {el.user.lastname?.slice(0, 1).toUpperCase()}
                    <span className="indicateIcon green">
                                <i className="fa fa-reply" />
                            </span>
                        </div>
                        <div className="media-body">
                            <h5 className="mt-0 hint-title smTitle mt-2">
                                #{el.id}
                                <span className="ml-3 mr-3">{el.date != "" && el.date != null && el.date != undefined ? format(new Date(el.date), 'dd.MM.yyyy') : ''}</span>
                                <span className="mr-3">
                                    {el.status == 'Open' ? 'Offen':
                                    el.status == 'In_Progress' ? 'In Arbeit':
									el.status == 'Closed' ?'Geschlossen':
									el.status == 'Charged' ?'Verrechnet' : ''}
                                    </span>
                                <span className="mr-3">{el.followUpDate != "" && el.followUpDate != null && el.followUpDate != undefined ? format(new Date(el.followUpDate), 'dd.MM.yyyy') : ''}
                                </span>
                                <span className="mr-3">{el.executionDate != "" && el.executionDate != null && el.executionDate != undefined ? format(new Date(el.executionDate), 'dd.MM.yyyy') : ''}</span>
                                <span className="mr-3">{el.executionDate != "" && el.executionDate != null && el.executionDate != undefined ? format(new Date(el.executionDate), 'HH:I') : ''}</span>
                            </h5>
                            {el.text}
                            <div className="ZeitEintragEdit "> 
                            <a href="javascript:void(0)" onClick={() => {setAufgaben(el)
                                    setTimeEntry(!timeEntry);
                                }}>
                                <i className="lnr-pencil" />
                                </a>
                            </div>
                            <div className="ZeitEintrag ">
                                <a href="javascript:void(0)" onClick={() => {setAufgaben(el)
                                    setTimeEntry(!timeEntry);
                                }}>
                                    <i className="lnr-clock" />
                                </a>
                            </div>
                        </div>
                    </div>
                ) : null}
                </div>
            </div>


            <div className="subtask-alert-popup" style={{display: showtabicon==1 ? 'block' : 'none' }}>
                        <div className="subtask-alert-popup-base">
                            <div className="notifoHeader">Achtung</div>
                            <div className="form-page">
                                <form>
                                    <div className="subtaskAlertContent">
                                        <p>Nachfassungsdatum liegt ausserhalb der Fälligkeit.</p>
                                    </div>
                                    <div className="subtaskAlertFooter">
                                        <div className="row">
                                            <div className="col-md-6">
                                            <a href="javascript:void(0)" onClick={() => {
										subTaskSubmit("update");}} className="btn-theme btn-md">Ja, überschreiben</a>
                                            </div>
                                            <div className="col-md-6 text-right">
                                            <a href="javascript:void(0)" onClick={() => {
										setshowtabicon(2);}} className="btn-theme btn-md">Abbrechen</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </div>


    )


}
SubTask.propTypes = {
    cid: PropTypes.string,
    subTask: PropTypes.bool,
    setSubTask: PropTypes.func,
    setTimeEntry: PropTypes.func,
    timeEntry: PropTypes.bool,
    setAufgaben:PropTypes.func
};
//export default SubTask;
const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
	  isAuthenticated: state.client.isLoggedIn,
	//   user: state.client,
	  messages: state.messages
	}
  };
  
export default connect(
	mapStateToProps
  )(SubTask)