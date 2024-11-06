import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
const AppRouter = () => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen />,
    },
  ]);
  return (
    <>
      {" "}
      <RouterProvider router={routing} />
    </>
  );
};

export default AppRouter;
