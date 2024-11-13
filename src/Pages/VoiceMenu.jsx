import { IoMdPlay } from 'react-icons/io';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { VoiceMenuList } from "../Utils/VoiceMenuList";

const VoiceMenu = () => {
    const getIcon = (iconName) => {
        switch(iconName) {
            case "play":
                return <IoMdPlay className="text-[#F3B204] text-[20px]" />;
            case "edit":
                return <FaEdit className="text-[#F3B204] text-[20px]" />;
            case "delete":
                return <MdDelete className="text-[#F3B204] text-[20px]" />;
            case "share":
                return <FaShareAlt className="text-[#F3B204] text-[20px]" />;
            default:
                return null;
        }
    };

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="border-[1px] border-[#F3B204] modal-box rounded-[7px] bg-[#04121C] py-0 px-0">
                {VoiceMenuList.map((action) => (
                    <div
                        key={action.id}
                        className="flex items-center justify-start gap-10 py-3 pl-5 border-b-[1px] border-[#F3B204] hover:bg-[#111E28] cursor-pointer"
                    >
                        {getIcon(action.icon)}
                        <p className="text-white text-base sm:text-lg md:text-[20px]">{action.text}</p>
                    </div>
                ))}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default VoiceMenu;