import LiquidChrome from "@/components/ui/LiquidChrome";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <LiquidChrome
        baseColor={[0.0, 0.1, 0.1]}
        speed={0.3}
        amplitude={0.3}
        interactive={false}
      />
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
    </div>
  );
}
