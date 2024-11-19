import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PickList from "../components/PickList/indext";
import { useCallback, useState } from "react";
import api from "../../../services/api";
import { PositionFormData, positionFormSchema } from "../formSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

export default function CreatePosition() {
  const [rolesPosition, setRolesPosition] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState} =
    useForm<PositionFormData>({
      resolver: yupResolver(positionFormSchema) as any,
    });
  const { errors } = formState;

  const handleGetRolesSelecteds = (roles: []) => {
    console.log(roles)
    setRolesPosition(roles);
  };

  const handleSave: SubmitHandler<PositionFormData> = useCallback(
    async (values) => {
        setIsLoading(true);

      try {
        const body = {
          name: values.name,
          roles: rolesPosition,
        };
        await api.post("position", body);
        Swal.fire({
            icon: "success",
            title:"Função cadastrado com sucesso!",
            showConfirmButton: false,
            timer: 1500,
        })
        setTimeout(() => {
            navigate("/position")
        }, 3000)
      } catch (error) {
        Swal.fire({
            icon: "error",
            title:"Erro",
            showConfirmButton: false,
            timer: 1500,
        })
      }

      setIsLoading(false)
    },
    [rolesPosition]
  );
  
  return (
    <Box mb="2%">
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/position">
            Funções
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={"teal"}>Cadastro</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={handleSubmit(handleSave)} mt="5">
            <SimpleGrid mt={3} columns={2} spacing={5} templateColumns="5fr">
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={4}>
              <PickList
                rolePositon={[]}
                handleGetRolesSelecteds={handleGetRolesSelecteds}
              ></PickList>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button
                type="submit"
                colorScheme={"teal"}
                mt={5}
                isLoading={isLoading}
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
