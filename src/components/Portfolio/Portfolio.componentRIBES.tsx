import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PortfolioImage from '../PortfolioImage/PortfolioImage.component';
import PortfolioImageES from '../PortfolioImage/PortfolioImage.componentES';

const PortfolioRIBES = () => {
  const [folderName, setFolderName] = useState<string>('Villa Mar');

  const [activeButton, setActiveButton] = useState<string>('Villa Mar');

  const handleButtonClick = (houseName: string) => {
    setActiveButton(houseName);
    setFolderName(houseName);
  };

  const houses: string[] = ['Villa Mar', 'Villa Coral'];

  return (
    <div id="portfolioES" className="portfolio section">
      <div className="col-lg-12">
        <div className="title text-center">
          <h2>Nuestras <span className="color">Fotos</span></h2>
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
      <div className="d-flex flex-wrap">
        <div className="container">
          <PortfolioImageES folderName={folderName} />
        </div>
      </div>

    </div>
  );
};

export default PortfolioRIBES;