import { useState } from "react";
import { getResumeData } from "../lib/resume";
import { JobCard } from "../theme/theme";
import AppLayout from "../layouts/app-layout";
export const Job = ({ job, hovered, onHover, index }) => {
   const tags = job.tags.join(", ");
   const isOpac = typeof hovered === "number" && hovered !== index;
   return (
      <li>
         <div className="row">
            <div className="duration">
               <div className="from">{job.duration.from}</div>
               <div className="to">{job.duration.to}</div>
            </div>
            <div
               className={`card ${isOpac ? "opac" : ""}`}
               onMouseEnter={() => onHover(index)}
            >
               <div className="logo">
                  <img className="image" src={job.company.logo} alt="" />
               </div>
               <div className="job">
                  <h3 className="title">{job.title}</h3>
                  <a
                     href={job.company.website}
                     target="_blank"
                     className="company"
                  >
                     <div>{job.company.name}</div>
                  </a>
               </div>
               <div className="summary">
                  <p>
                     {job.description.split("\n").map((text, idx) => (
                        <span key={idx}>{text}</span>
                     ))}
                  </p>
               </div>
               <div className="extra">
                  <p>
                     {job.elaborated_desctiption
                        .split("\n")
                        .map((text, idx) => (
                           <span key={idx}>{text}</span>
                        ))}
                  </p>
               </div>
               <p className="tags">{tags}</p>
            </div>
         </div>
         <style jsx>{JobCard}</style>
      </li>
   );
};

export default function Resume({ resumeData }) {
   const [hovered, setHovered] = useState(null);
   const jobs = resumeData.jobs
      .slice(0)
      .reverse()
      .map((job, index) => (
         <Job
            key={index}
            job={job}
            index={index}
            hovered={hovered}
            onHover={(idx) => setHovered(idx)}
         />
      ));
   return (
      <AppLayout title="Itamar Sharify's CV" favicon="/cv.ico">
         <ul className="timeline" onMouseLeave={() => setHovered(null)}>
            {jobs}
         </ul>
         <style jsx>{`
            ul.timeline {
               border-left: 2px dotted;
               border-left-color: black;
            }
         `}</style>
      </AppLayout>
   );
}

export async function getStaticProps({ params }) {
   const resumeData = await getResumeData();
   return {
      props: {
         resumeData,
         headerTitle: "Resume",
      },
   };
}
