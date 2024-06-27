import React from 'react';
import { Box, Flex, Link, IconButton } from '@chakra-ui/react';



export default function Sidebar() {

    return (
        <Box >
            <Flex>
                <Box
                    w={{ base: 'full', md: '250px' }}
                    pos="fixed"
                    h="100%"
                    zIndex={20}
                >
                    <Box p={5} w="100%" h="100%" bg={'white'} color={'teal'} boxShadow="lg" >
                        <Flex direction="column" as="nav">
                            <Link p={2} href="/home"> Inicio</Link>
                            <Link p={2} href="#">Saidas</Link>
                            
                        </Flex>
                    </Box>
                </Box>
                <Box ml={{ base: 0, md: '250px' }} p={4} flex="1">
                    {/* Conteúdo Principal */}
                </Box>
            </Flex>
        </Box>
    );
};

