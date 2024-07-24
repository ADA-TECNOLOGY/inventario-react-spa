import { styled } from "styled-components";

export const Linkhover  = styled.div `
 text-decoration: none;
  padding: 8px; /* Equivalente ao p: 2 no Chakra UI */
  border-radius: 8px; /* Borda arredondada */
  transition: background-color 0.3s, color 0.3s; /* Transição suave */

  /* Estilo de hover */
  &:hover {
    background-color:#00808014; /* gray.700 */
    text-decoration: none
  }
`