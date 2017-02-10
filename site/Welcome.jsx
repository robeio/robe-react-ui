import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import { Application } from "robe-react-commons";
import { Grid, Row, Col, Alert, Image, Jumbotron } from "react-bootstrap";
import FaIcon from "faicon/FaIcon";

export default class Welcome extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <Row className="text-center pagination-centered banner">
                    <Image src="./avatar.png" />
                    <h1>robe-react-ui</h1>
                    <h4>{Application.i18n(Welcome, "site.Welcome", "headerText")} <a href="https://react-bootstrap.github.io/"><code>React-Bootstrap</code></a></h4>
                </Row>
                <Grid>
                    <Row>
                        <Jumbotron>
                            <h2>{Application.i18n(Welcome, "site.Welcome", "welcome")}</h2>
                            <p>{Application.i18n(Welcome, "site.Welcome", "welcomeText")}</p>
                        </Jumbotron>
                    </Row >
                    <Row className="well">
                        <Col sm={4}>
                            <h4>{Application.i18n(Welcome, "site.Welcome", "dataGrid")}</h4>
                            {Application.i18n(Welcome, "site.Welcome", "dataGridText")}
                        </Col>
                        <Col sm={4}>
                            <h4>{Application.i18n(Welcome, "site.Welcome", "standartUsage")}</h4>
                            {Application.i18n(Welcome, "site.Welcome", "standartUsageText")}
                        </Col>
                        <Col sm={4}>
                            <h4>{Application.i18n(Welcome, "site.Welcome", "readyForComplexNeeds")}</h4>
                            {Application.i18n(Welcome, "site.Welcome", "readyForComplexNeedstext")}
                        </Col>
                    </Row>
                    <Row className="well">
                        <Col sm={6}>
                            <h4>{Application.i18n(Welcome, "site.Welcome", "bootstrapSupport")}</h4>
                            {Application.i18n(Welcome, "site.Welcome", "bootstrapSupportText")} <a href="https://react-bootstrap.github.io/components.html"><code>React Bootstrap</code></a>.
                        </Col>
                    </Row>
                    <Row>
                        <Alert bsStyle="warning">
                            <FaIcon code="fa-exclamation" /> {Application.i18n(Welcome, "site.Welcome", "footer")}
                        </Alert>
                    </Row>

                </Grid>

            </div>
        );
    }
}
