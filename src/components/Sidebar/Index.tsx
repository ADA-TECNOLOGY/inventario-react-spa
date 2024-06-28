import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

export default function Sidebar({ children }: any) {
  const {token} = useAuth();
  const isAuth = !!token;

  console.log(!!token)

  return (
    <>
      {isAuth && (
        <Box>
          <Flex>
            <Box
              w={{ base: "full", md: "240px" }}
              pos="fixed"
              h="100%"
              zIndex={20}
            >
              <Box
                p={5}
                w="100%"
                h="100%"
                bg={"white"}
                color={"teal"}
                boxShadow="lg"
              >
                <Flex direction="column" as="nav">
                  <Link p={2} href="/home">
                    Inicio
                  </Link>
                  <Link p={2} href="#">
                    Saidas
                  </Link>
                </Flex>
              </Box>
            </Box>
            <Box ml={{ base: 0, md: "250px" }} p={4} flex="1">
              {children}
            </Box>
          </Flex>
        </Box>
      )}
      { !isAuth &&
          <Box>
          {children}
        </Box>
      }
    </>
  );
}
