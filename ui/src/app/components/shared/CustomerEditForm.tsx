import React, { useEffect} from 'react';
import { Link, } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
//mport { postData } from "../../services/main-service"
import { getData } from "../../services/main-service";
import Alert from './Alert'
type FormData = {
	custContactId: string,
	customerName: string,
	telephone: string,
	email: string,
	website: string,
	address: string,
	postcode: string,
	city: string,
	place: string,
	account: string,
	country: string,
	fax: string,
	vatno: string,
	firstName: string,
	lastName: string,
	contEmail: string,
	mobile: string,
	telephoneDirect: string,
	telephonePrivate: string,
	dob: string,
	salutation: string,
	title: string,
	facebook: string,
	instagram: string,
	linkedin: string,
  xing: string,
  modifiedBy: string,
	};  

function CustomerEditForm({match}:any){
    
    
     //let { id }:any =  props.match.params;
    // let result:any = getData(`/customer/${id}`);
    // const customers = React.useState(result.data.response);
    // console.log("----------------------------customerdata-------------");
    // console.log(customers);
    // console.log("----------------------------customer data----------------");
    // const [customers, setCustomers] = React.useState();
    // let result:any = getData(`/customer/${id}`);
    // setCustomers(result.data.response)
    //console.log("----------------------------customerdata-------------");
    //console.log(id);
    //console.log(customers);
    // console.log(props.match.params);
    // console.log("----------------------------customer data----------------");
    console.log(match);
   
    var id =  match;
    console.log('iddd',id)
    console.log(match);
    //const [count, setCount] = useState();
   
    useEffect(() => {
      console.log(match);
     // let { id }:any =  props?.match?.params;
    //  let result:any = getData(`/customer/${id}`);
    // setCount(result.data.response)
    async function fetchData(){
     // let prop=await match;
      let { id }:any =  match.params;
      let result:any = await getData(`/customer/${id}`);
      console.log(result);
    }
    fetchData()
    
    },[]);
   
   
  const { register, errors, handleSubmit } = useForm<FormData>({
    criteriaMode: "all"
  });

  
  const [alertMsg, setAlertMsg] = React.useState({show:false,variant:'success',message:''});
  
  const onSubmit = async (data: FormData) => {
    console.log("----------------------------form data-------------");
    console.log(data);
    console.log("----------------------------form data----------------");
    setAlertMsg({show:true,variant:'danger',message:"test"})
    // let result:any = await postData('/auth/signup', data);
    // console.log(data);
    // if(result.hasOwnProperty('status') && result.status === 200) {
    //   //alert(result.data.message);  
      
    //   setAlertMsg({show:true,variant:'success',message:result.data.message})
      
    // } else {
    //   setAlertMsg({show:true,variant:'danger',message:result.data.message})
    //   //alert(result.data.message);  
    // }
    // console.log(result);
  }

        return(
            <form  name="customerEditform"  onSubmit={handleSubmit(onSubmit)}>
            <Alert variant={alertMsg.variant} show={alertMsg.show} message={alertMsg.message}/>
              <div className="addTicketFormpPadding overflowScroll">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 mb-3">
                        <div className="ix-kontactheader-icon" />
                        <div className=" ix-formheader-innerContainer">
                          <h3>Kunden Hinzufügen</h3>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 ">
                        <div className="form-group">
                          <label>Kundenname </label>
                          <input type="text" className="form-control" name="customerName"  ref={register({ required: "Diese Eingabe ist erforderlich." })}
                             placeholder="memoria" />
                            <ErrorMessage
                            errors={errors}
                            name="customerName"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 ">
                        <div className="form-group">
                          <label>Strasse nr.</label>
                          <input type="text" className="form-control" name="address"   
                             ref={register({ required: "Diese Eingabe ist erforderlich." })}/>
                            <ErrorMessage
                            errors={errors}
                            name="address"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>PLZ</label>
                          <input type="text" className="form-control" name="postcode" ref={register()}/>
                             
                            {/* <ErrorMessage
                            errors={errors}
                            name="postcode"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Ort</label>
                          <input type="text" className="form-control" name="place"  ref={register({ required: "Diese Eingabe ist erforderlich." })}
                             />
                            {/* <ErrorMessage
                            errors={errors}
                            name="place"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Konton</label>
                          <select data-type="select" className="form-control" name="account" ref={register({ required: "Diese Eingabe ist erforderlich." })}>
                          <option value="">None</option>
                          <option value="swiss">Swiss</option>
                          </select>
                          <ErrorMessage
                            errors={errors}
                            name="account"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Land</label>
                          <input type="text" className="form-control" name="country" ref={register()} />
                            {/* <ErrorMessage
                            errors={errors}
                            name="country"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Tel.</label>
                          <input data-type="tel" className="form-control" name="telephone"  ref={register({ required: "Diese Eingabe ist erforderlich." })} 
                            />
                            <ErrorMessage
                            errors={errors}
                            name="telephone"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Fax</label>
                          <input type="text" className="form-control" name="fax" ref={register()}/>
                            
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>E-Mail</label>
                          <input type="text" className="form-control" name="email"  ref={register({ required: "Diese Eingabe ist erforderlich." })} 
                             />
                            <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Website</label>
                          <input type="text" className="form-control" name="website" ref={register()} />
                            
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 ">
                        <div className="form-group">
                          <label>MwSt. Nr.</label>
                          <input type="text" className="form-control" name="vatno" ref={register()}/>
                            
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 ">
                        <div className="form-group">
                          <h2>Kontaktperson</h2>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 ">
                      <div className="form-group">
                          <label>Anrede</label>
                          <select data-type="select" className="form-control" name="salutation" ref={register()}>
                            <option value="">-None-</option>
                            <option value="herr">Herr</option>
                            <option value="frau">Frau</option>
                          </select>
                        </div>
                        </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Vorname</label>
                          <input type="text" className="form-control" name="firstName"  ref={register({ required: "Diese Eingabe ist erforderlich." })}/>
                            <ErrorMessage
                            errors={errors}
                            name="firstName"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                     </div>
                    <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Nachname</label>
                          <input type="text" className="form-control" name="lastName" ref={register({ required: "Diese Eingabe ist erforderlich." })} />
                            <ErrorMessage
                            errors={errors}
                            name="lastName"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>E-Mail</label>
                          <input type="email" className="form-control" name="contEmail" ref={register({ required: "Diese Eingabe ist erforderlich." })}/>
                            <ErrorMessage
                            errors={errors}
                            name="contEmail"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Tel. Direkt</label>
                          <input data-type="tel" className="form-control" name="telephoneDirect" ref={register({ required: "Diese Eingabe ist erforderlich." })}/>
                            <ErrorMessage
                            errors={errors}
                            name="telephoneDirect"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Mobile</label>
                          <input data-type="tel" className="form-control" name="mobile" ref={register({ required: "Diese Eingabe ist erforderlich." })}/>
                            <ErrorMessage
                            errors={errors}
                            name="mobile"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Titel</label>
                          <input type="text" className="form-control" name="title"  ref={register()}/>
                            
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Geburtsdatum</label>
                          <input type="text" className="form-control" name="dob" ref={register()}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Tel. Privat</label>
                          <input data-type="tel" className="form-control" name="telephonePrivate" ref={register({ required: "Diese Eingabe ist erforderlich." })} />
                          <ErrorMessage
                            errors={errors}
                            name="telephonePrivate"
                            render={({ messages }) => {
                              return messages
                                ? Object.entries(messages).map(([type, message]) => (
                                  <span className="text-danger error" key={type}>{message}</span>
                                ))
                                : null;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Instagram</label>
                          <input type="text" className="form-control" name="instagram"  ref={register()}/>
                            
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Facebook</label>
                          <input type="text" className="form-control" name="facebook" ref={register()}/>
                            
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Linkedin</label>
                          <input type="text" className="form-control" name="linkedin" ref={register()}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 ">
                        <div className="form-group">
                          <label>Xing</label>
                          <input type="text" className="form-control" name="xing"  ref={register()}/>
                          <input type="hidden"  name="clientId"  value="1" ref={register()}/>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="btnFooter addTicketFoterBtns">
                <div className="row">
                  <div className="col-lg-12 col-md-12 ">
                    <button className="btn-theme btn-md mr-2" type="submit" >Speichern</button>
                    {/*<button className="btn-theme-white btn-md" >Abbrechen</button>*/}
                    <Link to="/kunden" className="btn-theme-white btn-md">Abbrechen</Link>
                  </div>
                </div>
              </div>
            </form>
            
        )
    
}

export default CustomerEditForm;