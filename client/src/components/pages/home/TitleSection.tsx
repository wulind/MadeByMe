import strings from "../../../assets/strings/common";
import { TCanvas } from "./TCanvas";

export default function TitleSection() {
  return (
    <div className="relative h-screen w-screen">
      <TCanvas />
      <h1
        className="absolute text-white bg-transparent w-screen"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {strings.MADE_BY_STUDIOS}
      </h1>
    </div>
  );
}
