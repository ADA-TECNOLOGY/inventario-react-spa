import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { RedefinePasswordFormData, RedefinePasswordFormSchema } from "./formSchema";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RedefinePassword() {
     const { register, handleSubmit, formState } = useForm<RedefinePasswordFormData>({
        resolver: yupResolver(RedefinePasswordFormSchema) as any,
      });
    
      const [isLoading, setIsLoading] = useState(false);
      const { errors } = formState;
      const navigate = useNavigate();
    
      const handleRedefinePassword: SubmitHandler<RedefinePasswordFormData> = useCallback(
        async (values) => {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
            console.log(values)
        },  [])
    return (
        <Box  as='form' onSubmit={handleSubmit(handleRedefinePassword)}>
            <FormControl isInvalid={!!errors.senha}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" id="senha"  {...register("senha")}/>
                {errors.senha && (
                <FormErrorMessage>{errors.senha.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.confirmarSenha}>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input type="password" id="confirmarSenha"  {...register("confirmarSenha")}/>
                {errors.confirmarSenha && (
                <FormErrorMessage>{errors.confirmarSenha.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              type="submit"
              colorScheme={"teal"}
              width={"100%"}
              mt={3}
              isLoading={isLoading}
              onClick={() => navigate('/signin')}
            >
              Redefinir Senha
            </Button>
        </Box>
    )
}