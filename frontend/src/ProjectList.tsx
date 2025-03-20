import { useEffect, useState } from "react";
import { Project } from "./types/Project";

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNumber, totalItems]);
  return (
    <>
      <h1>Water Project</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card">
          <h3 className="card-title">{p.projectName}</h3>
          <ul className="card-body">
            <li>
              <strong>Project Type:</strong> {p.projectType}
            </li>
            <li>
              <strong>Regional Program: </strong>
              {p.projectRegionalProgram}
            </li>
            <li>
              <strong>Impact: </strong>
              {p.projectImpact} Individuals Served
            </li>
            <li>
              <strong>Project Phase:</strong> {p.projectPhase}
            </li>
            <li>
              <strong>Project Status:</strong> {p.projectFunctionalityStatus}
            </li>
          </ul>
        </div>
      ))}

      <button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNumber(index + 1)}
          disabled={pageNumber === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </button>

      <br />
      <label>
        <select
          value={pageSize}
          onChange={(p) => (
            setPageSize(Number(p.target.value)), setPageNumber(1)
          )}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
