import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "./Pages/SplashScreen";
import Recording from "./Pages/Recording";
import VoiceList from "./Pages/VoiceList";
import VoiceDetails from "./Pages/VoiceDetails";
import RecordingSection from "./Pages/RecordingSection";
import UserProvider from "./Context/UserProvider";
const AppRouter = () => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: < SplashScreen />,
    },
    // {
    //   path: "/RecordingSection",
    //   element: <RecordingSection />
    // },
    {
      path: "/recording",
      element: <Recording />
    },
    {
      path: "/VoiceList",
      element: <VoiceList />
    },
    {
      path: "/VoiceDetails/:id",
      element: <VoiceDetails />
    }
  ]);
  return (
    <>
      <UserProvider>
        <RouterProvider router={routing} />
      </UserProvider>
    </>
  );
};

export default AppRouter;
