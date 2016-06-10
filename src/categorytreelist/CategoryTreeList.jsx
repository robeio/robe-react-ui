import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import Col from "react-bootstrap/lib/Col";
import RequestUtils from "libs/util/RequestUtils";
import Link from "react-router/lib/Link";

class CategoryTreeList extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    render() {

        return (
            <Col>
                {this.__renderCategoriesTreeRecursively(this.state.data)}
            </Col>
        );

    }

    __renderCategoriesTreeRecursively = (categories)=> {
        var categoriesArr = [];
        for (let i in categories) {
            let category = categories[i];

            if (categories.length > 0) {


                categoriesArr.push(
                    <ul style={{listStyleType: "none"}} key={category["code"]}>
                        <li >
                            <Link className="sub-category-style" to={"searchdetail?category="+category["code"]}>
                                {category["name"]}
                            </Link>
                            {this.__renderCategoriesTreeRecursively(category["children"])}
                        </li>
                    </ul>
                );
            }
        }
        return categoriesArr;
    };


    __readComplete = (xhr)=> {
        if (xhr.status == 200 && xhr.responseJSON) {
            this.setState({
                data: xhr.responseJSON
            })
        }
    };

    __readData = ()=> {
        RequestUtils.makeRequest("categories/tree", "GET", undefined, this.__readComplete);
    };


    componentWillMount() {
        this.__readData();
    }

}


module.exports = CategoryTreeList;