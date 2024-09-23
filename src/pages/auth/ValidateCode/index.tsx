import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../../util/formatTime";
import { formatEmailSecurity } from "../../../util/formatEmailSecurity";
import axios from "axios";
import Swal from "sweetalert2";

export default function ValidateCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingValidate, setIsLoadingValidate] = useState<boolean>(false);
  const toast = useToast();
  const [seconds, setSeconds] = useState(120);
  const email = localStorage.getItem("emailValidate")

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId); // Limpa o timeout se o componente for desmontado
    }
  }, [seconds]);

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/emailValidation/sendEmailCode",
        email,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      toast({
        description: "Código reenviado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      setSeconds(120);
    } catch (error) {
      setIsLoading(false);
      toast({
        description: "Error ao enviar código",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleValidateCode = async () => {
    setIsLoadingValidate(true);
    const body = {
      email,
      code,
    };
    try {
      await axios.post(
        "http://localhost:8080/emailValidation/verifyEmailCode",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sucesso",
        text: "Conta validada com sucesso!",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      setIsLoadingValidate(false);
      toast({
        description: "Código invalido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container mt={"10%"} maxW={"container.md"} mb="2%">
      <Card>
        <CardBody textAlign="center">
          <Heading color="teal" size="md">
            Inventário
          </Heading>

          <Text color="gray.600" size="sm" mt={2}>
            Digite abaixo o código que nós enviamos para
          </Text>
          <Text>{formatEmailSecurity(email)}</Text>

          <Center mt={5}>
            <HStack>
              <PinInput onChange={(e: any) => setCode(e)} type="alphanumeric">
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
          <Center mt={5}>
            {seconds > 0 && (
              <Text size={"small"}>
                Aguarde <strong>{formatTime(seconds)}</strong> para reenviar o
                codigo
              </Text>
            )}
            <Button
              isLoading={isLoading}
              onClick={handleResendCode}
              isDisabled={seconds > 0}
              ml={3}
              variant="outline"
            >
              Não recebi o código
            </Button>
          </Center>
          <Button
            colorScheme={"teal"}
            onClick={handleValidateCode}
            width={"100%"}
            isDisabled={code?.length < 6}
            mt={2}
            isLoading={isLoadingValidate}
          >
            Validar
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
}
