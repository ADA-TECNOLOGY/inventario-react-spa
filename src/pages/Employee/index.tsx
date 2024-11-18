import { Box, Button, Flex, Heading, IconButton, Spacer, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Toast, Tooltip, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Page } from "../../model/interface/pagination.interface";
import { MdCreate, MdDelete } from "react-icons/md";
import Pagination from "../../components/PaginationGroupItems";
import Swal from "sweetalert2";
import { EmployeeModel } from "../../model/Employee";
import { formatPhone } from "../../util/formatPhone";


interface FildsFilter {
    name: string;
    document: string;
    active: string;
  }

export default function Employee() {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState<EmployeeModel[]>([])
    const [pagination, setPagination] = useState<Page>({} as Page)
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [filter, setFilter] = useState<FildsFilter>({} as FildsFilter);

    const handleDataEmployee = async (
        page: number,
        size?: number,
        name?: string,
        document?: string,
        active?: string,

      ) => {
        try {
          const resp = await api.get(
            `/employee?page=${page}&size=${size}&name=${name ||  ""}`
          );
          setItemsPerPage(size || 10); // quantidade de item por página
          setEmployee(resp.data.content);
          setPagination(resp.data); // Receber objeto referente a páginação
          setFilter({
            document: document || "",
            name: name || "",
            active: active || ""
          });
        } catch (error) {
          console.error("Error ao buscar dados dos funcionários", error);
        }
      };

    //Funcao de desativar cliente
  const enableDisableEmployee = async (idEmployee: number) => {
    try {
      const resp = await api.patch(`/employee/disableAndActive/${idEmployee}`);
      if (resp.status == 200) {
        Toast({
          description: `${
            resp.data
          }`,
          status: resp.data === "Funcionário Desabilitado com sucesso!" ? "warning" : "success",
          duration: 3000,
          isClosable: true,
        });
        handleDataEmployee(
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


  const deleteEmployee = async (id: number) => {
    await api.delete(`/employee/${id}`);
    handleDataEmployee(0, itemsPerPage);
    Swal.fire({
      text: "Deletado com sucesso.",
      icon: "success",
      confirmButtonColor: "#00838F",
      timer: 3000,
    });
  };

  useEffect(() => {
    handleDataEmployee(
      0,
      10,
    );
  }, []);

  // Responsavel por chamar dialog, de acordo com o escolhido ele traz a funcao de excluir la de cima
  const handleDelete = (id: number) => {
    Swal.fire({
      text: "Deseja realmente deletar esse Funcionário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00838F",
      cancelButtonColor: "#748492",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
      }
    });
  };

  
    return (
        <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Funcionário
        </Heading>
        <Spacer />
        
        <Button
          colorScheme="teal"
          variant="outline"
          ml={2}
          onClick={() => navigate("/employee/create")}
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
                <Th>Função</Th>
                <Th>Telefone</Th>
                <Th>E-mail</Th>
                <Th>Ativo / Desativo</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employee?.map((e: EmployeeModel) => (
                <Tr key={e?.id} _hover={{ bg: "gray.100" }}>
                  <Td>{e.name}</Td>
                  <Td>{e.position?.name}</Td>
                  <Td>{formatPhone(e.phone)}</Td>
                  <Td>{e.email}</Td>
                  <Td mr={3} 
                  >
                    <Tooltip label={e.active ? "Inativar" : "Ativar"} >
                      <Switch
                        onChange={() => enableDisableEmployee(e.id)}
                        isChecked={e.active}
                        colorScheme="teal"
                      />
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip label="Editar">
                      <IconButton
                        mr={2}
                        onClick={() => navigate(`/employee/${e.id}`)}
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
            onPageChange={handleDataEmployee}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleDataEmployee}
          />
        </TableContainer>
      </Box>
    </Box>
    )
}