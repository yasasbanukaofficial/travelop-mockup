import Iridescence from "../ui/Iridescence";
import LiquidChrome from "../ui/LiquidChrome";

interface bgProps {
  variant: "liquid" | "irid";
}

export default function Background({ variant }: bgProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {variant == "liquid" && (
        <LiquidChrome
          baseColor={[0.0, 0.1, 0.1]}
          speed={0.3}
          amplitude={0.3}
          interactive={false}
        />
      )}
      {variant == "irid" && (
        <Iridescence
          color={[0.1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      )}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
    </div>
  );
}
