import styled from "styled-components";

const NavLinkComponent = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: red;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export default NavLinkComponent;
