import {
  Button,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { Page } from "../..";
import { useNavigate } from "react-router-dom";

export default function SendCode({ eventNextPage }: any) {
  const navigate = useNavigate();
  const handleValidate = () => {
    eventNextPage(Page.RedefinePassword)
  }
  return (
    <>
      <Center mt={5}>
        <HStack>
          <PinInput type="alphanumeric">
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
        <Text size={"small"}>Aguarde 1:20 para reenviar o codigo</Text>
        <Button isDisabled={true} variant="ghost">
          Não recebi o código
        </Button>
      </Center>
      <Button
        colorScheme={"teal"}
        onClick={handleValidate}
        width={"100%"}
        mt={2}
        // isLoading={isLoading}
      >
        Validar
      </Button>
      <Button
        type="submit"
        colorScheme={"teal"}
        variant={"outline"}
        width={"100%"}
        mt={2}
        onClick={() => navigate('/signin')}
        // isLoading={isLoading}
      >
        Voltar
      </Button>
    </>
  );
}
