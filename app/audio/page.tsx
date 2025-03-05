import ClassicAudio from "./_components/classicAudio";
import ContextAudio from "./_components/contextAudio";
import HowlerAudio from "./_components/howlerAudio";
import SupportType from "./_components/supportType";

export default function AudioPage() {
  return (
    <div>
      <h1>classic Audio</h1>
      <ClassicAudio />

      <h1>context Audio 10</h1>
      <ContextAudio />

      <h1>howler Audio 2</h1>
      <HowlerAudio />

      <h1>support Type</h1>
      <SupportType />
    </div>
  );
}
