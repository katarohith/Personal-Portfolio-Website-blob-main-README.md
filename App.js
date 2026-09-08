import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>

      <h1>G. Lakshmi Narayana Reddy Portfolio</h1>

      <p>Full Stack Developer</p>

      <h2>Skills</h2>

      <ul>
        <li>React.js</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>JavaScript</li>
      </ul>

      <h2>Projects</h2>

      {projects.map((project) => (

        <div
          key={project._id}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            View Project
          </a>

        </div>

      ))}

      <h2>Contact</h2>

      <p>Email: gumreddylakshminarayana@karunya.edu.in</p>

      <p>
        GitHub:
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com
        </a>
      </p>

    </div>

  );
}

export default App;
