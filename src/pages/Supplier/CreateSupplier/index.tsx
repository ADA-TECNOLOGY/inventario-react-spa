import { Card, CardBody, Container, Heading, Text } from "@chakra-ui/react";

export default function CreateSupplier() {
  return (
    <Container mt={"10%"} color="white">
      <Card>
        <CardBody textAlign={"center"}>
          <Heading color={"teal"} size="md">
            Cadastro Fornecedor
          </Heading>
          <Text color={"gray.400"} size="sm"></Text>
        </CardBody>
      </Card>
    </Container>
  );
}
