import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export class CommentPopup extends Component{
    render(){
        return(

              <div id="commentPopup" className="comment-slide-form">
                <div id="commentPopupClose" className="comtFormClose">×</div>
                <div className="ticketcolum center">
                  <Tabs>
                      <TabList className="nav-tabs">
                        <Tab><i className="fa fa-ticket" /></Tab>
                        <Tab><i className="fa fa-bookmark" /></Tab>
                        <Tab><i className="fa fa-history"></i></Tab>
                      </TabList>
                   <TabPanel>
                      <div className="form-page">
                        <form  >
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <h2>Sar</h2>
                                <p>Sar</p>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Zugeordnet zu <Link to="#" className="rightIcon"><i className="fa fa-pencil" /></Link></label>
                                <div className="profile-info adminBenutzerOpen">
                                  <h6 className="primary-val"><span className="ph_container">AS</span> anitha Sivakumar</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Status</label>
                                <div className=" dropdown ">
                                  <Link to="#"  className="pl-0 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    Open <i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" />
                                  </Link>
                                  <div className="dropdown-menu posLeft" aria-labelledby="dropdownMenuButton">
                                    <Link to="#" className="dropdown-item">Open</Link>
                                    <Link to="#" className="dropdown-item">On Hold</Link>
                                    <Link to="#" className="dropdown-item">Escalated</Link>
                                    <Link to="#" className="dropdown-item">Closed</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Fälligkeitsdatum</label>
                                <p>01 Oct 2020 09:38 PM <i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" /></p>
                                <span className="mute-text-sm">Verspätet um 12 Stunden 51 Minuten</span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <h2>Ticket Information</h2>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Tel.</label>
                                <input type="text" className="form-control" placeholder="-" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Produkt Name</label>
                                <input type="text" className="form-control" placeholder="-" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <h2>ZusätzlicheInformationen</h2>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Priorität</label>
                                <select  className="form-control chosen-select">
                                  <option value={0}>-Keine-</option>
                                  <option value={0}>High</option>
                                  <option value={0}>Medium</option>
                                  <option value={0}>Low</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Klassifizierungen</label>
                                <select  className="form-control chosen-select">
                                  <option value={0}>-Keine-</option>
                                  <option value={0}>Question</option>
                                  <option value={0}>Problem</option>
                                  <option value={0}>Feature</option>
                                  <option value={0}>Others</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                   </TabPanel>
                   <TabPanel>
                    <div className="form-page">
                      <form  >
                        <input type="text" placeholder="Suchen" className="form-control" />
                        <div className="nichtGefunden">
                          <i className="fa fa-info-circle" aria-hidden="true" />
                          Artikel nicht gefunden
                        </div>
                      </form>
                    </div>
                   </TabPanel>
                   <TabPanel>
                    <div className="row">
                        <div className="col-md-12">
                          <h5>Gestern</h5>
                          <span className="mute-text-sm">01 Oct 2020</span>
                          <ul className="timeline">
                            <li>
                              <Link to="#" >#102 Test</Link>
                              <div className="mentionsSmList">
                                <span className="bredcrum-sm-list">03:38 PM</span>
                                <span className="dotSep">.</span>
                                <span className="bredcrum-sm-list">anitha Sivakumar</span>
                                <span className="dotSep">.</span>
                                <span className="bredcrum-sm-list">Open</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                   </TabPanel>

                 </Tabs>
                </div>
                <div className="ticketcolum right">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="media p20">
                        <div className="mediaImg"><i className="lnr-envelope" /> </div>
                        <div className="media-body">
                          <h5 className="mt-0 hint-title">#102 Test</h5>
                          <div className="slideFormAppHeader">
                            <Link to="" data-toggle="tooltip" data-placement="bottom" title="Erstellt am 01 Okt 2020 03:38 PM - High"><i className="fa fa-clock-o" /> 01 Okt 03:38 PM</Link>
                            <Link to=""><i className="fa fa-clock-o" /> Verfolger</Link>
                            <Link to=""><i className="fa fa-user" /> Kennzeichnungen</Link>
                            <Link to=""><i className="fa fa-play" data-toggle="tooltip" data-placement="bottom" title="Timer starten" /> 00:00:02 <i className="bl fa fa-refresh" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Timer rücksetzen" /></Link>
                          </div>
                        </div>
                      </div>
                      <div className="ticket_actions active">
                        <ul>
                          <li>
                            <span className="dropdown">
                              <Link to="#"  className="replyTrigger comd_txt active" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <i className="r90 fa fa-reply-all" data-toggle="tooltip" data-placement="left" title="Alle antworten" />
                              </Link>
                              <div className="dropdown-menu commentReplyBtns" aria-labelledby="dropdownMenuButton">
                                <Link to="#"  className="replyTrigger dropdown-item" data-toggle="tooltip" data-placement="left" title="Antworten"><i className="fa fa-reply" /></Link>
                                <Link to="#"  className="replyTrigger dropdown-item" data-toggle="tooltip" data-placement="left" title="Weiterleiten"><i className="fa fa-arrow-right" /></Link>
                              </div>
                            </span>
                          </li>
                          <li>
                            <Link to="#"  className="comd_txt" data-toggle="tooltip" data-placement="left" title="Kommentar (Umschalttaste + C)">
                              <i className="fa fa-comment-o" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <Tabs>
                        <TabList className="nav-tabs TicketInfoTabs">
                          <Tab><div className="">1 KONVERSATION</div></Tab>
                          <Tab>AUFLÖSUNG</Tab>
                          <Tab>EINTRAG IN DIE ZEITPLANUNG</Tab>
                          <Tab>ANLAGE</Tab>
                          <Tab>AKTIVITÄT</Tab>
                          <Tab>GENEHMIGUNG</Tab>
                          <Tab>VERLAUF</Tab>
                          <span className="tabRightdrop dropdown active">
                            <Link to="#"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="r90 fa fa-ellipsis-v" /></Link>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <Link to="#" className="dropdown-item"><i className="fa fa-pencil mr-2" /> Editieren</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-arrows mr-2" />Verschieben</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-share-alt mr-2" />Teilen</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-clock-o mr-2" />Folgen</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-ban mr-2" />Spam markieren</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-trash mr-2" />Löschen</Link>
                              <Link to="#" className="dropdown-item"><i className="fa fa-files-o mr-2" />Klon</Link>
                            </div>
                          </span>
                       </TabList>

                       <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="replySection" style={{display: 'none'}}>
                              <div className="rplyHeader p20">
                                <ul>
                                  <li><span className="rplyLeft">Von</span> <input defaultValue="one ix gmbh<support@oneixgmbh377.oneixdesk.eu>" />
                                    <span className="dropdown rplyRight">
                                      <Link to="#"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Gespeichert @ 10:21 AM <i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" />
                                      </Link>
                                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link to="#" className="dropdown-item"><i className="fa fa-pencil mr-2" /> Entwurf verwerfen</Link>
                                      </div>
                                    </span>
                                  </li>
                                  <li><span className="rplyLeft">An</span> <input placeholder="Empfänger-E-Mail-Adresse eingeben" /> <span className="rplyRight">BCC</span></li>
                                  <li><span className="rplyLeft">Cc</span> <input type="text" defaultValue="support@oneixgmbh377.oneixdesk.eu" data-role="tagsinput" /></li>
                                </ul>
                              </div>
                              <div className="rplyContent">

                                <textarea id="editor" />

                                <div className="p20">
                                  <p className="link-blue font15">How would you rate our customer service?</p>
                                  <div className="replyRating">
                                    <ul>
                                      <li><Link to="#" className="good"><img src="/assets/images/emoji-smile.png" alt="emoji-smile" /> Good</Link></li>
                                      <li><Link to="#" className="bad"><img src="/assets/images/emoji-bad.png" alt="emoji-bad" /> Bad</Link></li>
                                    </ul>
                                  </div>
                                  <div className="form-control rplyContentTxt">
                                    <p>---- On  Mon, 28 Sep 2020 08:36:48 +0200 support@oneixsupport.com  wrote ----</p>
                                    <p>Hallo</p>
                                    <p>Willkommen beim neuen vereinheitlichten Ticketbildschirm von Oneix Desk. Hier sehen Sie den vollständigen Kontext des Tickets. Ihr erstes Ticket liegt schon vor. Haben Sie gemerkt, dass dieses Ticket mit Ihnen verknüpft wurde? Wenn Sie auf dieses Ticket clever reagieren möchten, schauen Sie sich einmal die automatisch vorgeschlagenen Lösungen im linken Feld an.</p>

                                    <p>Wenn Sie mit dem Verfassen Ihrer Reaktion fertig sind, können Sie das Ticket senden und schließen.</p>
                                    <p>Welche Aktion Sie auch ausführen – alles lässt sich jederzeit über den Ticketverlauf verfolgen. Ein weiterer Schritt zu einem Kundendienst der Extraklasse!</p>
                                    <p>Gruß; <br />Team Oneix Desk<br />1 888 900 9646</p>

                                  </div>
                                </div>
                              </div>
                              <div className="ticketcolum_right_fxd_btns">
                                <div className="row">
                                  <div className="col-lg-5">
                                    <Link to="#" className="link-blue"><i className="lnr-paperclip" /></Link>
                                  </div>
                                  <div className="col-lg-7 text-right pr-5">
                                    <Link to="#" className="link-blue bg_light_blue hideReplySection">Senden</Link>
                                    <Link to="#" className="link-blue hideReplySection">Abbrechen</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="replySectionList">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="media p20">
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
                                    <Link to="#" className="link-blue"><i className="lnr-cog" /> Makro anwenden</Link>
                                    <Link to="#" className="link-blue"><i className="lnr-screen" /> Fernunterstützung</Link>
                                  </div>
                                  <div className="col-lg-7 text-right pr-5">
                                    <Link to="#" className="link-blue bg_light_blue">Ticket schließen</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="row">
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
                                  <Link to="#" className="btn-theme btn-sm">Speichern</Link>
                                  <Link to="#" className="btn-theme btn-sm">Speichern und Artikel hinzufügen</Link>
                                  <Link to="#" className="btn-white btn-sm">Löschen</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ticketcolum_right_fxd_btns">
                            <div className="row">
                              <div className="col-lg-5">
                                <Link to="#" className="link-blue"><i className="lnr-cog" /> Makro anwenden</Link>
                                <Link to="#" className="link-blue"><i className="lnr-screen" /> Fernunterstützung</Link>
                              </div>
                              <div className="col-lg-7 text-right pr-5">
                                <Link to="#" className="link-blue bg_light_blue">Ticket schließen</Link>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="p20">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="oraganizationInfo p20">
                                        <ul>
                                          <li>
                                            <div className="ix-icon-cell ">
                                              <Link to="#" className="NutzerVonBtn">+</Link>
                                            </div>
                                            <div className="profile-info ix-content-cell">
                                              <div className="profile-info">
                                                <h6 className="primary-val pl-3 pt-2"> Keine Gruppen zugewiesen. </h6>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 text-right">
                                      <ul className="rightSmList">
                                        <li className="dropdown">
                                          Gesamtzeitaufwand <Link to="#"  className="pl-0 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" />
                                          </Link><span>00 : 00 : 00</span> 
                                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Link to="#" className="dropdown-item">Gesamtzeitaufwand</Link>
                                            <Link to="#" className="dropdown-item">Berechenbare Stunden gesamt</Link>
                                            <Link to="#" className="dropdown-item">Total Invoiced Hours</Link>
                                            <Link to="#" className="dropdown-item">Nicht berechenbare Stunden gesamt</Link>
                                          </div>
                                        </li>
                                        <li>Gesamtkosten <span>SFR. 0</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="no-feeds">
                                        <h1>Keine Eintrag in die Zeitplanung in anzeigen</h1>
                                        <p>To add a new Eintrag in die Zeitplanung, Please click on the plus icon</p>
                                        <p><span className="line80" /></p>
                                        <p>Wenn Sie mehr erfahren möchten,klicken <Link to="#" className="link pl-2">Sie hier</Link></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="no-feeds">
                                  <h1>Keinanhänge für Ticket!</h1>
                                  <p>anhänge neu hinzufügen – Klick auf  <Link to="#" className="link-blue mr-3 ml-3 rndbtn">+</Link> Symbol</p>
                                  <p><span className="line80" /></p>
                                  <p>Wenn Sie mehr erfahren möchten,  <Link to="#" className="link pl-2">klicken Sie hier</Link></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="p20">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="oraganizationInfo">
                                    <ul>
                                      <li>
                                        <div className="profile-info">
                                          <span className="dropdown">
                                            <Link to="#" className="rndbtn float-left mr-3">+</Link>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                              <Link to="#" className="dropdown-item drop_title">HINZUFÜGEN</Link>
                                              <Link to="#" className="dropdown-item">Anruf</Link>
                                              <Link to="#" className="dropdown-item">Aufgabe</Link>
                                              <Link to="#" className="dropdown-item">Ereignis</Link>
                                            </div>
                                          </span>
                                          <span className="profile-info">
                                            <h6 className="primary-val pl-3 pt-2">Keine Gruppen zugewiesen 
                                              <span className="dropdown">
                                                <i style={{position: 'relative', left: '5px', top: '-1px', width: '20px', display: 'inline-block'}} className="fa fa-sort-desc" />
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <Link to="#" className="dropdown-item drop_title">Aktivitäten</Link>
                                                  <Link to="#" className="dropdown-item">Kommende Aktivitäten</Link>
                                                  <Link to="#" className="dropdown-item ">Alle Aktivitäten</Link>
                                                  <Link to="#" className="dropdown-item drop_title">Anrufe</Link>
                                                  <Link to="#" className="dropdown-item ">Kommende Anrufe</Link>
                                                  <Link to="#" className="dropdown-item ">Alle Anrufe</Link>
                                                  <Link to="#" className="dropdown-item drop_title">Aufgaben</Link>
                                                  <Link to="#" className="dropdown-item">Kommende Aufgaben</Link>
                                                  <Link to="#" className="dropdown-item">Alle Aufgaben</Link>
                                                  <Link to="#" className="dropdown-item drop_title">Ereignisse</Link>
                                                  <Link to="#" className="dropdown-item">Kommende Ereignisse</Link>
                                                  <Link to="#" className="dropdown-item">Alle Ereignisse</Link>
                                                </div>
                                              </span>
                                            </h6>
                                          </span>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-6 text-right">
                                  <ul className="rightSmList">
                                    <li className="dropdown">Fälligkeitsdatum / Anfangszeit <Link to="#"  className="pl-0 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i style={{position: 'relative', left: '5px', top: '-1px'}} className="fa fa-sort-desc" /></Link>
                                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link to="#" className="dropdown-item drop_title">Sortieren nach</Link>
                                        <Link to="#" className="dropdown-item">Erstellungszeit</Link>
                                        <Link to="#" className="dropdown-item">Fälligkeitsdatum / Anfangszeit</Link>
                                      </div>
                                    </li>
                                    <li>
                                      <Link to="#"  className="pl-0 " data-toggle="tooltip" data-placement="bottom" title="Neueste Einträge zuerst anzeigen">
                                        <i className="fa fa-filter" /></Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-lg-12">
                                  <div className="no-feeds">
                                    <h1>Keinkommende aktivitäten für ticket!</h1>
                                    <p>aktivität neu hinzufügen – Klick auf  <Link to="#" className="link-blue mr-3 ml-3 rndbtn">+</Link> Symbol</p>
                                    <p><span className="line80" /></p>
                                    <p>Wenn Sie mehr erfahren möchten, <Link to="#" className="link pl-2">Hier klicken</Link></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="no-feeds">
                                  <h1>KeinGenehmigungen für ticket!</h1>
                                  <p>Genehmigungen  neu hinzufügen – Klick auf  <Link to="#" className="link-blue mr-3 ml-3 rndbtn">+</Link> Symbol</p>
                                  <p><span className="line80" /></p>
                                  <p>Wenn Sie mehr erfahren möchten,  <Link to="#" className="link pl-2">klicken Sie hier</Link></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="ticketcolum_right_scroll">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="p20">
                                  <label className="ix-checkbox-label"><input type="checkbox" className="ix-checkbox" /><mark className="mr-1" /> Nur meine Aktivitäten anzeigen</label>
                                </div>
                              </div>
                              <div className="col-lg-6 text-right">
                                <div className="p20">
                                  <span className="dropdown">
                                    <Link to="#"    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="fa fa-ellipsis-h" /></Link>
                                    <div className="dropdown-menu dropMinHeight" aria-labelledby="dropdownMenuButton">
                                      <Link to="#" className="dropdown-item">Eingehende Antworten</Link>
                                      <Link to="#" className="dropdown-item">Abgehende Antworten</Link>
                                      <Link to="#" className="dropdown-item">Status</Link>
                                      <Link to="#" className="dropdown-item">Kommentare</Link>
                                      <Link to="#" className="dropdown-item">Zeiteinträge</Link>
                                      <Link to="#" className="dropdown-item">Anhänge</Link>
                                      <Link to="#" className="dropdown-item">Aufgaben</Link>
                                      <Link to="#" className="dropdown-item">Anrufe</Link>
                                      <Link to="#" className="dropdown-item">Ereignisse</Link>
                                      <Link to="#" className="dropdown-item">Genehmigungen</Link>
                                      <Link to="#" className="dropdown-item">Automatisierung</Link>
                                      <Link to="#" className="dropdown-item">Ticketverknüpfungen</Link>
                                      <Link to="#" className="dropdown-item">Benachrichtigungen</Link>
                                      <Link to="#" className="dropdown-item">Workflows</Link>
                                      <Link to="#" className="dropdown-item">Makros</Link>
                                      <Link to="#" className="dropdown-item">Eskalationen</Link>
                                      <Link to="#" className="dropdown-item">Zeitbasierte Aktionen</Link>
                                      <Link to="#" className="dropdown-item">Blueprint</Link>
                                    </div>
                                  </span>
                                </div>
                              </div>
                              <div className="history_timeline p20">
                                <ul>
                                  <li className="timeline-item">
                                    <div className="tline_icn-cont">
                                      <span className="icon-duetime1"><i className="lnr lnr-clock" /></span>
                                    </div>
                                    <div className="timeline-cont">
                                      <div className="tline-datebase"><span className="timeline-date">01 Okt 2020</span> <span className="timeline-time">09:38 PM</span></div>
                                      <div className="timeline-subj mt2">Ticket überschritt die Auflösungsfälligkeitszeit</div>
                                    </div>
                                  </li>
                                  <li className="timeline-item">
                                    <div className="tline_icn-cont">
                                      <span className="icon-duetime1"><i className="lnr lnr-tag" /></span>
                                    </div>
                                    <div className="timeline-cont">
                                      <div className="tline-date"><span className="timeline-time">09:38 PM</span></div>
                                      <div className="timeline-subj mt2">Dienstleistungvereinbarung wurde aktiviert</div>
                                      <div className="mt-1">
                                        <span className="tline-label">DGV-Bezeichnung   <span className="tline-val">Priority-based SLAs</span></span>
                                        <span className="tline-label">Fälligkeitsdatum geändert von <span className="tline-val">02.10.2020 12:00 PM an 01.10.2020 09:38 PM</span></span>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="timeline-item">
                                    <div className="tline_icn-cont">
                                      <span className="icon-duetime1"><i className="lnr lnr-user" /></span>
                                    </div>
                                    <div className="timeline-cont">
                                      <div className="tline-date"><span className="timeline-time">09:38 PM</span></div>
                                      <div className="timeline-subj mt2">anitha Sivakumar übermittelte neue ticket</div>
                                      <div className="mt-1">
                                        <span className="tline-label">Konto Name <span className="tline-val">Sar</span></span>
                                        <span className="tline-label">Kontakt Name <span className="tline-val">Sar</span></span>
                                        <span className="tline-label">Betreff <span className="tline-val">Test</span></span>
                                        <span className="tline-label">Beschreibung <span className="tline-val">asfdfasfasfsdf</span></span>
                                        <span className="tline-label">Status <span className="tline-val">Open</span></span>
                                        <span className="tline-label">Ticket Besitzer <span className="tline-val">anitha Sivakumar</span></span>
                                        <span className="tline-label">Fälligkeitsdatum <span className="tline-val">02.10.2020 12:00 PM</span></span>
                                        <span className="tline-label">Priorität <span className="tline-val">High</span></span>
                                        <span className="tline-label">Kanal <span className="tline-val">Phone</span></span>
                                        <span className="tline-label">Klassifizierung <span className="tline-val">Problem</span></span>
                                        <span className="tline-label">Reaktionszeit <span className="tline-val">02.10.2020 12:00 PM</span></span>
                                        <span className="tline-label">Layout <span className="tline-val">one ix gmbh</span></span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                     </Tabs>
                    </div>
                  </div>
                </div>
              </div>

        )
    }

}
export default CommentPopup

