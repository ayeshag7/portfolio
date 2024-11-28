import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";

interface Tag {
  name: string;
  color: string;
}

interface Project {
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  source_code_link: string;
}

interface ProjectCardProps extends Project {
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={45} // Updated Tilt prop
        tiltMaxAngleY={45} // Updated Tilt prop
        scale={1} // Scale prop
        transitionSpeed={450} // Smooth transition
        className="bg-hsl(var(--theme-bg)) border border-theme-quote p-5 rounded-2xl sm:w-[300px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-white border border-black bg-opacity-70 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src="/portfolio/images/icons/github.svg"
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-hsl(var(--theme-text)) font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-hsl(var(--theme-text)) text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
