import React ,{Component, Fragment}from 'react';
//import { Link } from 'react-router-dom';
//import Leftsidemenu from '../modules/Leftsidemenu';
import { getData } from "../../services/main-service";
import { postData } from "../../services/main-service";
//import Header from '../shared/Header';
import { flatListToTreeViewData, priceFormat } from "../../utils"
import { format, parseISO } from 'date-fns';
import ModalPopup from '../modules/ModalPopup';
import { connect } from 'react-redux';
import { SET_MESSAGE } from 'app/redux/types';
//import PropTypes from 'prop-types';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class AddProduct extends Component<any, any> {

	constructor(props: any) {
		super(props); 
		this.state = {
			loading: true, 
			categories: [],
			productVariants: [],
			productDesignation: "",
			productDescription: "",
			id: "",
			showModal: false,
            productSelect:[],
			productFullData:{},
			userInfo:{},
			uid:"",
			//tempCats: categories
		}
		this.handleProductList = this.handleProductList.bind(this);
		this.handleReLoadProduct =  this.handleReLoadProduct.bind(this);
		this.handleLoadProduct =  this.handleLoadProduct.bind(this);
		this.handleShowModal = this.handleShowModal.bind(this);
		this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
	}



	componentDidMount() {
		this.fetchItems();
		//window.addEventListener('load', this.handleLoad);
	}

	/*componentDidUpdate(prevProps:any, prevState:any) {
		if (this.props.id !== prevProps.id) {
			this.handleLoad();
		}
	}*/

	handleProductList(productID:any) {
		console.log(productID);
	}
	
    handleInputChange(event:any, svalue:any) {
        const target = event.target;
        //var value = target.value;
        let data1=[];
        // console.log(value);
        // console.log(svalue);
        if(target.checked){
            
        let {productFullData,uid}=this.state;   
		 let data:any =  {
			"charged": true,
			"date": new Date().toISOString(),
			"discountPercent": 0,
			"id": 0,
			"productDescription": productFullData.description_DE,
			"productID": parseInt(productFullData.id),
			"productName": svalue.name_DE,
			"productVariantID":parseInt(svalue.id),
			"quantity": 0,
			"ticketID": parseInt(this.props.tid),
			"unitPrice": svalue.price1,
			"userID": parseInt(uid)
		  } 
		  data1.push(data);
		  this.setState({selectProduct:data1});
        }else{
            console.log("nodata");
        }
        
    }
    async ticketPositionSubmit(){
        console.log("===========final data=============");
        let {selectProduct}=this.state;
		let {setShowProduct,showProduct,productReload}=this.props;
		if(selectProduct.length>0)
		{
			let result:any =await postData('/memoria/putMethod?url=/TicketPositions/setTicketPositions', selectProduct);
            console.log("Ticket  post result is ",result);
            if(result.status === 200)
            {
				await this.props.dispatch({
					type: SET_MESSAGE,
					payload: { message: "Product Added success", variant: 'success' },
				  });
				  await productReload();
				  await setShowProduct(!showProduct);
				  
			}
			else
			{
				this.props.dispatch({
					type: SET_MESSAGE,
					payload: { message: "Internal Server Error", variant: 'Error' },
				  });
			}
		}
		else{
			this.props.dispatch({
				type: SET_MESSAGE,
				payload: { message: "Internal Server Error", variant: 'Error' },
			  });

		}
    }
	async handleReLoadProduct() {
		//this.fetchItems();
		let { categories } = this.state;
		console.log('Handle Listing', categories);
		await this.setState({ categories: categories});
	}

	async fetchItems() {
		//let { products }=  this.state;
        // console.log('Add Product ticket id data=============', this.props.tid);
		// console.log('showProduct=============', this.props.showProduct);
        // console.log('Add Product ticket id data=============', this.props.setShowProduct);
        	await this.setState({userInfo:this.props.user.userAddress});
			await  this.setState({uid:this.state.userInfo.user.id});
		let getCategories:any = await getData(`/memoria/getMethod?url=/Categories/getCategoriesAll`);
		let getCats:any = (getCategories.status === 200 && getCategories.data.length > 0) ? getCategories.data : [];
		console.log('Categories', getCategories);
		let nestedCats:any = await flatListToTreeViewData(getCats);
		console.log("Nested cats", nestedCats);
		//let getProducts:any = await getData(`/memoria/getMethod?url=/Products/getProductByCategoryID&CategoryID=102`);
		nestedCats.forEach((category:any, idx:any) => {
			if(category.hasOwnProperty('children')) {
				//console.log(`${category} ->`, category.children);
				category.children.forEach(async (childCat:any, idc:any) => {
					let childProducts:any = await getData(`/memoria/getMethod?url=/Products/getProductByCategoryID&CategoryID=${childCat.id}`);
					nestedCats[idx].children[idc]['products'] = (childProducts.status === 200 && childProducts.data.length > 0) ?  childProducts.data : [];
				});
			}
		});
		
		console.log("Static Categories with Products", nestedCats);
		await this.setState( { loading: false, categories: nestedCats } );
	}
	
	async handleLoadProduct(product:any) {
		console.log("Product Data", product);
		let {productDesignation, productDescription, productVariants, id } = this.state;
		productVariants = product.productVariants;
		productDesignation = product.name_DE;
		productDescription = product.description_DE;
		id = product.id;
		await this.setState({productVariants: productVariants, productDesignation: productDesignation, productDescription: productDescription, id: id, productFullData:product});
		console.log("productFullDataproductFullDataproductFullData", this.state.productFullData);
	}	

	handleShowModal() {
		this.setState({showModal: true});		
	}

	handleClose(val:any) {
		console.log(val);
		this.setState({showModal: false});		
	}

	render() {

	let { categories, loading, productVariants, productDesignation, productDescription, id, showModal} = this.state;	
    console.log('id', id);
	let {setShowProduct, showProduct, productReload}=this.props;
	//console.log('catgories', categories);	
	//console.log('product Variants', productVariants);
	//console.log('product Name', productDesignation);
	//console.log('product Descipt', productDescription);
	return(
  		<div>
			<div id="AddProdukte" className="slide-form slide-form-full active">
					  	{/* <div id="AddProdukteClose" className="slideFormClose">×</div> */}
					<a href="javascript:void(0)" onClick={() => { 
                                  setShowProduct(!showProduct); productReload();
								 
								   
                    }}>
						  <div className="slideFormClose">×</div></a>
					  	<div className="notifoHeader">Produkt hinzufügen</div>
				    	<div className="form-page form-popup-scroll">
				  	<div className="setting-left">
				  		<div className="setting-left-title">
		                      Produkte
	                    </div>
	                    <div className="setting-search psearch">
	                      <input type="text" placeholder="Suchen" className="form-control" />
	                    </div>
	                    <div className="setting-left-scroll productAccordionScroll">
							<Accordion className="productAccordion" allowZeroExpanded>
								{ loading ? <div>Loading...</div> :
								categories ? 
								(
									categories.map((category:any, ia:any) => 
									<Fragment key={ia}>
										<AccordionItem>
											<AccordionItemHeading>
												<AccordionItemButton>
													{category.name_DE}
												</AccordionItemButton>
											</AccordionItemHeading>
											{
												category.hasOwnProperty('children') ?
													<AccordionItemPanel>
														<Accordion allowZeroExpanded>
															{
																category.children.map((childCat:any, ib:any) =>
																<Fragment key={ib}>
																	<AccordionItem>
																	<AccordionItemHeading onClick={this.handleReLoadProduct}>
																		<AccordionItemButton>
																			{childCat.name_DE}
																			{/*console.log('Listing Products', childCat, childCat['products'])*/}
																		</AccordionItemButton>
																	</AccordionItemHeading>
																	{ childCat['products'] &&
																		<AccordionItemPanel>
																			<Accordion>
																				{
																					childCat['products'].map((product:any, ic:any) => {
																						return (
																							<Fragment key={ic}>
																								<AccordionItem className="no-arrow">
																									<AccordionItemHeading onClick={(event)=>this.handleLoadProduct(product)}>
																										<AccordionItemButton>
																											{product.name_DE}
																										</AccordionItemButton>
																									</AccordionItemHeading>
																								</AccordionItem>
																							</Fragment>
																						)
																					}
																					)
																				}
																			</Accordion>
																		</AccordionItemPanel>
																	}
																	</AccordionItem>
																</Fragment>
																)
															}
														</Accordion>
										  			</AccordionItemPanel>
												 : null
											}
									</AccordionItem>
									</Fragment>
									)
								): null	
								}  
							</Accordion>
	                    </div>
	                </div>

		            <div className="setting-right">
                            <div className="setting-right-title">
								    <div className="row">
									    <div className="col-lg-12">
									        Programmirung und Schulung POS
									    </div>
								    </div>
							</div>
						<div className="Setting-right-content bt1px height90">
                        <div className="row no-gutters">
											<div className="col-lg-12 col-md-12">
												<div className="form-page product-form p20">
													<div className="productAccordionScroll">
														<div className="product-table">
												            <ul>
												              	<li>
													                <table className="table m-0">
													                	<thead>
													                		<tr>
																			<th style={{width:'9%'}} className="text-center"></th>
                                                                            <th style={{width:'9%'}} className="text-center">Artikelnummer</th>
																				<th style={{width:'9%'}} className="text-center">Promotion (CHF)</th>
																				<th style={{width:'9%'}} className="text-center">Bezeichnung</th>
																				<th style={{width:'9%'}} className="text-center">Beschreibung</th>
																				<th style={{width:'10%'}} className="text-center">Anzahl von Masseinheit</th>
																				<th style={{width:'9%'}} className="text-center">Masseinheit</th>
																				<th style={{width:'9%'}} className="text-center">Preisart</th>
																				<th style={{width:'9%'}} className="text-center">Barcode</th>
																				<th style={{width:'9%'}} className="text-center">Verkaufspreis</th>
																				<th style={{width:'9%'}} className="text-center">Aktiv ab</th>
																				<th style={{width:'9%'}} className="text-center">Aktiv bis</th>
														                  	</tr>
													                	</thead>
													                  	<tbody>
                                                                          {
																				productVariants.map((product:any, pk:any) =>
																					<React.Fragment key={`${pk}`}>
																							<tr>
                                                                                                <td width="9%" className="text-center">
                                                                                                	<label className="ix-checkbox-label">
                                                                                                		<input className="ix-checkbox" type="checkbox" name="productList" value={product} onChange={(event)=>this.handleInputChange(event,product)} />{/*item number*/}
                                                                                                		<mark />
                                                                                                	</label>
                                                                                                </td> 
																								<td width="9%" className="text-center">{product.number}{/*item number*/}</td> 
																								<td width="9%" className="text-center">{/*Promotion (CHF)*/}</td>
																								<td width="9%" className="text-center">{product.name_DE}{/*Designation*/}</td>
																								<td width="9%" className="text-center">{/*<button type="button" onClick={this.handleShowModal}>Anzeigen</button>*/}{/*Description*/}</td>
																								<td width="10%" className="text-center">{/*Number Of Units Of Measure*/}</td>
																								<td width="9%" className="text-center">{product.unit}{/*Unit Of Mass*/}</td>
																								<td width="9%" className="text-center">{product.priceType}{/*Price Type*/}</td>
																								<td width="9%" className="text-center">{/*Barcodec*/}</td>
																								<td width="9%" className="text-center">{priceFormat(product.price1)}{/*Selling Price*/}</td>
																								<td width="9%" className="text-center">{format(new Date(parseISO(product.activeFrom)), 'dd.MM.yyyy')}{/*Active From*/}</td>
																								<td width="9%" className="text-center">{format(new Date(parseISO(product.activeUntil)), 'dd.MM.yyyy')}{/*Active Until*/}</td>
																							</tr>
																					</React.Fragment>
																				)
																			}
													                  	</tbody>
													                </table>
												              	</li>
												            </ul>
												        </div>
													</div>
													
												</div>
											</div>
										</div>
									<div className="ticketcolum_right_fxd_btns p20 text-right">
										<button className="btn-theme btn-md mr-2" onClick={()=>this.ticketPositionSubmit()}>hinzufügen</button>
										<a href="javascript:void(0)" onClick={() => {
                                  		setShowProduct(!showProduct);
										}} className="btn-theme-white btn-md mr-2">Abbrechen</a>
									</div>
						    	
								<ModalPopup showModal={showModal} productDesignation={productDesignation} productDescription={productDescription} handleClose={this.handleClose} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
	
	}
}
//export default MProdukte
const mapStateToProps = (state: any) => {
	console.log('loggedin', state)
	return {
	  isAuthenticated: state.client.isLoggedIn,
	  user: state.client,
	  messages: state.messages
	}
  };
  
export default connect(
	mapStateToProps
  )(AddProduct)
