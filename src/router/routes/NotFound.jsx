import { useRouteError } from "react-router-dom";
import NotFoundBlock from "../../components/NotFoundBlock";

export default function NotFound() {
  const error = useRouteError();
  
  if (error) return <NotFoundBlock error={error.data} />;
}
