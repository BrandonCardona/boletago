import { useEffect, useState } from "react";
import style from "./LoadingScreen.module.css";

interface LoadingProps {
  active: boolean;
}

export const LoadingScreen = ({ active }: LoadingProps) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!active) {
      setFade(true);
      const timeout = setTimeout(() => setFade(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  if (!active && !fade) return null;

  return (
    <div className={style.loading_screen}>
      <div className={style.spinner}></div>
      <p>Cargando...</p>
    </div>
  );
};
