import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image, Modal, Button } from "react-bootstrap";
import './ImagesContainer.style.scss'
import image from "../../../../assets/images/portfolio/Tucano/tucano-bathroom-2.jpg";
import { gecoImageDescriptions, IImageDescription, pappagalloImageDescriptions, ranaImageDescriptions, tucanoImageDescriptions } from '../../../../utils/constants';
import requireContext from 'require-context.macro';

interface IImagesContainer{
  showModal?: () => void
  houseName: string
}
const ImagesContainer = ({showModal, houseName}: IImagesContainer) => {

  
  let images: any;
  type ImageDescriptions = {
    [key: string]: IImageDescription[];
  }
  const imageDescriptions: ImageDescriptions = {
    Tucano:tucanoImageDescriptions,
    Geco:gecoImageDescriptions,
    Pappagallo:pappagalloImageDescriptions,
    Rana:ranaImageDescriptions
  }
  switch (houseName) {
    case "Tucano":
      images = requireContext('../../../.././assets/images/portfolio/Tucano', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Geco":
      images = requireContext('../../../.././assets/images/portfolio/Geco', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Pappagallo":
      images = requireContext('../../../.././assets/images/portfolio/Pappagallo', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Rana":
      images = requireContext('../../../.././assets/images/portfolio/Rana', false, /\.(png|jpe?g|svg)$/);
      break;
  }

 const imageList = images.keys().filter((imagePath: string) => !imagePath.includes('-sm'));


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
            <Image className="mainImage" fluid src={images(imageList[0])} alt="" />
          </Col>
          <Col className="col" lg={6} sm={12} md={12}>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={images(imageList[1])} alt="" />
              <Image className="secondaryImages bottom" fluid src={images(imageList[2])} alt="" />
            </Col>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={images(imageList[3])} alt="" />

              <Image className="secondaryImages bottom" fluid src={images(imageList[4])} alt="" />
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