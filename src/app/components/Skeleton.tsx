import clsx from "clsx";
import { HTMLAttributes } from "react";


/**
 * Placeholder component for loading states
 */
export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        " rounded-2xl shadow-md bg-white/60 animate-pulse",
        className
      )}
      {...props}
    />
  );
}
