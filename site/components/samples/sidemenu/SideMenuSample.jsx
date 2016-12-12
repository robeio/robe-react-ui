import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import MenuData from "./MenuData.json";


export default class SideMenuSample extends ShallowComponent {


    constructor(props: Object) {
        super(props);
        this.state = {

        };
    }

    render(): Object {
        return (
            <div>
                <SideMenu
                    items={MenuData}
                    onChange={this.handleChange}
                    selectedItem="app/modules/Parameters"
                />
                <span>Selected Item: <b>{this.state.selectedItem}</b></span>
            </div>
        );
    }

    handleChange = (item: Object) => {
        this.setState({
            selectedItem: item.text
        });
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
