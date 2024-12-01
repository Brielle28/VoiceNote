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
        <div className="modal-box bg-[#04121C] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mt-3">
            <h3 className="text-[20px] font-bold text-yellow-600">
              Edit the name of your audio recorder
            </h3>
            <RiEdit2Fill className="text-yellow-600 text-[20px]" />
          </div>
          <div className="flex items-center justify-center w-full mt-7">
            <input
              type="text"
              value={newName}
              onChange={handleChangeName}
              placeholder="Enter new audio name"
              className="w-[83%] py-2 rounded-[4px] bg-[#04121C] text-white"
            />
          </div>
          <div className="flex items-center justify-between w-[80%] modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <form method="dialog">
              <button
                type="submit"
                className="text-white bg-yellow-600 border-0 btn"
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
