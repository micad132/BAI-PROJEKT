import { Badge, Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = {
  placeholder: string,
  value: string | number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  isBlackText?: boolean,
  isPassword?: boolean,
  errorText?: string,
};

const TextInput = styled(Input)`
    margin-top: 10px;
  color: ${(props) => (props.isBlackText ? '#fff' : '#000')};
    &::placeholder {
      color: ${(props) => (props.isBlackText ? '#fff' : '#000')};
  }
`;

const CustomBadge = styled(Badge)`
  margin-top: 10px;
  margin-left: 5px;
`;

const InputComponent = ({
  placeholder, value, onChange, isBlackText, isPassword, errorText,
}: Props) => {
  console.log('COS', errorText);
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="lg"
        isBlackText={isBlackText}
        type={isPassword ? 'password' : 'text'}
        isInvalid={errorText}
      />
      {errorText && <CustomBadge colorScheme="red">{errorText}</CustomBadge>}
    </>
  );
};

export default InputComponent;
