import {
  Center,
  Input,
  Button,
  Image,
  Link,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function RemoveBg() {
  const [remove, setRemove] = useState<string | ArrayBuffer | null>();
  const [image, setImage] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.error("Please select an image");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image_file", image, image?.name);
    formData.append("size", "auto");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-api-key": apiKey,
        },
        body: formData,
      });
      const data = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setRemove(reader.result);
      reader.readAsDataURL(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center height="80vh">
      <form onSubmit={onSubmit} >
        <Box>
          <Input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setImage(selectedFile);
              }
            }}
          />
        </Box>

        <Flex gap={"20px"}>
          {image && (
            <Box mt="4">
              <Image
                src={image ? URL.createObjectURL(image) : ""}
                alt="selected image"
                width="200px"
              />
            </Box>
          )}

          {remove && (
            <Box mt="4">
              <Image src={remove as string} alt="remove bg" width="200px" />
            </Box>
          )}

        </Flex>
        <Center gap="20px">
          {!remove && (
            <Box mt="4">
              <Button type="submit" colorScheme="blue" disabled={loading}>
                {loading ? <Spinner /> : "Remove Background"}
              </Button>
            </Box>
          )}
          {remove && (
            <Link
              href={remove as string}
              download="dipak.png"
              mt="4"
              display="block"
            >
              <Button>Download</Button>
            </Link>
          )}
        </Center>
      </form>
    </Center>
  );
}
