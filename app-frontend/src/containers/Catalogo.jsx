import React, { Component } from 'react';
import {Container,Row,Col,Modal} from 'react-bootstrap';
import {getResponse} from '../api/cat_api';
import urlConstants from '../constants/url_constants';
import ProductCard from '../assets/ProductCard/ProductCard';
class Catalogo extends Component {
    constructor(props){
        super(props);
        this.state={
            Productos:[],
            Selected:null,
            isLoading:true,
            errors:null,
        }
    }
    componentDidMount(){
        let self=this;
        getResponse(urlConstants.prod_api_url)
        .then(result => self.setState({
            Productos:result.data.Productos.map(item=>({
                'nombre':item.nombre,
                'Presentacion':item.Presentacion,
                'ColorNumero':item.ColorNumero,
                'ColorDisponible':item.ColorDisponible,
                'Grosor':item.Grosor,
                'Imagen':item.Imagen
            })),
            isLoading:false,
        })) 
        .catch(error=>{
            this.setState({errors:error,isLoading:false})
        })
        
    }
    render() {
        
        return (
           <Container>
               {!this.state.isLoading?
               <Row>
                   <Col md={2} className="MenuLateral">
                    <h1>Catalogo</h1>
                   </Col>
                   <Col md={10}>
                        <Row>
                            {this.state.Productos.map(item =>                        
                                <Col  key={item.nombre}>
                                    <ProductCard item={item}/>
                                </Col>
                            )}
                        </Row>
                   </Col>                   
               </Row>
              :
                <Modal>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-danger" id="loading" role="status">
                            <span class="sr-only">Cargando...</span>
                        </div>
                    </div>
                </Modal>
              }
           </Container>
        );
    }
}

export default Catalogo;