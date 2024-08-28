import { Col, Row, Image, } from "react-bootstrap";
import './ImagesContainer.style.scss'
import requireContext from 'require-context.macro';
import { gecoImageDescriptions, IImageDescription, pappagalloImageDescriptions, ranaImageDescriptions, tucanoImageDescriptions } from '../../../../utils/constants';

interface IImagesContainer{
  showModal?: () => void
  houseName: string
}

let imageSnippet: number[]; //this is used to change the order of the pictures in the house page

const ImagesContainer = ({showModal, houseName}: IImagesContainer) => {

  
  let images: IImageDescription[] = [];
  
  switch (houseName) {
    case "Tucano":
      images = tucanoImageDescriptions;
      imageSnippet = [2,0,5,3,8];
      break;
    case "Geco":
      images = gecoImageDescriptions;
      imageSnippet = [3,4,5,6,0];
      break;
    case "Pappagallo":
      images = pappagalloImageDescriptions;
      imageSnippet = [0,1,2,4,6];
      break;
    case "Rana":
      images = ranaImageDescriptions;
      imageSnippet = [2,3,5,6,7];
      break;
      case "TucanoES":
        images = tucanoImageDescriptions;
        imageSnippet = [2,0,5,3,8];
        break;
      case "GecoES":
        images = gecoImageDescriptions;
        imageSnippet = [3,4,5,6,0];
        break;
      case "PappagalloES":
        images = pappagalloImageDescriptions;
        imageSnippet = [0,1,2,4,6];
        break;
      case "RanaES":
        images = ranaImageDescriptions;
        imageSnippet = [2,3,5,6,7];
        break;
  }


  function showAllImages() {
    if(showModal)
      showModal();
    console.log('show images');
  }

  return (
    <>
      <div className="imagesContainer" onClick={showAllImages}>
        <Row>
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <Image className="mainImage" fluid src={images[imageSnippet[0]].imageLink} alt="" />
          </Col>
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <Col className="col" lg={6} sm={6} xs={6} md={6}>
              <Image className="secondaryImages" fluid src={images[imageSnippet[1]].imageLink} alt="" />
              <Image className="secondaryImages bottom" fluid src={images[imageSnippet[2]].imageLink} alt="" />
            </Col>
            <Col className="col" lg={6} sm={6} xs={6} md={6}>
              <Image className="secondaryImages" fluid src={images[imageSnippet[3]].imageLink} alt="" />

              <Image className="secondaryImages bottom" fluid src={images[imageSnippet[4]].imageLink} alt="" />
            </Col>
          </Col>
        </Row>
      </div>
      
    </>
  )
}

export default ImagesContainer