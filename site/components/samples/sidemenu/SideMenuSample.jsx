import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import MenuData from "./MenuData.json";


export default class SideMenuSample extends ShallowComponent {


    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                "text": "Users",
                "path": "app/modules/User"
            }
        };
    }

    render() {
        return (
            <div>
                <SideMenu
                    items={MenuData}
                    onChange={this.handleChange}
                    selectedItem={this.state.selectedItem.path}
                />
            </div>
        );
    }

    handleChange = (item) => {
        this.setState({
            selectedItem: item
        });
        //If the selectedItem is to be updated in props, it must be given false, otherwise you do not need to return
        return false;
    };

    shouldComponentUpdate() {
        return true;
    }
}
