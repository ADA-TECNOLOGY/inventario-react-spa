import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
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
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdCreate, MdDehaze, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Supplier() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "João Silva",
      document: "123456789",
      phone: "(11) 1234-5678",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      document: "987654321",
      phone: "(21) 8765-4321",
      status: "Inativo",
    },
    {
      id: 3,
      name: "Carlos Souza",
      document: "456789123",
      phone: "(31) 4567-8912",
      status: "Ativo",
    },
    {
      id: 4,
      name: "Ana Costa",
      document: "789123456",
      phone: "(41) 7891-2345",
      status: "Pendente",
    },
  ]);

  return (
    <Container maxW="container.lg">
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Fornecedores
        </Heading>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => navigate("/supplier/create")}
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
                <Th>CNPJ/CPF</Th>
                <Th>Fone</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliers.map((e: any) => (
                <Tr key={e?.id}>
                  <Td>{e.name}</Td>
                  <Td>{e.document}</Td>
                  <Td>{e.phone}</Td>
                  <Td>{e.status}</Td>
                  <Td>
                    <IconButton
                      bg={"white"}
                      aria-label={"Detalhe"}
                      color={"teal"}
                      icon={<MdDehaze />}
                    ></IconButton>
                    <IconButton
                      bg={"white"}
                      aria-label={"Editar"}
                      color={"teal"}
                      icon={<MdCreate />}
                    ></IconButton>
                    <IconButton
                      bg={"white"}
                      aria-label={"Excluir"}
                      color={"teal"}
                      icon={<MdLock />}
                    ></IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
