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
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCreate, MdDehaze } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Page } from "../../model/interface/pagination.interface";
import Pagination from "../../components/PaginationGroupItems";
import { formatDocument } from "../../util/masckDocument";
import { formatPhone } from "../../util/maskPhone";
import { SupplierModel } from "../../model/Supplier.model";
import FilterSupplier from "./components/FilterSupplier";

export default function Supplier() {
  const navigate = useNavigate();
  const toast = useToast()

  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleDataSupplier = async (page: number, size?: number, document?: string, corporateName?: string, active?: string) => {
    try {
      const resp = await api.get(`/supplier/page?page=${page}&size=${size}&document=${document}&corporateName=${corporateName}&active=${active}`);
      setItemsPerPage(size || 10); // quantidade de item por página
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
          handleDataSupplier(pagination?.number, itemsPerPage, '', '', '')
        }
    }catch(error) {
      console.error("Erro ao atualizar.", error)
    }
  }

  useEffect(() => {
    handleDataSupplier(0, 10, '', '', '')
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
        <FilterSupplier handleFilter={handleDataSupplier}/>
      </Flex>
      <Box borderRadius={5} mt={5} bg={"white"}>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="left">Nome</Th>
                <Th textAlign="center">CNPJ/CPF</Th>
                <Th textAlign="center">Fone</Th>
                <Th textAlign="center">Ativar / Inativar</Th>
                <Th textAlign="right" display="flex" ml={9}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliers?.map((e: SupplierModel) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.corporateName}</Td>
                  <Td>{formatDocument(e.document)}</Td>
                  <Td>{formatPhone(e.phone)}</Td>
                  <Tooltip label={e.active ? "Inativar" : "Ativar"}>
                  <Td display="flex" justifyContent="center" alignItems="center">
                  <Switch 
                      onChange={()=>enableDisableSupplier(e.id)}
                      isChecked={e.active}
                      colorScheme="teal" />
                  </Td>
                  </Tooltip>
                  <Td textAlign="right">
                    <Tooltip label='Detalhe'>
                    <IconButton
                      bg={"white"}
                      aria-label={"Detalhe"}
                      color={"teal"}
                      icon={<MdDehaze />}
                      mr={1}
                    ></IconButton>
                    </Tooltip>
                    <Tooltip label='Editar'>
                    <IconButton
                      onClick={()=> navigate(`/supplier/${e.id}`)}
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
