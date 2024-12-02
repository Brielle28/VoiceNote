// import { useContext, useEffect, useState } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { MdDelete } from 'react-icons/md';
// import { FaShareAlt } from 'react-icons/fa';
// import { FaPlay } from "react-icons/fa";
// import { BsFillSkipBackwardFill } from "react-icons/bs";
// import { BsFillSkipForwardFill } from "react-icons/bs";
// import { TfiControlForward } from "react-icons/tfi";
// import { TfiControlBackward } from "react-icons/tfi";
// import { GiPauseButton } from "react-icons/gi";
// import "../Css/VoiceScreen.css"
// import { useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../Context/UserProvider';
// const VoiceDetails = () => {
//     const [value, setValue] = useState(0);
//     const [togglePlay, setTogglePlay] = useState(false)
//     const navigate = useNavigate()
//     const {id} = useParams()
//     const [foundAudio, setFoundAudio] = useState(null)
//     const {recordings, formatDuration} = useContext(UserContext)
//     const TogglePlay = () => {
//         setTogglePlay(!togglePlay)
//     }

//     useEffect(()=>{
//         const audio = recordings.find((audio) => audio.id === parseInt(id));
//         setFoundAudio(audio)

//     }, [id, recordings])

//     if (!foundAudio) return <div> audio not found</div>;

//     return (
//         <div className='h-screen bg-[#04121C] w-full flex flex-col items-center justify-start'>
//             {/* Header Section */}
//             <div className='flex items-center w-full justify-between px-4 sm:justify-evenly text-[#F3B204] text-[20px] sm:text-[25px] mt-7 md:mt-10'>
//                 <FaArrowLeftLong onClick={() => navigate(-1)} />

//                 <div className='flex items-center justify-center flex-row gap-4 md:gap-[120px]'>
//                     <h1 className='text-center text-base md:text-[25px]'>{foundAudio.name}</h1>
//                     <div className='flex items-center justify-center gap-2 md:gap-7'>
//                         <MdDelete />
//                         <FaShareAlt />
//                     </div>
//                 </div>
//             </div>

//             {/* Player Section */}
//             <div className='flex items-center  justify-between md:mt-[150px] mt-[280px] lg:mt-[300px] w-[80%] gap-5 md:gap-0  lg:w-[57%]'>
//                 <h1 className='text-[#F3B204] text-[16px] sm:text-[20px]'>00:00</h1>
//                 <div className="w-[75%] sm:w-[80%] relative">
//                     <input
//                         type="range"
//                         min="0"
//                         max="100"
//                         value={value}
//                         onChange={(e) => setValue(e.target.value)}
//                         className="custom-range"
//                         style={{ '--range-progress': `${value}%` }}
//                     />
//                 </div>
//                 <h1 className='text-[#F3B204] text-[16px] sm:text-[20px]'>{formatDuration(foundAudio.duration)}</h1>
//             </div>

//             {/* Controls Section */}
//             <div className='w-[90%] sm:w-[80%] lg:w-[57%] flex flex-col items-center justify-center'>
//                 <div className='flex items-center justify-center w-full gap-2 mt-8 sm:gap-4 sm:mt-14'>
//                     <button className='p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]'>
//                         <BsFillSkipBackwardFill className='text-[#F3B204] text-[16px] sm:text-[20px]' />
//                     </button>
//                     <button className='p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]'>
//                         <TfiControlBackward className='text-[#F3B204] text-[24px] sm:text-[30px]' />
//                     </button>
//                     <button className='p-3 sm:p-4 border-2 border-[#F3B204] rounded-[50px]' onClick={TogglePlay}>
//                         {togglePlay ? (
//                             <GiPauseButton className="text-[#F3B204] text-[32px] sm:text-[40px]" />
//                         ) : (
//                             <FaPlay className="text-[#F3B204] text-[32px] sm:text-[40px]" />
//                         )}
//                     </button>
//                     <button className='p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]'>
//                         <TfiControlForward className='text-[#F3B204] text-[24px] sm:text-[30px]' />
//                     </button>
//                     <button className='p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]'>
//                         <BsFillSkipForwardFill className='text-[#F3B204] text-[16px] sm:text-[20px]' />
//                     </button>
//                 </div>
//                 <div className="p-1 sm:p-2 border-2 border-[#F3B204] rounded-full mt-3 sm:mt-5 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex items-center justify-center">
//                     <h1 className="text-[#F3B204] text-[13px] sm:text-[15px]">1.5x</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default VoiceDetails
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
import { FaEdit } from "react-icons/fa";

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
    <div className="h-screen bg-[#04121C] w-full flex flex-col items-center justify-start">
      {/* Audio Element (hidden) */}
      {/* <audio
        ref={audioRef}
        src={foundAudio.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      /> */}
      <audio
        ref={audioRef}
        src={foundAudio.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header Section */}
      <div className="flex items-center w-full justify-between px-4 sm:justify-evenly text-[#F3B204] text-[20px] sm:text-[25px] mt-7 md:mt-10">
        <FaArrowLeftLong onClick={() => navigate(-1)} />

        <div className="flex items-center justify-center flex-row gap-4 md:gap-[120px]">
          <h1 className="text-center text-base md:text-[25px]">
            {foundAudio.name}
          </h1>
          <div className="flex items-center justify-center gap-2 md:gap-7">
            {/* <MdDelete  onClick={DeleteRecording(foundAudio.id)}/>
             */}
            <button
              onClick={() =>
                document.getElementById(`modal_${foundAudio.id}`).showModal()
              }
            >
              <MdDelete />
            </button>
            <DeleteModal
              audioId={foundAudio.id}
              modalId={`modal_${foundAudio.id}`}
            />
            <FaShareAlt
              onClick={() => downloadRecording(foundAudio)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Player Section */}
      <div className="flex items-center justify-between md:mt-[150px] mt-[280px] lg:mt-[300px] w-[80%] gap-5 md:gap-0 lg:w-[57%]">
        <h1 className="text-[#F3B204] text-[16px] sm:text-[20px]">
          {formatDuration(Math.floor(currentTime))}
        </h1>
        <div className="w-[75%] sm:w-[80%] relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleSeek}
            className="custom-range"
            style={{ "--range-progress": `${value}%` }}
          />
        </div>
        <h1 className="text-[#F3B204] text-[16px] sm:text-[20px]">
          {formatDuration(Math.floor(foundAudio.duration))}
        </h1>
      </div>

      {/* Controls Section */}
      <div className="w-[90%] sm:w-[80%] lg:w-[57%] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full gap-2 mt-8 sm:gap-4 sm:mt-14">
          <button
            className="p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]"
            onClick={() => skipTime(-10)}
          >
            <BsFillSkipBackwardFill className="text-[#F3B204] text-[16px] sm:text-[20px]" />
          </button>
          <button
            className="p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]"
            onClick={() => skipTime(-5)}
          >
            <TfiControlBackward className="text-[#F3B204] text-[24px] sm:text-[30px]" />
          </button>
          <button
            className="p-3 sm:p-4 border-2 border-[#F3B204] rounded-[50px]"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <GiPauseButton className="text-[#F3B204] text-[32px] sm:text-[40px]" />
            ) : (
              <FaPlay className="text-[#F3B204] text-[32px] sm:text-[40px]" />
            )}
          </button>
          <button
            className="p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]"
            onClick={() => skipTime(5)}
          >
            <TfiControlForward className="text-[#F3B204] text-[24px] sm:text-[30px]" />
          </button>
          <button
            className="p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]"
            onClick={() => skipTime(10)}
          >
            <BsFillSkipForwardFill className="text-[#F3B204] text-[16px] sm:text-[20px]" />
          </button>
        </div>
        <div
          className="p-1 sm:p-2 border-2 border-[#F3B204] rounded-full mt-3 sm:mt-5 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex items-center justify-center cursor-pointer"
          onClick={changePlaybackSpeed}
        >
          <h1 className="text-[#F3B204] text-[13px] sm:text-[15px]">
            {playbackRate}x
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VoiceDetails;
