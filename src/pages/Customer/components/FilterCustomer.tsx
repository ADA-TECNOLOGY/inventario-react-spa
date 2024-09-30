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
import { filterCostumerFormSchema, FilterCustomerFormData } from "./formSchema";
import MaskedInput from "react-text-mask";
import { cpfMask } from "../../../util/masksInput";

export default function FilterCostumer({ handleFilter }: any) {
  const { register, control, getValues, reset } =
    useForm<FilterCustomerFormData>({
      resolver: yupResolver(filterCostumerFormSchema) as any,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitFilter = () => {
    const name = getValues().name;
    const document = getValues().document?.replace(/[.\-/() ]/g, "");
    const active = getValues().active;
    handleFilter(0, 10, active, document, name);
    reset();
  };

  return (
    <>
      <Tooltip label="Filtro">
        <Button ml={2} colorScheme="teal" variant="outline" onClick={onOpen}>
          Filtros <MdFilterList />
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtrar Cliente</DrawerHeader>
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
                <Input {...register("name")} />
              </FormControl>
              <FormControl>
                <FormLabel>CPF/CNPJ</FormLabel>
                <Controller
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={cpfMask}
                      id="document" {...register("document")}
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
