import React, { Component } from 'react';
import Header from "./header";
import AboutUs from "./aboutUs";
import Inquiries from "./inquiries";
import PreviewComplete from "./preview-complete";
import PreviewCurrent from "./preview-current";

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <>
        <Header />
        <AboutUs />
        <PreviewComplete />
        <PreviewCurrent />
        <Inquiries />
        </> );
    }
}
 
export default home;

