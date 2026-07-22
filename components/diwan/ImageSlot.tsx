import Image from "next/image";
import { IMAGES, type SlotKey } from "@/content/images";
import { cn } from "@/lib/cn";

type ImageSlotProps = {
  slot: SlotKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders one registered image slot with next/image (fill + cover). The parent
 * must be `position: relative` with a fixed height, exactly as the handoff's
 * image-slot containers are. Swapping the file in /public is a zero-code change.
 */
export function ImageSlot({ slot, className, sizes, priority }: ImageSlotProps) {
  const img = IMAGES[slot];
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      className={cn("object-cover", className)}
    />
  );
}
