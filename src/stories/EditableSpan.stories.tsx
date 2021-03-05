import React from "react";
import { action } from "@storybook/addon-actions";
import EditableSpan from "../components/EditableSpan";

export default {
    title: "Editable span Component",
    component: EditableSpan
}

const changeTitleCallback = action("Title is change");


export const EditableSpanExample = () => {
    return (
        <EditableSpan title={"Double click on title to change"} changeTitle={changeTitleCallback}/>
    )
}