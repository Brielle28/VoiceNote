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
                <div className="modal-box bg-[#04121C] flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                    <div className='flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap'>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-bold text-white">Confirm Deletion</h3>
                        <FiAlertTriangle className='text-red-600 text-xl sm:text-2xl md:text-3xl flex-shrink-0' />
                    </div>
                    <p className="py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg lg:text-[21px] text-white text-center">Are you sure you want to delete this recording?</p>
                    <div className="flex items-center justify-between w-full gap-3 sm:gap-4 md:gap-6 modal-action mt-2 sm:mt-4">
                        <form method="dialog" className="flex-1">
                            <button className="btn w-full text-sm sm:text-base md:text-lg"> No </button>
                        </form>
                        <form method="dialog" className="flex-1">
                            <button className="text-white bg-red-600 border-0 btn hover:bg-red-700 w-full text-sm sm:text-base md:text-lg active:scale-95 transition-transform"
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