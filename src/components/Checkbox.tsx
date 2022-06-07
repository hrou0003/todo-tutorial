import { ComponentProps, HTMLProps } from "react";
import styled, { StyledComponent, StyledComponentProps } from "styled-components";
import { colors } from "../styles";

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const HiddenCheckbox = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div<{checked: boolean }>`
    display: inline-block;
    width: 25px;
    height: 25px;
    background: ${(props) => (props.checked ? colors.primary : 'none')};
    border-radius: 25px;
    border: 3px solid ${colors.primary};
    transition: all 75ms;
`

type Props = ComponentProps<StyledComponent<'input', any, {}>> & {
    checked: boolean;
}

const Checkbox: React.FC<Props> = ({ checked, ...props }) => (
    <CheckboxContainer>
        <HiddenCheckbox {...props} type="checkbox" checked={checked}/>
        <StyledCheckbox checked={checked}>
            
        </StyledCheckbox>
    </CheckboxContainer>
)

export default Checkbox;