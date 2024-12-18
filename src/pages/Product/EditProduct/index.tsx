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
import { Link, useNavigate, useParams } from "react-router-dom";
import Autocomplete from "../../../components/Autocomplete";
import api from "../../../services/api";
import { useCallback, useEffect, useState } from "react";
import { SupplierModel } from "../../../model/Supplier.model";
import ImageUpload from "../../../components/ImageUpload";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProductFormData, productFormSchema } from "../formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { lisUnitMeasure, typeUnitMeasure } from "../../../util/listUnitMeasure";
import MaskedInput from "react-text-mask";
import { currencyMask } from "../../../util/masksInput";
import Swal from "sweetalert2";
import { ProductModel } from "../../../model/Product.model";
import { formatCurrency } from "../../../util/formatCurrency";

export default function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productFormSchema) as any,
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<SupplierModel>
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
  const [selectedListUnitMeasure] = useState<any[]>(lisUnitMeasure);
  const [selectedTypeUnitMeasure] = useState<any[]>(typeUnitMeasure);
  const [filterUnitMeasure, setFilterUnitMeasure] = useState<any[]>([]);

  // Função para trazer os dados salvos na tela
  const getByProduct = async () => {
    try {
      const resp = await api.get(`product/${id}`);
      const product = resp.data;
      console.log(product)
      prepareFields(product);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  const prepareFields = (product: ProductModel) => {
    setValue("name", product.name);
    setValue("supplier", product.supplier);
    setValue("category", product.category);
    setValue("unitOfMeasure", product.unitOfMeasure);
    setValue("stockQuantity", product.stockQuantity);
    setValue("minimumStock", product.minimumStock);
    setValue("expirationDate", product.expirationDate);
    setValue("batch", product.batch);
    setValue("purchasePrice", formatCurrency(product.purchasePrice));
    setValue("salePrice", formatCurrency(product.salePrice));
    setValue("observation", product.observation);
    setValue("typeUnitMeasure", product.typeUnitMeasure);
  };

  const handleCreateProducts: SubmitHandler<ProductFormData> = useCallback(
    async (values) => {
      try {
        const formData = {
          ...values,
          purchasePrice: String(values.purchasePrice)
            .replace(/\s/g, "")
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", "."),
          salePrice: String(values.salePrice)
            .replace(/\s/g, "")
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", "."),
          supplier: {
            id: values.supplier,
          },
        };
        await api.put(`/product/${id}`, formData);
        Swal.fire({
          icon: "success",
          title: "Produto salvo com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/product");
        }, 3000);
      } catch (error) {
        console.log("Erro ao enviar dados", error);
      }
    },
    []
  );

  const handleCategory = async () => {
    setIsLoading(true);
    try {
      const resp = await api.get("category/list");
      setSelectedCategory(resp.data);
    } catch (error) {
      console.error("Error ao buscar dados", error);
    }
    setIsLoading(false);
  };

  const handlefilteUnitMeasure = (e: any) => {
    const filter = selectedListUnitMeasure.filter((unit) => unit.type == e);
    setFilterUnitMeasure(filter);
  };

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
    getByProduct();
  }, [filteredSuggestions]);

  return (
    <Box mt={5}>
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/product">
            Produtos
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={"teal"}>Editar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card mt={5}>
        <CardBody textAlign={"center"}>
          <Box as="form" onSubmit={handleSubmit(handleCreateProducts)} mt={5}>
            <SimpleGrid
              mt={3}
              columns={{ base: 1, sm: 2, md: 2 }}
              spacing={3}
              templateColumns={{
                base: "1fr",
                sm: "1fr 1fr 1fr",
                md: "1fr 1fr 1fr",
              }}
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
                  setValue={(e: any) => setValue("supplier", e.id)}
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
                    <option key={index}>{e.name}</option>
                  ))}
                </Select>
                {errors.category && (
                  <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              mt={3}
              columns={{ base: 1, sm: 2, md: 3 }}
              spacing={5}
              templateColumns={{
                base: "1fr",
                sm: "1fr 1fr",
                md: "2.3fr 2.3fr 1fr 2.3fr 1fr ",
              }}
            >
              <FormControl isInvalid={!!errors.typeUnitMeasure}>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onClick={(e) => handlefilteUnitMeasure(e.target.value)}
                  placeholder=""
                  {...register("typeUnitMeasure")}
                >
                  <option></option>
                  {selectedTypeUnitMeasure.map((e, index) => (
                    <option key={index} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </Select>
                {errors.unitOfMeasure && (
                  <FormErrorMessage>
                    {errors.unitOfMeasure.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.unitOfMeasure}>
                <FormLabel>Unidade de medida</FormLabel>
                <Select placeholder="" {...register("unitOfMeasure")}>
                  <option></option>
                  {filterUnitMeasure.map((e, index) => (
                    <option key={index}>{e.label}</option>
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

              <FormControl isInvalid={!!errors.expirationDate}>
                <FormLabel>Data de validade</FormLabel>
                <Input
                  id="expirationDate"
                  type="date"
                  {...register("expirationDate")}
                />
                {errors.expirationDate && (
                  <FormErrorMessage>
                    {errors.expirationDate.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              mt={3}
              columns={{ base: 1, sm: 2, md: 3 }}
              spacing={4}
              templateColumns={{
                base: "1fr",
                sm: "1fr 2fr 2fr",
                md: "1fr 2fr 2fr 3fr",
              }}
            >
              <FormControl isInvalid={!!errors.batch}>
                <FormLabel>Lote</FormLabel>
                <Input id="batch" {...register("batch")} />
                {errors.batch && (
                  <FormErrorMessage>{errors.batch.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.purchasePrice}>
                <FormLabel>Preço de compra</FormLabel>
                <Controller
                  name="purchasePrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={currencyMask}
                      id="purchasePrice"
                      {...register("purchasePrice")}
                      guide={false}
                      {...field}
                    />
                  )}
                />

                {errors.purchasePrice && (
                  <FormErrorMessage>
                    {errors.purchasePrice.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.salePrice}>
                <FormLabel>Preço de venda</FormLabel>
                <Controller
                  name="salePrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      as={MaskedInput}
                      mask={currencyMask}
                      guide={false}
                      id="salePrice"
                      {...register("salePrice")}
                      {...field}
                    />
                  )}
                />
                {errors.salePrice && (
                  <FormErrorMessage>
                    {errors.salePrice.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.observation}>
                <FormLabel>Observação</FormLabel>
                <Input id="observation" {...register("observation")} />
                {errors.observation && (
                  <FormErrorMessage>
                    {errors.observation.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              mt={3}
              columns={{ base: 1 }}
              spacing={5}
              templateColumns="5fr"
            >
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
