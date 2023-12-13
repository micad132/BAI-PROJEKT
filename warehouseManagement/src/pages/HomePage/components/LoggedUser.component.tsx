import styled from "styled-components";

type Props = {
    username: string,
}

const LoggedUserComponentWrapper = styled.div`
  background-color: #5B7B7A;
  color: #fff;
  padding: 5px 20px;
`

const LoggedUserComponent = ({username}: Props) => {

    return(
        <LoggedUserComponentWrapper>
            <h3>Witaj!</h3>
            <h4>Jesteś zalogowany jako {username}</h4>
        </LoggedUserComponentWrapper>
    )
}

export default LoggedUserComponent;
