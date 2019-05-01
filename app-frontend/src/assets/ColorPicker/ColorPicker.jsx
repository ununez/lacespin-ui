import React, { Component } from 'react';
import { Container, Row, Card, Collapse } from 'react-bootstrap';
import reactCSS from 'reactcss';
import './ColorPicker.css';

class ColorPicker extends Component{
    constructor(props) {
        super(props);
        this.state={
            displayColorPicker:false,
            Color:'',
            Color_Name:'',
            open_basico:false,
            open_neon:false,
            open_metal:false
        }
      }
    
    
    handleClick= () =>{
        this.setState({displayColorPicker:!this.state.displayColorPicker})
    };
    
    handleClose=()=>{
        this.setState({displayColorPicker:false})
    };

    handleChange=(Color)=>{
        this.setState({Color: Color.target.getAttribute("value"),Color_Name:Color.target.getAttribute("title")});
        this.props.onChange(Color.target);
    };

    componentWillMount(){
        this.setState({Color:this.props.color_selected_val,Color_Name:this.props.color_selected_name})
    }
    
    
    render(){     

        let col_basico=this.props.colors.filter(color=>{
            return color.clasificacion==="basico";
        });
        let col_neon=this.props.colors.filter(color=>{
            return color.clasificacion==="neon";
        });

        let col_metal=this.props.colors.filter(color=>{
            return color.clasificacion==="metal";  
        });
        const styles=reactCSS({
            'default':{
                color:{
                    width:'40px',
                    height:'40px',
                    borderRadius:'50%',
                    background:this.state.Color,
                },
                swatch:{
                    padding:'5px',
                    background:'#fff',
                    borderRadius:'50%',
                    display:'inline-block',
                    cursor:'pointer',
                    boxShadow:'0 0 0 1px rgba(0,0,0,.1)'
                },
                popover:{
                    position:'absolute',
                    zIndex:'2',
                    padding:'70px 0px 9px 0px'
                },
                cover:{
                    position:'fixed',
                    top:'10px',
                    right:'0px',
                    bottom:'0px',
                    left:'0px'
                }
            }
        });
        const {open_bas}=this.state.open_basico;
        const {open_ne}=this.state.open_neon;
        const {open_met}=this.state.open_metal;
        return(
            <div className="grouped">
                                <div className="hole" style={styles.swatch} onClick={this.handleClick}>
                                    <div title={this.state.Color_Name} style={styles.color}/>
                                </div>
                                {this.state.displayColorPicker?
                                    <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose}/>
                                        
                                        <Container >
                                            <Row className="btn-group" >
                                            <div id="accordion" role="tablist" aria-multiselectable="true">
                                                <Card>
                                                    <Card.Header as="h3" onClick={()=> this.setState({open_basico:!open_bas})}
                                                    aria-controls="CollapseBasicos" aria-expanded={open_bas}>
                                                        Colores Basicos
                                                    </Card.Header>
                                                    <Collapse in={this.state.open_basico}>
                                                    <div id="CollapseBasicos" className="circle-Picker collapse show" role="tabpanel" aria-labelledby="headingOne">                                                    
                                                    
                                                        {col_basico.map(item=>
                                                                <div className="" key={item.codigo}>
                                                                    <div className="circle" name={item.nombre} title={item.nombre} data-toggle="tooltip" data-placement="top" style={{backgroundColor:item.codigo}} 
                                                                        onClick = {this.handleChange} value={item.codigo}>                                           
                                                                    </div>                    
                                                                </div>
                                                            
                                                        )}
                                                        
                                                    </div>
                                                    </Collapse>
                                                    {col_neon.length>0?
                                                    <React.Fragment>
                                                    <Card.Header as="h3" onClick={()=> this.setState({open_neon:!open_ne})}
                                                    aria-controls="CollapseNeon" aria-expanded={open_ne}>
                                                        Colores Neon
                                                    </Card.Header>
                                                    <Collapse in={this.state.open_neon}>
                                                    <div id="CollapseNeon" className="circle-Picker collapse show" role="tabpanel" aria-labelledby="headingOne">                                                    
                                                    {col_neon.map(item=>
                                                                <div className="" key={item.codigo}>
                                                                    <div className="circle" name={item.nombre} title={item.nombre} style={{backgroundColor:item.codigo}} 
                                                                        onClick = {this.handleChange} value={item.codigo}>                                           
                                                                    </div>                    
                                                                </div>
                                                            
                                                        )}
                                                    </div>
                                                    </Collapse>
                                                    </React.Fragment>
                                                    :<div></div>}
                                                    {col_metal.length>0?
                                                    <React.Fragment>
                                                    <Card.Header as="h3" onClick={()=> this.setState({open_metal:!open_met})}
                                                    aria-controls="CollapseMetal" aria-expanded={open_met}>
                                                        Colores Metalicos
                                                    </Card.Header>
                                                    <Collapse in={this.state.open_metal}>
                                                    <div id="CollapseMetal" className="circle-Picker collapse show" role="tabpanel" aria-labelledby="headingOne">                                                    
                                                        {col_metal.map(item=>
                                                                <div className="" key={item.codigo}>
                                                                    <div className="circle" name={item.nombre} title={item.nombre} style={{backgroundColor:item.codigo}} 
                                                                        onClick = {this.handleChange} value={item.codigo}>                                           
                                                                    </div>                    
                                                                </div>                                                            
                                                        )}   
                                                    </div>
                                                    </Collapse>
                                                    </React.Fragment>
                                                    :
                                                        <div></div>
                                                    }
                                                </Card>
                                            </div>
                                            </Row>
                                        </Container>
                                    </div>:null
                                }
                            </div>
            
        )
    }
}






export default ColorPicker;