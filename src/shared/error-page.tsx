import { useRouteError } from "react-router-dom";
import NotFound from "/images/404.webp";
import ServerError from "/images/500.webp";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col gap-4 text-center p-16">
      {error.status === 404 && (
        <img src={NotFound} className="w-full" alt="Not Found"></img>
      )}
      {error.status !== 404 && (
        <img src={ServerError} className="w-full" alt="ServerError"></img>
      )}
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>
        {error.status} {error.statusText || error.message}
      </i>
    </div>
  );
}
