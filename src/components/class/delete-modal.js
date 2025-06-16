// Delete Modal Component

import ModalHeader from "../homepage/modal/modal-header"

const DeleteModal = ({closeModal, handleDelete}) => {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2  md:min-h-[44vh] md:max-h-[45vh] min-h-[40vh] max-h-[44vh] max-w-xl w-5/6 md:max-w-md md:w-full bg-white rounded shadow-lg">
            <div className="p-6 mt-10">
                <div className="space-y-4 text-center md:mt-0 mt-10">
                <ModalHeader onClose={closeModal} />
                <p className="text-lg font-semibold">Are you sure you want to delete this class?</p>

                <div className="flex justify-center gap-4">
                    <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal