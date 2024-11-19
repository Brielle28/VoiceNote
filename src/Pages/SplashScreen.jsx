import { FaMicrophoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const SplashScreen = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[#04121C]">
        <div className="border-1 rounded-[10px] border-[#F3B204] p-10 shadow-lg shadow-[#F3B204]">
          <FaMicrophoneAlt size={100}  className="text-[#F3B204]"/>
        </div>
        <Link to="/RecordingSection" className="flex items-center justify-center w-full">
        <button className="border-1 rounded-[10px] border-[#F3B204] mt-32 py-3 px-28 shadow-lg shadow-[#F3B204] text-[#F3B204] font-semibold ">
          start
        </button>
        </Link>
        <h5 className="mt-10 text-[#F3B204] underline">
          PrivatePolicy
        </h5>
      </div>
    </>
  );
};

export default SplashScreen