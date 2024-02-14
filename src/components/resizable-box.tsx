"use client";

import { PropsWithChildren, useCallback, useLayoutEffect, useRef, useState } from "react";

import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type ResizeHandleAxis = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

type Bounds = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

type Props = {
  className?: string;
  resizeHandleAxis?: ResizeHandleAxis[];
  maxConstraints?: [number, number];
  minConstraints?: [number, number];
} & Bounds;

export default function ResizableBox({
  children,
  className,
  resizeHandleAxis,
  top,
  left,
  width,
  height,
  maxConstraints = [Infinity, Infinity],
  minConstraints = [16, 16],
}: PropsWithChildren<Props>) {
  const [bounds, setBounds] = useState<Bounds>({ top, left, width, height });

  const resizeRegister = (onDragChange: (deltaX: number, deltaY: number) => void) => {
    return {
      onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.pageX - clickEvent.pageX;
          const deltaY = moveEvent.pageY - clickEvent.pageY;
          onDragChange(deltaX, deltaY);
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp, { once: true });
      },
    };
  };

  const boundaryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // if (width && height && x && y) {
    //   return;
    // }

    if (boundaryRef.current) {
      const boundary = boundaryRef.current.getBoundingClientRect();

      setBounds({
        left: boundary.x,
        top: boundary.y,
        width: boundary.width,
        height: boundary.height,
      });
    }
  }, []);

  const inRange = (value: number, min: number, max: number) => {
    if (value <= min) {
      return min;
    }

    if (value >= max) {
      return max;
    }

    return value;
  }

  const generateResizeHandle = useCallback((axis: ResizeHandleAxis) => {
    const params = {
      ...resizeRegister((deltaX, deltaY) => {
        if (!boundaryRef.current) {
          return;
        }

        const boundary = boundaryRef.current.getBoundingClientRect();

        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            height: inRange(bounds.height - deltaY, minConstraints[1], maxConstraints[1]),
          });
        }

      })
    };

    const resizeHandleVariants = cva("absolute", {
      variants: {
        axis: {
          n: "top-0 left-0 translate-y-[-50%] w-full h-4 cursor-n-resize",
          ne: "top-0 right-0 translate-x-[50%] translate-y-[-50%] w-4 h-4 cursor-ne-resize",
          e: "top-0 right-0 translate-x-[50%] w-3 h-full cursor-e-resize",
          se: "bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-4 h-4 cursor-se-resize",
          s: "bottom-0 left-0 translate-y-[50%] w-full h-3 cursor-s-resize",
          sw: "bottom-0 left-0 translate-x-[-50%] translate-y-[50%] w-4 h-4 cursor-sw-resize",
          w: "bottom-0 left-0 translate-x-[-50%] w-3 h-full cursor-w-resize",
          nw: "top-0 left-0 translate-x-[-50%] translate-y-[-50%] w-4 h-4 cursor-nw-resize",
        }
      }
    })

    return <span {...params} className={cn(resizeHandleVariants({ axis }))} />
  }, [bounds, maxConstraints, minConstraints]);

  return (
    <div ref={boundaryRef} style={{ ...bounds }} className={clsx(className, "relative")}>
      {children}
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          if (bounds.width - deltaX >= maxConstraints[0]) {
            return;
          }

          if (bounds.height - deltaY >= maxConstraints[1]) {
            return;
          }

          setBounds({
            ...bounds,
            top: inRange(bounds.top + deltaY, 0, bounds.top + bounds.height - minConstraints[1]),
            width: inRange(bounds.width + deltaX, minConstraints[0], maxConstraints[0]),
            height: inRange(bounds.height - deltaY, minConstraints[1], maxConstraints[1])
          });
        }
      })} className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] w-4 h-4 cursor-ne-resize" />
      <span {...resizeRegister((deltaX, _deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: inRange(bounds.width + deltaX, minConstraints[0], maxConstraints[0]),
          });
        }
      })} className="absolute top-0 right-0 translate-x-[50%] w-3 h-full cursor-e-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: inRange(bounds.width + deltaX, minConstraints[0], maxConstraints[0]),
            height: inRange(bounds.height + deltaY, minConstraints[1], maxConstraints[1]),
          });
        }
      })} className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-4 h-4 cursor-se-resize" />
      <span {...resizeRegister((_deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            height: inRange(bounds.height + deltaY, minConstraints[1], maxConstraints[1]),
          });
        }
      })} className="absolute bottom-0 left-0 translate-y-[50%] w-full h-3 cursor-s-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          if (bounds.width - deltaX >= maxConstraints[0]) {
            return;
          }

          setBounds({
            ...bounds,
            left: inRange(bounds.left + deltaX, 0, bounds.left + bounds.width - minConstraints[0]),
            width: inRange(bounds.width - deltaX, minConstraints[0], maxConstraints[0]),
            height: inRange(bounds.height + deltaY, minConstraints[1], maxConstraints[1]),
          });
        }
      })} className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] w-4 h-4 cursor-sw-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          if (bounds.width - deltaX >= maxConstraints[0]) {
            return;
          }

          setBounds({
            ...bounds,
            left: inRange(bounds.left + deltaX, 0, bounds.left + bounds.width - minConstraints[0]),
            width: inRange(bounds.width - deltaX, minConstraints[0], maxConstraints[0]),
          });
        }
      })} className="absolute bottom-0 left-0 translate-x-[-50%] w-3 h-full cursor-w-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          if (bounds.width - deltaX >= maxConstraints[0]) {
            return;
          }

          if (bounds.height - deltaY >= maxConstraints[1]) {
            return;
          }

          setBounds({
            top: inRange(bounds.top + deltaY, 0, bounds.top + bounds.height - minConstraints[1]),
            left: inRange(bounds.left + deltaX, 0, bounds.left + bounds.width - minConstraints[0]),
            width: inRange(bounds.width - deltaX, minConstraints[0], maxConstraints[0]),
            height: inRange(bounds.height - deltaY, minConstraints[1], maxConstraints[1]),
          });
        }
      })} className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] w-4 h-4 cursor-nw-resize" />
      <span {...resizeRegister((_deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          if (bounds.height - deltaY >= maxConstraints[1]) {
            return;
          }

          setBounds({
            ...bounds,
            top: inRange(bounds.top + deltaY, 0, bounds.top + bounds.height - minConstraints[1]),
            height: inRange(bounds.height - deltaY, minConstraints[1], maxConstraints[1])
          });
        }
      })} className="absolute top-0 left-0 translate-y-[-50%] w-full h-4 cursor-n-resize" />
    </div>
  );
}
