import styles from "@/components/layout/styles/PopUp.module.css";
import { michroma, museoModerno } from "@/lib/fonts";
import Button from "../ui/Button";

const PopUp = ({
  handlesPopUp,
  popUpTitle,
  popUpDescription,
  btnText,
  onClickAction,
}: {
  handlesPopUp: () => void;
  popUpTitle: string;
  popUpDescription: string;
  btnText: string;
  onClickAction?: () => void;
}) => {
  return (
    <div
      className="w-full h-full flex inset-0 absolute top-0 backdrop-filter backdrop-brightness-60 backdrop-blur-md"
      onClick={handlesPopUp}
    >
      <div className={`${styles.popUpContainer}`}>
        <p className={`${styles.popUpTitle} ${michroma.className}`}>
          {popUpTitle}
        </p>
        <hr className="mb-3"></hr>
        <span
          className={`${styles.popUpDescription} ${museoModerno.className}`}
        >
          {popUpDescription}
        </span>
        <Button text={btnText} onClick={onClickAction} />
      </div>
    </div>
  );
};

export default PopUp;
