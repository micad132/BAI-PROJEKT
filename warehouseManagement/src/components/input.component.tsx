import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = {
  placeholder: string,
  value: string | number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  isBlackText?: boolean,
};

const TextInput = styled(Input)`
    margin-top: 10px;
  color: ${(props) => (props.isBlackText ? '#fff' : '#000')};
    &::placeholder {
      color: ${(props) => (props.isBlackText ? '#fff' : '#000')};
  }
`;

const InputComponent = ({
  placeholder, value, onChange, isBlackText,
}: Props) => (
  <TextInput placeholder={placeholder} value={value} onChange={onChange} size="lg" isBlackText={isBlackText} />
);

export default InputComponent;
