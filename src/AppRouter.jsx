import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./Pages/SplashScreen";
import Recording from "./Pages/Recording";
const AppRouter = () => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen />,
    },
    {
      path: "/recording",
      element:<Recording/>
    }
  ]);
  return (
    <>
      {" "}
      <RouterProvider router={routing} />
    </>
  );
};

export default AppRouter;
