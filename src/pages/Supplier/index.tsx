import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCreate, MdDehaze } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CreateSupplierFormData } from "./CreateSupplier/formSchema";
import api from "../../services/api";

export default function Supplier() {
  const navigate = useNavigate();
  const toast = useToast()

  const [suppliers, setSuppliers] = useState<CreateSupplierFormData[]>([]);

  const handleDataSupplier = async () => {
    try {
      const resp = await api.get("/supplier/page?page=0&size=10");
      setSuppliers(resp.data.content) 
    }catch(error){
      console.error("Error ao buscar dados fornecedores", error)
    }
  }

  const enableDisableSupplier = async (idSupplier:number) => {
    try {
      const resp = await api.patch(`/supplier/disableOrActivate/${idSupplier}`);
        if(resp.status == 200) {
          toast({
            
            description: `${resp.data.active 
              ? "Fornecedor ativado com sucesso!" 
              : "Fornecedor desativado com sucesso!"}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          handleDataSupplier()
        }
    }catch(error) {
      console.error("Erro ao atualizar.", error)
    }
  }

  useEffect(() => {
    handleDataSupplier()
  }, [])
  


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
                <Th>Ativar / Inativar</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliers?.map((e: CreateSupplierFormData) => (
                <Tr key={e?.id}>
                  <Td>{e.corporateName}</Td>
                  <Td>{e.document}</Td>
                  <Td>{e.phone}</Td>
                  <Td alignContent={"center"}>
                  <Switch 
                      onChange={()=>enableDisableSupplier(e.id)}
                      isChecked={e.active}
                      title={e.active ? "Inativar" : "Ativar"}
                      colorScheme="teal" />
                  </Td>
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
