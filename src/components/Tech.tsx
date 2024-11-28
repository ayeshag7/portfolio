import React, { useEffect, useState } from "react";
import BallCanvas from "./BallCanvas";
import { technologies } from "../constants";

const Tech: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [visibleTechnologies, setVisibleTechnologies] = useState(technologies);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      const isSmall = window.matchMedia("(max-width: 768px)").matches;
      setIsSmallScreen(isSmall);
      setVisibleTechnologies(isSmall ? technologies.slice(0, 7) : technologies);
      console.log(isSmallScreen)
    };

    // Initial check
    handleResize();

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {visibleTechnologies.map((technology) => (
        <div className="w-24 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default Tech;
