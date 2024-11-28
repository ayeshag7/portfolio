import React from "react";
import VerticalTimelinePkg from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "src/constants";

const { VerticalTimeline, VerticalTimelineElement } = VerticalTimelinePkg;

// Experience Card Component
const ExperienceCard: React.FC<{ experience: typeof experiences[0] }> = ({
  experience,
}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "hsl(var(--theme-expbg))",
        color: "hsl(var(--theme-exptext))",
      }}
      contentArrowStyle={{ borderRight: "7px solid hsl(var(--theme-line))" }}
      date={experience.date}
      dateClassName={"text-hsl-var-theme-line"}
      iconStyle={{ background: experience.iconBg }}
      iconClassName={"icon-div"}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain rounded-full"
          />
        </div>
      }
    >

      <div>
        <h3 className="text-hsl(var(--theme-exptext)) text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-hsl(var(--theme-exptext)) text-[16px] font-semibold"
          style={{ margin: "6px 0 0 0", fontWeight: "400" }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-[14px] pl-4 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

// Main Experience Component
const Experience: React.FC = () => {
  return (
    <div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="hsl(var(--theme-line))">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
