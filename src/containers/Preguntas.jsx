import React, { Component } from 'react';
import Accordion from '../assets/Accordion/Accordion';
import '../assets/Accordion/Accordion.scss';
class Preguntas extends Component {
    constructor(props){
        super(props);
        this.state={
            block1:true,
            block2:false,
            block3:false,
            block4:false
        };
    }

    toggle =(index)=> ()=>{
        this.setState({['block'+index]:!this.state['block'+index]});
    };
    render() {
        return (
            <div className="preg_container">
                <dl className="accordion">
                    <Accordion onClick={this.toggle(1)} expand={this.state['block1']} 
                        title={'¿Cómo se realiza un pedido?'}
                        content={<p>Al escoger tus productos y llevarlos al carrito, nos llegará la información de tu pedido, a la brevedad posible nos comunicaremos con usted para dar continuidad del pedido y hacerle llegar las formas de pago.<br/><br/> Durante todo el proceso de compra se le estará enviando información continuamente acerca de su pedido, desde cuando se encuentra en producción hasta cuando lo estamos llevando a paquetería para su envío. </p>}
                    />
                    <Accordion onClick={this.toggle(2)} expand={this.state['block2']}
                        title={'¿Cuál es el tiempo de entrega de mi pedido?'}
                        content={<p>Dependiendo del tamaño de su pedido y la presentación que escoja.<br/><br/>
                        Si su pedido es por par y lo solicita antes de las 2 PM (Hora del centro de México), puede ser enviado el mismo dia, en el caso de que usted sea usuario de Mercado Libre, se puede comunicar por nuestra plataforma y abriremos una publicación personalizada para que pueda realizar por ese medio su compra.<br/><br/>
                        En el caso de comprar por gruesa (Paquete de 72 pares), nos comprometemos a enviar su pedido en un margen de 3 a 8 días hábiles según la cantidad que nos está solicitando; Durante este periodo le estaremos enviando información de su producto durante el proceso de producción.</p>}
                    />
                    <Accordion onClick={this.toggle(3)} expand={this.state['block3']}
                        title={'¿A qué se debe el tiempo de espera para poder enviar mi pedido?'}
                        content={<p>En Lace Spin nos gusta satisfacer las necesidades de nuestros clientes cumpliendo todas las características que nos solicitan, es por ello que todos nuestros productos son fabricados al momento únicamente bajo pedido.</p>}
                    />
                    <Accordion onClick={this.toggle(4)} expand={this.state['block4']}
                        title={'¿Cuál es el costo tiene el envío?'}
                        content={<p>Damos envío gratuito a partir de la compra de 15 gruesas, en cantidades menores el precio de envío se adjuntará a tu cotización inicial.<br/><br/>                        
                        En el caso de que estés realizando compra por par de agujeta, se realizará la publicación por Mercado Libre y el costo dependera de tu nivel de usuario.</p>}
                    />
                </dl>
            </div>
        );
    }
}

export default Preguntas;