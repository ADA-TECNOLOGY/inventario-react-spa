import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  FormControl,
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

export default function CreateProduct() {
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<SupplierModel>
  >([]);

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

  useEffect(() => {}, [filteredSuggestions]);

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
          <Box as="form" onSubmit={() => {}} mt="5">
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="5fr 5fr 3fr"
            >
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input id="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Fornecedor</FormLabel>
                <Autocomplete
                  handleFilter={handleFilter}
                  suggestions={filteredSuggestions}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder="">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="2fr 1fr 1fr 2.3fr 2fr"
            >
              <FormControl>
                <FormLabel>Unidade de medida</FormLabel>
                <Select placeholder="">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Quantidade</FormLabel>
                <Input id="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Estoque minimo</FormLabel>
                <Input id="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Data de validade</FormLabel>
                <Input id="name" type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Lote</FormLabel>
                <Input id="name" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid
              mt={3}
              columns={2}
              spacing={5}
              templateColumns="1fr 1fr 5fr"
            >
              <FormControl>
                <FormLabel>Preço de compra</FormLabel>
                <Input id="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Preço de venda</FormLabel>
                <Input id="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Observação</FormLabel>
                <Input id="name" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid mt={3} columns={2} spacing={5} templateColumns="5fr">
              <FormControl>
                <FormLabel>Adicione as imagens</FormLabel>
                <ImageUpload />
              </FormControl>
            </SimpleGrid>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
