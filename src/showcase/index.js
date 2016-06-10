import React from "react";
import { render } from "react-dom";
import BaseInput from "inputs/BaseInput";

const app = document.getElementById("app");


render((
    <BaseInput type="text" />
), app);
