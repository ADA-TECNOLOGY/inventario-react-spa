import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SendEmailFormData, sendEmailFormSchema } from "./formSchema";
import { useCallback, useState } from "react";
import { Page } from "../..";

export default function SendEmail({ eventNextPage }: any) {
  const { register, handleSubmit, formState } = useForm<SendEmailFormData>({
    resolver: yupResolver(sendEmailFormSchema) as any,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { errors } = formState;

  const handleSendEmail: SubmitHandler<SendEmailFormData> = useCallback(
    async (values) => {
      setIsLoading(true);
      eventNextPage(Page.SendCode);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.log(values);
    },
    []
  );

  return (
    <Box as="form" onSubmit={handleSubmit(handleSendEmail)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        colorScheme={"teal"}
        width={"100%"}
        mt={5}
        isLoading={isLoading}
      >
        Enviar
      </Button>
      <Flex mt={5} color={"blue.400"}>
        <Link to={"/signin"}>Já possui conta?</Link>
      </Flex>
    </Box>
  );
}
