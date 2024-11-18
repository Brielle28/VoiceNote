import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./Pages/SplashScreen";
import Recording from "./Pages/Recording";
import VoiceList from "./Pages/VoiceList";
import VoiceDetails from "./Pages/VoiceDetails";
const AppRouter = () => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen />,
    },
    {
      path: "/recording",
      element:<Recording/>
    },
    {
      path: "/VoiceList",
      element: <VoiceList/>
    },
    {
      path: "/VoiceDetails/:id",
      element: <VoiceDetails/>
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
