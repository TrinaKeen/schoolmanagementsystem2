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
