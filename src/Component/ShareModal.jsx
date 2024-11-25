import { FiAlertTriangle } from "react-icons/fi";


const ShareModal = ({ audioId, modalId }) => {
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#04121C] flex flex-col items-center justify-center">
                    <div className='flex items-center justify-center gap-3 mt-3'>
                        <h3 className="text-[25px] font-bold"> share : 
                            {audioId} </h3>
                        <FiAlertTriangle className='text-red-600 ' />
                    </div>
                    <p className="py-3 text-[21px]">Testing share Component id:{audioId}</p>
                    <div className="flex items-center justify-between w-full modal-action">
                        <form method="dialog">
                            <button className="btn"> close </button>
                        </form>
                        
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ShareModal