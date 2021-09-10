import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { de } from 'date-fns/locale'
import Header from '../shared/Header';
import Leftsidemenu from '../modules/Leftsidemenu';
import { getData } from '../../services/main-service';
import { connect } from 'react-redux';
import { priceFormat } from '../../utils';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { CSVLink } from "react-csv";

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
//import {de} from 'react-date-range/dist/locale';
// const myStyles: CSSProperties = {
// 	width: '20%',
// }

const borderColor = '#ebebeb'
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: 'column',
    padding:50,
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
        flexDirection: 'row',
        borderBottomColor: '#ebebeb',
        backgroundColor: '#ebebeb',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        color: 'black'
    },
    a1: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderLeftColor: '#ebebeb',
        borderLeftWidth: 1,
    },
    a2: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    a3: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    a4: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    a5: {
      width: '20%',
      borderRightColor: '#ebebeb',
      borderRightWidth: 1,
    },
    pdfHeader:{
      backgroundColor:"#3771c8",
      color: '#fff',
      fontSize:10,
      padding: 6,
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    pdfRow:{
      fontSize:8,
      padding: 6,
    },
    txtRight: {
      textAlign:"right"
    }
  });

class Transaktionen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      transaktionen: [],
      firstName: "",
      lastName: "",
      addressID: 0,
      cardBalance: 0,
      excelHeaders: [
        { label: "Buchung", key: "a1" },
        { label: "Beschreibung", key: "a2" },
        { label: "Belastung", key: "a3" },
        { label: "Gutschrift", key: "a4" },
        { label: "Saldo", key: "a5" },
      ],
      excelData: [],
      dateSelectionRange:{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
      showDatePicker:false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchItems();
  }

  async fetchItems() {

    console.log("User Properties++++++++++++++++++++++++", this.props.user);
    console.log("User Properties++++++++++++++++++++++++", this.props.user.userAddress?.fields[2]['value']);
    console.log("User Properties++++++++++++++++++++++++", this.props.user.userAddress?.fields[3]['value']);
    let { excelData } = this.state;
    let id: any = this.props.user.userAddress.id;
    let transHistory: any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardHistory&AddressID=${id}`);
    let cardbalance:any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardBalance&AddressID=${id}`);
    this.setState({
      loading: false,
      transaktionen: await transHistory['status'] === 200 ? Array.isArray(transHistory['data']) ? transHistory['data'].slice(0, 10) : [] : [],
      cardBalance: await cardbalance['status'] === 200 ? parseFloat(cardbalance['data']) : 0,
      firstName: this.props.user.userAddress?.fields[2]['value'],
      lastName: this.props.user.userAddress?.fields[3]['value'],
      addressID: id,
    });
    console.log( "Transcation History++++++++++", this.state.transaktionen );
    //let excelData:any = [];
    if(this.state.transaktionen.length > 0) {
      
      this.state.transaktionen.forEach((trans:any, idx:any)=> {
        let bTxt:any = {};
        try {
         bTxt = JSON.parse(trans.bookingText);    
        } catch(error) {
          console.log(error);
        }
        let transData:any = {
          a1:format(new Date(trans.date), 'dd.MM.yyyy'), 
          a2: bTxt.bookingText, 
          a3: priceFormat(trans.amount), 
          a4: priceFormat(trans.amount), 
          a5: priceFormat(trans.amount), 
        }
        excelData.push(transData);
        /*excelData[idx]['a1'] = format(new Date(trans.date), 'dd.MM.yyyy');
        excelData[idx]['a2'] = trans.bookingText;
        excelData[idx]['a3'] = priceFormat(trans.amount);
        excelData[idx]['a4'] = priceFormat(trans.amount);
        excelData[idx]['a5'] = priceFormat(trans.amount);*/

      });
    }
    console.log("Excel Data+++++++++++++", excelData);
    this.setState({excelData: excelData});
    console.log( "Card balance++++++++++", this.state.cardBalance );
  }

  handleRefresh() {
    this.setState({ loading: true });
    this.fetchItems();
  }

 async handleDateRangeChange(ranges:any) {
    console.log("Data Ranges++++++++++++++++", ranges);
    await this.setState({ loading:true, dateSelectionRange:ranges.selection, showDatePicker:false });
    let startDate:any = format(new Date(ranges.selection.startDate), 'yyyy-MM-dd');
    let endDate:any = format(new Date(ranges.selection.endDate), 'yyyy-MM-dd');
    console.log("Start Date++++++++++++++++++", startDate);
    console.log("End Date++++++++++++++++++", endDate);
    if(startDate === endDate) {
      let id: any = this.props.user.userAddress.id;
      let transHistory:any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardHistory&AddressID=${id}&StartDate=${startDate}`);
      if(transHistory['status'] === 200) {
        await this.setState({ loading: false, transaktionen:transHistory['data'] });
      } else {
        await this.setState({ loading: false });
      }
    }
    if(startDate !== endDate) {
      let id: any = this.props.user.userAddress.id;
      let transHistory:any = await getData(`/memoria/getMethod?url=/CustomerCard/getCustomerCardHistory&AddressID=${id}&StartDate=${startDate}&EndDate=${endDate}`);
      if(transHistory['status'] === 200) {
        await this.setState({ loading: false, transaktionen:transHistory['data'] });
      } else {
        await this.setState({ loading: false });
      }
    }
  }

  render() {
    
    let { loading, transaktionen, firstName, lastName, addressID, cardBalance, excelHeaders, excelData, dateSelectionRange, showDatePicker } = this.state;
    let formtedDate =new Date(dateSelectionRange.startDate).toLocaleDateString('de') +' - ' +new Date(dateSelectionRange.endDate).toLocaleDateString('de');
    return (
      <div>
        <Header />
        <Leftsidemenu />
        <div className="mainWrapper active">
          <Row no-gutters>
            <Col sm={12}>
              <div className="menu-category-bar active">
                <Container fluid>
                  <div className="menu-category-title">
                    <h1>
                      <i className="lnr-briefcase mr-1"></i> Transaktionen{' '}
                    </h1>
                  </div>
                </Container>
              </div>
              <div className="mainWrapperBody dashboard">
                <div className="tansaction">
                  <table className="table table-bordered mb-0" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th className="grey-bg" style={{ width: '50%' }}>
                          <div className="transName">{firstName !== undefined && firstName} {lastName !== undefined && lastName}</div>
                        </th>
                        <th colSpan={2} className="grey-bg  text-center" style={{ width: '20%' }}>
                          <span className="transRowTxtBigLeft">
                            <span className="transRowSmall">Per</span>
                            <br />
                            { format(new Date(), 'dd.MM.yyyy') }
                          </span>
                        </th>
                        <th colSpan={4} className="grey-bg  text-center" style={{ width: '30%' }}>
                          <span className="transRowTxtBigRight">
                            <span className="transRowSmall">Kontosaldo</span>
                            <br />
                            <span className="transRowChf">CHF</span> {priceFormat(cardBalance)}
                          </span>
                        </th>
                      </tr>
                      <tr>
                        <th className="grey-bg" style={{ width: '55%' }}>
                          <div className="transName">{ addressID !== undefined && addressID }</div>
                        </th>
                        <th className="grey-bg  text-center" style={{ width: '5%' }}>
                          Datum
                        </th>
                        <th className="grey-bg" style={{ width: '20%' }}>
                        <div className="dateBase">
                            <input className="form-control" value={formtedDate} onClick={(e:any)=>{
                               e.stopPropagation();
                              this.setState({showDatePicker:true})}}/>

                              <DateRange locale={de}
                              className={showDatePicker?'':'hide'}
                                // editableDateInputs={true}
                                onChange={this.handleDateRangeChange}
                              showSelectionPreview={true}
                              ranges={[dateSelectionRange]}
                              dateDisplayFormat="d.MM.yyyy"
                              showDateDisplay={false}
                            />  

                            {/* <DateRange locale={de}
                              className={showDatePicker?'':'hide'}
                                // editableDateInputs={true}
                                onChange={(item:any) =>{
                                  this.setState({dateSelectionRange:item.selection, showDatePicker:false})
                                }
                              }
                              showSelectionPreview={true}
                              ranges={[dateSelectionRange]}
                              dateDisplayFormat="d.MM.yyyy"
                              showDateDisplay={false}
                              
                            /> */ }
                          </div>
                        </th>
                        <th className="grey-bg  text-center" style={{ width: '5%' }}>
                          <span className="tansHeaderImg">
                            <a href="#">
                              <img src="/assets/images/info.png" alt="" />
                            </a>
                          </span>
                        </th>
                        <th className="grey-bg text-center" style={{ width: '5%' }}>
                          <span style={{cursor: "pointer"}} className="tansHeaderImg" onClick={this.handleRefresh}>
                              <img src="/assets/images/reload.png" alt="" />
                          </span>
                        </th>
                        <th className="grey-bg text-center" style={{ width: '5%' }}>
                        <CSVLink data={excelData} headers={excelHeaders}>
                            <span className="tansHeaderImg">
                                <img src="/assets/images/excel.png" alt="" />
                            </span>
                          </CSVLink>
                        </th>
                        <th className="grey-bg text-center" style={{ width: '5%' }}>
                          <span className="tansHeaderImg">
                          <div className="App">
                                { loading ? (
                                  <span>...</span>
                                ) : Array.isArray(transaktionen) ? (
                                  <PDFDownloadLink document={<MyDoc transaktionen={transaktionen} />} fileName="TransactionHistory.pdf">
                                    {({ blob, url, loading, error }) => (loading ? 'Loading' : '')}
                                    <img src="/assets/images/pdf.png" alt="" />
                                  </PDFDownloadLink> 
                                ) : (
                                  <p>No History Found</p>
                                ) }
                          </div>
                          </span>
                        </th>
                      </tr>
                      <tr>
                        <th colSpan={7} className="grey-bg">
                          <div className="transName">Von 24.03.2021 bis 26.04.2021 (76 Transaktionen)</div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <table className="table order-list-table" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Buchung</th>
                        <th style={{ width: '20%' }}>Beschreibung</th>
                        <th className="txtRight" style={{ width: '20%' }}>Belastung</th>
                        <th className="txtRight" style={{ width: '20%' }}>Gutschrift</th>
                        <th className="txtRight" style={{ width: '20%' }}>Saldo</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                { loading ? (
                  <span>Loading...</span>
                ) : transaktionen ? (
                <div className="transactionScroll">
                  <table className="table table-striped order-list-table" cellSpacing={0}>
                    <tbody>
                    {transaktionen.map((trans: any, idx: any) => {
                      let bTxt:any = {};
                      try {
                        bTxt = JSON.parse(trans.bookingText);
                      } catch (error) {
                        console.log(error);
                      }
                      return (
                          <Fragment key={`${idx}`}>
                            <tr>
                              <td style={{ width: '20%' }}>{format(new Date(trans.date), 'dd.MM.yyyy')}</td>
                              <td style={{ width: '20%' }}>{bTxt.bookingText}</td>
                              <td style={{ width: '20%' }} className="txtRight">{priceFormat(trans.amount)}</td>
                              <td style={{ width: '20%' }} className="txtRight">{priceFormat(trans.amount)}</td>
                              <td style={{ width: '20%' }} className="txtRight">{priceFormat(trans.amount)}</td>
                            </tr>
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                ) : (
                  <p>No History Found</p>
                )}
                
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

// Create Document Component
/*const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>

      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);*/

// Create Document Component
const TableHeader = () => (
  <View style={styles.tableContainer}>
    <Text style={[styles.pdfHeader]}>Buchung</Text>
    <Text style={[styles.pdfHeader]}>Beschreibung</Text>
    <Text style={[styles.pdfHeader, styles.txtRight]}>Belastung</Text>
    <Text style={[styles.pdfHeader, styles.txtRight]}>Gutschrift</Text>
    <Text style={[styles.pdfHeader, styles.txtRight]}>Saldo</Text>
  </View>
);

const TableRow = (props:any) => {
  let { transaktionen } = props;
  console.log("2Transactionen+++++++++++++++++", transaktionen);
  const rows:any = transaktionen.map((trans:any, key:any) => 
      <View style={styles.row} key={key.toString()}>
          <Text style={[styles.a1, styles.pdfRow]}>{format(new Date(trans.date), 'dd.MM.yyyy')}</Text>
          <Text style={[styles.a2, styles.pdfRow]}>{trans.bookingText}</Text>
          <Text style={[styles.a3, styles.pdfRow, styles.txtRight]}>{priceFormat(trans.amount)}</Text>
          <Text style={[styles.a4, styles.pdfRow, styles.txtRight]}>{priceFormat(trans.amount)}</Text>
          <Text style={[styles.a5, styles.pdfRow, styles.txtRight]}>{priceFormat(trans.amount)}</Text>
      </View>
  )
  return (<Fragment>{rows}</Fragment> )
};

// Create Document Component
const MyDoc = (props:any) => {
  let { transaktionen } = props;
  console.log("1Transactionen+++++++++++++++++", transaktionen);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.tableContainer}>
          <TableHeader />
          <TableRow transaktionen={transaktionen} />
        </View>
      </Page>
    </Document>
  )
}


//export default Transaktionen;
const mapStateToProps = (state: any) => {
  console.log('loggedin', state);
  return {
    isAuthenticated: state.client.isLoggedIn,
    user: state.client.user
  };
};

export default connect(mapStateToProps)(Transaktionen);
