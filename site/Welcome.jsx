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
                                You can find <b>Components</b> with <b>sample codes</b>, <b>JSDocs</b> and general information about the project.</p>
                        </Jumbotron>
                    </Row >
                    <Row className="well" >
                        <Col sm={4}>
                            <h4>DataGrid with Model support</h4>
                                    Models with dynamic validation support, makes it very easy to develop screens for CRUD operations and more.
                                    Filters, sorting, form generation from models and more.
                                </Col>
                        <Col sm={4}>
                            <h4>Standardized usage</h4>
                                    It is important to provide a complete and easy to learn component set.
                                    Harmonic usage of different components wrapped together with a single naming and one way of usage.
                                    
                                </Col>
                        <Col sm={4}>
                            <h4>Ready for complex needs</h4>
                                    We develop real-life projects with this library, so we add components and samples continuously.
                                    Complex task will be easier to execute with samples from real applications.
                                </Col>
                    </Row>
                    <Row className="well" >
                        <Col sm={12}>
                            <h4>Bootstrap Support</h4>
                                   We support bootstrap components by wrapping <a href="https://react-bootstrap.github.io/components.html"><code>React Bootstrap</code></a>.
                        </Col>
                    </Row>
                    <Row>
                        <Alert bsStyle="warning">
                            <FaIcon code="fa-exclamation" /> This project is at beta state, may contain bugs.
                        </Alert>
                    </Row>

                </Grid>

            </div>
        );
    }
}
