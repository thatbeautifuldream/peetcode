import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllProblems.css";
import { backendUrl } from "../../constants.js";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const init = async () => {
    const response = await fetch(`${backendUrl}/problems`, {
      method: "GET",
    });
    const json = await response.json();
    setProblems(json.problems);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div id="allproblems">
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
          </tr>
          <Suspense fallback={<div>Loading Problems...</div>}>
            {problems.map((prob, index) => (
              <tr>
                <Link to={`/problems/:${prob.problemId}`}>
                  <td>{prob.title}</td>
                </Link>
                <td className={`${prob.difficulty}`}>{prob.difficulty}</td>
                <td className={`${prob.difficulty}`}>{prob.acceptance}</td>
              </tr>
            ))}
          </Suspense>
        </tbody>
      </table>
    </div>
  );
};

export default AllProblemsPage;
