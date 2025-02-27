import styles from "./components.module.css";

const Sidebar = ({ onSelectView }) => {
  const programs = [
    { id: "shs", name: "Senior High School" },
    { id: "bachelorWifery", name: "Bachelor of Science in Midwifery" },
    {
      id: "bachelorEducation",
      name: "Bachelor of Technical-Vocational Teacher Education",
    },
  ];

  return (
    <div className={styles.sidebar}>
      <h2>Programs</h2>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <button onClick={() => onSelectView(program.id)}>
              {program.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

// OpenAI. (2025, February 26). Response to the prompt "Can you fix this code so that it matches my schema: I want to create an API endpoint that allows me to fetch, create, and delete data for programs, courses, and subjects."
// ChatGPT (Version 4.0). Accessed and retrieved on Feb 24, 2025 from https://chat.openai.com
