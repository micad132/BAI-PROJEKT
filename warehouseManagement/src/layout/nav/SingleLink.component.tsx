import { Link } from "react-router-dom";

type Props = {
    path: string,
    text: string,
}
const SingleLinkComponent = ({path, text}: Props) => <Link  to={path}>{text}</Link>

export default SingleLinkComponent;
