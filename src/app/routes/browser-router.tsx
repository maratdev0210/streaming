import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "../../shared/routes/routes";
import { Home, Collection, Signup, Login, CollectionTracks } from "../../pages";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Home,
  },
  {
    path: routes.collection,
    children: [
      {
        path: "tracks",
        Component: CollectionTracks,
      },
    ],
  },
  {
    path: "auth",
    children: [
      { path: routes.signup, Component: Signup },
      { path: routes.login, Component: Login },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
