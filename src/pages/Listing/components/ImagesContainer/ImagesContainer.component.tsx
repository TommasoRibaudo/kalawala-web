import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Modal, Button } from "react-bootstrap";
import './ImagesContainer.style.scss'
import image from "../../../../assets/images/portfolio/Tucano/tucano-bathroom-2.jpg";

interface IImagesContainer{
  showModal?: () => void
}
const ImagesContainer = ({showModal}: IImagesContainer) => {

  



  function showAllImages() {
    if(showModal)
      showModal();
    console.log('show images');
  }

  return (
    <>
      <div className="imagesContainer" onClick={showAllImages}>
        <Row>
          <Col className="col" lg={6} sm={12} md={12}>
            <Image className="mainImage" fluid src={image} alt="" />
          </Col>
          <Col className="col" lg={6} sm={12} md={12}>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={image} alt="" />
              <Image className="secondaryImages bottom" fluid src={image} alt="" />
            </Col>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={image} alt="" />

              <Image className="secondaryImages bottom" fluid src={image} alt="" />
            </Col>
          </Col>
        </Row>

        {/* <Modal show={show} onHide={handleClose} centered >
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        
      </Modal> */}
      </div>
      
    </>
  )
}

export default ImagesContainer