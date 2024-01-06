import styled from 'styled-components';

interface Props {
  text: string,
}

const CustomSpan = styled.span`
    padding-left: 5px;
    font-weight: bold;
`;

const SpanComponent = ({ text }: Props) => (
  <CustomSpan>{text}</CustomSpan>
);

export default SpanComponent;
