import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Autocomplete from "../../../components/Autocomplete";
import api from "../../../services/api";
import { useEffect, useState } from "react";
import { SupplierModel } from "../../../model/Supplier.model";
import ImageUpload from "../../../components/ImageUpload";
import { useForm } from "react-hook-form";
import { productFormData, productFormSchema } from "../formSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<productFormData>({
    resolver: yupResolver(productFormSchema) as any,
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<SupplierModel>
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);

  const handleCategory = async () => {
    setIsLoading(true)
    try {
      const resp = await api.get("category/list")
      setSelectedCategory (resp.data)
    }catch(error) {
      console.error("Error ao buscar dados",error)
    }
  }

  const handleFilter = (e: any) => {
    const corporateName = e;
    const suggestions: any[] = [];

    api.get(`supplier/list?corporateName=${corporateName}`).then((resp) => {
      resp.data.forEach((e: SupplierModel) => {
        const obj = {
          id: e.id,
          name: e.corporateName,
        };
        suggestions.push(obj);
      });
    });
    setFilteredSuggestions(suggestions);
  };

  useEffect(() => {
    handleCategory();
  }, [filteredSuggestions]);

  return (
    <Box mb="2%" as="form" onSubmit={handleSubmit((data) => console.log(data))}>
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/products">
            Produtos
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={"teal"}>Cadastro</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={() => {}} mt="5">
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="5fr 5fr 3fr"
            >
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.supplier}>
                <FormLabel>Fornecedor</FormLabel>
                <Autocomplete
                  {...register("supplier")}
                  handleFilter={handleFilter}
                  suggestions={filteredSuggestions}
                  setValue={(e:any) => setValue("supplier",e)}
                />
                {errors.supplier && (
                  <FormErrorMessage>{errors.supplier.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.category}>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder="" {...register("category")}>
                  <option></option>
                  {selectedCategory.map((e, index) => (
                    <option key={index} >{e.name}</option>
                  ))}
                </Select>
                {errors.category && (
                  <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="2fr 1fr 1fr 2.3fr 2fr"
            >
              <FormControl isInvalid={!!errors.unitOfMeasure}>
                <FormLabel>Unidade de medida</FormLabel>
                <Select placeholder="" {...register("unitOfMeasure")}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                {errors.unitOfMeasure && (
                  <FormErrorMessage>{errors.unitOfMeasure.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.stockQuantity}>
                <FormLabel>Quantidade</FormLabel>
                <Input id="stockQuantity" {...register("stockQuantity")} />
                {errors.stockQuantity && (
                  <FormErrorMessage>{errors.stockQuantity.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.minimumStock}>
                <FormLabel>Estoque minimo</FormLabel>
                <Input id="minimumStock" {...register("minimumStock")} />
                {errors.minimumStock && (
                  <FormErrorMessage>{errors.minimumStock.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.expirationDate}>
                <FormLabel>Data de validade</FormLabel>
                <Input id="expirationDate" type="date" {...register("expirationDate")} />
                {errors.expirationDate && (
                  <FormErrorMessage>{errors.expirationDate.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.batch}>
                <FormLabel>Lote</FormLabel>
                <Input id="batch" {...register("batch")} />
                {errors.batch && (
                  <FormErrorMessage>{errors.batch.message}</FormErrorMessage>
                  )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="1fr 1fr 5fr"
            >
              <FormControl isInvalid={!!errors.purchasePrice}>
                <FormLabel>Preço de compra</FormLabel>
                <Input id="purchasePrice" {...register("purchasePrice")} />
                {errors.purchasePrice && (
                  <FormErrorMessage>{errors.purchasePrice.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.salePrice}>
                <FormLabel>Preço de venda</FormLabel>
                <Input id="salePrice" {...register("salePrice")} />
                {errors.salePrice && (
                  <FormErrorMessage>{errors.salePrice.message}</FormErrorMessage>
                  )}
              </FormControl>
              <FormControl isInvalid={!!errors.observation}>
                <FormLabel>Observação</FormLabel>
                <Input id="observation" {...register("observation")} />
                {errors.observation && (
                  <FormErrorMessage>{errors.observation.message}</FormErrorMessage>
                  )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={3} columns={2} spacing={5} templateColumns="5fr">
              <FormControl>
                <FormLabel>Adicione as imagens</FormLabel>
                <ImageUpload />
              </FormControl>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button
                type="submit"
                colorScheme={"teal"}
                width={{ base: "80%", md: "15%" }}
                mt={5}
                isLoading={isLoading}
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
