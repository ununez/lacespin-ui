import React ,{Component} from 'react';
import {Nav, Navbar, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './BarraNavegacion.css';
import logo from '../assets/img/LS.png'
export default class BarraNavegacion extends Component{
    render(){
        return(
           <Navbar bg="light" expand="lg" >
                <Navbar.Brand>
                    <Link to="/"><img src={logo} alt={"Lace Spin"} className="logo"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-center menu">
                    <Nav fill  defaultActiveKey="/" >
                        <Nav.Item>
                            <Nav.Link eventKey={1} as={Link} to="/catalogo"><h2>Catalogo</h2></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={2} as={Link} to="/acerca"><h2>Empresa</h2></Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey={3} as={Link} to="/contacto"><h2>Contacto</h2></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={5} as={Link} to="/preguntas"><h2>Preguntas</h2></Nav.Link>
                        </Nav.Item>
                    </Nav>                   
                </Navbar.Collapse>
                <Nav className="justify-content-end">
                    <Nav.Item>
                     <Nav.Link eventKey={4} as={Link} to="/cotizaciones">
                         <span className="glyphicon glyphicon-list-alt" data-toogle="tooltip" data-placement="top" title="Cotizaciones">
                            <Badge variant="danger" id="bgNot">
                                <div>{this.props.addItem}</div>
                            </Badge>
                         </span>                         
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
           </Navbar>
        )
    }
}