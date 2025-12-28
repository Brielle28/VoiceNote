import { FaMicrophoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const SplashScreen = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#04121C] px-4 py-8 sm:py-12 md:py-16">
        <div className="border-1 rounded-[10px] border-[#F3B204] p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg shadow-[#F3B204]">
          <FaMicrophoneAlt className="text-[#F3B204] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32" />
        </div>
        <Link to="/Recording" className="flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mt-16 sm:mt-24 md:mt-32">
        <button className="w-full border-1 rounded-[10px] border-[#F3B204] py-3 sm:py-4 md:py-5 px-8 sm:px-12 md:px-20 lg:px-28 shadow-lg shadow-[#F3B204] text-[#F3B204] font-semibold text-base sm:text-lg md:text-xl hover:bg-[#F3B204] hover:text-[#04121C] transition-all duration-300">
          start
        </button>
        </Link>
        <h5 className="mt-8 sm:mt-10 md:mt-12 text-[#F3B204] underline text-sm sm:text-base md:text-lg cursor-pointer hover:text-[#F3B204]/80 transition-colors">
          PrivatePolicy
        </h5>
      </div>
    </>
  );
};

export default SplashScreen