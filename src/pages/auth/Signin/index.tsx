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
import axios from "axios";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../../hooks/auth";

type SignInFormData = {
  login: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();

  const { register, handleSubmit, formState, setError } =
    useForm<SignInFormData>({
      resolver: yupResolver(signInFormSchema) as any,
    });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = useCallback(
    async (values) => {
      localStorage.removeItem("emailValidate");
      setIsLoading(true);
      try {
        const resp = await axios.post(
          "http://localhost:8080/auth/login",
          values
        );
        if (resp.data.confirmedAccount) {
          setToken(resp.data.token);
          localStorage.setItem("expiresIn", resp.data.expiresIn )
          navigate("/");
          setIsLoading(false);
        } else {
          await axios.post(
            "http://localhost:8080/emailValidation/sendEmailCode",
            values.login,
            {
              headers: {
                "Content-Type": "text/plain",
              },
            }
          );
          navigate("/validatecode");
          localStorage.setItem("emailValidate", resp.data.email);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError("login", {}),
          setError("password", {
            message: "Email ou senha incorretos. Por favor, tente novamente.",
          });
      }
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
