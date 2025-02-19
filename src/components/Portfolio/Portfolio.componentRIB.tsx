import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import PortfolioImage from '../PortfolioImage/PortfolioImage.component';

const PortfolioRIB = () => {
  const [folderName, setFolderName] = useState<string>('Villa Mar');

  const [activeButton, setActiveButton] = useState<string>('Villa Mar');

  const handleButtonClick = (houseName: string) => {
    setActiveButton(houseName);
    setFolderName(houseName);
  };

  const houses: string[] = ['Villa Mar', 'Villa Coral'];

  return (
    <div id="portfolio" className="portfolio section">
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
      <div className="d-flex flex-wrap">
        <div className="container">
          <PortfolioImage folderName={folderName} />
        </div>
      </div>

    </div>
  );
};

export default PortfolioRIB;