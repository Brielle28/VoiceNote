// import React, { useState } from 'react'
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
// const VoiceScreen = () => {
//     const [value, setValue] = useState(0);
//     const [togglePlay, setTogglePlay] = useState(false)

//     const TogglePlay = () => {
//         setTogglePlay(!togglePlay)
//     }

//     return (
//         <div className='h-screen bg-[#04121C] w-full flex flex-col items-center justify-start'>
//             <div className='flex items-center w-full justify-evenly text-[#F3B204] text-[25px] mt-10'>
//                 <FaArrowLeftLong />
//                 <div className='flex items-center justify-center gap-[120px]'>
//                     <h1>Voice Recorder_13.mp3</h1>
//                     <div className='flex items-center justify-center gap-7'>
//                         <MdDelete />
//                         <FaShareAlt />
//                     </div>
//                 </div>
//             </div>
//             <div className='flex items-center justify-between mt-[300px] w-[57%]'>
//                 <h1 className='text-[#F3B204] text-[20px]'>00:00</h1>
//                 <div className="w-[80%] relative">
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
//                 <h1 className='text-[#F3B204] text-[20px]'>00:00</h1>
//             </div>
//             <div className=' w-[57%] flex flex-col items-center justify-center'>
//                 <div className='flex items-center justify-center w-full gap-4 mt-14'>
//                     <button className='p-2 border-2 border-[#F3B204] rounded-[50px]'>
//                         <BsFillSkipBackwardFill className='text-[#F3B204] text-[20px]' />
//                     </button>
//                     <button className='p-3 border-2 border-[#F3B204] rounded-[50px]'>
//                         <TfiControlBackward className='text-[#F3B204] text-[30px]' />
//                     </button>
//                     <button className='p-4 border-2 border-[#F3B204] rounded-[50px]' onClick={TogglePlay}>
//                         {
//                             togglePlay ? (

//                                 <GiPauseButton className="text-[#F3B204] text-[40px]" />
//                             ) :
//                                 (
//                                     <FaPlay className="text-[#F3B204] text-[40px]" />
//                                 )
//                         }
//                     </button>
//                     <button className='p-3 border-2 border-[#F3B204] rounded-[50px]'>
//                         <TfiControlForward className='text-[#F3B204] text-[30px]' />
//                     </button>
//                     <button className='p-2 border-2 border-[#F3B204] rounded-[50px]'>
//                         <BsFillSkipForwardFill className='text-[#F3B204] text-[20px]' />
//                     </button>
//                 </div>
//                 <div className="p-2 border-2 border-[#F3B204] rounded-full mt-5 w-[50px] h-[50px] flex items-center justify-center">
//                     <h1 className="text-[#F3B204] text-[15px]">1.5x</h1>
//                 </div>

//             </div>
//         </div>
//     )
// }
// export default VoiceScreen
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from 'react-icons/md';
import { FaShareAlt } from 'react-icons/fa';
import { FaPlay } from "react-icons/fa";
import { BsFillSkipBackwardFill } from "react-icons/bs";
import { BsFillSkipForwardFill } from "react-icons/bs";
import { TfiControlForward } from "react-icons/tfi";
import { TfiControlBackward } from "react-icons/tfi";
import { GiPauseButton } from "react-icons/gi";
import "../Css/VoiceScreen.css"

const VoiceScreen = () => {
    const [value, setValue] = useState(0);
    const [togglePlay, setTogglePlay] = useState(false)

    const TogglePlay = () => {
        setTogglePlay(!togglePlay)
    }

    return (
        <div className='h-screen bg-[#04121C] w-full flex flex-col items-center justify-start'>
            {/* Header Section */}
            <div className='flex items-center w-full justify-between px-4 sm:justify-evenly text-[#F3B204] text-[20px] sm:text-[25px] mt-7 md:mt-10'>
                <FaArrowLeftLong />
                <div className='flex items-center justify-center flex-row gap-4 md:gap-[120px]'>
                    <h1 className='text-center text-base md:text-[25px]'>Voice Recorder_13.mp3</h1>
                    <div className='flex items-center justify-center gap-2 md:gap-7'>
                        <MdDelete />
                        <FaShareAlt />
                    </div>
                </div>
            </div>

            {/* Player Section */}
            <div className='flex items-center  justify-between md:mt-[150px] mt-[280px] lg:mt-[300px] w-[80%] gap-5 md:gap-0  lg:w-[57%]'>
                <h1 className='text-[#F3B204] text-[16px] sm:text-[20px]'>00:00</h1>
                <div className="w-[75%] sm:w-[80%] relative">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="custom-range"
                        style={{ '--range-progress': `${value}%` }}
                    />
                </div>
                <h1 className='text-[#F3B204] text-[16px] sm:text-[20px]'>00:00</h1>
            </div>

            {/* Controls Section */}
            <div className='w-[90%] sm:w-[80%] lg:w-[57%] flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center w-full gap-2 mt-8 sm:gap-4 sm:mt-14'>
                    <button className='p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]'>
                        <BsFillSkipBackwardFill className='text-[#F3B204] text-[16px] sm:text-[20px]' />
                    </button>
                    <button className='p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]'>
                        <TfiControlBackward className='text-[#F3B204] text-[24px] sm:text-[30px]' />
                    </button>
                    <button className='p-3 sm:p-4 border-2 border-[#F3B204] rounded-[50px]' onClick={TogglePlay}>
                        {togglePlay ? (
                            <GiPauseButton className="text-[#F3B204] text-[32px] sm:text-[40px]" />
                        ) : (
                            <FaPlay className="text-[#F3B204] text-[32px] sm:text-[40px]" />
                        )}
                    </button>
                    <button className='p-2 sm:p-3 border-2 border-[#F3B204] rounded-[50px]'>
                        <TfiControlForward className='text-[#F3B204] text-[24px] sm:text-[30px]' />
                    </button>
                    <button className='p-1 sm:p-2 border-2 border-[#F3B204] rounded-[50px]'>
                        <BsFillSkipForwardFill className='text-[#F3B204] text-[16px] sm:text-[20px]' />
                    </button>
                </div>
                <div className="p-1 sm:p-2 border-2 border-[#F3B204] rounded-full mt-3 sm:mt-5 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex items-center justify-center">
                    <h1 className="text-[#F3B204] text-[13px] sm:text-[15px]">1.5x</h1>
                </div>
            </div>
        </div>
    )
}

export default VoiceScreen