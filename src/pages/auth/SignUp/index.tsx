
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
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { SignUpFormData, signUpFormSchema } from "./formSchema";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import axios from "axios";


export default function SignUp() {
  const { register, handleSubmit, getValues, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema) as any,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uf, setUf] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([])
  const { errors } = formState;

  const handleSignUp: SubmitHandler<SignUpFormData> = useCallback(
    async (values) => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
        console.log(values)
    },  [])

    //Funcao para trazer ufs
    useEffect(() => {
      const dataUf = async () => {
        try {
          const resp = await axios.get("http://localhost:8080/state");
          const sortedUf = resp.data.sort(); //const criada para ordenar lista passando para o retorno da req.
            setUf(sortedUf) // os estado retornando ja com a const de ordenacao
        } catch(error) {
          console.error("Error ao buscar UF", error)
        }
      }
      dataUf()
    }, [])

    //Funcao para trazer as cidades ao clicar na UF
    const handleCity = async () => {
      const ufs = getValues().uf
      try {
        const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufs}/municipios`);
          const sortedCities = resp.data.sort((a:any, b:any) => a.nome.localeCompare(b.nome));
          setCities(sortedCities);
      } catch(error){
        console.error("Error ao buscar Cidades")
      }
    }

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
            <SimpleGrid columns={1} spacing={2}>
              <FormControl isInvalid={!!errors.cnpj}>
                <FormLabel>CNPJ</FormLabel>
                <Input as={InputMask} mask='**.***.***/****-**' id="cnpj" {...register("cnpj")} />
                {errors.cnpj && (
                <FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.nomeFantasia}>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input id="nomeFantasia" {...register("nomeFantasia")} />
                {errors.nomeFantasia && (
                <FormErrorMessage>{errors.nomeFantasia.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" {...register("email")} />
                {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.fone}>
                <FormLabel>Fone</FormLabel>
                <Input as={InputMask} mask='(**) *****-****' type='tel' id="fone"  {...register("fone")} />
                {errors.fone && (
                <FormErrorMessage>{errors.fone.message}</FormErrorMessage>
              )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="3fr 1fr"
            >
              <FormControl isInvalid={!!errors.endereco}>
                <FormLabel>Endereço</FormLabel>
                <Input id="endereco"  {...register("endereco")} />
                {errors.endereco && (
                <FormErrorMessage>{errors.endereco.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.numero}>
                <FormLabel>Número</FormLabel>
                <Input id="numero"  {...register("numero")} />
                {errors.numero && (
                <FormErrorMessage>{errors.numero.message}</FormErrorMessage>
              )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={3}
              spacing={5}
              templateColumns="3fr 1fr 3fr"
            >
              <FormControl isInvalid={!!errors.cep}>
                <FormLabel>Cep</FormLabel>
                <Input as={InputMask} mask='**.***-***' id="cep"  {...register("cep")} />
                {errors.cep && (
                <FormErrorMessage>{errors.cep.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.cep}>
                <FormLabel>UF</FormLabel>
                <Select onClick={handleCity} id="uf" {...register("uf")}  >
                  <option></option>
                  {uf.map((uf: any) => (
                    <option key={uf.id} value={uf.acronym}>
                      {uf.acronym}
                    </option>
                  ))}
                </Select>
                {errors.uf && (
                <FormErrorMessage>{errors.uf.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.cep} >
                <FormLabel>Cidade</FormLabel>
                <Select id="cidade"  {...register("cidade")} >
                  <option></option>{cities.map((citie: any) => (
                    <option key={citie.id} value={citie.nome}>
                      {citie.nome}
                    </option>
                  ))}
                {errors.cidade && (
                <FormErrorMessage>{errors.cidade.message}</FormErrorMessage>
              )}
              </Select>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={1} mt={2}>
              <FormControl isInvalid={!!errors.complemento}>
                <FormLabel>Complemento</FormLabel>
                <Input id="complemento"  {...register("complemento")} />
                {errors.complemento && (
                <FormErrorMessage>{errors.complemento.message}</FormErrorMessage>
              )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="2fr 2fr"
            >
              <FormControl isInvalid={!!errors.senha}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" id="senha"  {...register("senha")} />
                {errors.senha && (
                <FormErrorMessage>{errors.senha.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmarSenha}>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input type="password" id="confirmarSenha"  {...register("confirmarSenha")} />
                {errors.confirmarSenha && (
                <FormErrorMessage>{errors.confirmarSenha.message}</FormErrorMessage>
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
