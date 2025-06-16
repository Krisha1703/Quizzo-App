// Share Modal Component

import ModalHeader from "../homepage/modal/modal-header"

const ShareModal = ({closeModal, cls, handleCopyCode, copied}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2  md:min-h-[49vh] md:max-h-[50vh] min-h-[46vh] max-h-[47vh] max-w-md md:w-full w-5/6 bg-white rounded shadow-lg">
            <div className="p-6 mt-10">
                <div className="space-y-4 text-center md:mt-0 mt-10">
                    <ModalHeader onClose={closeModal} />
                    <p className="text-lg font-semibold">Share the class code with others</p>

                    <div className="flex ">
                        <input
                            readOnly
                            value={cls.classCode}
                            className="border px-3 py-2 w-full text-center rounded-r-none rounded"
                        />
                        <button
                            onClick={handleCopyCode}
                            className="bg-primary text-white px-4 py-2 rounded-l-none rounded whitespace-nowrap"
                            >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
     </div>
  )
}

export default ShareModal