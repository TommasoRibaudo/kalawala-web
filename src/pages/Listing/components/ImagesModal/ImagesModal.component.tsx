import React, { useEffect, useRef } from "react";
import './ImagesModal.style.scss';
import PortfolioImage from "../../../../components/PortfolioImage/PortfolioImage.component";


interface IIMagesModal {
  closeModal: () => void;
  houseName: string;
}
const ImagesModal = ({ closeModal, houseName }: IIMagesModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when modal opens
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    // Add native wheel event listener to handle scroll boundaries
    const handleWheel = (e: WheelEvent) => {
      if (modalRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
        
        // Prevent scroll overflow - if at top or bottom, prevent further scrolling
        if (scrollTop <= 0 && e.deltaY < 0) {
          e.preventDefault();
        } else if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
          e.preventDefault();
        }
      }
    };
    
    // Capture the current ref value for cleanup
    const currentModalRef = modalRef.current;
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    currentModalRef?.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup function to restore body scroll when modal closes
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
      currentModalRef?.removeEventListener('wheel', handleWheel);
    };
  }, [closeModal]);

  const handleModalClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the modal backdrop
    if (e.target === e.currentTarget) {
      console.log('Modal backdrop clicked, closing...');
      closeModal();
    } else {
      console.log('Modal content clicked, not closing...');
    }
  };
  return (
    <div 
      ref={modalRef}
      className="imagesModal" 
      onClick={handleModalClick}
    >
      <div className="d-flex flex-wrap align-items-center h-100">
          <PortfolioImage folderName={houseName} />
      </div>
       {/* Close button as fallback */}
       <button 
         className="btn btn-danger"
         onClick={() => {
           console.log('Close button clicked');
           closeModal();
         }}
         style={{ 
           position: 'fixed',
           top: '20px',
           right: '20px',
           zIndex: 1001, 
           fontSize: '35px', 
           width: '50px', 
           height: '50px',
           borderRadius: '50%',
           cursor: 'pointer',
           boxShadow: '0 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.1)',
           fontWeight: 'bold',
           textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           padding: 0,
           lineHeight: 1
         }}
       >
         ×
       </button>
    </div>
  )
}

export default ImagesModal