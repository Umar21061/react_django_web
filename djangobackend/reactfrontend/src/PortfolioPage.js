import React from 'react';
import Portfolio from './Portfolio';
import RecentCase from './RecentCase';
import Cons from './Cons';
import Footer from './Footer';

const PortfolioPage = () => {
  return (
    <div className="portfoliopage-page">
        <Portfolio/>
      
      <Cons />
      <Footer />
    </div>
  );
}

export default PortfolioPage;
