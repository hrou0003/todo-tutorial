import styled from "styled-components";
import { colors } from "../styles";

const Button = styled.button`
    border: none;
    border-radius: 15px;
    color: black;
    background: ${colors.primary};
    height: 46px;
    padding-left: 30px;
    padding-right: 30px; 
`

export default Button;