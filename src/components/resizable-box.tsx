"use client";

import { PropsWithChildren, useCallback, useLayoutEffect, useRef, useState } from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
    const calculateWidth = (width: number, deltaX: number) => {
      if (axis.includes("e")) {
        return inRange(width + deltaX, minConstraints[0], maxConstraints[0]);
      }

      if (axis.includes("w")) {
        return inRange(width - deltaX, minConstraints[0], maxConstraints[0]);
      }

      return width;
    };

    const calculateHeight = (height: number, deltaY: number) => {
      if (axis.includes("n")) {
        return inRange(height - deltaY, minConstraints[1], maxConstraints[1]);
      }

      if (axis.includes("s")) {
        return inRange(height + deltaY, minConstraints[1], maxConstraints[1]);
      }

      return height;
    };

    const calculateTop = (bounds: Bounds, deltaY: number) => {
      if (bounds.top !== undefined && bounds.height !== undefined) {
        if (axis.includes("n")) {
          return inRange(bounds.top + deltaY, bounds.height + bounds.top - maxConstraints[1], bounds.top + bounds.height - minConstraints[1]);
        }
      }

      return bounds.top;
    }

    const calculateLeft = (bounds: Bounds, deltaX: number) => {
      if (bounds.left !== undefined && bounds.width !== undefined) {
        if (axis.includes("w")) {
          return inRange(bounds.left + deltaX, bounds.width + bounds.left - maxConstraints[0], bounds.left + bounds.width - minConstraints[0]);
        }
      }

      return bounds.left;
    }

    const params = {
      ...resizeRegister((deltaX, deltaY) => {
        if (bounds.top === undefined || bounds.left === undefined || bounds.width === undefined || bounds.height === undefined) {
          return;
        }

        const nextBounds = {
          top: calculateTop(bounds, deltaY),
          left: calculateLeft(bounds, deltaX),
          width: calculateWidth(bounds.width, deltaX),
          height: calculateHeight(bounds.height, deltaY),
        };

        setBounds({ ...nextBounds });
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

    return <span key={axis} {...params} className={cn(resizeHandleVariants({ axis }))} />
  }, [bounds, maxConstraints, minConstraints]);

  return (
    <div ref={boundaryRef} style={{ ...bounds }} className={cn(className, "relative")}>
      {children}
      {resizeHandleAxis && resizeHandleAxis.map((axis) => generateResizeHandle(axis))}
    </div>
  );
}
