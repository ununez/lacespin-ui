import React, { Component } from 'react';
import './especificaciones.css'
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import './common.scss';
import ColorPicker from '../assets/ColorPicker/ColorPicker';


class Especificaciones extends Component {
    constructor(props){
        super(props);
        this.state={
           Color_Primario_Val:"",
           Color_Secundario_Val:"",
           Color_Primario_Name:"",
           Color_Secundario_Name:"",
           Presentacion:'',
           Grosor:'',
           Longitud:'',
           Punta:'',
           validated:false
        } 
    }
    
    handlePrimary=(Color)=>{
        this.setState({Color_Primario_Val:Color.getAttribute("value"),Color_Primario_Name:Color.getAttribute("name")});
    }
    handleSecondary=(Color)=>{
        this.setState({Color_Secundario_Val:Color.getAttribute("value"),Color_Secundario_Name:Color.getAttribute("name")});
    }

    handleClick=(control)=>{
        control.preventDefault();
        if(this.state.Color_Primario_Name){
            this.props.handleClick(control.target.elements,this.state.Color_Primario_Name,this.state.Color_Secundario_Name,this.state.Color_Primario_Val,this.state.Color_Secundario_Val);
        }
        
    }
    componentWillMount(){
        this.setState({Color_Primario_Name:!this.props.estado.Color1_Name?"Blanco":this.props.estado.Color1_Name,
                        Color_Primario_Val:!this.props.estado.Color1_Val?"#ffffff":this.props.estado.Color1_Val,
                        Color_Secundario_Name:!this.props.properties.ColorNumero>1?"":!this.props.estado.Color2_Name?"Blanco":this.props.estado.Color2_Name,
                        Color_Secundario_Val:!this.props.properties.ColorNumero>1?"":!this.props.estado.Color2_Val?"#ffffff":this.props.estado.Color2_Val})
    }

    render() {
        return (
            <Form onSubmit={this.handleClick}>
           <Container>
               <Row>
                   <Col className="title"><h1>Color</h1></Col>                                     
               </Row>
               <Row>
                   <Col >
                        <Form.Row className="btn-group">
                        
                        {this.props.properties.ColorNumero>1
                        ?<Row>
                        <Col>
                            <ColorPicker  key="ColorPrimario" color_selected_val={this.state.Color_Primario_Val} color_selected_name={this.state.Color_Primario_Name}  colors={this.props.estado.color_items} onChange={this.handlePrimary}/>
                        </Col>
                        <Col>
                        <ColorPicker  key="ColorSecundario" color_selected_val={this.state.Color_Secundario_Val} color_selected_name={this.state.Color_Secundario_Name}  colors={this.props.estado.color_items} onChange={this.handleSecondary}/>
                        </Col>
                        </Row>
                        :
                        <Col>
                        <ColorPicker  key="ColorPrimario" color_selected_val={this.state.Color_Primario_Val} color_selected_name={this.state.Color_Primario_Name}  colors={this.props.estado.color_items.filter(item=>item.clasificacion!=='metal')} onChange={this.handlePrimary}/>
                        </Col>
                        }
                       
                        </Form.Row>
                        <Form.Row className="control-row">
                            <Col>
                                <Form.Label>Presentación:</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control name="Pres" as="select" className="option">
                                    {this.props.properties.Presentacion.map(item=>(
                                         <option key={item} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Col>                           
                        </Form.Row>
                        <Form.Row className="control-row">
                            <Col>
                                <Form.Label>Grosor (mm):</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control name="Grosor" as="select" className="option">
                                    {this.props.properties.Grosor.map(item=>(
                                         <option key={item} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Col>                           
                        </Form.Row>
                        <Form.Row className="control-row">
                            <Col>
                                <Form.Label>Longitud (cm):</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control name="long" as="select" className="option">
                                    {this.props.estado.longitudes.map(item=>(
                                         <option key={item} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Col>                           
                        </Form.Row>
                        <Form.Row className="control-row">
                            <Col>
                                <Form.Label>Punta:</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control name="punta" as="select" className="option">
                                    {this.props.estado.puntas.map(item=>(
                                         <option key={item} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Col>                           
                        </Form.Row>
                        <Form.Row>
                            <Button id="btnConfirm" variant="outline-success" type="submit" >Confirmar</Button>
                        </Form.Row>                    
                   </Col>
                   
               </Row>
           </Container>
           </Form>
        );
    }

    
}

export default Especificaciones;