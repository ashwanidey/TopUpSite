import React from 'react'

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const BootStrapToast = ({show,onHide}) => {
  return (
    
    <ToastContainer
          className="fixed top-20 "
         
          style={{ zIndex: 60 }}
        >
    <Toast onClose={onHide} show={show} delay={3000} autohide>
          <Toast.Header className=''>
           
            {/* <strong className="me-auto">{props.toastName === "login" ? "LoggedIn" : "Signed Up"}</strong> */}
            SOmething
            
          </Toast.Header>
          <Toast.Body className='text-[#00e639]'>Test</Toast.Body>
        </Toast>
        </ToastContainer>
        
  )
}

export default BootStrapToast