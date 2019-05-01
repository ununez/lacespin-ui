import React, { Component } from 'react';
import {Row,Col,Container,Jumbotron} from 'react-bootstrap';
import './acerca.css';
import {ReactComponent as Mision} from '../assets/img/icon_target.svg';
import {ReactComponent as Vision} from '../assets/img/vision.svg';
import {ReactComponent as Values} from '../assets/img/values.svg';
class Acerca extends Component {
    render() {
        return (
            <Container>
            <Row>
                <Jumbotron fluid className="mensaje">
                    <h2>Mensaje del director</h2>
                    <div>
                    <p className="parr_mensaje">
                    Una agujeta es ese pequeño detalle en el calzado que pocos le prestan atención, pero a todos nos importa, yo mismo he estado cansado de comprar un zapato y que su agujeta se rompa en pocas semanas, se estire, o pierda su imagen, es por ello que he decidido poner este proyecto al alcance de todos, para que cualquier persona pueda escoger una agujeta de alta calidad y totalmente personalizable la cual le de ese detalle especial a su calzado, para que puedas complementar tu estilo con el calzado que más prefieras.
                    </p>
                    </div>
                </Jumbotron>
            </Row>
            <Row>
                <Col sm={4}>
                    <Row className="parr_Icon">                        
                        <div>
                        <Mision className="Icon"/>                         
                        </div>                                         
                    </Row>
                    <Row className="parr_Title"> 
                         <h3>Misión</h3>                        
                    </Row>
                    <Row className="parr">
                        <p >
                            Obtener una distinción ante nuestros clientes por la alta calidad de los productos que les ofrecemos, satisfaciendo sus necesidades mediante una atención personalizada, a la vez que brindamos un ambiente confortable y de desarrollo para nuestro personal. 
                        </p>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row className="parr_Icon">                        
                        <div>
                        <Vision className="Icon"/>                         
                        </div>                                         
                    </Row>
                    <Row className="parr_Title"> 
                         <h3>Visión</h3>                        
                    </Row>
                    <Row className="parr">
                        <p >
                            Ser una empresa con presencia en todos los rincones del territorio nacional, accesible para todas las personas y empresas que busquen en su zapato una cinta resistente, duradera e innovadora.                        
                        </p>                        
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row className="parr_Icon">                        
                        <div>
                        <Values className="Icon"/>                         
                        </div>                                         
                    </Row>
                    <Row className="parr_Title"> 
                         <h3>Valores</h3>                        
                    </Row>
                    <Row className="parr">
                        <p >
                            Somos una empresa con la cual buscamos mantener una relación cercana con nuestros clientes, proveedores y trabajadores, promoviendo la comunicación honesta y respetuosa entre todas las partes que nos conforman, siempre cumpliendo nuestros compromisos.
                        </p>
                    </Row>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Acerca;