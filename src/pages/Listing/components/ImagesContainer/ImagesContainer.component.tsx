import { Col, Row, Image, } from "react-bootstrap";
import './ImagesContainer.style.scss'
import requireContext from 'require-context.macro';

interface IImagesContainer{
  showModal?: () => void
  houseName: string
}

let imageSnippet: number[]; //this is used to change the order of the pictures in the house page

const ImagesContainer = ({showModal, houseName}: IImagesContainer) => {

  
  let images: any;
  
  switch (houseName) {
    case "Tucano":
      images = requireContext('../../../.././assets/images/portfolio/Tucano', false, /\.(png|jpe?g|svg)$/);
      imageSnippet = [2,0,5,3,8];
      break;
    case "Geco":
      images = requireContext('../../../.././assets/images/portfolio/Geco', false, /\.(png|jpe?g|svg)$/);
      imageSnippet = [3,4,5,6,0];
      break;
    case "Pappagallo":
      images = requireContext('../../../.././assets/images/portfolio/Pappagallo', false, /\.(png|jpe?g|svg)$/);
      imageSnippet = [0,1,2,4,6];
      break;
    case "Rana":
      images = requireContext('../../../.././assets/images/portfolio/Rana', false, /\.(png|jpe?g|svg)$/);
      imageSnippet = [2,3,5,6,7];
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
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <Image className="mainImage" fluid src={images(imageList[imageSnippet[0]])} alt="" />
          </Col>
          <Col className="col" lg={6} sm={12} md={12} xs={12}>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={images(imageList[imageSnippet[1]])} alt="" />
              <Image className="secondaryImages bottom" fluid src={images(imageList[imageSnippet[2]])} alt="" />
            </Col>
            <Col className="col" lg={6} sm={12} md={12}>
              <Image className="secondaryImages" fluid src={images(imageList[imageSnippet[3]])} alt="" />

              <Image className="secondaryImages bottom" fluid src={images(imageList[imageSnippet[4]])} alt="" />
            </Col>
          </Col>
        </Row>
      </div>
      
    </>
  )
}

export default ImagesContainer