import React from "react";
import { Col, Row } from "react-bootstrap";
import ImageWithSkeleton from '../../../../components/ImageWithSkeleton/ImageWithSkeleton.component';
import './ImagesContainer.style.scss'
import { gecoImageDescriptions, IImageDescription, pappagalloImageDescriptions, ranaImageDescriptions, tucanoImageDescriptions, VillaCoralImageDescriptions, VillaMarImageDescriptions, ArekaImageDescriptions, ArekaImageDescriptionsES, GiuliaImageDescriptions, GiuliaImageDescriptionsES, PlumeriaImageDescriptions, PlumeriaImageDescriptionsES, delfinImageDescriptions, delfinImageDescriptionsES } from '../../../../utils/constants';


interface IImagesContainer {
  showModal?: () => void
  houseName: string
}

let imageSnippet: number[]; //this is used to change the order of the pictures in the house page

const ImagesContainer = ({ showModal, houseName }: IImagesContainer) => {


  let images: IImageDescription[] = [];

  switch (houseName) {
    case "Tucano":
      images = tucanoImageDescriptions;
      imageSnippet = [2, 0, 5, 3, 8];
      break;
    case "Geco":
      images = gecoImageDescriptions;
      imageSnippet = [3, 4, 5, 6, 0];
      break;
    case "Pappagallo":
      images = pappagalloImageDescriptions;
      imageSnippet = [0, 1, 2, 4, 6];
      break;
    case "Rana":
      images = ranaImageDescriptions;
      imageSnippet = [2, 3, 5, 6, 7];
      break;
    case "Villa Coral":
      images = VillaCoralImageDescriptions;
      imageSnippet = [1, 2, 3, 4, 5];
      break;
    case "Villa Mar":
      images = VillaMarImageDescriptions;
      imageSnippet = [6, 2, 3, 4, 1];
      break;
    case "TucanoES":
      images = tucanoImageDescriptions;
      imageSnippet = [2, 0, 5, 3, 8];
      break;
    case "GecoES":
      images = gecoImageDescriptions;
      imageSnippet = [3, 4, 5, 6, 0];
      break;
    case "PappagalloES":
      images = pappagalloImageDescriptions;
      imageSnippet = [0, 1, 2, 4, 6];
      break;
    case "RanaES":
      images = ranaImageDescriptions;
      imageSnippet = [2, 3, 5, 6, 7];
      break;
    case "Villa CoralES":
      images = VillaCoralImageDescriptions;
      imageSnippet = [1, 2, 3, 4, 5];
      break;
    case "Villa MarES":
      images = VillaMarImageDescriptions;
      imageSnippet = [6, 2, 1, 4, 5];
      break;
    case "Areka":
      images = ArekaImageDescriptions;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "ArekaES":
      images = ArekaImageDescriptionsES;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "Giulia":
      images = GiuliaImageDescriptions;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "GiuliaES":
      images = GiuliaImageDescriptionsES;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "Plumeria":
      images = PlumeriaImageDescriptions;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "PlumeriaES":
      images = PlumeriaImageDescriptionsES;
      imageSnippet = [0, 1, 2, 3, 4];
      break;
    case "Delfin":
      images = delfinImageDescriptions;
      imageSnippet = [5, 6, 2, 3, 4];
      break;
    case "DelfinES":
      images = delfinImageDescriptionsES;
      imageSnippet = [5, 6, 2, 3, 4];
      break;
  }


  function showAllImages() {
    if (showModal)
      showModal();
  }

  return (
    <>
      <div className="imagesContainer" onClick={showAllImages}>
        <Row>
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <ImageWithSkeleton
              className="mainImage"
              fluid
              src={images[imageSnippet[0]].imageLink || ''}
              alt={images[imageSnippet[0]].roomType || "Main property image"}
              skeletonProps={{
                variant: 'rectangular',
                animation: 'shimmer',
                aspectRatio: '4/3',
                width: '100%'
              }}
            />
          </Col>
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <Col className="col" lg={6} sm={6} xs={6} md={6}>
              <ImageWithSkeleton
                className="secondaryImages"
                fluid
                src={images[imageSnippet[1]].imageLink || ''}
                alt={images[imageSnippet[1]].roomType || "Property image"}
                skeletonProps={{
                  variant: 'rectangular',
                  animation: 'shimmer',
                  aspectRatio: '1/1',
                  width: '100%'
                }}
              />
              <ImageWithSkeleton
                className="secondaryImages bottom"
                fluid
                src={images[imageSnippet[2]].imageLink || ''}
                alt={images[imageSnippet[2]].roomType || "Property image"}
                skeletonProps={{
                  variant: 'rectangular',
                  animation: 'shimmer',
                  aspectRatio: '1/1',
                  width: '100%'
                }}
              />
            </Col>
            <Col className="col" lg={6} sm={6} xs={6} md={6}>
              <ImageWithSkeleton
                className="secondaryImages"
                fluid
                src={images[imageSnippet[3]].imageLink || ''}
                alt={images[imageSnippet[3]].roomType || "Property image"}
                skeletonProps={{
                  variant: 'rectangular',
                  animation: 'shimmer',
                  aspectRatio: '1/1',
                  width: '100%'
                }}
              />
              <ImageWithSkeleton
                className="secondaryImages bottom"
                fluid
                src={images[imageSnippet[4]].imageLink || ''}
                alt={images[imageSnippet[4]].roomType || "Property image"}
                skeletonProps={{
                  variant: 'rectangular',
                  animation: 'shimmer',
                  aspectRatio: '1/1',
                  width: '100%'
                }}
              />
            </Col>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default ImagesContainer