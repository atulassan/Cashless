import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Suche from '../modules/Suche';
// import Notification from '../modules/Notification';
// import Settings from '../modules/Settings';
// import UserInfo from '../modules/UserInfo';
// import Activation from '../modules/Activation';
// import Letzte from '../modules/Letzte';
// import CommentPopup from '../modules/CommentPopup';
// import Umbenennen from '../modules/Umbenennen';

export class Footer extends Component{
    render(){
        return(
              <div>

                {/* <div className="adminFooter">
                  <div className="afooter-menucontainer">
                    <ul>
                      <li><Link to=""><i className="lnr-bubble" /> <span>Chats</span></Link></li>
                      <li><Link to=""><i className="lnr-users" /> <span>Kanäle</span></Link></li>
                      <li><Link to=""><i className="lnr-user" /> <span>Kontakt</span></Link></li>
                      <li><Link to=""><span>Hier ist dein Smart Chat (Strg + Leertaste)</span></Link></li>
                    </ul>
                  </div>
                  <div className="afooter-right">
                    <ul>
                      <li><Link to=""><i className="lnr-keyboard" style={{fontSize: '20px', position: 'relative', top: '-1px'}} /></Link></li>
                      <li><Link to="" className="activationOpen"><i className="lnr-calendar-full" /></Link></li>
                      <li><Link to="" className="LetzteOpen"><i className="lnr-clock" /></Link></li>
                      <li><Link to=""><i className="lnr-magnifier" /></Link></li>
                    </ul>
                  </div>
                  <div className="chat-menu" style={{display: 'none'}}>
                    <div className="chat_menuheader">
                      <span className="badge_imgwrapper chat_status online">
                        <img src="/assets/images/chat_user_icon.jpg" alt="chat_user" />
                      </span>
                      <div className="chat_menu_username" title="anitha Sivakumar">anitha Sivakumar</div>
                      <span data-minimize="true" className="chat_menu_minimize"><img src="/assets/images/svg/minus.svg" alt="minus" /></span>
                      <div className="chat_userstatus" title="Available">Available</div>
                      <span className="chat_settings" data-settings="true"><i className="openMsgTrigger lnr-cog" /> <i className="closeMsgTrigger lnr-cross" style={{display: 'none'}} /></span>
                      <div className="chathistory change_msg_settings" style={{display: 'none'}}>
                        <div className="chat_settingsdropdown_item msg_list">
                          <span className="chat_userstatusiconwrapper">
                            <div className="chat_chathistory_icon"><i className="lnr-magnifier" /></div>
                          </span>
                          <div className="settingsname" data-href="#" data-toggle="modal" data-target="#MessageSearch">Message Search</div>
                        </div>
                        <div className="chat_settingsdropdown_item msg_list change_status_trigger">
                          <span className="chat_userstatusiconwrapper">
                            <div className="chat_chathistory_icon"><i className="lnr-pencil" /></div>
                          </span>
                          <div className="settingsname">Status ändern</div>
                        </div>
                        <div className="chat_settingsdropdown_item msg_list chat_settings_trigger">
                          <span className="chat_userstatusiconwrapper">
                            <div className="chat_chathistory_icon"><i className="lnr-cog" /></div>
                          </span>
                          <div className="settingsname">Einstellungen</div>
                        </div>
                      </div>
                      <div className="chathistory change_status_settings" style={{display: 'none'}}>
                        <div className="chat_settingsdropdown_item available_list">
                          <span className="chat_userstatusiconwrapper">
                            <div className="change_status available" />
                          </span>
                          <div className="settingsname">Available</div>
                        </div>
                        <div className="chat_settingsdropdown_item available_list">
                          <span className="chat_userstatusiconwrapper">
                            <div className="change_status busy" />
                          </span>
                          <div className="settingsname">Busy</div>
                        </div>
                        <div className="chat_settingsdropdown_item available_list">
                          <span className="chat_userstatusiconwrapper">
                            <div className="change_status invisiblee" />
                          </span>
                          <div className="settingsname">Invisible</div>
                        </div>
                        <div className="chat_settingsdropdown_item available_list">
                          <span className="chat_userstatusiconwrapper">
                            <div className="change_status" />
                          </span>
                          <div className="settingsname">Clear status message</div>
                        </div>
                      </div>
                      <div className="chat-settings" style={{display: 'none'}}>
                        <ul>
                          <li>
                            Allgemein
                            <div className="chat-settings-label">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Chat hier anhalten</label>
                              </div>
                            </div>
                          </li>
                          <li>
                            Akustische Benachrichtigung
                            <div className="chat-settings-label">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Neue Mitteilung</label>
                              </div>
                            </div>
                          </li>
                          <li>
                            Desktop-Benachrichtigung
                            <div className="chat-settings-label">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="One-one Chats" />
                                <label className="form-check-label" htmlFor="One-one Chats">One - One Chats</label>
                              </div>
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="Mention" />
                                <label className="form-check-label" htmlFor="Mention">Mention</label>
                              </div>
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="chatChannel" />
                                <label className="form-check-label" htmlFor="chatChannel">Group Chats &amp; Channel</label>
                              </div>
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="boTMessages" />
                                <label className="form-check-label" htmlFor="boTMessages">Bot Messages</label>
                              </div>
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="Nutzerstatusänderung" />
                                <label className="form-check-label" htmlFor="Nutzerstatusänderung">Nutzerstatusänderung</label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat_searchcontainer">
                      <span className="chat_searchicon"><i className="lnr-magnifier" /></span>
                      <input type="text" className="chat_searchinput form-control" autoComplete="off" placeholder="Search Contacts, Chats & Channels" data-selected="false" />
                    </div>
                    <div className="chat_title">Recent Chats</div>
                    <div className="item_invitations openSubTrigger">
                      <span className="badge_imgwrapper">
                        <img src="/assets/images/network_icon.jpg" alt="network" />
                      </span>
                      <div className="chat_menu_username" title="anitha Sivakumar">#announcements</div>
                      <div className="menu_item_msg truncate-ellipsis">Willkommen bei #announcements. Per Vorgabe wird jeder Nutzer Teilnehmer dieses Kanals. Also machen Sie etwas daraus – verbinden Sie sich mit jedem in Ihrer Organisation.</div>
                    </div>
                  </div>
                  <div className="sub-chat-menu" style={{display: 'none'}}>
                    <div className="chat_menuheader">
                      <span className="badge_imgwrapper">
                        <img src="/assets/images/network_icon.jpg" alt="network" />
                      </span>
                      <div className="chat_menu_username" title="anitha Sivakumar">#announcements</div>
                      <div className="menu_item_msg truncate-ellipsis">1 Teilnehmer</div>
                      <div className="sub-chat-actions">
                        <Link to="">−</Link>
                        <Link to=""><i className="lnr lnr-frame-expand" /></Link>
                        <Link to="" className="sub-chat-close"><i className="lnr lnr-cross" /></Link>
                      </div>
                    </div>
                    <div className="message-input">
                      <div className="input-group">
                        <div className="input-group-append">
                          <button className="btn attach" type="button"><i className="lnr lnr-paperclip" /></button>
                        </div>
                        <textarea data-type="text" className="form-control"  defaultValue={""} />
                        <div className="input-group-append">
                          <button className="btn attach" type="button"><i className="lnr lnr-smile" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Suche />
                <Notification />
                <Settings />
                <UserInfo />
                <Activation />
                <Letzte />
                <CommentPopup />
                <Umbenennen /> */}
                
              </div>
        )
    }
}
export default Footer

