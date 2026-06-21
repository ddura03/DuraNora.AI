import Image from "next/image";
import type { ModelMark } from "@/lib/types";
import { LOGO_SRC } from "@/lib/logos";

type Props = {
  mark: ModelMark | string;
  className?: string;
  style?: React.CSSProperties;
  /** Render size in px (inner logo scales to ~70%). */
  size?: number;
};

export function ModelLogo({ mark, className, style, size = 32 }: Props) {
  const src = LOGO_SRC[mark as ModelMark];
  const inner = Math.round(size * 0.7);
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={className}
        style={{ width: inner, height: inner, objectFit: "contain", display: "block", position: "relative", ...style }}
        unoptimized
      />
    );
  }
  return <span className={className} style={style}>{mark}</span>;
}
