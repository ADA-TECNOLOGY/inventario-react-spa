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

interface FildsFilter {
    name: string;
    document: string;
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
    document?: string,
    name?: string,
  ) => {
    try {
      const resp = await api.get(
        `/customer?page=${page}&size=${size}&document=${
          document || ""}&name=${name || ""} `
      );
      setItemsPerPage(size || 10); // quantidade de item por página
      setCustomer(resp.data.content);
      setPagination(resp.data); // Receber objeto referente a páginação
      setFilter({
        document: document || "",
        name: name || "",
      });
    } catch (error) {
      console.error("Error ao buscar dados dos clientes", error);
    }
  };

  //Funcao de desativar cliente
  const enableDisableCustomer = async(idCustomer: number) => {
    try {
      const resp = await api.patch(`/customer/disableOrActivate/${idCustomer}`)
        if (resp.status == 200) {
          toast({
            description: `${
            resp.data.active
            ? "Cliente ativado com sucesso!"
            : "Cliente desativado com sucesso!"
            }`,
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          handleDataCustomer(
            pagination?.number,
            itemsPerPage,
            filter.document,
            filter.name
          )
        }
    } catch(error) {
      console.error("Erro ao atualizar.", error)
    }
  }

  useEffect(() => {
    handleDataCustomer(
      0,
      10,
      filter.document,
      filter.name,
    );
  }, []);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Clientes
        </Heading>
        <Spacer />
        <FilterSupplier handleFilter={handleDataCustomer} />
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
                <Th textAlign="center">Nome</Th>
                <Th textAlign="center">CNPJ/CPF</Th>
                <Th textAlign="center">Fone</Th>
                <Th textAlign="center">E-mail</Th>
                <Th textAlign="center">Ativar / Inativar</Th>
                <Th textAlign="right" display="flex" ml={9}> Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customer?.map((e: CustomerModel) => (
                <Tr key={(e?.id)} _hover={{ bg: "gray.100" }}>
                <Td>{e.name}</Td>
                <Td textAlign="center">{formatDocument(e.document)}</Td>
                <Td textAlign="center">{formatPhone(e.phone)}</Td>
                <Td textAlign="center">{e.email}</Td>
                <Tooltip label={e.active ? "Inativar" : "Ativar"}>
                    <Td
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Switch
                        onChange={() => enableDisableCustomer(e.id)}
                        isChecked={e.active}
                        colorScheme="teal"
                      />
                    </Td>
                  </Tooltip>
                <Td textAlign="center">
                  <Tooltip label="Editar">
                    <IconButton
                      mr={2}
                      onClick={() => navigate(`/costumer/${e.id}`)}
                      bg={"white"}
                      aria-label={"Editar"}
                      color={"teal"}
                      icon={<MdCreate />}
                    ></IconButton>
                  </Tooltip>
                  <Tooltip label="Excluir">
                    <IconButton
                      mr={2}
                      bg={"white"}
                      aria-label={"Detalhe"}
                      color={"teal"}
                      icon={<MdDelete />}
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
            onPageChange={handleDataCustomer}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleDataCustomer}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
