import React, { Component } from 'react';
import './Gradient.css';
import reactCSS from 'reactcss';
import preview from '../img/preview.png';

class Gradient extends Component {
    constructor(props){
        super(props);
        this.state={
            color_primario:"#ffffff",
            color_secundario:"#ffffff",
            Position:"vertical"
        }
    }

    handleClick =(Position)=>{
        this.setState({Position:Position.target.getAttribute("value")});
    }

    render() {
        const styles=reactCSS({
            'default':{
                vert_grad:{
                    background:'linear-gradient(90deg, '+this.props.color_primario +' 33.33% ,'+
                                                  this.props.color_secundario+' 33.33% 66.67%,'+
                                                  this.props.color_primario+' 66.67%)'
                },
                horz_grad:{
                    background:'linear-gradient('+this.props.color_primario +' 33.33% ,'+
                                                this.props.color_secundario+' 33.33% 66.67%,'+
                                                this.props.color_primario+' 66.67%)'
                },
                diag_grad:{
                    background:'linear-gradient(45deg, '+this.props.color_primario +' 33.33% ,'+
                                                this.props.color_secundario+' 33.33% 66.67%,'+
                                                this.props.color_primario+' 66.67%)'
                }
            }
        });
        return (
            <React.Fragment>
            <div className="grouped">
                <div className="hole" title="Vertical" style={styles.vert_grad} value="vertical" onClick={this.handleClick}>
                </div>
                <div className="hole" title="Horizontal" style={styles.horz_grad} value="horizontal" onClick={this.handleClick}>
                </div>
                <div className="hole" title="Diagonal" style={styles.diag_grad} value="diagonal" onClick={this.handleClick}>
                </div>                
            </div>
            <div className="image" style={this.state.Position==="vertical"?styles.vert_grad:this.state.Position==="horizontal"?styles.horz_grad:styles.diag_grad}>
                <img src={preview} alt="vista previa" />
            </div>     
            </React.Fragment>       
        );
    }
}

export default Gradient;