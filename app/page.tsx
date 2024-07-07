import style from "./styles/style";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="fadeUp1 text-[2rem] font-semibold">
          Welcome to my todo app...I know. Unoriginal
        </h1>
        <Link className="fadeUp2" href={"/todo-app"}>
          <button className={style.buttonStyles.lightThemeButton}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
