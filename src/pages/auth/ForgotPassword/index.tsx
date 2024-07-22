import { Card, CardBody, Container, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import SendEmail from "./components/SendEmail";
import SendCode from "./components/SendCode";
import RedefinePassword from "./components/RedefinePassword";

export enum Page {
  SendEmail,
  SendCode,
  RedefinePassword,
}

export default function ForgotPassword() {
  const [nextPage, setNextPage] = useState(Page.SendEmail);

  const handleNextPage = (value: Page) => {
    setNextPage(value);
  };

  return (
    <Container mt={"10%"} color="white">
      <Card>
        <CardBody textAlign={"center"}>
          <Heading color={"teal"} size="md">
            Inventário
          </Heading>
          <Text color={"gray.400"} size="sm">
            Autenticar
          </Text>
          {nextPage == Page.SendEmail && (
            <SendEmail eventNextPage={handleNextPage} />
          )}
          {nextPage == Page.SendCode && 
          <SendCode eventNextPage={handleNextPage} />}
          {nextPage == Page.RedefinePassword && <RedefinePassword />}
        </CardBody>
      </Card>
    </Container>
  );
}
