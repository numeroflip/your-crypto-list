import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        " rounded-md shadow-md bg-white/80 animate-pulse",
        className
      )}
      {...props}
    />
  );
}
