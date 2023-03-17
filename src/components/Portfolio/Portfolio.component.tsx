import React, { useState } from 'react';
// import banner from '../../assets/../../assets/images/banner/banner-1.jpg';
// import './WelcomeSlider.style.scss';
// import Button from 'react-bootstrap/Button';
import { Button, Image } from 'react-bootstrap';
// import tst from '../../assets/images/portfolio/gecko/gecko-bathroom.jpg';
// import requireContext from 'require-context.macro';
import PortfolioImage from '../PortfolioImage/PortfolioImage.component';

const Portfolio = () => {
  // const images = requireContext('../../assets/images/portfolio/gecko', false, /\.(png|jpe?g|svg)$/);
  // const photos = require.context('../../assets/images/portfolio/gecko', false, /\.(png|jpe?g|svg)$/);
  const [folderName, setFolderName] = useState<string>('Tucano');

  const [activeButton, setActiveButton] = useState<string>('Tucano');

  const handleButtonClick = (houseName: string) => {
    setActiveButton(houseName);
    setFolderName(houseName);
  };

  const houses: string[] = ['Tucano', 'Geco', 'Pappagallo', 'Rana'];

  return (
    //id="portfolio">//className="row ">
    <div className="portfolio section">
      <div className="col-lg-12">
        <div className="title text-center">
          <h2>Our <span className="color">Photos</span></h2>
          <div className="border2"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="portfolio-filter">
            {houses.map((houseName) => {
              return <Button
                key={houseName}
                className={houseName === activeButton ? 'active' : ''}
                id="first-filter"
                onClick={() => handleButtonClick(houseName)}>{houseName}</Button>
            })}
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap" style={{ backgroundColor: '' }}>
        <div className="container">
          <PortfolioImage folderName={folderName} />
        </div>
      </div>

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

export default Portfolio;