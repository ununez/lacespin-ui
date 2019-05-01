import React, { Component } from 'react';
import {Jumbotron,ListGroup,ListGroupItem, Container,Row,Col,Button,Form,Modal,Alert} from 'react-bootstrap';
import './cotizaciones.css';
import MaskedInput from 'react-text-mask';
import {Send_Info} from '../api/send_info_api';
import url_constants from '../constants/url_constants';
import {getPrice} from '../assets/Common/getPrice';
class Cotizaciones extends Component {
    constructor(props){
        super(props);
        this.form=React.createRef();
        this.total=React.createRef();
        this.state={
            items:[],
            email:'',
            name:'',
            phone:'',
            message:'',
            alertError:false,
            alertSuccess:false,
            emailLoading:false
        }
    }

    handleItemInfo=(item)=>{
        if(localStorage.getItem("ItemInfo")){
            let itemArray=JSON.parse(localStorage.getItem("ItemInfo"));
            if(item){
                let item_exists=itemArray.filter((key)=>key.itemkey===item.itemkey);
                if(item_exists.length===0){
                    itemArray.push(item);
                }
            }
            this.setState({items:itemArray},
                ()=>(
                    localStorage.setItem("ItemInfo",JSON.stringify(this.state.items))
                )
            );
        }
        else if(item){
            this.setState({items:[...this.state.items,item]},
                ()=>(
                    localStorage.setItem("ItemInfo",JSON.stringify(this.state.items))
                ) 
            )
        }

    }

    deleteItemInfo=(key)=>{
        let prevState=this.state.items.filter(item=> item.itemkey!== key.target.value);
        let substractval=this.state.items.filter(item=> item.itemkey===key.target.value)[0].Price;
        this.total.current -= -substractval;
        key.target.display='block';
        this.props.history.replace({
            pathname:'/cotizaciones',
            state:null
        });
        this.setState({items:prevState},
            ()=>(                
                localStorage.setItem("ItemInfo",JSON.stringify(this.state.items)),
                this.props.removeItem('substract')
            )
        )
    }

    send_email=()=>{
        let self=this;
        Send_Info(JSON.stringify(this.state),url_constants.send_mail_api_url)            
            .then(result=>(
                result.data.Message?self.props.history.replace({pathname:'/cotizaciones',state:null}):'',
                self.setState({alertError:!result.data.Message,
                                alertSuccess:result.data.Message,
                                items:result.data.Message?[]:this.state.items,
                                emailLoading:false
                            },
                                ()=>(
                                    result.data.Message?localStorage.setItem("ItemInfo",JSON.stringify(this.state.items)):'',
                                    result.data.Message?this.props.removeItem('all'):''
                                )
                            )
            ))            
            .catch(error=>(
                self.setState({alertError:true})
            ))
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

    handle_Get_Price=(value)=>{
        
        let res=(parseInt(value.qty) * getPrice(value.Grosor,parseInt(value.Longitud),value.Product_Name,value.Presentacion));
        value.Price=+(Math.round(res+"e+2")+"e-2");
        this.total.current+= +value.Price;
        return value.Price;
    }


    componentDidUpdate(){
        this.total.current=0;
    }
    componentDidMount(){
        if(this.props.location.state){
            let item={  
            'Product_Name':this.props.location.state.Product_Name,
            'itemkey':this.props.location.key,
            'Color1_Name':this.props.location.state.Color1_Name,
            'Color1_Val':this.props.location.state.Color1_Val,
            'Color2_Name':this.props.location.state.Color2_Name,
            'Color2_Val':this.props.location.state.Color2_Val,
            'Grosor':this.props.location.state.Grosor,
            'Longitud':this.props.location.state.Longitud,
            'Presentacion':this.props.location.state.Presentacion,
            'Punta':this.props.location.state.Punta,
            'qty':this.props.location.state.qty,
            'Price':''
            }
            this.handleItemInfo(item);
        }
        else{
            this.handleItemInfo();
        }
    }
    render() {
        const handleSuccessHide= () =>this.setState({alertSuccess:false});
        const handleErrorHide=()=>this.setState({alertError:false});
        const formatter= new Intl.NumberFormat('es-MX',{
            style:'currency',
            currency:'MXN',
            minimumFractionDigits:2
        });
        return (
           <Jumbotron id="mainDetail" >
               <h1 className="display-2">Detalle del pedido</h1>
               <Container>
                   <ListGroup>
                        {   this.state.items.length>0?
                            this.state.items.map(item=>(
                                <ListGroupItem key={item.itemkey}>
                                    <Container>
                                        <Row>
                                        <Col md={2} className="colName">
                                            <div>
                                            <h2>{item.Product_Name}</h2>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <Row style={{textAlign:'left'}}>
                                                <h4>Cantidad: {item.qty} {item.qty>1?item.Presentacion==='Par'?'Pares':'Gruesas':item.Presentacion==='Par'?'Par':'Gruesa'}</h4>                                            
                                            </Row>
                                        
                                            <Row>
                                                <h4>{item.Color2_Name!=='NA'?'Color 1':'Color'}: {item.Color1_Name}</h4>
                                            </Row>
                                            {item.Color2_Name!=='NA'?
                                            <Row>
                                                <h4>Color 2: {item.Color2_Name}</h4>
                                            </Row>
                                            :<div></div>}
                                                                             
                                        </Col>
                                        <Col md={3}>
                                            <Row>
                                                <h4>Grosor: {item.Grosor} mm</h4>
                                            </Row>
                                            <Row>
                                                <h4>Longitud: {item.Longitud} cm</h4>
                                            </Row>
                                            <Row>
                                                <h4>Punta: {item.Punta}</h4>
                                            </Row>      
                                        </Col>
                                        <Col md={2} className="colName">
                                            <h2>{formatter.format(this.handle_Get_Price.call(this,item))}</h2>
                                        </Col>
                                        <Col md={2} className="colDel">
                                            <div className="btnDeleteContainer">
                                            <span className="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span>
                                            <Button variant="outline-danger" className="btn icon-btn" value={item.itemkey} onClick={this.deleteItemInfo}>
                                                Eliminar
                                            </Button> 
                                            </div>                                           
                                        </Col>
                                        </Row>                                       
                                    </Container>
                                </ListGroupItem>
                            )):
                            <h1 className="display-4">Todavia no hay productos agregados</h1>
                        }
                   </ListGroup>
                   
                   {this.state.items.length>0?
                   <React.Fragment>                   
                   <Row id="total">
                        <div>
                            <h2>Total:{formatter.format(this.total.current)}</h2>
                        </div>
                    </Row>                    
                   <Row>                   
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
                                <Button id="btnEnviar" variant="outline-dark" className="btn icon-btn" onClick={this.handle_Send_Info} >                                    
                                        Enviar
                                 </Button>
                                 </div>
                            </Form.Row>                           
                       </Form>
                       
                   </Row>
                   </React.Fragment>
                   :<div></div>}
                   
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
           </Jumbotron>
        );
    }
}

export default Cotizaciones;