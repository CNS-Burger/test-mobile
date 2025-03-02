import ClassicAudio from "./_components/classicAudio";
import ContextAudio from "./_components/contextAudio";
import ContextAudio2 from "./_components/contextAudio2";
export default function AudioPage() {
  return (
    <div>
      <h1>classic Audio</h1>
      <ClassicAudio />

      <h1>context Audio 4</h1>
      <ContextAudio />

      <h1>context Audio2 </h1>
      <ContextAudio2 />
    </div>
  );
}
