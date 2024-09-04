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
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CreateCustomerFormData, createCustomerFormSchema, Address } from './formSchema';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateModel } from "../../../model/State.model";
import { CitiesModel } from "../../../model/Cities.model";
import MaskedInput from "react-text-mask";
import {
  cepMask,
  cnpjMask,
  cpfMask,
  phoneNumberMask,
} from "../../../util/masksInput";
import api from "../../../services/api";
import Swal from "sweetalert2";
import axios from "axios";

export default function CreateCustomer() {
  const { register, control, handleSubmit, formState, getValues, setValue } =
    useForm<CreateCustomerFormData>({
      resolver: yupResolver(createCustomerFormSchema) as any,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [ufs, setUfs] = useState<StateModel[]>([]);
  const [cities, setCities] = useState<CitiesModel[]>([]);
  const [typeDocument, setTypeDocument] = useState("cnpj");
  const { errors } = formState;
  const navigate = useNavigate();

  //FUncao para salvar dados de cadastro
  const handleCreateCustomer: SubmitHandler<CreateCustomerFormData> =
    useCallback(async (values) => {
        setIsLoading(true)
        try{
            const formData = {
                ...values,
                postalCode: values.address.postalCode.replace(/\D/g, ""),
                phone: values.phone.replace(/\D/g, ""),
                document: values.document.replace(/[.\-/() ]/g, ""),
            }
            await api.post("/customer", formData)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cliente salvo com sucesso!",
                showConfirmButton: false,
                timer: 1500,
            })
            setTimeout(() => {
                navigate("/customer")
            }, 3000)
        } catch(error) {
            console.error("Error ao tentar salvar cliente", error)
        }
        setIsLoading(false);
    },[])

    //usada para buscar ums lista de estado por UF de uma API
  const dataState = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/state"); //faz a requisicao
      const sortUfs = resp.data.sort(); //ordena os estados recebidos
      setUfs(sortUfs); // Armazena os estados ordenados no estado 'ufs'
      setUfs(resp.data);
    } catch (error) {
      console.error("Error ao buscar UF", error); // Captura e exibe um erro no console, caso ocorra
    }
  };

  useEffect(() => {
    dataState(); // Chama a função para buscar os estados
    setValue("address.city", getValues().address.city);
  }, [cities]);

  //busca uma lista de cidades usando a API do IBGE(conforme a uf selecionada)
  const handleCity = async () => {
    const state = getValues().address.state; //obtem o valor da UF selecionada no campo
    try {
      // Faz uma requisição GET para a API do IBGE para buscar as cidades da UF selecionada
      const resp = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
      );
      const sortedCities = resp.data.sort(
        (
          a: any,
          b: any // Ordena as cidades pelo nome
        ) => a.nome.localeCompare(b.nome)
      );
      setCities(sortedCities); // Atualiza o estado 'cities' com a lista de cidades ordenadas
    } catch (error) {
      // Captura e exibe um erro no console, caso ocorra
      console.error("Error ao buscar Cidade", error);
    }
  };

  //Funcao para pegar Cep (get)
  const handlePostalCodeSearch = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const postalCode = getValues().address.postalCode;
      try {
        const resp = await axios.get(
          `https://brasilapi.com.br/api/cep/v1/${postalCode}`
        );
        const { state, city, neighborhood, street } = resp.data;
        setValue("address.state", state);
        setValue("address.district", neighborhood);
        setValue("address.street", street);
        handleCity();
        setValue("address.city", city);
      } catch (error) {
        console.log("Error ao buscar cep", error);
      }
    }
  };

  //usada para atualizar o estado typeDocument com um novo valor
  const handleTypeDocumentChange = (value: any) => {
    setValue('document', '')
    setTypeDocument(value);
    setValue("document", "")
  };

  return (
    <Box mb="2%">
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/customer">
            Cliente
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text color={"teal"}>Cadastro</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={handleSubmit(handleCreateCustomer)} mt={5}>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns={"5fr 5fr"}
            >
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <FormErrorMessage>
                    {errors.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.document}>
                <FormLabel>CPF</FormLabel>
                <Controller
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={cpfMask}
                      id="document" {...register("document")}
                      {...field}
                    />
                  )}
                />
                {errors.document && (
                  <FormErrorMessage>
                    {errors.document.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns={"6fr 3fr 3fr"}
            >
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <FormErrorMessage>
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Fone</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={phoneNumberMask}
                      id="phone" {...register("phone")}
                      type="text"
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <FormErrorMessage>
                    {errors.phone.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.birthDate}>
                <FormLabel>Data Nascimento</FormLabel>
                <Input type="date" id="birthDate" {...register("birthDate")} />
                {errors.birthDate && (
                  <FormErrorMessage>
                    {errors.birthDate.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={4}
              spacing={5}
              templateColumns={"3fr 4fr 2fr 3fr"}
            >
              <FormControl isInvalid={!!errors?.address?.postalCode}>
                <FormLabel>Cep</FormLabel>
                <Controller
                  name="address.postalCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={cepMask}
                      onKeyDown={handlePostalCodeSearch}
                      id="address.postalCode"  {...register("address.postalCode")}
                      type="text"
                      {...field}
                    />
                  )}
                />
                 {errors?.address?.postalCode && (
                  <FormErrorMessage>
                    {errors?.address?.postalCode.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors?.address?.street}>
                <FormLabel>Endereço</FormLabel>
                <Input id="address.street" {...register("address.street")} />
                {errors?.address?.street && (
                  <FormErrorMessage>
                    {errors?.address?.street.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors?.address?.number}>
                <FormLabel>Número</FormLabel>
                <Input id="address.number" {...register("address.number")} />
                {errors?.address?.number && (
                  <FormErrorMessage>
                    {errors?.address?.number.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors?.address?.district}>
                <FormLabel>Bairro</FormLabel>
                <Input id="address.district" {...register("address.district")} />
                {errors?.address?.district && (
                  <FormErrorMessage>
                    {errors?.address?.district.message}
                  </FormErrorMessage>

                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns={"1fr 4fr 6fr"}
            >
              <FormControl isInvalid={!!errors?.address?.state}>
                <FormLabel>UF</FormLabel>
                <Select 
                    onClick={handleCity}
                    id="address.state" 
                    {...register("address.state")}
                >
                    <option></option>
                  {ufs.map((uf: any) => (
                    <option key={uf.id} value={uf.acronym}>
                      {uf.acronym}
                    </option>
                  ))}
                </Select>
                {errors.address?.state && (
                  <FormErrorMessage>
                    {errors.address?.state.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors?.address?.city}>
                <FormLabel>Cidade</FormLabel>
                <Select
                    id="address.city" 
                    {...register("address.city")}
                >
                    <option></option>
                  {cities.map((citie: any) => (
                    <option key={citie.id} value={citie.nome}>
                      {citie.nome}
                    </option>
                  ))}
                </Select>
                {errors.address?.city && (
                  <FormErrorMessage>
                    {errors.address?.city.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input {...register("address.complement")} />
              </FormControl>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button type="submit" colorScheme={"teal"} width={"15%"} mt={5}>
                Salvar
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
