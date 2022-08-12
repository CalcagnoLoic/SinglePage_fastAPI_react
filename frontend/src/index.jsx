import React from 'react';
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react"
import Header from "./components/Header";
import Todos from "./components/Todos";

const App = () => {
    return (
        <ChakraProvider>
            <Header />
            <Todos />
        </ChakraProvider>
    )
}

const rootElem = document.getElementById("root")
render(<App />, rootElem)


