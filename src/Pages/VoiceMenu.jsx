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
  const getIcon = (iconName) => {
    switch (iconName) {
      case "play":
        return <IoMdPlay className="text-[#F3B204] text-[20px]" />;
      case "edit":
        return <FaEdit className="text-[#F3B204] text-[20px]" />;
      case "delete":
        return <MdDelete className="text-[#F3B204] text-[20px]" />;
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
    <dialog id={modalId} className="modal">
      <div className="border-[1px] border-[#F3B204] modal-box rounded-[7px] bg-[#04121C] py-0 px-0">
        <div className="divide-y divide-[#F3B204]">
          {VoiceMenuList.map((action) => {
            const Content = (
              <div className="flex items-center justify-start gap-10 py-3 pl-5 hover:bg-[#111E28] cursor-pointer">
                {getIcon(action.icon)}
                <p className="text-white text-base sm:text-lg md:text-[20px]">
                  {action.text}
                </p>
              </div>
            );

            return (
              <React.Fragment key={action.id}>
                {action.link ? (
                  <Link to={`${action.link}/${audioId}`}>{Content}</Link>
                ) : (
                  <button
                    onClick={() =>
                      document.getElementById(`modal_${action.id}`).showModal()
                    }
                    className="w-full text-left"
                  >
                    {Content}
                  </button>
                )}
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
