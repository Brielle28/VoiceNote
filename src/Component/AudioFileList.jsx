// // import { HiDotsVertical } from 'react-icons/hi';
// // import { AudioFiles } from '../Utils/AudioFiles';
// // import VoiceMenu from '../Pages/VoiceMenu';
// // import { useContext } from 'react';
// // import { UserContext } from '../Context/UserProvider';

// // const AudioFileList = () => {
// //   const { recordings } = useContext(UserContext)
  
// //   return (
// //     <div className="w-full md:w-[75%] lg:w-[56.7%] mt-6 md:mt-10 bg-[#04121C] px-2 sm:px-4">
// //       {recordings.map((file, index) => (
// //         <div
// //           key={index}
// //           className="w-full flex items-center justify-between p-2 sm:px-2 sm:py-2 rounded-[5px] bg-[#111E28] mb-4"
// //         >
// //           <div className="w-[85%] flex flex-col items-start justify-start ml-2 sm:ml-5">
// //             <div className="flex flex-row items-start justify-between w-full sm:items-center">
// //               <h1 className="text-[#F3B204] text-base md:text-[20px]">{file.name}</h1>
// //               {  ? file.duration === 0 (
                
// //                 <h1 className="text-[#F3B204] text-base md:text-[20px] mt-1 sm:mt-0">{file.duration}secs</h1>
// //               ) :
// //                 (
// //                 <h1 className="text-[#F3B204] text-base md:text-[20px] mt-1 sm:mt-0">{file.duration}secs</h1>
// //                 )
// //               }
// //             </div>
// //             <div className="flex flex-row items-start justify-between w-full mt-2 space-y-1 sm:items-center sm:space-y-0">
// //               <h1 className="text-white md:text-sm text-[10px]">{file.date}</h1>
// //               <h1 className="text-white md:text-sm text-[10px]">{file.time}</h1>
// //               <h1 className="text-white md:text-sm text-[10px]">{file.size}</h1>
// //             </div>
// //           </div>
// //           <div className="w-[15%] sm:w-[8%] flex justify-center">
// //             <button onClick={() => document.getElementById(`modal_${file.id}`).showModal()}>
// //               <HiDotsVertical className="text-[#F3B204] text-[30px] sm:text-[40px]" />
// //             </button>
// //             {/* <VoiceMenu audioId={file.id}/> */}
// //             <VoiceMenu audioId={file.id} modalId={`modal_${file.id}`} />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default AudioFileList;
// import { HiDotsVertical } from 'react-icons/hi';
// import VoiceMenu from '../Pages/VoiceMenu';
// import { useContext } from 'react';
// import { UserContext } from '../Context/UserProvider';

// const AudioFileList = () => {
//   const { recordings , formatDuration } = useContext(UserContext);

  

//   return (
//     <div className="w-full md:w-[75%] lg:w-[56.7%] mt-6 md:mt-10 bg-[#04121C] px-2 sm:px-4">
//       {recordings.map((file) => (
//         <div
//           key={file.id}
//           className="w-full flex items-center justify-between p-2 sm:px-2 sm:py-2 rounded-[5px] bg-[#111E28] mb-4"
//         >
//           <div className="w-[85%] flex flex-col items-start justify-start ml-2 sm:ml-5">
//             <div className="flex flex-row items-start justify-between w-full sm:items-center">
//               <h1 className="text-[#F3B204] text-base md:text-[20px]">{file.name}</h1>
//               <h1 className="text-[#F3B204] text-base md:text-[20px] mt-1 sm:mt-0">
//                 {file.duration > 0 ? formatDuration(file.duration) : '00:00s'}
//               </h1>
//             </div>
//             <div className="flex flex-row items-start justify-between w-full mt-2 space-y-1 sm:items-center sm:space-y-0">
//               <h1 className="text-white md:text-sm text-[10px]">{file.date}</h1>
//               <h1 className="text-white md:text-sm text-[10px]">{file.time}</h1>
//               <h1 className="text-white md:text-sm text-[10px]">{file.size}</h1>
//             </div>
//           </div>
//           <div className="w-[15%] sm:w-[8%] flex justify-center">
//             <button onClick={() => document.getElementById(`modal_${file.id}`).showModal()}>
//               <HiDotsVertical className="text-[#F3B204] text-[30px] sm:text-[40px]" />
//             </button>
//             <VoiceMenu audioId={file.id} modalId={`modal_${file.id}`} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AudioFileList;
import { HiDotsVertical } from 'react-icons/hi'; 
import VoiceMenu from '../Pages/VoiceMenu';
import { useContext } from 'react';
import { UserContext } from '../Context/UserProvider';

const AudioFileList = () => {
  const { recordings, formatDuration } = useContext(UserContext);

  // Check if there are no valid recordings

  return (
    <div className="w-full md:w-[75%] lg:w-[56.7%] mt-6 md:mt-10 bg-[#04121C] px-2 sm:px-4">
      {recordings.length > 0 ? (
        // Render recordings if there are valid ones
        recordings.map((file) => (
          <div
            key={file.id}
            className="w-full flex items-center justify-between p-2 sm:px-2 sm:py-2 rounded-[5px] bg-[#111E28] mb-4"
          >
            <div className="w-[85%] flex flex-col items-start justify-start ml-2 sm:ml-5">
              <div className="flex flex-row items-start justify-between w-full sm:items-center">
                <h1 className="text-[#F3B204] text-base md:text-[20px]">{file.name}</h1>
                <h1 className="text-[#F3B204] text-base md:text-[20px] mt-1 sm:mt-0">
                  {file.duration > 0 ? formatDuration(file.duration) : '00:00s'}
                </h1>
              </div>
              <div className="flex flex-row items-start justify-between w-full mt-2 space-y-1 sm:items-center sm:space-y-0">
                <h1 className="text-white md:text-sm text-[10px]">{file.date}</h1>
                <h1 className="text-white md:text-sm text-[10px]">{file.time}</h1>
                <h1 className="text-white md:text-sm text-[10px]">{file.size}</h1>
              </div>
            </div>
            <div className="w-[15%] sm:w-[8%] flex justify-center">
              <button onClick={() => document.getElementById(`modal_${file.id}`).showModal()}>
                <HiDotsVertical className="text-[#F3B204] text-[30px] sm:text-[40px]" />
              </button>
              <VoiceMenu audioId={file.id} modalId={`modal_${file.id}`} />
            </div>
          </div>
        ))
      ) : (
        // Render message if there are no recordings
        <div className="flex flex-col items-center justify-center w-full text-center text-[#F3B204] mt-[200px]">
          <h1 className="text-xl sm:text-2xl">No recordings found</h1>
          <p className="mt-2 text-sm sm:text-base">Please record an audio first to view your recordings.</p>
        </div>
      )}
    </div>
  );
};

export default AudioFileList;
