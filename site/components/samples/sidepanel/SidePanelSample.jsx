import React from "react";
import {ShallowComponent,Application} from "robe-react-commons";
import {Button} from "react-bootstrap";
import SidePanel from "robe-react-ui/lib/sidepanel/SidePanel";
import SideMenuSample from "../sidemenu/SideMenuSample";

export default class SidePanelSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);

        this.state = {
            leftPanelState: false,
            rightPanelState: false
        };
    }

    render(): Object {
        return (
            <span>
                <Button onClick={()=>{this.setState({leftPanelState:!this.state.leftPanelState})}}>
                    {Application.i18n(SideMenuSample,"layout.SidePanel", "toggleLeft")}
                </Button>&nbsp;&nbsp;
                <Button onClick={()=>{this.setState({rightPanelState:!this.state.rightPanelState})}}>
                    {Application.i18n(SideMenuSample,"layout.SidePanel", "toggleRight")}
                </Button>
                <SidePanel visible={this.state.leftPanelState} position="left">
                    <SideMenuSample/>
                </SidePanel>
                <SidePanel visible={this.state.rightPanelState} position="right">
                    <SideMenuSample/>
                </SidePanel>
            </span>
        );
    }
}