import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import api from "../../../../services/api";

type Role = {
  id: string;
  name: string;
};

interface PickListProps {
  rolePosition: Role[];
  handleGetRolesSelected: (roles: Role[]) => void;
}

const PickList = ({ rolePosition, handleGetRolesSelected }: PickListProps) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesSelected, setRolesSelected] = useState<Role[]>([]);
  const [selectedItem, setSelectedItem] = useState<Role | null>(null);

  const fetchRoles = useCallback(async () => {
    try {
      const { data: listRoles } = await api.get<Role[]>("roles");
      let unselectedRoles: Role[] = rolePosition ? [] : listRoles;
   
      listRoles.forEach(e => {
        if(rolePosition && rolePosition.find(a => a.name == e.name) == undefined){
          unselectedRoles.push(e);
        }
      })
   
      setRolesSelected(rolePosition || []);
      setRoles(unselectedRoles);
    } catch (error) {
      console.error("Erro ao buscar roles:", error);
    }
  }, [rolePosition]);
  
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleSelectItem = (item: Role) => setSelectedItem(item);

  const handleAddItem = useCallback(() => {
    if (selectedItem) {
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedItem.id));
      setRolesSelected((prevSelected) => [...prevSelected, selectedItem]);
      setSelectedItem(null);
      handleGetRolesSelected([...rolesSelected, selectedItem]);
    }
  }, [selectedItem, rolesSelected, handleGetRolesSelected]);

  const handleAddAllItems = useCallback(() => {
    setRolesSelected((prevSelected) => [...prevSelected, ...roles]);
    setRoles([]);
    setSelectedItem(null);
    handleGetRolesSelected([...rolesSelected, ...roles]);
  }, [roles, rolesSelected, handleGetRolesSelected]);

  const handleRemoveItem = useCallback(() => {
    if (selectedItem) {
      setRoles((prevRoles) => [...prevRoles, selectedItem]);
      setRolesSelected((prevSelected) =>
        prevSelected.filter((role) => role.id !== selectedItem.id)
      );
      setSelectedItem(null);
      handleGetRolesSelected(rolesSelected.filter((role) => role.id !== selectedItem.id));
    }
  }, [selectedItem, rolesSelected, handleGetRolesSelected]);

  const handleRemoveAllItems = useCallback(() => {
    setRoles((prevRoles) => [...prevRoles, ...rolesSelected]);
    setRolesSelected([]);
    handleGetRolesSelected([]);
  }, [rolesSelected, handleGetRolesSelected]);

  const renderListItems = useCallback(
    (items: Role[]) => (
      <List mt="2" bg="white" zIndex="1" maxHeight="350px" overflowY="auto" w="100%">
        {items.length ? (
          items.map((role) => (
            <ListItem
              key={role.id}
              textAlign="justify"
              cursor="pointer"
              p={3}
              bg={selectedItem?.id === role.id ? "teal" : "white"}
              color={selectedItem?.id === role.id ? "white" : "inherit"}
              _hover={{ backgroundColor: selectedItem?.id !== role.id ? "gray.100" : "inherit" }}
              onClick={() => handleSelectItem(role)}
            >
              {role.name}
            </ListItem>
          ))
        ) : (
          <ListItem p="2" color="gray.500">
            Nenhuma sugestão encontrada
          </ListItem>
        )}
      </List>
    ),
    [selectedItem]
  );

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      <Box border="1px solid #ccc" borderRadius="md">
        <Text mt={2} mb={2}>
          Permissões disponíveis
        </Text>
        <Divider />
        {renderListItems(roles)}
      </Box>
      <Box mt={10} ml={5} mr={5} display="flex" justifyContent="center">
        <SimpleGrid columns={1} spacing={4} w={50}>
          <IconButton
            aria-label="Adicionar permissão"
            onClick={handleAddItem}
            icon={<MdKeyboardArrowRight />}
          />
          <IconButton
            aria-label="Adicionar todas as permissões"
            onClick={handleAddAllItems}
            icon={<MdKeyboardDoubleArrowRight />}
          />
          <IconButton
            aria-label="Remover permissão"
            onClick={handleRemoveItem}
            icon={<MdKeyboardArrowLeft />}
          />
          <IconButton
            aria-label="Remover todas as permissões"
            onClick={handleRemoveAllItems}
            icon={<MdKeyboardDoubleArrowLeft />}
          />
        </SimpleGrid>
      </Box>
      <Box border="1px solid #ccc" borderRadius="md">
        <Text mt={2} mb={2}>
          Permissões selecionadas
        </Text>
        <Divider />
        {renderListItems(rolesSelected)}
      </Box>
    </Grid>
  );
};

export default PickList;
