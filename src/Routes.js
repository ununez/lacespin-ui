import React,{Component} from 'react';
import {Route,Switch} from "react-router-dom";
import Home from './containers/home';
import Catalogo from './containers/Catalogo';
import Acerca from './containers/acerca';
import Cotizaciones from './containers/cotizaciones';
import Contacto from './containers/contacto';
import Preguntas from './containers/Preguntas';
import ProductoDetalle from './containers/ProductoDetalle';
class Routes extends Component{
   
    handleAddItem=(val)=>{
        this.props.handleaddItem(val);
    }
    
render(){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/catalogo" component={Catalogo}/>
            <Route path="/acerca"   component={Acerca}/>
            <Route path="/contacto" component={Contacto}/>
            <Route path="/preguntas" component={Preguntas}/>
            <Route path="/cotizaciones" render={props=> <Cotizaciones removeItem={this.handleAddItem} {...props}/>}/>
            <Route path="/detalle"  render={props=> <ProductoDetalle addItem={this.handleAddItem}  {...props}/>}/>
        </Switch>
        )
    }
}
export default Routes;