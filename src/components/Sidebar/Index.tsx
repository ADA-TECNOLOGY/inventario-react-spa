import {
  Box,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";
import { HamburgerIcon } from "@chakra-ui/icons";
import Header from "../Header";
import { useState } from "react";
import { MdList, MdOutlineContactPage, MdOutlineHome, MdOutlineInventory2, MdOutlineManageAccounts, MdOutlineNoteAlt, MdOutlinePersonAddAlt } from "react-icons/md";
import { Linkhover } from "./style";
import { Link } from "react-router-dom";

export default function Sidebar({ children }: any) {
  const { token, isOpenSidebar, handleOpenSidebar } = useAuth();
  const isAuth = !!token;
  const [menus] = useState([{ name: "Inicio", link: "/", icon: <MdOutlineHome/> }]);
  const [menusRegister] = useState([
    { name: "Fonecedor", link: "/supplier", icon: <MdOutlineContactPage/> },
    { name: "Categoria", link: "/category", icon: <MdList/> },
    { name: "Cliente", link: "/customer", icon: <MdOutlinePersonAddAlt /> },
    { name: "Produtos", link: "/products", icon: <MdOutlineInventory2  /> },
  ]);

  const [menusOrganizational] = useState([
    { name: "Funções", link: "/position", icon: <MdOutlineNoteAlt/> },
    {name: "Funcionário", link: "/employee", icon: <MdOutlineManageAccounts/>}
  ]);

  return (
    <>
      {isAuth ? (
        <Flex height="100vh">
          <Drawer
            placement="left"
            onClose={handleOpenSidebar}
            isOpen={isOpenSidebar}
          >
            <DrawerOverlay bg="transparent" />
            <DrawerContent>
              <DrawerHeader
                borderBottomColor={"teal"}
                bg={"teal"}
                borderBottomWidth="8px"
              >
                <Flex color={"#fff"}>
                  <HamburgerIcon
                    mr={5}
                    fontSize={"20"}
                    cursor={"pointer"}
                    onClick={handleOpenSidebar}
                  />
                  <Heading size={"md"}>Inventário</Heading>
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Flex direction="column" as="nav">
                  {menus.map((e, index) => (
                    <Linkhover as={Link} key={index} to={e.link}>
                      <Flex alignItems={"center"} >
                        {e.icon} 
                        <Text ml={2}>{e.name}</Text> 

                      </Flex>
                    </Linkhover>
                  ))}
                  <Box mt={5} mb={3}>
                    <Text color={'gray.600'} mb={2}>Cadastro</Text>
                    <Divider bg={'gray.700'}/>
                  </Box>

                  {menusRegister.map((e, index) => (
                    <Linkhover as={Link} key={index} to={e.link}>
                      <Flex alignItems={"center"}>
                        {e.icon} 
                        <Text ml={2}>{e.name}</Text> 
                      </Flex>
                    </Linkhover>
                  ))}
                  <Box mt={5} mb={3}>
                    <Text color={'gray.600'} mb={2}>Organizacional</Text>
                    <Divider bg={'gray.700'}/>
                  </Box>

                  {menusOrganizational.map((e, index) => (
                    <Linkhover as={Link} key={index} to={e.link}>
                      <Flex alignItems={"center"}>
                        {e.icon} 
                        <Text ml={2}>{e.name}</Text> 
                      </Flex>
                    </Linkhover>
                  ))}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Box flex="1">
            <Header></Header>
            <Container
              transition="margin-left 0.3s ease-in-out"
              ml={isOpenSidebar ? { base: 0, md: "340px" } : ""}
              maxW={isOpenSidebar ? "75%" : "90%"}
              mt={20}
            >
              {children}
            </Container>
          </Box>
        </Flex>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
}
