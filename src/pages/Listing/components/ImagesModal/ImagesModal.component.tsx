import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import './ImagesModal.style.scss';
import image from "../../../../assets/images/portfolio/Tucano/tucano-bathroom-2.jpg";


interface IIMagesModal {
  closeModal: () => void;
}
const ImagesModal = ({ closeModal }: IIMagesModal) => {
  useEffect(() => {
    console.log('test')
  }, []);
  return (
    <div className="testModal " onClick={closeModal}>
      {/* <Image className="modalImage" fluid src={image} alt="" />
      <Image className="modalImage" fluid src={image} alt="" />
      <Image className="modalImage" fluid src={image} alt="" />
      <Image className="modalImage" fluid src={image} alt="" />
      <Image className="modalImage" fluid src={image} alt="" />
      <Image className="modalImage" fluid src={image} alt="" /> */}
      {/* <ImagesContainer /> */}
      <Row>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
      {/* </Row>
      <Row> */}
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
      {/* </Row>
      <Row> */}
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
        <Col className="col" lg={4} sm={12} md={6}>
          <Image className="modalImage" fluid src={image} alt="" />
        </Col>
      </Row>

      {/* <Col className="col" lg={4} sm={12} md={6}>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
      </Col>
      <Col className="col" lg={4} sm={12} md={6}>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
      </Col>
      <Col className="col" lg={4} sm={12} md={6}>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
        <Row>
          <Image className="modalImage" fluid src={image} alt="" />
        </Row>
      </Col> */}
    </div>
  )
}

export default ImagesModal