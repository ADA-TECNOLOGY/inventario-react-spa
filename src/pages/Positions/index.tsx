import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { PositionModel } from "../../model/Position.model";

export default function Position() {
  const [positions, setPositions] = useState<Array<PositionModel>>([]);
  const navigate = useNavigate();

  const getPositions = async ()  =>{
    const resp = await api.get("position")
    setPositions(resp.data)
  }
  

  useEffect(() => {
    getPositions();
  }, [])
  

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Funções
        </Heading>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="outline"
          ml={2}
          onClick={() => navigate("/position/create")}
        >
          Novo +{" "}
        </Button>
      </Flex>
      <Box borderRadius={5} mt={5} bg={"white"}>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {positions?.map((e: any) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.name}</Td>
                  <Td>
                    <Tooltip label="Editar">
                      <IconButton
                        onClick={() => navigate(`/position/edit/${e.id}`)}
                        bg={"white"}
                        aria-label={"Editar"}
                        color={"teal"}
                        icon={<MdCreate />}
                      ></IconButton>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
