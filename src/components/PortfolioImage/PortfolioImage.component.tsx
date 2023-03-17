import React from 'react';

import requireContext from 'require-context.macro';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IPortfolioImage {
  folderName: string;
}
const PortfolioImage = ({ folderName }: IPortfolioImage) => {
  const path: string = `../../assets/images/portfolio/${folderName}`;
  console.log('path: ', path);
  console.log('path2: ', '../../assets/images/portfolio/Tucano');
  let images: any;

  switch (folderName) {
    case "Tucano":
      images = requireContext('../../assets/images/portfolio/Tucano', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Geco":
      images = requireContext('../../assets/images/portfolio/Geco', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Pappagallo":
      images = requireContext('../../assets/images/portfolio/Pappagallo', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Rana":
      images = requireContext('../../assets/images/portfolio/Rana', false, /\.(png|jpe?g|svg)$/);
      break;

  }

  return (
    // <div className="col-lg-4 filtr-item row">

    <div className="filtr-item row">
      {images.keys().filter((imagePath: string) => !imagePath.includes('-sm')).map((imagePath: string, index: number) => {
        return (
          <div className="portfolio-block col-lg-4 col-md-6">
            <Image
              // style={{ height: '260px', padding: '15px 15px' }} 
              key={index} src={images(imagePath)} alt={`Image ${index + 1}`} fluid />
            <div className="caption d-flex  align-items-center flex-column">
              <div className="search-icon image-popup d-flex justify-content-center align-items-center" data-effect="mfp-with-zoom" data-lightbox="image-1">
                <FontAwesomeIcon icon={faSearch} color='white' fontSize={"20px"} />
                {/* <i className="bi bi-search"></i> */}
              </div>
              <h4>Casa {folderName} - Bathroom</h4>
              <p>We always provide towels and toiletries.</p>
            </div>
          </div>
        )
      })}
    </div>
  );
  // return (
  //   <section className="portfolio section" id="portfolio">
  //     <div className="container">
  //       <div className="row ">
  //         <div className="col-lg-12">
  //           <div className="title text-center">
  //             <h2>Our <span className="color">Photos</span></h2>
  //             <div className="border"></div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col-md-12">
  //           <div className="portfolio-filter">
  //             <button className="active" type="button" id="first-filter" data-filter="tucano">Tucano</button>
  //             <button type="button" data-filter="geco">Geco</button>
  //             <button type="button" data-filter="pappagallo">Pappagallo</button>
  //             <button type="button" data-filter="rana">Rana</button>
  //           </div>
  //         </div>
  //       </div>

  //       <Image src={tst} alt="Example image" fluid />
  //     </div>
  //   </section>
  // <section classNameNameName="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
  //   <div classNameNameName = "block" >
  //     <h1>RESERVAS KALAWALA</h1>
  //     <p id="short-description">Fully equipped vacation homes in the heart of Puerto Viejo.</p>
  //     <Button variant="outline-light" classNameNameName='btn-transparent' href="#house-list">Explore</Button>
  //     {/* <a data-scroll href="#house-list" classNameNameName="btn btn-transparent">Explore Us</a> */}
  //     <br />
  //     {/* //TODO: <a href="#" onClick={() => setLanguage('en')}>English</a> | <a href="#" onClick={() => setLanguage('es')}>Spanish</a> */ }
  //   </div >
  // </section >
  // );
};

export default PortfolioImage;