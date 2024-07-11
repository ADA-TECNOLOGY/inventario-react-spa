import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header() {
  const isAuth = localStorage.getItem("token") != undefined;
  const navigate = useNavigate();
  const { removeToken, handleOpenSidebar, isOpenSidebar } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeToken();
    navigate("/signin");
  };

  return (
    <>
      {isAuth && (
        <Box zIndex={1} bg={"teal"} position={'fixed'} w={"100%"} p={2} color={"white"}>
          <Flex>
            <Flex p="2" align={"center"}>
              {!isOpenSidebar && (
                <>
                  <HamburgerIcon
                    mr={5}
                    fontSize={"20"}
                    cursor={"pointer"}
                    onClick={handleOpenSidebar}
                  />
                  <Heading size={"md"}>Inventário</Heading>
                </>
              )}
            </Flex>
            <Spacer />

            <Menu isLazy>
              <MenuButton>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <MenuList>
                <MenuItem color={"teal"} onClick={handleLogout}>
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      )}
    </>
  );
}
