import  { useState } from "react";
import redicon from "../assets/read icon.png";
import redicon1 from "../assets/read icon (1).png";
import "./service.css";

function FrequentQuestion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const FREQUENT_QUESTIONS = [
    {
      ques: "Who developed this project?",
      ans: "This travel booking website was developed by Manish Singh Rajwar."
    },
    {
      ques: "What tech stack was used?",
      ans: "The project uses React.js for the frontend, Node.js with Express for the backend, static JSON data and RESTFul APIs."
    },
    {
      ques: "Github Repository",
      ans: "Yes, the complete source code is available on GitHub as part of the submission."
    },
    {
      ques: "How can I contact the developer?",
      ans: "Contact Number: 7417733144"
    }
  ];

  return (
    <div className="freqwrap">
      <div className="freqcont">
        <div className="frqtop">
          <h2>Frequently Asked Questions</h2>
          <p>We're happy to answer your questions</p>
        </div>

        <div className="questions">
          {FREQUENT_QUESTIONS.map((d, i) => (
            <div key={i} className="singques">
              <div className="queitonaprt" onClick={() => toggleAnswer(i)}>
                <p>{d.ques}</p>
                <img
                  src={activeIndex === i ? redicon1 : redicon}
                  alt="Toggle Icon"
                />
              </div>

              <div className={`anspart ${activeIndex === i ? "active" : ""}`}>
                <p>{d.ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FrequentQuestion;
