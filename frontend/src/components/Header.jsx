import React from 'react';
import { Heading, Flex } from "@chakra-ui/react"

const Header = () => {
    return (
        <Flex
        as="nav"
        className="bg-gray-600 p-5 mb-5"
        >
            <Flex mr={5}>
                <Heading as="h1" size="sm" className="text-white text-xl">Todos</Heading>
            </Flex>
        </Flex>
    );
};

export default Header;