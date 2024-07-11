import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Container,
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
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup"; // esquema de validacao
import { Controller, SubmitHandler, useForm } from "react-hook-form"; // Hooks e funções do react-hook-form para gerenciamento de formulários.
import { createSupplierData, createSupplierFormSchema } from "./formSchema";
import { useCallback, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateSupplier() {
  const { register, control, handleSubmit, formState, getValues } =
    useForm<createSupplierData>({
      resolver: yupResolver(createSupplierFormSchema) as any,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [ufs, setUfs] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [typeDocument, setTypeDocument] = useState("cnpj");
  const { errors } = formState;

  //Salva o dados do fornecedor
  const handleCreateSupplier: SubmitHandler<createSupplierData> = useCallback(
    async (values) => {
      setIsLoading(true); //inicia o estado(como true)
      setTimeout(() => {
        setIsLoading(false);
        console.log(values);
      }, 2000);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Fornecedor salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    []
  );

  //usada para buscar ums lista de estado por UF de uma API
  useEffect(() => {
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
    dataState(); // Chama a função para buscar os estados
  }, []);

  //busca uma lista de cidades usando a API do IBGE(conforme a uf selecionada)
  const handleCity = async () => {
    const uf = getValues().uf; //obtem o valor da UF selecionada no campo
    try {
      // Faz uma requisição GET para a API do IBGE para buscar as cidades da UF selecionada
      const resp = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const sortedCities = resp.data.sort((a: any, b: any) => // Ordena as cidades pelo nome
        a.nome.localeCompare(b.nome)
      );
      setCities(sortedCities);   // Atualiza o estado 'cities' com a lista de cidades ordenadas
    } catch (error) {
       // Captura e exibe um erro no console, caso ocorra
      console.error("Error ao buscar Cidade", error);
    }
  };

  //usada para atualizar o estado typeDocument com um novo valor
  const handleTypeDocumentChange = (value:any) => {
    setTypeDocument(value)
  };

  return (
    <Container maxW="container.lg" mb="2%">
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/supplier">Fornecedores</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={"teal"}>Cadastro</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={handleSubmit(handleCreateSupplier)} mt="5">
            <SimpleGrid
              mt={3} // espacamento entre input de cima e o debaixo
              columns={2} // quantidade de colunas
              spacing={5} // espacamento entre um input e outro
              templateColumns="5fr 5fr"
            >
              <FormControl isInvalid={!!errors.razaoSocial}>
                <FormLabel>Razão social</FormLabel>
                <Input id="razaoSocial" {...register("razaoSocial")} />
                {errors.razaoSocial && (
                  <FormErrorMessage>
                    {errors.razaoSocial.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.nomeFantasia}>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input id="nomeFantasia" {...register("nomeFantasia")} />
                {errors.nomeFantasia && (
                  <FormErrorMessage>
                    {errors.nomeFantasia.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              alignItems={"center"}
              mt={3}
              columns={3}
              spacing={5}
              templateColumns="1fr 5fr 3fr"
            >
              <RadioGroup mt={6} value={typeDocument} onChange={handleTypeDocumentChange}>
                <Stack direction="row">
                  <Radio value="cnpj">CNPJ</Radio>
                  <Radio value="cpf">CPF</Radio>
                </Stack>
              </RadioGroup>
              <FormControl isInvalid={!!errors.cnpj}>
                <FormLabel>{typeDocument === "cnpj" ? "CNPJ" : "CPF"}</FormLabel>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={InputMask}
                      mask={typeDocument === "cnpj" ? "99.999.999/9999-99" : "999.999.999-99"}
                      id="cnpj"
                      {...field}
                    />
                  )}
                />
                {errors.cnpj && (
                  <FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.fone}>
                <FormLabel>Fone</FormLabel>
                <Input
                  as={InputMask}
                  mask="(**) *****-****"
                  type="tel"
                  id="fone"
                  {...register("fone")}
                />
                {errors.fone && (
                  <FormErrorMessage>{errors.fone.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns="2fr 6fr 1fr"
            >
              <FormControl isInvalid={!!errors.cep}>
                <FormLabel>Cep</FormLabel>
                <Input
                  as={InputMask}
                  mask="**.***-***"
                  id="cep"
                  {...register("cep")}
                />
                {errors.cep && (
                  <FormErrorMessage>{errors.cep.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.endereco}>
                <FormLabel>Endereço</FormLabel>
                <Input id="endereco" {...register("endereco")} />
                {errors.endereco && (
                  <FormErrorMessage>{errors.endereco.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.numero}>
                <FormLabel>Número</FormLabel>
                <Input id="numero" {...register("numero")} />
                {errors.numero && (
                  <FormErrorMessage>{errors.numero.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns="4fr 1fr 4fr"
            >
              <FormControl isInvalid={!!errors.bairro}>
                <FormLabel>Bairro</FormLabel>
                <Input id="bairro" {...register("bairro")} />
                {errors.bairro && (
                  <FormErrorMessage>{errors.bairro.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.uf}>
                <FormLabel>UF</FormLabel>
                <Select onClick={handleCity} id="uf" {...register("uf")}>
                  <option></option>
                  {ufs.map((uf: any) => (
                    <option key={uf.id} value={uf.acronym}>
                      {uf.acronym}
                    </option>
                  ))}
                </Select>
                {errors.uf && (
                  <FormErrorMessage>{errors.uf.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.cidade}>
                <FormLabel>Cidade</FormLabel>
                <Select id="cidade" {...register("cidade")}>
                  <option></option>
                  {cities.map((citie: any) => (
                    <option key={citie.id} value={citie.nome}>
                      {citie.nome}
                    </option>
                  ))}
                </Select>
                {errors.cidade && (
                  <FormErrorMessage>{errors.cidade.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={3}>
              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={3}>
              <FormControl>
                <FormLabel>Observação</FormLabel>
                <Textarea />
              </FormControl>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button
                type="submit"
                colorScheme={"teal"}
                width={"15%"}
                mt={5}
                isLoading={isLoading}
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}
