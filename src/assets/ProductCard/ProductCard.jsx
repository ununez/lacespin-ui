import React, { Component } from 'react';
import './ProductCard.css';
import {Link} from 'react-router-dom';
class ProductCard extends Component {
    render() {
        const image=this.props.item.Imagen.length>0?this.props.item.Imagen[0]:"/sample1.jpg";
        return (
            <div key={this.props.item.nombre} className="box1">
                <img src={require('../img'+image)} alt={this.props.item.nombre} />
                <h3 className="title">{this.props.item.nombre}</h3>
                <ul className="icon">
                    <Link to={{pathname:"/detalle",state:this.props.item}} >Ver Detalle</Link>
                </ul>
            </div>
        );
    }
}

export default ProductCard;