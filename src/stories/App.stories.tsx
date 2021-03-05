import React from "react";
import App from "../App";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppExample = () => {
    return (
        <App />
    )
}