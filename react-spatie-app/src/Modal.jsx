import React from "react";

export default function Modal({ title, body, showModal, handleClose, footerContent }) {
  return (
    <>
      {showModal ? (
        <div className="modal fade show" style={{ display: "block" }} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal header with dynamic title */}
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  aria-label="Close"
                  className="close ms-auto" // Use ms-auto to push it to the right
                  onClick={handleClose}
                  style={{
                    outline: "none",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                 <h1><span>&times;</span></h1> 
                </button>
              </div>

              {/* Modal body with dynamic content */}
              <div className="modal-body">
                <p>{body}</p>
              </div>

              {/* Modal footer with dynamic content */}
              <div className="modal-footer">
                {footerContent ? (
                  footerContent
                ) : (
                  <>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
