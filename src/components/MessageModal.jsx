import React from 'react'
import '../scss/MessageModal.scss';

export default function MessageModal({message, isOpen, setIsOpen, isSuccess, handleClose}) {
    const modal = document.getElementById("message-modal");
   
    window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
    function handleModalClose() {
        setIsOpen(false)
        // if success route to welcome page
        if(isSuccess) {
            handleClose()
        }
    }

  return (
    <div id={'message-modal'} style={{display: isOpen ? "block" : "none"}}>
        <div className='modal-content' >
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h1 style={{color: isSuccess ? 'green' : 'red'}}>{isSuccess ? 'Your alert is created!' : 'Uh-oh!'}</h1>
            <p>{message}</p>
        </div>
    </div>
  )
}
