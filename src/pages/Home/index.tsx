import { Card, CardBody, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [menus] = useState<any[]>([
    { title: "Fornecedores", link: "/supplier" },
    { title: "Produtos", link: "" },
  ]);

  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {menus.map((e, index) => (
          <Link key={index} to={e.link}>
            <Card key={index} >
              <CardBody >
                <Text p={5}>{e.title}</Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
}
