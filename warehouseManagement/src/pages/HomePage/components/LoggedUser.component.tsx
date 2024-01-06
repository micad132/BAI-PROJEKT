import styled from 'styled-components';
import { User } from '../../../models/User.model.ts';

type Props = {
  loggedUser: User,
};

const LoggedUserComponentWrapper = styled.div`
  background-color: #5B7B7A;
  color: #fff;
  padding: 5px 40px;
`;

const CustomSpan = styled.span`
  padding-left: 5px;
  font-weight: bold;
`;

const LoggedUserComponent = ({ loggedUser }: Props) => (
  <LoggedUserComponentWrapper>
    <h3>Witaj!</h3>
    <h4>
      Jesteś zalogowany jako
      <CustomSpan>{ loggedUser.email}</CustomSpan>
    </h4>
    <h4>
      Twoja rola to
      <CustomSpan>{loggedUser.role}</CustomSpan>
    </h4>
    <h4>
      Workplace:
      <CustomSpan>{loggedUser.workplace}</CustomSpan>
    </h4>
  </LoggedUserComponentWrapper>
);

export default LoggedUserComponent;
