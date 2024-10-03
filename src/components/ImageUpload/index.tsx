import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  IconButton,
  Wrap,
  WrapItem,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ImageUpload = () => {
  const [images, setImages] = useState<any>([]);

  const handleImageUpload = (event: any) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file: any) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prevImages: any) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (indexToRemove: any) => {
    setImages((prevImages:any) =>
      prevImages.filter((_: any, index: number) => index !== indexToRemove)
    );
  };

  return (
    <Box
      p={4}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="gray.300"
      borderRadius="md"
      width="100%"
    >
      <Flex alignItems={"baseline"}>
        <Button as="label" colorScheme="blue" cursor="pointer">
          Upload
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </Button>
        {images.length == 0 && (
          <Text mt={4} ml={5} color="gray.500">
            Selecione suas imagens
          </Text>
        )}
      </Flex>

      {images.length > 0 && (
        <Wrap mt={4} spacing={4}>
          {images.map((image: any, index: any) => (
            <WrapItem key={index}>
              <Box
                position="relative"
                border="1px"
                borderColor="gray.300"
                p={2}
              >
                <Image src={image.url} alt={image.name} boxSize="150px" />
                <Text mt={2}>{image.name}</Text>
                <IconButton
                  aria-label="Remove image"
                  icon={<CloseIcon />}
                  colorScheme="teal"
                  size="xs"
                  position="absolute"
                  top="-3"
                  right="-2"
                  onClick={() => handleRemoveImage(index)}
                />
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
};

export default ImageUpload;
