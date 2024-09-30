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
import { formatDocument } from "../../util/formatDocument";
import { formatPhone } from "../../util/formatPhone";
import { SupplierModel } from "../../model/Supplier.model";
import FilterSupplier from "./components/FilterSupplier";

interface FildsFilter {
  corporateName: string;
  document: string;
}

export default function Supplier() {
  const navigate = useNavigate();
  const toast = useToast();

  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<FildsFilter>({} as FildsFilter);

  const handleDataSupplier = async (
    page: number,
    size?: number,
    document?: string,
    corporateName?: string,
   
  ) => {
    try {
      const resp = await api.get(
        `/supplier?page=${page}&size=${size}&document=${
          document || ""
        }&corporateName=${corporateName || ""}`
      );
      setItemsPerPage(size || 10); // quantidade de item por página
      setSuppliers(resp.data.content);
      setPagination(resp.data); // Receber objeto referente a páginação
      setFilter({
        document: document || "",
        corporateName: corporateName || ""
      });
    } catch (error) {
      console.error("Error ao buscar dados fornecedores", error);
    }
  };

  const enableDisableSupplier = async (idSupplier: number) => {
    try {
      const resp = await api.patch(`/supplier/disableOrActivate/${idSupplier}`);
      if (resp.status == 200) {
        toast({
          description: `${
            resp.data.active
              ? "Fornecedor ativado com sucesso!"
              : "Fornecedor desativado com sucesso!"
          }`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleDataSupplier(
          pagination?.number,
          itemsPerPage,
          filter.document,
          filter.corporateName,

        );
      }
    } catch (error) {
      console.error("Erro ao atualizar.", error);
    }
  };

  useEffect(() => {
    handleDataSupplier(
      0,
      10,
      filter.document,
      filter.corporateName,
    );
  }, []);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Fornecedores
        </Heading>
        <Spacer />
        <FilterSupplier handleFilter={handleDataSupplier} />
        <Button
          colorScheme="teal"
          variant="outline"
          ml={2}
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
                <Th textAlign="right" display="flex" ml={9}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliers?.map((e: SupplierModel) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.corporateName}</Td>
                  <Td>{formatDocument(e.document)}</Td>
                  <Td>{formatPhone(e.phone)}</Td>
                  <Tooltip label={e.active ? "Inativar" : "Ativar"}>
                    <Td
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Switch
                        onChange={() => enableDisableSupplier(e.id)}
                        isChecked={e.active}
                        colorScheme="teal"
                      />
                    </Td>
                  </Tooltip>
                  <Td textAlign="right">
                    <Tooltip label="Detalhe">
                      <IconButton
                        bg={"white"}
                        aria-label={"Detalhe"}
                        color={"teal"}
                        icon={<MdDehaze />}
                        mr={2}
                      ></IconButton>
                    </Tooltip>
                    <Tooltip label="Editar">
                      <IconButton
                        onClick={() => navigate(`/supplier/${e.id}`)}
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
