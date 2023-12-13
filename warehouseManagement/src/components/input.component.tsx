import { Input } from '@chakra-ui/react'
import {ChangeEvent} from "react";
import styled from "styled-components";

type Props = {
    placeholder: string,
    value: string | number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput  = styled(Input)`
    margin-top: 10px;
    color: #fff;
    &::placeholder {
      color: #fff; 
  }
`

const InputComponent = ({ placeholder, value, onChange }: Props) => {
    return(
        <TextInput placeholder={placeholder} value={value} onChange={onChange} size='lg' />
    )
}

export default InputComponent;
