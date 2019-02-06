import React from 'react';
const shortId = require('short-id');
const _ = require("lodash");


class ProductEditor extends React.Component {

    state = {
                name: '',
                description: '',
                site: '',
                affiliate: '', 
                categories:[{id:1, name:'Accounting'}, {id:2, name:'CRM'}],
                integrations:[{id:1, name:'Box'}, {id:2, name:'Dropbox'}],
                logo: '',
                screen:'',
                screenshots: [],
            };

    updateValue(e) {
        this.setState( {screen: [e.target.value] }) 
            }
        
    addScreenshots = () => {
        console.log(this.state.screenshots)
        this.setState({
            screenshots: [...this.state.screenshots, {shot: this.state.screen, id: shortId.generate()}],
            screen: ''  
        })
              
    }        

    removeScreen = (screenshot) => {
      
        const data = this.state.screenshots.filter(i => i.id !== screenshot.id)

        this.setState({screenshots:data})
        return
        }

    render() {
        console.log(this.state.screenshots)
        return (
            <div className="productGen">
                <form>
                    <div className="form-group">
                        <label for="fullName">
                            Full Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName" 
                            placeholder="Please enter the full name of your product"
                            value={this.state.name} 
                            onChange={e => this.setState({name: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <label for="shortDesc">
                            Short Description
                        </label>
                        <textarea
                            type="text"
                            rows="4" cols="50"
                            className="form-control"
                            id="shortDesc"
                            placeholder="Please enter a short description of you product"
                            value={this.state.description} 
                            onChange={e => this.setState({description: e.target.value})}>
                        </textarea>
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
                            onChange={e => this.setState({site: e.target.value})}/>
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
                            onChange={e => this.setState({affiliate: e.target.value})}
                            />
                    </div>

                    <div className="form-group">
                        <label for="url">
                          Long Product Description
                        </label>
                      <textarea
                        rows="8" cols="50" 
                         placeholder="Please describe your product in detail:" 
                         value={this.state.longDescription} 
                         onChange={e => this.setState({longDescription: e.target.value})}>
                      </textarea>
                    </div>

                    <div className='form-group categories-box'>
                        {this.state.categories.map(category => {
                            return (
                              <div className="form-check form-check-inline">
                                  <label className="form-check-label" for="gridCheck1"></label>
                                        <input
                                            key={shortId.generate()}
                                            className="form-check-input" 
                                            id = {category.id}
                                            name={category.name}
                                            checked={'false'}
                                            type="checkbox" /> 
                                        {category.name}
                                </div>
                        );
                    })}   
                    </div>

                    <div className='form-group integrations-box'>
                    {this.state.integrations.map(integration => {
                        return (
                            <div className="form-check form-check-inline">
                        <label className="form-check-label" for="gridCheck1"></label>
                            <input
                                className="form-check-input" 
                                key={_.random(10000, 99999)}
                                id = {integration.id}
                                name={integration.name}
                                checked={'false'}
                                type="checkbox" /> {integration.name}                          
                            </div>
                                );
                            })}           
                    </div>
                    
                        <div className="text-center form-group">
                            <img src={this.state.logo} className="rounded" alt="this.state.logo"/>
                            <div>
                                <input type="text"
                                    className="form-control"
                                    id="logoURL" 
                                    placeholder="Product logo"
                                    value={this.state.logo} 
                                    onChange={e => this.setState({logo: e.target.value})} />  
                             </div>
                         </div>

                   <div className='product-screenshots'>
                            <label >
                                Product Screenshots
                            </label>
                   {this.state.screenshots.map(screenshot => {
                       return(
                            <div className="form-group">
                                    <img src={screenshot.shot}
                                        alt="Product Screenshot"
                                        className="img-thumbnail"
                                        key={_.random(10000, 99999)}
                                        />
                                    <button type="button" onClick={this.removeScreen.bind(this,screenshot)}>Remove</button>  
                                </div>
                                );
                                     }
                             ) 
                    }                           
                      </div>   
                        <div className="form-group">
                        <form  onClick={this.addScreenshots}  >
                                <input type="text" 
                                value={this.state.screen}
                                placeholder="Enter image address"
                                key={_.random(10000, 99999)}
                                onChange={e => this.setState( {screen: e.target.value} ) }
                                />
                              <input type="button"
                              value="Save"
                                />
                                </form>  
                        </div>                         
                   
                    



                   

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        );
    }
}

export default ProductEditor;