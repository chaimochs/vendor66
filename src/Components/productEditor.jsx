import React from 'react';
import Select from 'react-select';
import {decorate, observable} from "mobx"
import {observer} from "mobx-react"
import { push_uniq } from 'terser';
import axios from 'axios';

const shortId = require('short-id');
const _ = require("lodash");
let formdata = {}

class ProductEditor extends React.Component {

    state = {
        name: '',
        description: '',
        site: '',
        affiliate: '',
        longDescription: '',
        category: [],
        integration: [],
        payment: [],
        logo: '',
        screen: '',
        screenshots: [],

        categories: [
            {
                id: 1,
                label: 'Accounting',
                value: 'Accounting'
            }, {
                id: 2,
                label: 'CRM',
                value: 'CRM'
            }
        ],
        integrations: [
            {
                value: 'Box',
                label: 'Box',
                
            }, {
                id: 2,
                label: 'Dropbox',
                value: 'Dropbox'
            }
        ],
        paymentOptions: [
            {
                value: 'Visa',
                label: 'Visa'
            }, {
                value: 'MasterCard',
                label: 'MasterCard'
            }, {
                value: 'Diners Club',
                label: 'Diners Club'
            }, {
                value: 'PayPal',
                label: 'PayPal'
            }
        ]
    };

    setName             = e => this.setState({name: e.target.value})
    setDescription      = e => this.setState({description: e.target.value})
    setSite             = e => this.setState({site: e.target.value})
    setAffiliate        = e => this.setState({affiliate: e.target.value})
    setLongDescription  = e => this.setState({longDescription: e.target.value})

    setCategory         = category      => this.setState({category: category})
    setIntegration      = integration   => this.setState({integration: integration})
    setPayment          = payment       => this.setState({payment: payment})

    updateValue(e) {
        this.setState({
            screen: [e.target.value]
        })
    }

    updateContent = (value) => {
        this.setState({longDescription: value})
    }

    addScreenshots = () => {
        console.log(this.state.screenshots)
        this.setState({
            screenshots: [
                ...this.state.screenshots, {
                    shot: this.state.screen,
                    id: shortId.generate()
                }
            ],
            screen: ''
        })
    }

    removeScreen = (screenshot) => {
        const data = this
            .state
            .screenshots
            .filter(i => i.id !== screenshot.id)
        this.setState({screenshots: data})
        return
    }

        handleSubmit = e => {
            e.preventDefault()
            console.log(this.state)
            console.log(JSON.stringify(this.state));
            const obj = {
                name: this.state.name,
                description: this.state.description,
                site: this.state.site,
                affiliate: this.state.affiliate,
                longDescription: this.state.longDescription,
                category: this.state.category,
                integration: this.state.integration,
                logo: this.state.logo,
                screenshots: this.state.screenshots,
                payment: this.state.payment
                // payment: this.state.payment.map(p => p.value)
              };
              console.group(obj)
              axios.post('http://localhost:4000/formInfo/add', obj)
                  .then(res => console.log(res.data))
                  .catch(error => {
                    console.log(error.response)
                });
              
              this.setState({
                name: '',
                description: '',
                site: '',
                affiliate: '',
                longDescription: '',
                category: [],
                integration: [],
                logo: '',
                screenshots: [],
                payment: []
              })
        }
      
    render() {
        const {payment}     = this.state;
        const {category}    = this.state;
        const {integration} = this.state;


        return (
            <div className="productGen">
                <form onSubmit={this.handleSubmit.bind(this)}>

                     <div className="form-group">
                        <label >
                            Full Product Name
                        </label>
                        <input
                            htmlFor='fullName'
                            type="text"
                            className="form-control"
                            name='fullName'
                            id="fullName"
                            placeholder="Please enter the full name of your product"
                            value={this.state.name}
                            onChange={this.setName}
                            />
                  </div> 

                    <div className="form-group">
                        <label for="shortDesc">
                            Short Description
                        </label>
                        <textarea
                            type="text"
                            rows="4"
                            cols="50"
                            className="form-control"
                            id="shortDesc"
                            placeholder="Please enter a short description of you product"
                            value={this.state.description}
                            onChange={this.setDescription}></textarea>
                    </div>

                    <div className="form-group">
                        <label for="site">
                            Product Site
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="site"
                            placeholder="Enter your product's website URL"
                            value={this.state.site}
                            onChange={this.setSite}/>
                    </div>

                    <div className="form-group">
                        <label for="url">
                            Product Affiliate URL
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            value={this.state.affiliate}
                            onChange={this.setAffiliate}/>
                    </div>

                    <div className="form-group">
                        <label for="url">
                            Long Product Description
                        </label>
                        <textarea
                            rows="8"
                            cols="50"
                            placeholder="Please describe your product in detail:"
                            value={this.state.longDescription}
                            onChange={this.setLongDescription}></textarea>
                    </div>

                    <div className="form-group">
                     <h4>Categories</h4>
                     <Select 
                         className="payments-select payments-list"
                         value={category}
                         onChange={this.setCategory}
                         options={this.state.categories}
                         placeholder="Please select category"
                         isMulti
                         />
                    </div>

                    {/* <div className='form-group categories-box'>
                        {this
                            .state
                            .categories
                            .map(category => {
                                return (
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label" for="gridCheck1"></label>
                                        <input
                                            key={shortId.generate()}
                                            className="form-check-input"
                                            id={category.id}
                                            name={category.name}
                                            // checked={'false'}
                                            onClick={this.setCategory.bind(this, category)}
                                            type="checkbox"/> {category.name}
                                    </div>
                                );
                            })}
                    </div> */}

                    <div className="form-group">
                     <h4>Integrations</h4>
                     <Select 
                         className="payments-select payments-list"
                         value={integration}
                         onChange={this.setIntegration}
                         options={this.state.integrations}
                         placeholder="Please select an integration"
                         isMulti
                         />
                    </div>

                    {/* <div className='form-group integrations-box'>
                        {this
                            .state
                            .integrations
                            .map(integration => {
                                return (
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label" for="gridCheck1"></label>
                                        <input
                                            className="form-check-input"
                                            key={_.random(10000, 99999)}
                                            id={integration.id}
                                            name={integration.name}
                                            checked={'false'}
                                            type="checkbox"/> {integration.name}
                                    </div>
                                );
                            })}
                    </div> */}

                    <div className="text-center form-group">
                        <img src={this.state.logo} className="rounded" alt="this.state.logo"/>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                id="logoURL"
                                placeholder="Product logo"
                                value={this.state.logo}
                                onChange={e => this.setState({logo: e.target.value})}/>
                        </div>
                    </div>

                    <div className='product-screenshots'>
                        <label >
                            Product Screenshots
                        </label>
                        {this
                            .state
                            .screenshots
                            .map(screenshot => {
                                return (
                                    <div className="form-group">
                                        <img
                                            src={screenshot.shot}
                                            alt="Product Screenshot"
                                            className="img-thumbnail"
                                            key={_.random(10000, 99999)}/>
                                        <button
                                            type="button"
                                            onClick={this
                                            .removeScreen
                                            .bind(this, screenshot)}>Remove</button>
                                    </div>
                                );
                            })
}
                    </div>

                    <div className="form-group">
                        <form onClick={this.addScreenshots}>
                            <input
                                type="text"
                                value={this.state.screen}
                                placeholder="Enter image address"
                                key={_.random(10000, 99999)}
                                onChange={e => this.setState({screen: e.target.value})}/>
                            <input type="button" value="Save"/>
                        </form>

                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    </div>

                    <div className="form-group">
                            <h4>Payment Methods</h4>
                            <Select 
                                className="payments-select payments-list"
                                value={payment}
                                onChange={this.setPayment}
                                options={this.state.paymentOptions}
                                placeholder="Please select payment method"
                                isMulti
                                />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm  payments-select"
                                style={{
                                'display': 'inline-block',
                                'margin-left': 10
                            }}>
                                Add
                            </button>
                        </div>
                
                <button>Submit Form</button>
                </form>
            </div>
        );
    }
}
export default ProductEditor