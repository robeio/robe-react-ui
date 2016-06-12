import React from "react";
import { render } from "react-dom";
import { ShallowComponent } from "robe-react-commons";

class ShowCase extends ShallowComponent {

    render() : string {
        return (
            <div>Helll</div>
        );
    }
}

const app = document.getElementById("app");

render(
    <ShowCase />,
    app
);

