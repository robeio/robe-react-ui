import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import { Grid, Row, Col, Alert, Image, Jumbotron } from "react-bootstrap";
import FaIcon from "faicon/FaIcon";


export default class Welcome extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <Row className="text-center pagination-centered banner" >
                    <Image src="./avatar.png" />
                    <h1>robe-react-ui</h1>
                    <h4>UI components built on top of <a href="https://react-bootstrap.github.io/"><code>React-Bootstrap</code></a></h4>
                </Row>
                <Grid>
                    <Row>
                        <Jumbotron>
                            <h2>Welcome</h2>
                            <p>This is the documentation page for <code>robe-react-ui</code>.
                                This page includes component showcase, JSDocs and general information about the project.</p>
                        </Jumbotron>
                    </Row >
                    <Row className="well" >
                                <Col sm={4}>
                                    <h4>DataGrid with Model support</h4>
                                    Models with dynamic validation support, makes it very easy to develop screens for CRUD operations.
                                    
                                </Col>
                                <Col sm={4}>
                                    <h4>Standardized usage</h4>
                                    for all wrapped Components.
                                    
                                </Col>
                                <Col sm={4}>
                                    <h4>Ready for complex needs</h4>
                                    Complex task will be easier to execute with samples from real applications. 
                                </Col>
                            </Row>
                    <Row>
                        <Alert bsStyle="danger">
                            <h4>Danger!</h4>
                            <FaIcon code="fa-exclamation-triangle" /> The project is under active development, and APIs will change.
                        </Alert>
                    </Row>
                    <Row>
                        <Alert bsStyle="warning">
                            <FaIcon code="fa-exclamation" /> This project is at alpha state, may contain bugs.
                        </Alert>
                    </Row>

                </Grid>

            </div >
        );
    }
}
