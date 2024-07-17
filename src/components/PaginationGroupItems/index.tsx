import {  Button, HStack, IconButton, Select, Spacer, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number,itemsPerPage: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (page: number,itemsPerPage: number) => void;
  }

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: PaginationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1, itemsPerPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1, itemsPerPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i - 1, itemsPerPage)}
          isDisabled={i - 1 === currentPage}
          variant={i - 1 === currentPage ? "solid" : "outline"}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <HStack spacing={2} alignItems="center" mb={2} mt={2} p={2}>
      <IconButton
        aria-label=""
        icon={<ChevronLeftIcon />}
        onClick={handlePrevPage}
        isDisabled={currentPage === 0}
      />
      {renderPageNumbers()}
      <IconButton
        aria-label=""
        icon={<ChevronRightIcon />}
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages- 1}
      />
      <Spacer/>
      <Text>Itens por página</Text>
      <Select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(currentPage, Number(e.target.value))}
        width="auto"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Select>
    </HStack>
  );
};

export default Pagination;
