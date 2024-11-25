import React, { useContext } from 'react'
import { FiAlertTriangle } from "react-icons/fi";
import { UserContext } from '../Context/UserProvider';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ audioId, modalId }) => {
    const {DeleteRecording} = useContext(UserContext) 
    const navigate = useNavigate()

    const handleDelete = () => {
        DeleteRecording(audioId); // Call the delete function
        navigate("/VoiceList")
    };
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#04121C] flex flex-col items-center justify-center">
                    <div className='flex items-center justify-center gap-3 mt-3'>
                        <h3 className="text-[25px] font-bold">Confirm Deletion</h3>
                        <FiAlertTriangle className='text-red-600 ' />
                    </div>
                    <p className="py-3 text-[21px]">Are you sure you want to delete this recording?</p>
                    <div className="flex items-center justify-between w-full modal-action">
                        <form method="dialog">
                            <button className="btn"> No </button>
                        </form>
                        <form method="dialog">
                            <button className="text-black bg-red-600 border-0 btn hover:bg-red-700"
                            onClick={handleDelete}
                            > Yes </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteModal