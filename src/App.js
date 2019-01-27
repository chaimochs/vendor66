import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from './Components/header'
import Footer from './Components/footer'
import ProductEditor from './Components/productEditor'

class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="App">
       <Header />
       <BrowserRouter>
          <Switch>
            <Route
              exact path= "/"
              component={ProductEditor}
            />
          </Switch>
       </BrowserRouter>
       <Footer />
      </div>
    );
  }
}

export default App;
