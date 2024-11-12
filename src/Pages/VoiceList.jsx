import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import AudioFileList from "../Component/AudioFileList";
import { useNavigate } from "react-router-dom";
const VoiceList = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-[#04121C]">
            <div className="flex flex-col items-center justify-start w-full max-w-[1440px] mx-auto">
                {/* Header Section with Back Button and Search */}
                <div className="flex flex-row items-center justify-between w-full px-3 mt-2 space-y-4 md:mt-10 md:items-start md:justify-start md:px-10 sm:space-y-0">
                    {/* Back Button */}
                        <FaArrowLeftLong className="text-[#F3B204] cursor-pointer text-xl md:text-3xl mt-3 md:mt-0" onClick={() => navigate(-1)}
 />
                    {/* Search Container */}
                    <div className="relative w-full md:w-[58%] ml-4 md:ml-[238px]">
                        <input
                            type="search"
                            className="w-full pl-4 pr-10 py-2 sm:py-3 rounded-md bg-[#111E28] text-white placeholder-[#F3B204] focus:outline-none text-sm sm:text-base"
                            placeholder=""
                        />
                        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3B204] text-lg sm:text-xl" />
                    </div>
                </div>
                {/* Audio File List */}
                <AudioFileList />
            </div>
        </div>
    );
};

export default VoiceList;