import { Input } from '@chakra-ui/react'
import {ChangeEvent} from "react";
import styled from "styled-components";

type Props = {
    placeholder: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput  = styled(Input)`
    color: #fff;
    &::placeholder {
      color: #ccc; 
  }
`

const InputComponent = ({ placeholder, value, onChange }: Props) => {
    return(
        <TextInput placeholder={placeholder} value={value} onChange={onChange} size='lg' />
    )
}

export default InputComponent;
