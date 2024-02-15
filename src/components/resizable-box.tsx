"use client";

import type { NonEmptyArray } from "@/types/common";

import { useLayoutEffect, useRef, useState } from "react";

import { cva } from "class-variance-authority";
import { cn, clamp } from "@/lib/utils";

type ResizeHandleAxis = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ResizeEvent = {
  onResizeStart?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  onResize?: (event: MouseEvent) => void;
  onResizeStop?: (event: MouseEvent) => void;
};

type ResizableBoxProps = {
  className?: string;
  resizeHandleAxis?: NonEmptyArray<ResizeHandleAxis>;
  maxConstraints?: [number, number];
  minConstraints?: [number, number];
} & Partial<Bounds> & ResizeEvent;

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
  onResizeStart,
  onResize,
  onResizeStop,
}: React.PropsWithChildren<ResizableBoxProps>) {
  const boundsProps = { top, left, width, height };

  const filteredBoundsProps = Object.fromEntries(Object.entries(boundsProps).filter(([key, value]) => value !== undefined)) as Bounds;

  const [bounds, setBounds] = useState<Bounds>(filteredBoundsProps);

  const boundaryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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

  return (
    <div ref={boundaryRef} style={{ ...bounds }} className={cn(className, "relative")}>
      {children}
      {resizeHandleAxis &&
        resizeHandleAxis.map((axis) => (
          <ResizeHandler
            key={axis}
            axis={axis}
            bounds={bounds}
            maxConstraints={maxConstraints}
            minConstraints={minConstraints}
            setBounds={setBounds}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeStop={onResizeStop}
          />
        ))}
    </div>
  );
}

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
    },
  },
});

type ResizeHandleProps = {
  axis: ResizeHandleAxis;
  maxConstraints: [number, number];
  minConstraints: [number, number];
  bounds: Bounds;
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
} & ResizeEvent;

function ResizeHandler({
  axis,
  maxConstraints,
  minConstraints,
  bounds,
  setBounds,
  onResizeStart,
  onResize,
  onResizeStop,
}: ResizeHandleProps) {
  const resizeRegister = (onDragChange: (deltaX: number, deltaY: number) => void) => {
    return {
      onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();

        onResizeStart && onResizeStart(clickEvent);

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.pageX - clickEvent.pageX;
          const deltaY = moveEvent.pageY - clickEvent.pageY;
          onDragChange(deltaX, deltaY);
          onResize && onResize(moveEvent);
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
          onResizeStop && onResizeStop(upEvent);
          document.removeEventListener("mousemove", handleMouseMove);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp, { once: true });
      },
    };
  };

  const calculateWidth = (width: number, deltaX: number) => {
    if (axis.includes("e")) {
      return clamp(width + deltaX, minConstraints[0], maxConstraints[0]);
    }

    if (axis.includes("w")) {
      return clamp(width - deltaX, minConstraints[0], maxConstraints[0]);
    }

    return width;
  };

  const calculateHeight = (height: number, deltaY: number) => {
    if (axis.includes("n")) {
      return clamp(height - deltaY, minConstraints[1], maxConstraints[1]);
    }

    if (axis.includes("s")) {
      return clamp(height + deltaY, minConstraints[1], maxConstraints[1]);
    }

    return height;
  };

  const calculateTop = (bounds: Bounds, deltaY: number) => {
    if (axis.includes("n")) {
      return clamp(bounds.top + deltaY, bounds.height + bounds.top - maxConstraints[1], bounds.top + bounds.height - minConstraints[1]);
    }

    return bounds.top;
  };

  const calculateLeft = (bounds: Bounds, deltaX: number) => {
    if (axis.includes("w")) {
      return clamp(bounds.left + deltaX, bounds.width + bounds.left - maxConstraints[0], bounds.left + bounds.width - minConstraints[0]);
    }

    return bounds.left;
  };

  const params = {
    ...resizeRegister((deltaX, deltaY) => {
      const nextBounds = {
        top: calculateTop(bounds, deltaY),
        left: calculateLeft(bounds, deltaX),
        width: calculateWidth(bounds.width, deltaX),
        height: calculateHeight(bounds.height, deltaY),
      };

      setBounds({ ...nextBounds });
    }),
  };

  return <span key={axis} {...params} className={cn(resizeHandleVariants({ axis }))} />;
}
