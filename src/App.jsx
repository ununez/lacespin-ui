import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import BarraNavegacion from './containers/BarraNavegacion';
import Footer from './containers/footer';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      addItem:0
    }
  }

  handleAddItem=(response)=>{
      this.setState(
        {addItem:response==='plus'?this.state.addItem+1:response==='substract'?this.state.addItem-1:0},
          ()=>(
              localStorage.setItem("ItemNum",JSON.stringify(this.state.addItem))
            )
          );   
  }

  componentDidMount(){
    if(localStorage.getItem("ItemNum")){
      this.setState({addItem:JSON.parse(localStorage.getItem("ItemNum"))});
    }
  }
  componentWillUnmount(){
    localStorage.clear();
  }

  render() {
    return (
      <div className="App" >   
          <div className="wrapper">
            <div  className="header">
              <BarraNavegacion addItem={this.state.addItem}/>
            </div>  
            <div className="content">      
              <Routes handleaddItem={this.handleAddItem}/>
              </div>        
            <div  className="footer" > 
              <Footer/>
            </div>
          </div>
      </div> 
    );
  }
}

export default App;
