import { useContext, useEffect, useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsFillSkipBackwardFill } from "react-icons/bs";
import { BsFillSkipForwardFill } from "react-icons/bs";
import { TfiControlForward } from "react-icons/tfi";
import { TfiControlBackward } from "react-icons/tfi";
import { GiPauseButton } from "react-icons/gi";
import "../Css/VoiceScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import DeleteModal from "../Component/DeleteModal";

const VoiceDetails = () => {
  const [value, setValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [foundAudio, setFoundAudio] = useState(null);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const { recordings, formatDuration, downloadRecording } = useContext(UserContext);

  useEffect(() => {
    const audio = recordings.find((audio) => audio.id === parseInt(id));
    setFoundAudio(audio);
  }, [id, recordings]);

  // Update current time and slider
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTimeValue = audioRef.current.currentTime;
      const durationValue = audioRef.current.duration;
      setCurrentTime(currentTimeValue);
      setDuration(durationValue);
      setValue((currentTimeValue / durationValue) * 100);
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Seek to specific time when slider is moved
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setValue(e.target.value);
    }
  };

  // Change playback speed
  const changePlaybackSpeed = () => {
    const speeds = [1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
      setPlaybackRate(nextSpeed);
    }
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  if (!foundAudio) return <div>Audio not found</div>;

  return (
    <div className="min-h-screen bg-[#04121C] w-full flex flex-col">
      {/* Audio Element (hidden) */}
      <audio
        ref={audioRef}
        src={foundAudio.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header Section */}
      <div className="flex items-start w-full justify-between sm:justify-start sm:gap-4 text-[#F3B204] px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6">
        <FaArrowLeftLong 
          onClick={() => navigate(-1)} 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer hover:text-[#F3B204]/80 transition-colors flex-shrink-0"
        />

        <div className="flex items-center justify-center flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-[120px] flex-1 sm:flex-none sm:ml-auto">
          <h1 className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-[25px] truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-none">
            {foundAudio.name}
          </h1>
          <div className="flex items-center justify-center flex-shrink-0 gap-2 sm:gap-3 md:gap-4 lg:gap-7">
            <button
              onClick={() =>
                document.getElementById(`modal_${foundAudio.id}`).showModal()
              }
              className="transition-opacity hover:opacity-80"
            >
              <MdDelete className="text-lg sm:text-xl md:text-2xl" />
            </button>
            <DeleteModal
              audioId={foundAudio.id}
              modalId={`modal_${foundAudio.id}`}
            />
            <FaShareAlt
              onClick={() => downloadRecording(foundAudio)}
              className="text-lg transition-opacity cursor-pointer sm:text-xl md:text-2xl hover:opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area - Empty or can add visual elements here */}
      <div className="flex-1"></div>

      {/* Fixed Bottom Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111E28] border-t border-[#F3B204]/30 shadow-2xl">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 md:px-8 sm:py-5 md:py-6">
          {/* Progress Bar Section */}
          <div className="flex items-center justify-between w-full gap-3 mb-4 sm:gap-4 sm:mb-5">
            <h1 className="text-[#F3B204] text-xs sm:text-sm md:text-base font-mono flex-shrink-0 min-w-[50px] sm:min-w-[60px]">
              {formatDuration(Math.floor(currentTime))}
            </h1>
            <div className="relative flex-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleSeek}
                className="w-full custom-range"
                style={{ "--range-progress": `${value}%` }}
              />
            </div>
            <h1 className="text-[#F3B204] text-xs sm:text-sm md:text-base font-mono flex-shrink-0 min-w-[50px] sm:min-w-[60px] text-right">
              {formatDuration(Math.floor(foundAudio.duration))}
            </h1>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {/* Playback Speed Control */}
            <button
              className="p-2 sm:p-2.5 border-2 border-[#F3B204] rounded-full hover:bg-[#F3B204]/10 transition-colors active:scale-95 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center"
              onClick={changePlaybackSpeed}
              title="Change playback speed"
            >
              <h1 className="text-[#F3B204] text-xs sm:text-sm md:text-base font-semibold">
                {playbackRate}x
              </h1>
            </button>

            {/* Skip Backward 10s */}
            <button
              className="p-2 sm:p-2.5 md:p-3 border-2 border-[#F3B204] rounded-full hover:bg-[#F3B204]/10 transition-colors active:scale-95 flex-shrink-0"
              onClick={() => skipTime(-10)}
              title="Skip backward 10s"
            >
              <BsFillSkipBackwardFill className="text-[#F3B204] text-base sm:text-lg md:text-xl" />
            </button>

            {/* Skip Backward 5s */}
            <button
              className="p-2.5 sm:p-3 md:p-3.5 border-2 border-[#F3B204] rounded-full hover:bg-[#F3B204]/10 transition-colors active:scale-95 flex-shrink-0"
              onClick={() => skipTime(-5)}
              title="Skip backward 5s"
            >
              <TfiControlBackward className="text-[#F3B204] text-lg sm:text-xl md:text-2xl" />
            </button>

            {/* Play/Pause Button */}
            <button
              className="p-3 sm:p-4 md:p-5 lg:p-6 border-2 border-[#F3B204] rounded-full bg-[#F3B204] hover:bg-[#F3B204]/90 transition-colors active:scale-95 flex-shrink-0"
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <GiPauseButton className="text-[#04121C] text-2xl sm:text-3xl md:text-4xl" />
              ) : (
                <FaPlay className="text-[#04121C] text-2xl sm:text-3xl md:text-4xl ml-0.5" />
              )}
            </button>

            {/* Skip Forward 5s */}
            <button
              className="p-2.5 sm:p-3 md:p-3.5 border-2 border-[#F3B204] rounded-full hover:bg-[#F3B204]/10 transition-colors active:scale-95 flex-shrink-0"
              onClick={() => skipTime(5)}
              title="Skip forward 5s"
            >
              <TfiControlForward className="text-[#F3B204] text-lg sm:text-xl md:text-2xl" />
            </button>

            {/* Skip Forward 10s */}
            <button
              className="p-2 sm:p-2.5 md:p-3 border-2 border-[#F3B204] rounded-full hover:bg-[#F3B204]/10 transition-colors active:scale-95 flex-shrink-0"
              onClick={() => skipTime(10)}
              title="Skip forward 10s"
            >
              <BsFillSkipForwardFill className="text-[#F3B204] text-base sm:text-lg md:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed player */}
      <div className="h-32 sm:h-36 md:h-40"></div>
    </div>
  );
};

export default VoiceDetails;
