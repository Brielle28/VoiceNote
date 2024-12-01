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
    <div className="h-screen w-full flex flex-col items-center justify-start bg-[#04121C] px-4 md:px-6">
      {/* Recording */}
      <div className="flex flex-col items-start justify-start w-full mt-7">
        <div className="flex items-center justify-start w-full px-3 md:px-10">
          <RiSettings2Fill
            className="text-[#F3B204] cursor-pointer text-[20px] md:text-[32px]"
          />
          {isRecording ? (
            <div className="ml-16 md:ml-[530px] md:text-[20px] cursor-not-allowed loader"></div>
          ) : (
            <div
              className="ml-16 md:ml-[530px] md:text-[20px] cursor-not-allowed NonAnimateloader"
            ></div>
          )}
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center justify-center mt-4 w-[56%] md:w-[18%]">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {formatTime(recordingLength)}
        </h1>
      </div>

      {/* Spinner */}
      {isRecording ? (
        <div className="mt-36 lg:mt-24 loadercircle"></div>
      ) : (
        <div className="mt-36 lg:mt-24 NonAnimateloadercircle"></div>
      )}

      {/* Stop, Pause, Menu */}
      <div className="flex items-center justify-center w-full gap-10 mt-40 md:gap-10 lg:gap-12 md:mt-32">
        <div
          className="p-3 md:p-4 rounded-full border-2 border-[#F3B204]"
          onClick={handleStopAndSave}
          title={"stop and save recording"}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="5" x2="19" y2="19" stroke="#F3B204" strokeWidth="2" />
            <line x1="5" y1="19" x2="19" y2="5" stroke="#F3B204" strokeWidth="2" />
          </svg>
        </div>
        <div
          className="p-3 md:p-4 rounded-full border-2 border-[#F3B204]"
          onClick={handleStartRecording}
          title={"start recording"}
        >
          <FaCircle className="text-[#F3B204]" size={25} />
        </div>
        <Link to="/VoiceList">
          <div className="p-3 md:p-4 rounded-full border-2 border-[#F3B204]">
            <IoMenu className="text-[#F3B204]" size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recording;
