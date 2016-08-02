import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import { Grid, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";



export default class Welcome extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <Row className="text-center pagination-centered banner" >
                    <Image src="./avatar.png" rounded />
                    <h1>robe-react-ui</h1>
                    <h4>UI components built on top of <code>React-Bootstrap</code></h4>
                </Row>
                <Grid>
                    <Row>
                        <Jumbotron>
                            <h2>Welcome</h2>

                            <p>This is the documentation page for <code>robe-react-ui</code>.
                                This page includes component showcase, JSDocs and general information about the project.</p>
                            <p><Button bsStyle="primary" href="https://react-bootstrap.github.io/" >React-Bootstrap</Button></p>
                        </Jumbotron>
                    </Row >
                    <Row>
                       
                    </Row>
                </Grid>

            </div >
        );
    }
}
