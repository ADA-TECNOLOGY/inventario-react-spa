import {
  Box,
  Button,
  Flex,
  Heading,
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
import FilterSupplier from "../Supplier/components/FilterSupplier";
import { MdCreate, MdDehaze, MdDelete } from "react-icons/md";
import Pagination from "../../components/PaginationGroupItems";
import { useNavigate } from "react-router-dom";
import { Page } from "../../model/interface/pagination.interface";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../model/Customer.model";
import api from "../../services/api";
import { formatPhone } from "../../util/formatPhone";
import { formatDocument } from "../../util/formatDocument";
import FilterCostumer from "./components/FilterCustomer";
import { IconButton } from '@chakra-ui/react';
import Swal from "sweetalert2";

interface FildsFilter {
  name: string;
  document: string;
  active: string;
}

export default function Customer() {
  const navigate = useNavigate();
  const toast = useToast();

  const [customer, setCustomer] = useState<CustomerModel[]>([]);
  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<FildsFilter>({} as FildsFilter);

  const handleDataCustomer = async (
    page: number,
    size?: number,
    active?: string,
    document?: string,
    name?: string
  ) => {
    try {
      const resp = await api.get(
        `/customer?page=${page}&size=${size}`
      );
      setItemsPerPage(size || 10); // quantidade de item por página
      setCustomer(resp.data.content);
      setPagination(resp.data); // Receber objeto referente a páginação
      setFilter({
        document: document || "",
        name: name || "",
        active: active || ""
      });
    } catch (error) {
      console.error("Error ao buscar dados dos clientes", error);
    }
  };

  //Funcao de desativar cliente
  const enableDisableCustomer = async (idCustomer: number) => {
    try {
      const resp = await api.patch(`/customer/disableOrActivate/${idCustomer}`);
      if (resp.status == 200) {
        toast({
          description: `${
            resp.data
          }`,
          status: resp.data === "Cliente Desabilitado com sucesso!" ? "warning" : "success",
          duration: 3000,
          isClosable: true,
        });
        handleDataCustomer(
          pagination?.number,
          itemsPerPage,
          filter.active,
          filter.document,
          filter.name,
          
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar.", error);
    }
  };

  // Funcao para deletar categoria
  const deleteCustomer = async (id: number) => {
    await api.delete(`/category/${id}`);
    handleDataCustomer(0, itemsPerPage);
    Swal.fire({
      text: "Deletado com sucesso.",
      icon: "success",
      confirmButtonColor: "#00838F",
      timer: 3000,
    });
  };

  // Responsavel por chamar dialog, de acordo com o escolhido ele traz a funcao de excluir la de cima
  const handleDelete = (id: number) => {
    Swal.fire({
      text: "Deseja realmente deletar essa categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00838F",
      cancelButtonColor: "#748492",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer(id);
      }
    });
  };

  useEffect(() => {
    handleDataCustomer(0, 10, filter.document, filter.name);
  }, []);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Clientes
        </Heading>
        <Spacer />
        <FilterCostumer handleFilter={handleDataCustomer} />
        <Button
          colorScheme="teal"
          variant="outline"
          ml={2}
          onClick={() => navigate("/customer/create")}
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
              {customer?.map((e: CustomerModel) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.name}</Td>
                  <Td>{formatDocument(e.document)}</Td>
                  <Td>{formatPhone(e.phone)}</Td>
                  <Td mr={3} 
                  >
                    <Tooltip label={e.active ? "Inativar" : "Ativar"} >
                      <Switch
                        onChange={() => enableDisableCustomer(e.id)}
                        isChecked={e.active}
                        colorScheme="teal"
                      />
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip label="Editar">
                      <IconButton
                        mr={2}
                        onClick={() => navigate(`/customer/${e.id}`)}
                        bg={"white"}
                        aria-label={"Editar"}
                        color={"teal"}
                        icon={<MdCreate />}
                      ></IconButton>
                    </Tooltip>
                    <Tooltip>
                      <IconButton 
                        mr={2}
                        onClick={() => handleDelete(e.id)}
                        icon={<MdDelete />}
                        aria-label={"Excluir"}
                        bg={"white"}
                        color={"teal"}
                        >
                      </IconButton>
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
            onPageChange={handleDataCustomer}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleDataCustomer}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
