import React from "react";
import BallCanvas from "./BallCanvas";
import { technologies } from "../constants";

const Tech: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {technologies.map((technology) => (
        <div className="w-24 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default Tech;
