
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
import Swal from "sweetalert2";


export default function SignUp() {
  const { register, handleSubmit, getValues, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema) as any,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uf, setUf] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([])
  const { errors } = formState;

   //Funcao para salvar empresa (post)
  const handleSignUp: SubmitHandler<SignUpFormData> = useCallback(
    async (values) => {
        setIsLoading(true)
        try{
          await axios.post("http://localhost:8080/company", values)
          Swal.fire({
            title: "Sucesso!",
            text: "Em alguns instantes você recebera um e-mail de confirmação da sua conta",
            icon: "success"
          });
        } catch(error: any) {
          const data = error.response.data;
          if(data.details){
            Swal.fire({
              icon: "warning",
              title: "Alerta",
              text: `${data.details}`,
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Error",
              text: `${error?.message}`,
            });
          }
          
        }
        setIsLoading(false)
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
      const ufs = getValues().state
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
              <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="4fr 4fr"
            >
              <FormControl isInvalid={!!errors.corporateName}>
                <FormLabel>Razão Social</FormLabel>
                <Input id="corporateName" {...register("corporateName")} />
                {errors.corporateName && (
                <FormErrorMessage>{errors.corporateName.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.tradeName}>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input id="tradeName" {...register("tradeName")} />
                {errors.tradeName && (
                <FormErrorMessage>{errors.tradeName.message}</FormErrorMessage>
              )}
              </FormControl>
              </SimpleGrid>
              <FormControl mt={2} isInvalid={!!errors.cnpj}>
                <FormLabel>CNPJ</FormLabel>
                <Input as={InputMask} mask='**.***.***/****-**' id="cnpj" {...register("cnpj")} />
                {errors.cnpj && (
                <FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
              )}
              </FormControl>
              <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="3fr 1fr"
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
                <Input as={InputMask} mask='(**) *****-****' type='tel' id="phone"  {...register("phone")} />
                {errors.phone && (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              )}
              </FormControl>
              </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="3fr 1fr"
            >
              <FormControl isInvalid={!!errors.address}>
                <FormLabel>Endereço</FormLabel>
                <Input id="address"  {...register("address")} />
                {errors.address && (
                <FormErrorMessage>{errors.address.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.number}>
                <FormLabel>Número</FormLabel>
                <Input id="number"  {...register("number")} />
                {errors.number && (
                <FormErrorMessage>{errors.number.message}</FormErrorMessage>
              )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={3}
              spacing={5}
              templateColumns="3fr 1fr 3fr"
            >
              <FormControl isInvalid={!!errors.postalCode}>
                <FormLabel>Cep</FormLabel>
                <Input as={InputMask} mask='**.***-***' id="postalCode"  {...register("postalCode")} />
                {errors.postalCode && (
                <FormErrorMessage>{errors.postalCode.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.state}>
                <FormLabel>UF</FormLabel>
                <Select onClick={handleCity} id="state" {...register("state")}  >
                  <option></option>
                  {uf.map((state: any) => (
                    <option key={state.id} value={state.acronym}>
                      {state.acronym}
                    </option>
                  ))}
                </Select>
                {errors.state && (
                <FormErrorMessage>{errors.state.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.city} >
                <FormLabel>Cidade</FormLabel>
                <Select id="city"  {...register("city")} >
                  <option></option>{cities.map((citie: any) => (
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
                <Input id="complement"  {...register("complement")} />
                {errors.complement && (
                <FormErrorMessage>{errors.complement.message}</FormErrorMessage>
              )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={2}
              columns={2}
              spacing={5}
              templateColumns="2fr 2fr"
            >
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" id="password"  {...register("password")} />
                {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input type="password" id="confirmPassword"  {...register("confirmPassword")} />
                {errors.confirmPassword && (
                <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
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
