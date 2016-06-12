import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Treebeard from "react-treebeard/lib/components/treebeard";

class Tree extends ShallowComponent {

    style = {
        tree: {
            base: {
                listStyle: "none",
                backgroundColor: "#ffffff",
                margin: 0,
                padding: 0,
                color: "#000000",
                fontSize: "14px"
            },
            node: {
                base: {
                    position: "relative"
                },
                link: {
                    cursor: "pointer",
                    position: "relative",
                    padding: "0px 5px",
                    display: "block"
                },
                activeLink: {
                    background: "lightgray"
                },
                toggle: {
                    base: {
                        position: "relative",
                        display: "inline-block",
                        verticalAlign: "top",
                        marginLeft: "-5px",
                        height: "24px",
                        width: "24px"
                    },
                    wrapper: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        margin: "-7px 0 0 -7px",
                        height: "14px"
                    },
                    height: 14,
                    width: 14,
                    arrow: {
                        fill: "#000000",
                        strokeWidth: 0
                    }
                },
                header: {
                    base: {
                        display: "inline-block",
                        verticalAlign: "top",
                        color: "#000000"
                    },
                    connector: {
                        width: "1px",
                        height: "12px",
                        borderLeft: "solid 1px black",
                        borderBottom: "solid 1px black",
                        position: "absolute",
                        top: "0px",
                        left: "-21px"
                    },
                    title: {
                        lineHeight: "24px",
                        verticalAlign: "middle"
                    }
                },
                subtree: {
                    listStyle: "none",
                    paddingLeft: "19px"
                },
                loading: {
                    color: "#E2C089"
                }
            }
        }
    };

    constructor() {
        super();
        this.state = {
            "active": true
        };
    };

    render() {
        return (<Treebeard
            data={this.props.data}
            onToggle={this.onToggle}
            style={this.style}
        />);
    };


    onToggle = (node, toggled)=> {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

}

module.exports = Tree;