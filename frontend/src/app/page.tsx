import LiquidChrome from "@/components/ui/LiquidChrome";

export default function Home() {
  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
      <LiquidChrome
        baseColor={[0.0, 0.1, 0.1]}
        speed={0.3}
        amplitude={0.3}
        interactive={false}
      />
    </div>
  );
}
