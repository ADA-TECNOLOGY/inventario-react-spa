import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditSupplierFormData, editSupplierFormSchema } from "./formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";
import axios from "axios";
import { StateModel } from "../../../model/State.model";
import { CitiesModel } from "../../../model/Cities.model";
import MaskedInput from "react-text-mask";
import {
  cepMask,
  cnpjMask,
  cpfMask,
  phoneNumberMask,
} from "../../../util/masksInput";
import { SupplierModel } from "../../../model/Supplier.model";
import { formatPostalCode } from "../../../util/formatPostalCode";
import { formatPhone } from "../../../util/formatPhone";
import { formatDocument } from "../../../util/formatDocument";

export default function EditSupplier() {
  const [disableNumber, setDisableNumber] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    clearErrors,
    resetField,
    
  } = useForm<EditSupplierFormData>({
    resolver: yupResolver(editSupplierFormSchema(disableNumber)) as any,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [ufs, setUfs] = useState<StateModel[]>([]);
  const [cities, setCities] = useState<CitiesModel[]>([]);
  const [typeDocument, setTypeDocument] = useState("cnpj");
  const { errors } = formState;
  const navigate = useNavigate();
  const { id } = useParams(); // obtem o id que esta na rota
  const controlState = useWatch({ control, name: "address.state" });

  // Função para trazer os dados da tela
  const getBySupplier = async () => {
    try {
      const resp = await api.get(`/supplier/${id}`);
      const supplier = resp.data;
      prepareFields(supplier);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  const prepareFields = (supplier: SupplierModel) => {
    setValue("corporateName", supplier.corporateName);
    setValue("tradeName", supplier.tradeName);
    setValue("document", formatDocument(supplier.document));
    setValue("phone", formatPhone(supplier.phone));
    setValue("email", supplier.email);
    setValue("address", supplier.address);
    setValue(
      "address.postalCode",
      formatPostalCode(supplier.address.postalCode)
    );
    if (supplier.address.number == null) {
      setDisableNumber(true) 
    }
  };

  //Salva o dados do fornecedor
  const handleUpdateSupplier: SubmitHandler<EditSupplierFormData> = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        const formData = {
          ...values,
          postalCode: values.address.postalCode.replace(/\D/g, ""),
          phone: values.phone.replace(/\D/g, ""),
          document: values.document.replace(/[.\-/() ]/g, ""),
        };
        await api.put(`/supplier/${id}`, formData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Fornecedor atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/supplier");
        }, 3000);
      } catch (error) {
        console.error("Erro ao atualizar Fornecedor:", error);
      }
      setIsLoading(false);
    },
    []
  );

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
        clearErrors("address");
      } catch (error) {
        console.log("Error ao buscar cep", error);
      }
    }
  };

  //usada para atualizar o estado typeDocument com um novo valor
  const handleTypeDocumentChange = (value: any) => {
    setTypeDocument(value);
  };

  const handleNoNumber = (e: any) => {
    const checkbox = e.target.checked;
    setDisableNumber(checkbox);
    if (checkbox) {
      resetField("address.number");
      setValue("address.number", "");
      clearErrors("address.number");
    }
  };

  useEffect(() => {
    dataState(); // Chama a função para buscar os estados
    getBySupplier(); // chama a funcao de trazer os dados da tela
    setValue("address.city", getValues().address.city);

    if (controlState) {
      handleCity();
    }
  }, [controlState]);

  return (
    <Box mb="2%">
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/supplier">
            Fornecedores
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={"teal"}>Editar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={handleSubmit(handleUpdateSupplier)} mt="5">
            <SimpleGrid
              mt={3}
              columns={[1, 2]}
              spacing={5}
              templateColumns={["1fr", "5fr 5fr"]}
            >
              <FormControl isInvalid={!!errors.corporateName}>
                <FormLabel>Razão social</FormLabel>
                <Input id="corporateName" {...register("corporateName")} />
                {errors.corporateName && (
                  <FormErrorMessage>
                    {errors.corporateName.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.tradeName}>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input id="tradeName" {...register("tradeName")} />
                {errors.tradeName && (
                  <FormErrorMessage>
                    {errors.tradeName.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              alignItems={"center"}
              mt={3}
              columns={[1, 2]}
              spacing={5}
              templateColumns={["1fr", "1fr 5fr"]}
            >
              <RadioGroup
                mt={6}
                value={typeDocument}
                onChange={handleTypeDocumentChange}
              >
                <Stack direction="row">
                  <Radio value="cnpj">CNPJ</Radio>
                  <Radio value="cpf">CPF</Radio>
                </Stack>
              </RadioGroup>
              <FormControl isInvalid={!!errors.document}>
                <FormLabel>
                  {typeDocument === "cnpj" ? "CNPJ" : "CPF"}
                </FormLabel>
                <Controller
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={typeDocument === "cnpj" ? cnpjMask : cpfMask}
                      id="document"
                      {...field}
                    />
                  )}
                />
                {errors.document && (
                  <FormErrorMessage>{errors.document.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={[1, 2]}
              spacing={2}
              templateColumns={["1fr", "1fr 3fr"]}
            >
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Fone</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={phoneNumberMask}
                      onKeyDown={handlePostalCodeSearch}
                      id="phone"
                      type="text"
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={[1, 2, 4]}
              spacing={5}
              templateColumns={["1fr", "1fr 3fr", "2fr 4fr 1fr 1fr"]}
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
                      id="address.postalCode"
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
              <FormControl mt={9}>
                <Checkbox
                  size="lg"
                  onChange={handleNoNumber}
                  colorScheme="teal"
                  isChecked={disableNumber}
                >
                  S/N
                </Checkbox>
              </FormControl>
              <FormControl isInvalid={!!errors?.address?.number}>
                <FormLabel>Número</FormLabel>
                <Input
                  isDisabled={disableNumber}
                  id="address.number"
                  {...register("address.number")}
                />
                {errors.address?.number && (
                  <FormErrorMessage>
                    {errors.address?.number.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={[1, 3]}
              spacing={5}
              templateColumns={["1fr", "4fr 1fr 4fr"]}
            >
              <FormControl isInvalid={!!errors.address?.district}>
                <FormLabel>Bairro</FormLabel>
                <Input
                  id="address.district"
                  {...register("address.district")}
                />
                {errors.address?.district && (
                  <FormErrorMessage>
                    {errors.address?.district.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.address?.state}>
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
              <FormControl isInvalid={!!errors.address?.city}>
                <FormLabel>Cidade</FormLabel>
                <Select id="address.city" {...register("address.city")}>
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
            </SimpleGrid>
            <SimpleGrid mt={3}>
              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input {...register("address.complement")} />
              </FormControl>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button
                type="submit"
                colorScheme={"teal"}
                mt={5}
                isLoading={isLoading}
              >
                Salvar Alterações
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
