import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RedefinePasswordFormData,
  RedefinePasswordFormSchema,
} from "./formSchema";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RedefinePassword() {
  const { register, handleSubmit, formState } =
    useForm<RedefinePasswordFormData>({
      resolver: yupResolver(RedefinePasswordFormSchema) as any,
    });

  const [isLoading, setIsLoading] = useState(false);
  const { errors } = formState;
  const navigate = useNavigate();

  const handleRedefinePassword: SubmitHandler<RedefinePasswordFormData> =
    useCallback(async (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/signin")
      }, 2000);
      console.log(values);
    }, []);

  return (
    <Box as="form" onSubmit={handleSubmit(handleRedefinePassword)}>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Senha</FormLabel>
        <Input type="password" id="password" {...register("password")} />
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
          <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        colorScheme={"teal"}
        width={"100%"}
        mt={3}
        isLoading={isLoading}
      >
        Redefinir Senha
      </Button>
    </Box>
  );
}
