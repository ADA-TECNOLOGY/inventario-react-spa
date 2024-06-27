import { Avatar, Box, Center, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer } from "@chakra-ui/react";

export default function Header() {

    return <>
        <Box bg={'teal'} w={'100%'} p={2} color={'white'}>
            <Flex>
                <Box p='2'>
                    <Heading size={'md'}>Inventário</Heading >
                </Box>
                <Spacer />

                <Menu isLazy>
                    <MenuButton>                
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                        Sair
                        </MenuItem>
                    </MenuList>
                </Menu>


            </Flex>


        </Box>
    </>
}