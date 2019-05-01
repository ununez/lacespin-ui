import React, { Component } from 'react';

class Accordion extends Component {
    render() {
        const{title,content,expand,onClick}=this.props;
        return (
            <div>
                <dt className={expand?'preg_title is-expanded':'preg_title'} onClick={onClick}>{title}</dt>
                <dd className={expand?'preg_content is-expanded':'preg_content'}onClick={onClick}>{content}</dd>
            </div>
        );
    }
}

export default Accordion;