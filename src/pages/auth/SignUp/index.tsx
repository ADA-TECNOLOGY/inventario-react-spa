import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { SignUpFormData, signUpFormSchema } from "./formSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState,
    setValue
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema) as any,
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uf, setUf] = useState<string[]>([]);
  const [cities, setCities] = useState<[]>([]);
  const [typeDocument, setTypeDocument] = useState("cnpj");
  const { errors } = formState;

  //Funcao para salvar empresa (post)
  const handleSignUp: SubmitHandler<SignUpFormData> = useCallback(
    async (values) => {
      setIsLoading(true);

      try {
        const formData = {
          ...values,
          postalCode: values.postalCode.replace(/\D/g, ""),
          phone: values.phone.replace(/\D/g, ""),
          cnpj: values.cnpj.replace(/[.\-/() ]/g, ""),
        };

        await axios.post("http://localhost:8080/company", formData);
        Swal.fire({
          title: "Sucesso!",
          text: "Em alguns instantes você recebera um e-mail de confirmação da sua conta",
          icon: "success",
          timer: 3000,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } catch (error: any) {
        const data = error.response.data;
        if (data.details) {
          Swal.fire({
            icon: "warning",
            title: "Alerta",
            text: `${data.details}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${error?.message}`,
          });
        }
        setIsLoading(false);
      }
    },
    []
  );

  //Funcao para trazer ufs
  const dataUf = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/state");
      const sortedUf = resp.data.sort(); //const criada para ordenar lista passando para o retorno da req.
      setUf(sortedUf); // os estado retornando ja com a const de ordenacao
    } catch (error) {
      console.error("Error ao buscar UF", error);
    }
  };

  useEffect(() => {
    dataUf();
    //TODO: Melhorar isso
    setValue("city", getValues().city)

  }, [cities]);

  //Funcao para trazer as cidades ao clicar na UF
  const handleCity = async () => {
    const state = getValues().state
    try {
      const resp = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
      );
      const sortedCities = resp.data.sort((a: any, b: any) =>
        a.nome.localeCompare(b.nome)
      );
      setCities(sortedCities);
      console.log(cities)
    } catch (error) {
      console.error("Error ao buscar Cidades");
    }
  };

    //Funcao para pegar Cep (get)
    const handlePostalCodeSearch = async (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const postalCode = getValues().postalCode;
        try {
          const resp = await axios.get(
            `https://brasilapi.com.br/api/cep/v1/${postalCode}`
          );
          const { state, city, neighborhood, street } = resp.data;
          setValue("state", state);
          setValue("district", neighborhood);
          setValue("street", street);
          handleCity();
          setValue("city", city)
          console.log(getValues().city)
        } catch (error) {
          console.log(error);
        }
      }
    };

  //Funcao para atualizar o estado typedocument com novo valor
  const handleTypeDocumentChange = (value: any) => {
    setTypeDocument(value);
  };

  return (
    <Container maxW="container.md" mt="2%" mb="2%">
      <Card>
        <CardBody textAlign="center">
          <Heading color="teal" size="md">
            Inventário
          </Heading>
          <Text color="gray.400" size="sm">
            Cadastrar uma conta
          </Text>
          <Box as="form" onSubmit={handleSubmit(handleSignUp)} mt="5">
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={3}
              templateColumns="4fr 4fr"
            >
              <FormControl isInvalid={!!errors.corporateName}>
                <FormLabel>Razão Social</FormLabel>
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
              mt={2}
              columns={2}
              spacing={3}
              templateColumns="1fr 4fr "
            >
              <RadioGroup
                mt={9}
                value={typeDocument}
                onChange={handleTypeDocumentChange}
              >
                <Stack direction="row">
                  <Radio value="cnpj">CNPJ</Radio>
                  <Radio value="cpf">CPF</Radio>
                </Stack>
              </RadioGroup>
              <FormControl isInvalid={!!errors.cnpj}>
                <FormLabel>
                  {typeDocument === "cnpj" ? "CNPJ" : "CPF"}
                </FormLabel>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...register("cnpj")}
                      id="cnpj"
                      {...field}
                    />
                  )}
                />
                {errors.cnpj && (
                  <FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={3}
              templateColumns="3fr 2fr "
            >
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Fone</FormLabel>
                <Input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                />
                {errors.phone && (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={3}
              spacing={3}
              templateColumns="1fr 3fr 1fr"
            >
              <FormControl isInvalid={!!errors.postalCode}>
                <FormLabel>Cep</FormLabel>
                <Input
                  onKeyDown={handlePostalCodeSearch}
                  id="postalCode"
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <FormErrorMessage>
                    {errors.postalCode.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.street}>
                <FormLabel>Endereço</FormLabel>
                <Input id="street" {...register("street")} />
                {errors.street && (
                  <FormErrorMessage>{errors.street.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.number}>
                <FormLabel>Número</FormLabel>
                <Input id="number" {...register("number")} />
                {errors.number && (
                  <FormErrorMessage>{errors.number.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={4}
              spacing={3}
              templateColumns="2fr 1fr 3fr"
            >
              <FormControl isInvalid={!!errors.district}>
                <FormLabel>Bairro</FormLabel>
                <Input id="district" {...register("district")} />
                {errors.district && (
                  <FormErrorMessage>{errors.district.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.state}>
                <FormLabel>UF</FormLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onChange={(e) => {
                        field.onChange(e);
                        handleCity();
                      }}
                      id="state"
                      value={field.value}
                    >
                      <option></option>
                      {uf.map((state: any) => (
                        <option key={state.id} value={state.acronym}>
                          {state.acronym}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.state && (
                  <FormErrorMessage>{errors.state.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.city}>
                <FormLabel>Cidade</FormLabel>
                <Select id="city" {...register("city")}>
                  <option></option>
                  {cities.map((citie: any) => (
                    <option key={citie.id} value={citie.nome}>
                      {citie.nome}
                    </option>
                  ))}
                  {errors.city && (
                    <FormErrorMessage>{errors.city.message}</FormErrorMessage>
                  )}
                </Select>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={1} mt={2}>
              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input id="complement" {...register("complement")} />
                {errors.complement && (
                  <FormErrorMessage>
                    {errors.complement.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={3}
              templateColumns="2fr 2fr"
            >
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <Button
              type="submit"
              colorScheme={"teal"}
              width={"100%"}
              mt={5}
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
            <Flex mt={5} color={"blue.400"}>
              <Link to={"/signin"}>Já possui conta?</Link>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}
