import {
  Box,
  Button,
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
import { Page } from "../../model/interface/pagination.interface";
import Pagination from "../../components/PaginationGroupItems";
import { formatDocument } from "../../util/masckDocument";
import { formatPhone } from "../../util/maskPhone";

export default function Supplier() {
  const navigate = useNavigate();
  const toast = useToast()

  const [suppliers, setSuppliers] = useState<CreateSupplierFormData[]>([]);
  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleDataSupplier = async (page: number, size?: number) => {
    try {
      const resp = await api.get(`/supplier/page?page=${page}&size=${size}`);
      setItemsPerPage(size || 10); // quantiade de item por página
      setSuppliers(resp.data.content) 
      setPagination(resp.data) // Receber objeto referente a páginação
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
          handleDataSupplier(pagination?.number, itemsPerPage)
        }
    }catch(error) {
      console.error("Erro ao atualizar.", error)
    }
  }

  useEffect(() => {
    handleDataSupplier(0, 10)
  }, [])
  


  return (
    <Box>
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
                  <Td>{formatDocument(e.document)}</Td>
                  <Td>{formatPhone(e.phone)}</Td>
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
                      title="Detalhe"
                      aria-label={"Detalhe"}
                      color={"teal"}
                      icon={<MdDehaze />}
                    ></IconButton>
                    <IconButton
                      onClick={()=> navigate(`/supplier/${e.id}`)}
                      bg={"white"}
                      title="Editar"
                      aria-label={"Editar"}
                      color={"teal"}
                      icon={<MdCreate />}
                    ></IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* Componente de páginação */}
          <Pagination
          currentPage={pagination?.number || 0}
          totalPages={pagination?.totalPages || 0}
          onPageChange={handleDataSupplier}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleDataSupplier}
        />
        </TableContainer>
      </Box>
    </Box>
  );
}
