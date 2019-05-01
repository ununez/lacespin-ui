import React, { Component } from 'react';
import {Container,Row,Col,Button,Form,Alert,Modal} from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import {Send_Info} from '../api/send_info_api';
import url_constants from '../constants/url_constants';
class Contacto extends Component {
    constructor(props){
        super(props);
        this.form=React.createRef();
        this.state={
            email:'',
            name:'',
            phone:'',
            message:'',
            emailLoading:false,
            alertError:false,
            alertSuccess:false,
        }
    }

    handle_Send_Info=()=>{
        if(this.form.current.reportValidity()){
            this.setState({
                name:this.form.current.NameGroup.value,
                email:this.form.current.EmailGroup.value,
                phone:this.form.current.Tel.value,
                message:this.form.current.MessageGroup.value,
                emailLoading:true
            },
            ()=>(this.send_email()
            ));
        }
    }

    send_email=()=>{
        let self=this;
        Send_Info(JSON.stringify(this.state),url_constants.send_contact_mail_api_url)            
            .then(result=>(
                                self.setState({alertError:!result.data.Message,
                                alertSuccess:result.data.Message,
                                emailLoading:false
                            })
            ))            
            .catch(error=>(
                self.setState({alertError:true})
            ))
    }

    render() {
        const handleSuccessHide= () =>this.setState({alertSuccess:false});
        const handleErrorHide=()=>this.setState({alertError:false});
        return (
            <Container>
            <Form id="cotForm" ref={this.form}>
            <Form.Group as={Row} className="cotRow" controlId="EmailGroup">
                <Form.Label column md={4}>
                    Email:
                </Form.Label>
                <Col md={8} className="cotCol">
                    <Form.Control required pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"className="cotInput" type="email" placeholder="usuario@dominio.com (requerido)"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}  className="cotRow" controlId="NameGroup">
                <Form.Label column md={4}>
                    Nombre:
                </Form.Label>
                <Col className="cotCol" md={8}>
                    <Form.Control required type="text" className="cotInput" placeholder="Nombre completo (requerido)"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="cotRow" controlId="TelGroup">
                <Form.Label column md={4}>
                    Telefono:
                </Form.Label>
                <Col className="cotCol" md={8}>
                    <MaskedInput id="Tel"
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        className="form-control cotInput" type="text" placeholder="Telefono (opcional)"
                        guide={false}
                        />
                </Col>
            </Form.Group>
            <Form.Group className="cotRow" as={Row} controlId="MessageGroup">
                <Form.Label column md={4}>
                    Mensaje:
                </Form.Label>
                <Col className="cotCol" md={8}>
                    <Form.Control className="cot_Mensaje" as="textarea" rows="4" placeholder="Mensaje (opcional)"/>
                </Col>
            </Form.Group>
            <Form.Row>
                <div>                    
                    <span className="glyphicon btn-glyphicon glyphicon-envelope img-circle text-dark"></span>                
                    <Button id="btnEnviar" variant="outline-dark" className="btn icon-btn" onClick={this.handle_Send_Info}>
                        Enviar
                    </Button>
                 </div>
            </Form.Row>
       </Form>
       <Row>
            <Alert show={this.state.alertSuccess} className="Alert" onClose={handleSuccessHide} variant="success">
                <Alert.Heading>Correo Enviado!</Alert.Heading>
                    <p>
                        Muchas gracias por contactarnos!, estaremos poniendonos en contacto lo mas pronto posible.
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button id="btnCerrarSuccess" onClick={handleSuccessHide} variant="outline-success">
                            ¡Entendido!
                        </Button>
                    </div>
            </Alert>
            <Alert show={this.state.alertError} className="Alerta" onClose={handleErrorHide} variant="danger">
                <Alert.Heading>Oops!</Alert.Heading>
                    <p>
                        Existe un error al momento de enviar la solicitud, te pedimos una disculpa, por favor intenta mas tarde.
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button id="btnCerrarError" onClick={handleErrorHide} variant="outline-danger">
                            Aceptar
                        </Button>
                    </div>
            </Alert>
        </Row>
        <Row>
            <Modal backdrop="static" show={this.state.emailLoading} dialogClassName="modal-30w" >
                <Modal.Header>
                    <Modal.Title id="sel_car">Enviando...</Modal.Title>
                </Modal.Header>
                <Modal.Body>                       
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-danger" id="loading" role="status">                                                                   
                        </div>                                
                    </div>
                </Modal.Body>                        
            </Modal>
        </Row>  
       </Container>
        );
    }
}

export default Contacto;