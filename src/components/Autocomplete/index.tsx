import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement, List, ListItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
    handleFilter: any
    suggestions: Array<any>
}

export default function Autocomplete({ handleFilter, suggestions } : Props) {
  const [query, setQuery] = useState<any>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<any>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<any>(null);

  const handleChange = (e: any): any => {
    const userInput = e.target.value;
    setQuery(userInput);
    if (e.target.value.length >= 3) {
      handleFilter(e.target.value);

      const filtered = suggestions.filter((suggestion: any) =>
        suggestion.name.toLowerCase().includes(userInput.toLowerCase())
      );

      console.log(filtered)

      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleClick = (suggestion: any) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if(query.id == undefined){
          setQuery("")
        }
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
        return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [query]);

  return (
    <Box position="relative" ref={wrapperRef}>
      <InputGroup>
        <Input  onChange={(e) => handleChange(e)} value={query ? query?.name : ""}/>
        <InputRightElement>
          <SearchIcon  />
        </InputRightElement>
      </InputGroup>
      {showSuggestions && query && (
        <List
          position="absolute"
          w="100%"
          mt="2"
          border="1px solid #ccc"
          borderRadius="md"
          bg="white"
          zIndex="1"
          maxHeight="200px"
          overflowY="auto"
        >
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                textAlign={"justify"}
                cursor="pointer"
                p={3}
                _hover={{ backgroundColor: "gray.100" }}
                onClick={() => handleClick(suggestion)}
              >
                {suggestion.name}
              </ListItem>
            ))
          ) : (
            <ListItem p="2" color="gray.500">
              Nenhuma sugestão encontrada
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
}
