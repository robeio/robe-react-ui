import React from "react";
import {ShallowComponent, Application} from "robe-react-commons";
import ProgressBar from "robe-react-ui/lib/progress/ProgressBar";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import {Button, ButtonGroup, Checkbox} from "react-bootstrap";


export default class ProgressBarSample extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            loading: true
        };
    }
    __exampleStyle = {
        position: "relative",
        height: 100,
        maxWidth: 200,
        background: "#fafafa",
        float: "none",
        padding: "5.6%",
        textAlign: "center",
        marginBottom: 20,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        border: "1px solid #cccccc"
    };

    render():Object {
        return (
            <div>
                <div className="center-block" style={{ paddingTop: 20,maxWidth:220 }}>
                    <div style={this.__exampleStyle}>
                        <span>Container Component</span>
                        <ProgressBar loading={this.state.loading}/>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <ButtonGroup>
                            <Button onClick={()=>this.setState({loading:true})}>
                                <FaIcon code="fa-play"/>
                            </Button>
                            <Button onClick={()=>this.setState({loading:false})}>
                                <FaIcon code="fa-stop"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}
