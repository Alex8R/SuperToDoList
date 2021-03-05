import React from "react";
import AddItemForm from "../components/AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
    title: "Add item Form Component",
    component: AddItemForm
}

const onAddItemCallback = action("Added new item, with title");

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={onAddItemCallback}/>
}