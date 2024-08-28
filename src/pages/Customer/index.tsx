import { Box, Button, Flex, Heading, IconButton, Spacer, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import FilterSupplier from "../Supplier/components/FilterSupplier";
import { MdCreate, MdDehaze, MdDelete } from "react-icons/md";
// import Pagination from "../../components/PaginationGroupItems";
// import { useNavigate } from "react-router-dom";
// import { Page } from "../../model/interface/pagination.interface";
// import { useState } from "react";


export default function Customer () {
//   const navigate = useNavigate();
//   const toast = useToast();

// //   const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
//   const [pagination, setPagination] = useState<Page>({} as Page);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//   const [filter, setFilter] = useState<FildsFilter>({} as FildsFilter);


    return (
        <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Clientes
        </Heading>
        <Spacer />
        <FilterSupplier />
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
                <Th textAlign='left'>Nome</Th>
                <Th textAlign='center'>CNPJ/CPF</Th>
                <Th textAlign='center'>Fone</Th>
                <Th textAlign='center'>E-mail</Th>
                <Th textAlign='right' display="flex" ml={9} >Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
                <Tr  _hover={{ bg: "gray.100" }}>
                  <Td textAlign={'left'}>Maria Teste</Td>
                  <Td textAlign={'center'}>01000000000</Td>
                  <Td textAlign={'center'}>85997555555</Td>
                  <Td textAlign={'center'}>cliente@teste.com</Td>
                  <Td textAlign={'center'}>
                    <Tooltip label="Detalhe">
                      <IconButton mr={1} bg={"white"} aria-label={"Detalhe"} color={"teal"} icon={<MdDehaze />}
                      ></IconButton>
                    </Tooltip>
                    <Tooltip label="Editar">
                      <IconButton
                        // onClick={() => navigate(`/supplier/${e.id}`)}
                        bg={"white"}
                        aria-label={"Editar"}
                        color={"teal"}
                        icon={<MdCreate />}
                      ></IconButton>
                    </Tooltip>
                    <Tooltip label="Excluir">
                      <IconButton mr={1} bg={"white"} aria-label={"Detalhe"} color={"teal"} icon={<MdDelete/>}
                      ></IconButton>
                    </Tooltip>
                  </Td>
                </Tr>
            </Tbody>
          </Table>
          {/* Componente de páginação */}
          {/* <Pagination
            currentPage={pagination?.number || 0}
            totalPages={pagination?.totalPages || 0}
            onPageChange={handleDataSupplier}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleDataSupplier}
          /> */}
        </TableContainer>
      </Box>
    </Box>
    )
}