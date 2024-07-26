import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import api from "../../services/api";
import Pagination from "../../components/PaginationGroupItems";
import { Page } from "../../model/interface/pagination.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateCategoryFormData, createCategoryFormSchema } from "./formSchema";

export default function Category() {
  const { register, control, handleSubmit, formState, getValues, setValue, reset } =
    useForm<CreateCategoryFormData>({
      resolver: yupResolver(createCategoryFormSchema) as any,
    });

  const [pagination, setPagination] = useState<Page>({} as Page);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listCatagory, setListCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [categorySelected, setCategorySelected] = useState<any>();
  const { errors } = formState;

  // Funcao para trazer a listagem dos dados
  const handleListCategory = async (page: number, size: number) => {
    try {
      const resp = await api.get(`/category/page?page=${page}&size=${size}`);
      setPagination(resp.data);
      setListCategory(resp.data.content);
      setItemsPerPage(size);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  const handleSave: SubmitHandler<CreateCategoryFormData> = useCallback(
    async (name) => {
      try {
        console.log(isEdit)
        if(isEdit) {
          await api.put(`/category/${categorySelected.id}`, name);
        } else {
          await api.post("/category", name);
        }

        handleListCategory(0, itemsPerPage);
        Swal.fire({
          text: `Dados ${isEdit ? "Atualizado" : "Salvo"} com sucesso!`,
          icon: "success",
          confirmButtonColor: "#00838F",
          timer: 3000,
        });
      } catch (error) {
        console.error("Erro ao salvar dados", error);
      }
      onClose();
    },
    [isEdit]
  );

  // Funcao para deletar categoria
  const deleteCategory = async (id: number) => {
    await api.delete(`/category/${id}`);
    handleListCategory(0, itemsPerPage);
    Swal.fire({
      text: "Deletado com sucesso.",
      icon: "success",
      confirmButtonColor: "#00838F",
      timer: 3000,
    });
  };

  // Funcao para abrir dialog de edicao
  const editCategory = (category: any) => {
    setIsEdit(true);
    setCategorySelected(category)
    setValue("name", category.name)
    onOpen();
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
        deleteCategory(id);
      }
    });
  };

  useEffect(() => {
    handleListCategory(0, 10);
  }, [isEdit]);

  return (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as="h4" size={"md"}>
          Categorias
        </Heading>
        <Spacer />
        <Button 
          onClick={() =>{onOpen(), 
            setIsEdit(false), reset()}} 
          colorScheme="teal" 
          variant="outline">
          Novo +
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isEdit ? "Atualizar" : "Salvar"} Categoria</ModalHeader>
            <ModalCloseButton />
            <Box as="form" onSubmit={handleSubmit(handleSave)}>
              <ModalBody>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input {...register("name")} />
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  mr={3}
                  type="submit"
                >
                  {isEdit ? "Atualizar" : "Salvar"}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </Modal>
      </Flex>
      <Box borderRadius={2} mt={2} bg={"white"}>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCatagory?.map((e: any) => (
                <Tr key={e.id}>
                  <Td>{e.name}</Td>
                  <Td>
                    <IconButton
                      bg={"white"}
                      title="Editar"
                      onClick={() => editCategory(e)}
                      aria-label={"Detalhe"}
                      color={"teal"}
                      icon={<MdEdit />}
                    ></IconButton>
                    <IconButton
                      onClick={() => handleDelete(e.id)}
                      bg={"white"}
                      title="Deletar"
                      aria-label={"Deletar"}
                      color={"teal"}
                      icon={<MdDelete />}
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
            onPageChange={handleListCategory}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleListCategory}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
