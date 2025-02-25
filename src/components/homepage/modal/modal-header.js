import React from 'react';
import Images from '../bg-images';

const ModalHeader = ({onClose}) => {
  return (
    <div>
        <Images signup/>
        <button
            onClick={onClose}
            className="absolute top-2 right-4 text-white text-2xl font-semibold hover:text-red-500 focus:outline-none"
        >
           x
      </button>
    </div>
  )
}

export default ModalHeader