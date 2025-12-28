// import React, { useContext } from "react";
// import { IoMdPlay } from "react-icons/io";
// import { FaEdit, FaDownload } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { VoiceMenuList } from "../Utils/VoiceMenuList";
// import { Link } from "react-router-dom";
// import DeleteModal from "../Component/DeleteModal";
// import EditModal from "../Component/EditModal";
// import { UserContext } from "../Context/UserProvider";

// const VoiceMenu = ({ audioId, modalId }) => {
//   const { downloadRecording, recordings } = useContext(UserContext);

//   const audio = recordings.find((audio) => audio.id === audioId);

//   const handleDownload = () => {
//     if (audio) {
//       downloadRecording(audio.base64);
//     }
//   };

//   const getIcon = (iconName) => {
//     switch (iconName) {
//       case "play":
//         return <IoMdPlay className="text-[#F3B204] text-[20px]" />;
//       case "edit":
//         return <FaEdit className="text-[#F3B204] text-[20px]" />;
//       case "delete":
//         return <MdDelete className="text-[#F3B204] text-[20px]" />;
//       case "download":
//         return <FaDownload className="text-[#F3B204] text-[20px]" />;
//       default:
//         return null;
//     }
//   };

//   console.log(audio)
//   const renderModal = (modalType, id) => {
//     switch (modalType) {
//       case "delete":
//         return <DeleteModal audioId={audioId} modalId={`modal_${id}`} />;
//       case "edit":
//         return <EditModal audioId={audioId} modalId={`modal_${id}`} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <dialog id={modalId} className="modal">
//       <div className="border-[1px] border-[#F3B204] modal-box rounded-[7px] bg-[#04121C] py-0 px-0">
//         <div className="divide-y divide-[#F3B204]">
//           {VoiceMenuList.map((action) => {
//             const Content = (
//               <div className="flex items-center justify-start gap-10 py-3 pl-5 hover:bg-[#111E28] cursor-pointer">
//                 {getIcon(action.icon)}
//                 <p className="text-white text-base sm:text-lg md:text-[20px]">
//                   {action.text}
//                 </p>
//               </div>
//             );

//             return (
//               <React.Fragment key={action.id}>
//                 {action.link ? (
//                   <Link to={`${action.link}/${audioId}`}>{Content}</Link>
//                 ) : getIcon === "download" ? (
//                   <button onClick={handleDownload}> {Content}</button>
//                 ) : (
//                   <button
//                     onClick={() =>
//                       document.getElementById(`modal_${action.id}`).showModal()
//                     }
//                     className="w-full text-left"
//                   >
//                     {Content}
//                   </button>
//                 )}
//                 {renderModal(action.modalType, action.id)}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       </div>
//       <form method="dialog" className="modal-backdrop">
//         <button>close</button>
//       </form>
//     </dialog>
//   );
// };

// export default VoiceMenu;
import React, { useContext } from "react";
import { IoMdPlay } from "react-icons/io";
import { FaEdit, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VoiceMenuList } from "../Utils/VoiceMenuList";
import { Link } from "react-router-dom";
import DeleteModal from "../Component/DeleteModal";
import EditModal from "../Component/EditModal";
import { UserContext } from "../Context/UserProvider";

const VoiceMenu = ({ audioId, modalId }) => {
  const { downloadRecording, recordings } = useContext(UserContext);

  const audio = recordings.find((audio) => audio.id === audioId);

  const handleDownload = () => {
    if (audio) {
      // alert("hello just clicked download ")
      downloadRecording(audio);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "play":
        return <IoMdPlay className="text-[#F3B204] text-[20px]" />;
      case "edit":
        return <FaEdit className="text-[#F3B204] text-[20px]" />;
      case "delete":
        return <MdDelete className="text-[#F3B204] text-[20px]" />;
      case "download":
        return <FaDownload className="text-[#F3B204] text-[20px]" />;
      default:
        return null;
    }
  };

  const renderModal = (modalType, id) => {
    switch (modalType) {
      case "delete":
        return <DeleteModal audioId={audioId} modalId={`modal_${id}`} />;
      case "edit":
        return <EditModal audioId={audioId} modalId={`modal_${id}`} />;
      default:
        return null;
    }
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="border-[1px] border-[#F3B204] modal-box rounded-[7px] bg-[#04121C] py-0 px-0 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="divide-y divide-[#F3B204]">
          {VoiceMenuList.map((action) => {
            const Content = (
              <div className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-3 sm:py-4 pl-4 sm:pl-5 md:pl-6 hover:bg-[#111E28] cursor-pointer transition-colors active:bg-[#111E28]/80">
                <span className="flex-shrink-0">
                  {getIcon(action.icon)}
                </span>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-[20px]">
                  {action.text}
                </p>
              </div>
            );

            // Separate handling for different action types
            if (action.link) {
              return (
                <Link key={action.id} to={`${action.link}/${audioId}`} className="block">
                  {Content}
                </Link>
              );
            }

            if (action.icon === "download") {
              return (
                <button key={action.id} onClick={handleDownload} className="w-full text-left">
                  {Content}
                </button>
              );
            }

            // Handle modal-based actions
            return (
              <React.Fragment key={action.id}>
                <button
                  onClick={() =>
                    document.getElementById(`modal_${action.id}`).showModal()
                  }
                  className="w-full text-left"
                >
                  {Content}
                </button>
                {renderModal(action.modalType, action.id)}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default VoiceMenu;