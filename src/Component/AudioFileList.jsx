import { HiDotsVertical } from 'react-icons/hi'; 
import VoiceMenu from '../Pages/VoiceMenu';
import { useContext } from 'react';
import { UserContext } from '../Context/UserProvider';

const AudioFileList = () => {
  const { recordings, formatDuration } = useContext(UserContext);

  // Check if there are no valid recordings

  return (
    <div className="w-full mt-6 sm:mt-8 md:mt-10 bg-[#04121C] px-2 sm:px-3 md:px-4">
      {recordings.length > 0 ? (
        // Render recordings if there are valid ones
        recordings.map((file) => (
          <div
            key={file.id}
            className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 rounded-[5px] bg-[#111E28] mb-3 sm:mb-4 hover:bg-[#111E28]/80 transition-colors"
          >
            <div className="w-[80%] sm:w-[85%] flex flex-col items-start justify-start ml-1 sm:ml-2 md:ml-3 lg:ml-5 gap-2 sm:gap-2.5">
              <div className="flex flex-row items-start justify-between w-full gap-2 sm:items-center sm:gap-4">
                <h1 className="text-[#F3B204] text-sm sm:text-base md:text-lg lg:text-[20px] font-medium truncate flex-1">{file.name}</h1>
                <h1 className="text-[#F3B204] text-xs sm:text-sm md:text-base lg:text-[20px] font-mono flex-shrink-0">
                  {file.duration > 0 ? formatDuration(file.duration) : '00:00s'}
                </h1>
              </div>
              <div className="flex flex-row flex-wrap items-start justify-between w-full gap-2 sm:items-center sm:gap-3 md:gap-4">
                <h1 className="text-white text-[10px] sm:text-xs md:text-sm">{file.date}</h1>
                <h1 className="text-white text-[10px] sm:text-xs md:text-sm">{file.time}</h1>
                <h1 className="text-white text-[10px] sm:text-xs md:text-sm">{file.size}</h1>
              </div>
            </div>
            <div className="w-[15%] sm:w-[10%] md:w-[8%] flex justify-center items-center flex-shrink-0">
              <button 
                onClick={() => document.getElementById(`modal_${file.id}`).showModal()}
                className="p-1 transition-opacity hover:opacity-80 active:scale-95"
                title="More options"
              >
                <HiDotsVertical className="text-[#F3B204] text-2xl sm:text-3xl md:text-4xl" />
              </button>
              <VoiceMenu audioId={file.id} modalId={`modal_${file.id}`} />
            </div>
          </div>
        ))
      ) : (
        // Render message if there are no recordings
        <div className="flex flex-col items-center justify-center w-full text-center text-[#F3B204] mt-32 sm:mt-40 md:mt-[200px] px-4">
          <h1 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">No recordings found</h1>
          <p className="mt-3 text-xs sm:mt-4 sm:text-sm md:text-base lg:text-lg opacity-80">Please record an audio first to view your recordings.</p>
        </div>
      )}
    </div>
  );
};

export default AudioFileList;
