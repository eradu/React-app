import { useEffect, useState } from "react";
import axios from "axios";

import "../Styles/About.scss";

const url = "http://localhost:1234/api/about"; // variable for the url used in fetch

const About = () => {
  const [learningItems, setLearningItems] = useState([]);
  // we use useEffect hook to fetch the items from /about route from express; we use axios to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url);
        setLearningItems([...response.data]);
      } catch (err) {
        if (err.response) {
          //if NOT in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // for no response or other status errors (404...)
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="about-list">
      <h2>ToDo List</h2>
      <p>This is my first React application.</p>
      <p>What I learned:</p>
      <ul>
        {learningItems.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default About;
