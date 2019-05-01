import React, { Component } from 'react';
import {Container,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import '../assets/OwlCarousel2/dist/assets/owl.carousel.css';
import '../assets/OwlCarousel2/dist/assets/owl.theme.default.css';
import './home.css';
const options={
    items:1,
    loop:true,
    mergeFit:true,
    autoplay:true
};
class Home extends Component {
    render() {
        return (
            <Container >
                <Row >
                   <OwlCarousel  ref="gallery" options={options}>
                        <div className="item imagen">
                            <img src={require("../assets/img/home/cl.png")} alt="calidad"/>
                        </div>
                        <div className="item imagen">
                            <img src={require("../assets/img/home/col.png")}  alt="colores"/>
                        </div>
                        
                        <div className="item imagen"><Link to="/catalogo"><img src={require("../assets/img/home/est.png")}  alt="estilos"/></Link></div>
                        <div className="item imagen"><img src={require("../assets/img/home/mz.png")}  alt="estilos"/></div>
                        <div className="item imagen"><img src={require("../assets/img/home/pt.png")}  alt="estilos"/></div>
                        <div className="item imagen"><img src={require("../assets/img/home/ac.png")}  alt="estilos"/></div>
                   </OwlCarousel>

                   
                </Row>
                <Row>
                <div className="homeImg ">
                        <Link to="/preguntas">
                            <img className="img-responsive hm" src={require("../assets/img/home/qa.png")} alt="qa"/>
                        </Link>
                    </div>
                </Row>
                <Row>
                <div className="homeImg ">
                        <img className="img-responsive hm" src={require("../assets/img/home/env.png")} alt="qa"/>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Home;