import { Cog, Disc3, Droplets, Gauge, Settings2, Wrench } from "lucide-react";

export default function ServiceIcon({ type }: { type: string }) {
  const props = { size: 28, strokeWidth: 1.8 };
  if (type === "engine") return <Cog {...props} />;
  if (type === "brake") return <Disc3 {...props} />;
  if (type === "suspension") return <Gauge {...props} />;
  if (type === "oil") return <Droplets {...props} />;
  if (type === "radiator") return <Settings2 {...props} />;
  return <Wrench {...props} />;
}
