import React from "react";
import { ShallowComponent, RequestUtils } from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Link from "react-router/lib/Link";

export default class CategoryTreeList extends ShallowComponent {

    constructor(props: Object) {
        super(props);

        this.state = {
            data: []
        };
    }

    render(): string {
        return (
            <Col>
                {this.__renderCategoriesTreeRecursively(this.state.data)}
            </Col>
        );
    }

    __renderCategoriesTreeRecursively = (categories: Array) => {
        let categoriesArr = [];
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            if (categories.length > 0) {
                categoriesArr.push(
                    <ul style={{ listStyleType: "none" }} key={category.code}>
                        <li >
                            <Link className="sub-category-style" to={`searchdetail?category=${category.code}`} >
                                {category.name}
                            </Link>
                            {this.__renderCategoriesTreeRecursively(category.children)}
                        </li>
                    </ul>
                );
            }
        }
        return categoriesArr;
    };

    __readComplete = (xhr: Object) => {
        if (xhr.status === 200 && xhr.responseJSON) {
            this.setState({
                data: xhr.responseJSON
            });
        }
    };

    __readData = () => {
        RequestUtils.makeRequest("categories/tree", "GET", undefined, this.__readComplete);
    };

    componentWillMount() {
        this.__readData();
    }

}
