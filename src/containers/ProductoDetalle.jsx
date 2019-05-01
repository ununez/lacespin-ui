import React, { Component } from 'react';
import {Container,Col,Row,Modal,Button} from 'react-bootstrap';
import './ProductoDetalle.css';
import OwlCarousel from 'react-owl-carousel2';
import Especificaciones from './especificaciones';
import {getResponse} from '../api/cat_api';
import urlConstants from '../constants/url_constants';
const options={
    items:1,
    loop:true,
    mergeFit:true,
    autoplay:true 
};
class ProductoDetalle extends Component {
    constructor(props){
        super(props);
        this.state={
            Product_Name:this.props.location.state.nombre,
            mostrar_Modal:false,
            color_items:[],
            longitudes:[],
            puntas:[],
            Color1_Name:'',
            Color2_Name:'',
            Color1_Val:'',
            Color2_Val:'',
            qty:1,
            Presentacion:'',
            Grosor:'',
            Longitud:'',
            Punta:'',
            isLoading:true,
            errors: null
        }
    }
    MostrarModal=()=>{
        this.setState({mostrar_Modal:true});
        if(this.props.location.state.ColorDisponible==='all'){
        localStorage.setItem('color_items',JSON.stringify(this.state.color_items));
        }
        localStorage.setItem('longitudes',JSON.stringify(this.state.longitudes));
        localStorage.setItem('puntas',JSON.stringify(this.state.puntas));
    }

    CerrarModal=(elements,CPrimario,CSecundario,CPrimarioV,CSecundarioV)=>{        
       if(elements){ 
           this.setState({Presentacion:elements.Pres.value,
                        Grosor:elements.Grosor.value,
                        Longitud:elements.long.value,
                        Punta:elements.punta.value,
                        Color1_Name:CPrimario,
                        Color2_Name:this.props.location.state.ColorNumero>1?CSecundario:'NA',
                        Color1_Val:CPrimarioV,
                        Color2_Val:this.props.location.state.ColorNumero>1?CSecundarioV:'NA',
                        mostrar_Modal:false});
                    }
        else{
            this.setState({mostrar_Modal:false});
            };
    }

    handleAdd=()=>{
        this.props.addItem('plus');
        this.handlePush();
    }
    handleInput=(e)=>{
        this.setState({qty:e.target.value});
    }
    handlePush=()=>{
        this.props.history.push('/cotizaciones',this.state);
    }
    componentDidMount(){
        let self=this;
        if(this.props.location.state.ColorDisponible==='all'){
            if(!localStorage.getItem('color_items')){
                getResponse(urlConstants.col_api_url)
                    .then(result=> self.setState({
                        color_items:result.data.Colores.map(item=>({                    
                            'nombre':item.nombre,
                            'codigo':item.codigo,
                            'clasificacion':item.clasificacion,
                            'disponibilidad':item.disponibilidad
                        })),
                        isLoading:false}),
                        )         
                    .catch(error=>{
                        this.setState({errors:error,isLoading:false})
                    }) ;
                }
                else{
                    this.setState({color_items:JSON.parse(localStorage.getItem('color_items'))});
                }
        }
        else{
            let bwarray=[{nombre:"Negro",codigo:"#000000"},{nombre:"Blanco",codigo:"#ffffff"}];
            this.setState({
                color_items:bwarray.map(item=>({
                    'nombre':item.nombre,
                    'codigo':item.codigo,
                    'clasificacion':'basico',
                    'disponibilidad':true
                })),
                isLoading:false
            })
        }
        
        if(!localStorage.getItem('longitudes')){
            getResponse(urlConstants.long_api_url)
            .then(result=>self.setState({
                longitudes:result.data.Longitudes[0].valores,
                isLoading:false
            }))
            .catch(error=>{
                this.setState({errors:error,isLoading:false})
            })
        }
        else{            
            this.setState({longitudes:JSON.parse(localStorage.getItem('longitudes'))});
        }
        if(!localStorage.getItem('puntas')){
            getResponse(urlConstants.puntas_api_url)
            .then(result=>self.setState({
                puntas:result.data.Puntas[0].valores,
                isLoading:false
            }))
            .catch(error=>{
                this.setState({errors:error,isLoading:false})
            })            
        }
        else{
            this.setState({puntas:JSON.parse(localStorage.getItem('puntas'))});
        }
        
    }
   
    render() {        
        return (
            <Container >
                <Row>
                <Col md={6}  >
                <Row >
                   <OwlCarousel ref="gallery2" options={options}>
                        {this.props.location.state.Imagen.length>0?
                        this.props.location.state.Imagen.map(image =>(
                        <div className="item" key={image} >
                            <img src={require("../assets/img"+image)} alt={image}/>
                        </div>
                        )):
                        <div className="item" >
                            <img src={require("../assets/img/sample1.jpg")} alt="sample1"/>                            
                        </div>
                        }
                   </OwlCarousel>
                </Row>
                <Row id="nota">
                    <p>*Las imagenes son con propósitos de una aproximación al color y calidad que pretendemos, más sin embargo el tono puede variar.</p>
                </Row>
                </Col>
                <Col >
                <Row id="nombreProducto">
                    <h1>{this.props.location.state.nombre}</h1>
                </Row>
                <Row className="itemdesc">
                    <Col >
                        <label className="itemKey" >Cantidad:</label>
                    </Col>
                    <Col>
                        <input className="form-control" id="cantidad" name="cantidad"  ref="cantidad" type="number" defaultValue="1" min="1" max="100" onInput={this.handleInput}/>
                    </Col>
                </Row>
                <Row className="itemdesc">
                    <Col >
                        <label className="itemKey" >Presentación:</label>
                    </Col>
                    <Col>
                        {this.state.Presentacion}
                    </Col>
                </Row>
                <Row className="itemdesc">
                    <Col>                        
                        <label className="itemKey">{this.props.location.state.ColorNumero>1?'Color 1':'Color'}:</label>
                    </Col>
                    <Col>
                        <label>
                        {this.state.Color1_Name} 
                        </label>
                    </Col>
                </Row>
                {
                    this.props.location.state.ColorNumero>1?
                    <Row className="itemdesc">
                        <Col>                        
                            <label className="itemKey">Color 2:</label>
                        </Col>
                        <Col>
                            <label>
                            {this.state.Color2_Name} 
                            </label>
                        </Col>
                    </Row>
                    :''
                }
                <Row className="itemdesc">
                    <Col>
                        <label className="itemKey">Grosor (mm):</label>
                    </Col>
                    <Col>
                        {this.state.Grosor}
                    </Col>
                </Row>
                <Row className="itemdesc">
                    <Col>
                        <label className="itemKey">Longitud (cm):</label>
                    </Col>
                    <Col>
                        {this.state.Longitud}
                    </Col>
                </Row>
                <Row className="itemdesc">
                    <Col>
                        <label className="itemKey">Punta:</label>
                    </Col>
                    <Col>
                        {this.state.Punta}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button id="btnConfig" variant="outline-primary" onClick={this.MostrarModal}>Configurar</Button>
                    </Col>
                    <Col>
                        <Button id="btnAdd" onClick={this.handleAdd} variant="outline-danger" disabled={!this.state.Color1_Name}>Agregar a Cotización</Button>
                    </Col>
                </Row>
                </Col>
                </Row>
                
                <Row>                    
                    <Modal backdrop="static" show={this.state.mostrar_Modal} onHide={this.CerrarModal} dialogClassName="modal-90w"
                            aria-labelledby="sel_car">
                        <Modal.Header closeButton>
                            <Modal.Title id="sel_car">Selecciona las caracteristicas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Especificaciones   properties={this.props.location.state}
                                                estado={this.state}
                                                handleClick={this.CerrarModal}/>
                        </Modal.Body>
                    </Modal>

                </Row>
            </Container>
        );
    }
}

export default ProductoDetalle;