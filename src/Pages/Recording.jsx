import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiSettings2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "../Context/UserProvider";
import "../Css/Recording.css";

const Recording = () => {

  const {
    recordingLength,
    handleStopAndSave,
    handleStartRecording,
    formatTime, isRecording, } = useContext(UserContext);



  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#04121C] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6">
      {/* Recording */}
      <div className="flex flex-col items-start justify-start w-full mt-4 sm:mt-6 md:mt-7">
        <div className="flex items-center justify-start w-full px-2 sm:px-3 md:px-6 lg:px-10">
          <RiSettings2Fill
            className="text-[#F3B204] cursor-pointer text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px]"
          />
          {isRecording ? (
            <div className="ml-8 sm:ml-12 md:ml-16 lg:ml-[300px] xl:ml-[400px] 2xl:ml-[530px] text-sm sm:text-base md:text-lg lg:text-[20px] cursor-not-allowed loader"></div>
          ) : (
            <div
              className="ml-8 sm:ml-12 md:ml-16 lg:ml-[300px] xl:ml-[400px] 2xl:ml-[530px] text-sm sm:text-base md:text-lg lg:text-[20px] cursor-not-allowed NonAnimateloader"
            ></div>
          )}
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-full sm:w-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
          {formatTime(recordingLength)}
        </h1>
      </div>

      {/* Spinner */}
      <div className="flex-1 flex items-center justify-center w-full">
        {isRecording ? (
          <div className="loadercircle"></div>
        ) : (
          <div className="NonAnimateloadercircle"></div>
        )}
      </div>

      {/* Stop, Pause, Menu */}
      <div className="flex items-center justify-center w-full gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10">
        <div
          className="p-2.5 sm:p-3 md:p-4 rounded-full border-2 border-[#F3B204] cursor-pointer hover:bg-[#F3B204]/10 transition-colors active:scale-95"
          onClick={handleStopAndSave}
          title={"stop and save recording"}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="5" x2="19" y2="19" stroke="#F3B204" strokeWidth="2" />
            <line x1="5" y1="19" x2="19" y2="5" stroke="#F3B204" strokeWidth="2" />
          </svg>
        </div>
        <div
          className="p-2.5 sm:p-3 md:p-4 rounded-full border-2 border-[#F3B204] cursor-pointer hover:bg-[#F3B204]/10 transition-colors active:scale-95"
          onClick={handleStartRecording}
          title={"start recording"}
        >
          <FaCircle className="text-[#F3B204] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
        <Link to="/VoiceList">
          <div className="p-2.5 sm:p-3 md:p-4 rounded-full border-2 border-[#F3B204] cursor-pointer hover:bg-[#F3B204]/10 transition-colors active:scale-95">
            <IoMenu className="text-[#F3B204] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recording;
