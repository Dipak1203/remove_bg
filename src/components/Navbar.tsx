import {
  ChakraProvider,
  ColorModeScript,
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../../public/dipakLogo.png";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider resetCSS>
      <ColorModeScript initialColorMode={colorMode} />

      <Box bg={useColorModeValue("gray.100", "gray.900")} px={5} py={3}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <img src={logo} alt="logo" width={"80px"} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"md"}
                    src={"https://avatars.githubusercontent.com/u/67213707?v=4"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://avatars.githubusercontent.com/u/67213707?v=4"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>DIPAK KUMAL</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
