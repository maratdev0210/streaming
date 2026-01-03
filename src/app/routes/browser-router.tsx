import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "../../shared/routes/routes";
import { Home, Collection } from "../../pages";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Home,
  },
  {
    path: routes.collection,
    Component: Collection,
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
