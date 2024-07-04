import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";
import { HamburgerIcon } from "@chakra-ui/icons";
import Header from "../Header";

export default function Sidebar({ children }: any) {
  const { token, isOpenSidebar, handleOpenSidebar } = useAuth();
  const isAuth = !!token;

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
                  <Link p={2} href="/">
                    Inicio
                  </Link>
                  <Link p={2} href="#">
                    Saidas
                  </Link>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Box flex="1">
            <Header ></Header>
            <Container
              transition="margin-left 0.3s ease-in-out"
              ml={isOpenSidebar ? { base: 0, md: "340px" } : ""}
              maxW={isOpenSidebar ? "75%" : "85%"}
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
