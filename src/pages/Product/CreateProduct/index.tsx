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
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "../../../components/Autocomplete";
import api from "../../../services/api";
import { useCallback, useEffect, useState } from "react";
import { SupplierModel } from "../../../model/Supplier.model";
import ImageUpload from "../../../components/ImageUpload";
import { createProductFormSchema, ProductFormSchema } from "./formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { unitMeasureStock } from "../../../mocks/unitMeasureStock";
import Swal from "sweetalert2";
import { moneyMask } from "../../../util/masksInput";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export default function CreateProduct() {
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<SupplierModel>
  >([]);
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    clearErrors,
  } = useForm<ProductFormSchema>({
    resolver: yupResolver(createProductFormSchema()) as any,
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [unitsMeasure] = useState<any>(unitMeasureStock);

  const handleCreateProduct: SubmitHandler<ProductFormSchema> = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        const formData = {
          ...values,
        };
        await api.post("/product", formData);
        Swal.fire({
          icon: "success",
          title: "Produto salvo com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } catch (error) {
        console.error("Error while saving product:", error);
      }
      setIsLoading(false);
    },
    []
  );

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

  const handleCategoryListing = async () => {
    try {
      const resp = await api.get("/category/list");
      setCategory(resp.data);
    } catch (error) {
      console.error("Error ao buscar categorias.");
    }
  };

  useEffect(() => {
    handleCategoryListing();
  }, [filteredSuggestions]);

  return (
    <Box mb="2%">
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
          <Box as="form" onSubmit={handleSubmit(handleCreateProduct)} mt="5">
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
              <FormControl isInvalid={!!errors.category}>
                <FormLabel>Fornecedor</FormLabel>
                <Autocomplete
                  handleFilter={handleFilter}
                  handleGetSupplier={(e: any) => setValue("supplier", e)}
                  suggestions={filteredSuggestions}
                />
                {errors.category && (
                  <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.category}>
                <FormLabel>Categoria</FormLabel>
                <Select id="category" {...register("category")}>
                  <option></option>
                  {category?.map((c: any) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={3}
              spacing={5}
              templateColumns="1.5fr 1.5fr 1.5fr 2.3fr 2fr"
            >
              <FormControl isInvalid={!!errors.unitOfMeasure}>
                <FormLabel>Unidade de medida</FormLabel>
                <Select id="unitOfMeasure" {...register("unitOfMeasure")}>
                  <option></option>
                  {unitsMeasure?.map((unit: any) => (
                    <option key={unit.nome} value={unit}>
                      {unit.nome}
                    </option>
                  ))}
                </Select>
                {errors.unitOfMeasure && (
                  <FormErrorMessage>
                    {errors.unitOfMeasure.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.stockQuantity}>
                <FormLabel>Quantidade</FormLabel>
                <Input id="stockQuantity" {...register("stockQuantity")} />
                {errors.stockQuantity && (
                  <FormErrorMessage>
                    {errors.stockQuantity.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.minimumStock}>
                <FormLabel>Estoque minimo</FormLabel>
                <Input id="minimumStock" {...register("minimumStock")} />
                {errors.minimumStock && (
                  <FormErrorMessage>
                    {errors.minimumStock.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Data de validade</FormLabel>
                <Input
                  id="expirationDate"
                  {...register("expirationDate")}
                  type="date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lote</FormLabel>
                <Input id="batch" {...register("batch")} />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="1fr 1fr 2fr 3fr"
            >
              <FormControl>
                <FormLabel>Preço de compra</FormLabel>
                <NumberFormat
                  id="salePrice"
                  placeholder="R$"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix="R$ "
                  {...register("salePrice")}
                />
              </FormControl>
              <FormControl isInvalid={!!errors.salePrice}>
                <FormLabel>Preço de venda</FormLabel>
                <Input
                  id="salePrice"
                  as={MaskedInput}
                  mask={currencyMask} 
                  placeholder="R$"
                  guide={false}
                  {...register("salePrice")}
                />
                {errors.salePrice && (
                  <FormErrorMessage>
                    {errors.salePrice.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Localização</FormLabel>
                <Input id="location" {...register("location")} />
              </FormControl>
              <FormControl>
                <FormLabel>Observação</FormLabel>
                <Input id="description" {...register("description")} />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={3} columns={2} spacing={5} templateColumns="5fr">
              <FormControl isInvalid={!!errors.image}>
                <FormLabel>Adicione as imagens</FormLabel>
                <ImageUpload />
              </FormControl>
            </SimpleGrid>
            <Flex justify="flex-end" padding="10px">
              <Button type="submit" colorScheme={"teal"} width={"15%"} mt={5}>
                Salvar
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
