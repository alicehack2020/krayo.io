import { Navigate } from "react-router-dom";

const Protected = ({ children }) =>
{
const token = JSON.parse(localStorage.getItem('token'))
if (!token) {
 return <Navigate to="/" replace />;
}
return children;
};
export default Protected;