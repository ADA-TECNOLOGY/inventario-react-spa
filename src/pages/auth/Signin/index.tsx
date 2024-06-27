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
  Spacer,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

type SignInFormData = {
  login: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  login: yup.string().required("Login obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")});

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState, setError } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema) as any,
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = useCallback(
    async (values) => {
      console.log(values);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { login, password } = values;

      const data = {
        login,
        password,
      };

      if(data.login == 'admin' && data.password == '123456' ){
        navigate("/home");
      }else{
        setError("password", {
            message: "Email ou senha incorretos. Por favor, tente novamente."
        })
        setError("login", {})
      }
      setIsLoading(false);
     
    },
    []
  );

  return (
    <Container mt={"10%"} color="white">
      <Card>
        <CardBody textAlign={"center"}>
          <Heading color={"teal"} size="md">
            Inventário
          </Heading>
          <Text color={"gray.400"} size="sm">
            Autenticar
          </Text>
          <Box as="form" onSubmit={handleSubmit(handleSignIn)}>
            <FormControl isInvalid={!!errors.login}>
              <FormLabel>Login</FormLabel>
              <Input id="login" {...register("login")} />
              {errors.login && (
                <FormErrorMessage>{errors.login.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" id="password" {...register("password")} />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <Flex mt={5} color={"blue.400"}>
              <Link to={"/forgotpassword"}>Recuperar Senha</Link>
              <Spacer />
              <Link to={"/signup"}>Cadastre-se</Link>
            </Flex>
            <Button
              type="submit"
              colorScheme={"teal"}
              width={"100%"}
              mt={5}
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
}
