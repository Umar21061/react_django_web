// Recent.js
import React, { useState, useEffect, useRef } from 'react';
import './RecentCase.css'; // Import the CSS file specific to the Recent component

function Recent() {
    const [portfolioData, setPortfolioData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showExpertise, setShowExpertise] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const videoRefs = useRef([]);

    useEffect(() => {
        fetchPortfolioData();
    }, []);

    useEffect(() => {
        videoRefs.current = Array(portfolioData.length).fill().map((_, i) => videoRefs.current[i] || React.createRef());
    }, [portfolioData]);

    const fetchPortfolioData = async () => {
        try {
            const response = await fetch('/api/get_portfolio_data/');
            const data = await response.json();
            setPortfolioData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            setLoading(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        const categoryIndex = portfolioData.findIndex(project => project.category === category);
        if (categoryIndex !== -1) {
            const videoElement = videoRefs.current[categoryIndex].current;
            videoElement.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
    };

    const toggleExpertise = () => {
        setShowExpertise(true);
        setSelectedCategory(null);
    };

    const toggleIndustry = () => {
        setShowExpertise(false);
        setSelectedCategory(null);
    };

    return (
        <div className="recent">
            <div className="recent-button-container">
                <button className="recent-industry-button" onClick={toggleIndustry}>Industry</button>
                <button className="recent-expertise-button" onClick={toggleExpertise}>Expertise</button>
            </div>

            <div className="recent-category-buttons">
                {showExpertise ? (
                    <div className="center">
                        {['Backend Development', 'Discovery & Design', 'Frontend Development', 'Interactive Experience', 'Mobile Development', 'Web Development'].map((category, index) => (
                            <button key={index} onClick={() => handleCategorySelect(category)} className={selectedCategory === category ? "recent-selected" : ""}>
                                {category}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="center">
                        {['Retail', 'Data Management', 'Entertainment', 'Finance', 'Health', 'Manufacturing', 'Transportation'].map((category, index) => (
                            <button key={index} onClick={() => handleCategorySelect(category)} className={selectedCategory === category ? "recent-selected" : ""}>
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {loading ? (
                <p className="recent-loading-text">Loading...</p>
            ) : (
                <div className="recent-video-container">
                    {portfolioData.map((project, index) => (
                        <div key={index} ref={videoRefs.current[index]} className="recent-video-item">
                            {(!selectedCategory || selectedCategory === project.category) && (
                                <div className="recent-video-player">
                                    {project.urls.map((url, videoIndex) => (
                                        <div
                                            key={videoIndex}
                                            className="recent-video-player"
                                            onMouseEnter={() => setActiveVideoIndex(index)}
                                            onMouseLeave={() => setActiveVideoIndex(null)}
                                        >
                                            <video
                                                ref={videoRefs.current[index]}
                                                controls={false}
                                                autoPlay={activeVideoIndex === index}
                                                muted
                                                loop
                                            >
                                                <source src={url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            {activeVideoIndex === index && <p className="recent-video-text">{project.video_text}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Recent;
