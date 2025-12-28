import { useContext, useState, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { UserContext } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";

const EditModal = ({ audioId, modalId, currentName }) => {
  const { editRecordingName } = useContext(UserContext);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  // Set the current recording name when the modal opens
  useEffect(() => {
    setNewName(currentName || ""); // Default to the current name or empty string
  }, [currentName]);

  // Handle input change
  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  // Handle the edit functionality
  const handleEdit = () => {
    if (newName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    editRecordingName(audioId, newName); // Update the recording name
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#04121C] flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap text-center">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] font-bold text-yellow-600">
              Edit the name of your audio recorder
            </h3>
            <RiEdit2Fill className="text-yellow-600 text-lg sm:text-xl md:text-[20px] flex-shrink-0" />
          </div>
          <div className="flex items-center justify-center w-full mt-5 sm:mt-6 md:mt-7">
            <input
              type="text"
              value={newName}
              onChange={handleChangeName}
              placeholder="Enter new audio name"
              className="w-full max-w-[83%] py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-[4px] bg-[#111E28] border border-[#F3B204]/30 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#F3B204] placeholder:text-[#F3B204]/50"
            />
          </div>
          <div className="flex items-center justify-between w-full max-w-[80%] gap-3 sm:gap-4 md:gap-6 modal-action mt-4 sm:mt-5 md:mt-6">
            <form method="dialog" className="flex-1">
              <button className="btn w-full text-sm sm:text-base md:text-lg">Close</button>
            </form>
            <form method="dialog" className="flex-1">
              <button
                type="submit"
                className="text-white bg-yellow-600 border-0 btn hover:bg-yellow-700 w-full text-sm sm:text-base md:text-lg active:scale-95 transition-transform"
                onClick={handleEdit}
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
