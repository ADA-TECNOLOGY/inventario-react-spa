import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { MdFilterList } from "react-icons/md";
import { FilterSupplierFormData, filterSupplierFormSchema } from "./formSchema";
import MaskedInput from "react-text-mask";
import { cnpjMask, cpfMask } from "../../../util/masksInput";

export default function FilterSupplier({ handleFilter }: any) {
  const { register, control, getValues, reset } =
    useForm<FilterSupplierFormData>({
      resolver: yupResolver(filterSupplierFormSchema) as any,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitFilter = () => {
    const corporateName = getValues().corporateName;
    const document = getValues().document?.replace(/[.\-/() ]/g, "");
    const active = getValues().active;
    handleFilter(0, 10, document, corporateName, active);
    reset();
  };

  return (
    <>
      <Tooltip label="Filtro">
        <Button ml={2} colorScheme="teal" variant="outline" onClick={onOpen}>
          <MdFilterList />
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtrar Fornecedor</DrawerHeader>
          <DrawerBody>
            <Box
              as="form"
              id="formFilter"
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSubmitFilter();
                onClose();
              }}
            >
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input {...register("corporateName")} />
              </FormControl>
              <FormControl>
                <FormLabel>CPF/CNPJ</FormLabel>
                <Controller
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={field.value?.replace(/\D/g, "").length > 11
                        ? cnpjMask
                        : cpfMask
                      }
                      id="document"
                      {...register("document")}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select {...register("active")}>
                  <option></option>
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </Select>
              </FormControl>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" form="formFilter" colorScheme={"teal"}>
              Filtrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
