import styles from "./LoginTitle.module.css";

export const LoginTittle = () => {
  return (
    <>
      <p className={styles.loginTitle}>
        BOLETA<span className={styles.rojo}>GO</span>
      </p>
    </>
  );
};
