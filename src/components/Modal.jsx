import React from 'react'
import '../sources/Modal.css'
const DIV_MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#fff',
    padding: '50px',
    zIndex: 1000
}
const DIV_OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

const Modal = ({ children, open, close }) => {
    if (!open) return null
    return (
        <>
            <div style={DIV_OVERLAY_STYLE} />
            <div style={DIV_MODAL_STYLE}>
              
                {children}

            </div>
        </>
    )
}



export default Modal;