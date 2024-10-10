import {
  Badge,
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
import { MdCreate, MdDehaze } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Page } from "../../model/interface/pagination.interface";
import Pagination from "../../components/PaginationGroupItems";
import { formatDate } from "../../util/formatDate";

interface FildsFilter {
  corporateName: string;
  document: string;
}

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<FildsFilter>({} as FildsFilter);

  const handleDataProduct = async (
    page: number,
    size?: number,
    document?: string,
    corporateName?: string
  ) => {
    try {
      const resp = await api.get("product");
      setItemsPerPage(size || 10); // quantidade de item por página
      setProducts(resp.data.content);
      setPagination(resp.data); // Receber objeto referente a páginação
      //   setFilter({
      //     document: document || "",
      //     corporateName: corporateName || ""
      //   });
    } catch (error) {
      console.error("Error ao buscar dados produtos", error);
    }
  };

  const getStockStatus = (product: any): any => {
    switch (true) {
      case product.stockQuantity === 0:
        return (<Badge ml="1" colorScheme="red">
          Esgotado
        </Badge>);
      case product.stockQuantity <= product.minimumStock:
        return ( <Badge ml="1" colorScheme="yellow">
          Abaixo do Mínimo
        </Badge>);
      default:
        return (
          <Badge ml="1" colorScheme="green">
            Disponível
          </Badge>
        );
    }
  };

  useEffect(() => {
    handleDataProduct(0, 10, filter.document, filter.corporateName);
  }, []);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Produtos
        </Heading>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="outline"
          ml={2}
          onClick={() => navigate("/products/create")}
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
                <Th>Qtd. Estoque</Th>
                <Th>Validade</Th>
                <Th>Fornecedor</Th>
                <Th>Status</Th>
                <Th display="flex" ml={9}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {products?.map((e: any) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.name}</Td>
                  <Td>{e.stockQuantity}</Td>
                  <Td>{formatDate(new Date(e.expirationDate))}</Td>
                  <Td>{e.supplier.tradeName}</Td>
                  <Td>{getStockStatus(e)}</Td>
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
            onPageChange={handleDataProduct}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleDataProduct}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
