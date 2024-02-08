import styles from "./header.module.css";
interface HeaderType {
  title: string;
  content: string[];
}
export default function HeaderContent({
  headerContent,
}: {
  headerContent: HeaderType;
}) {
  return (
    <>
      <header className={styles.header}>
        <h2>{headerContent.title}</h2>
        <div>
          <ul>
            {headerContent.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </header>
      <hr></hr>
    </>
  );
}
