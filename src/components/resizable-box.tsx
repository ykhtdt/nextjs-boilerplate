"use client";

import { PropsWithChildren, useCallback, useLayoutEffect, useRef, useState } from "react";

import clsx from "clsx";

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
  maxConstraints: [number, number];
} & Bounds;

export default function ResizableBox({
  children,
  className,
  resizeHandleAxis,
  top,
  left,
  width,
  height,
  maxConstraints,
}: PropsWithChildren<Props>) {
  const [bounds, setBounds] = useState<Bounds>({ top, left, width, height });

  const resizeRegister = (onDragChange: (deltaX: number, deltaY: number) => void) => {
    return {
      onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.screenX - clickEvent.screenX;
          const deltaY = moveEvent.screenY - clickEvent.screenY;
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
  }, [top, left, width, height]);

  return (
    <div ref={boundaryRef} style={{ ...bounds }} className={clsx(className, "relative")}>
      {children}
      <span {...resizeRegister((_deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            height: !!maxConstraints ? bounds.height - deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height - deltaY : bounds.height - deltaY,
          });
        }
      })} className="absolute top-0 left-0 translate-y-[-50%] w-full h-4 cursor-n-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width + deltaX : bounds.width + deltaX,
            height: !!maxConstraints ? bounds.height + deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height + deltaY : bounds.height + deltaY,
          });
        }
      })} className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] w-4 h-4 cursor-ne-resize" />
      <span {...resizeRegister((deltaX, _deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width + deltaX : bounds.width + deltaX,
            height: bounds.height,
          });
        }
      })} className="absolute top-0 right-0 translate-x-[50%] w-3 h-full cursor-e-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width + deltaX : bounds.width + deltaX,
            height: !!maxConstraints ? bounds.height + deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height + deltaY : bounds.height + deltaY,
          });
        }
      })} className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-4 h-4 cursor-se-resize" />
      <span {...resizeRegister((_deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            height: !!maxConstraints ? bounds.height + deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height + deltaY : bounds.height + deltaY,
          });
        }
      })} className="absolute bottom-0 left-0 translate-y-[50%] w-full h-3 cursor-s-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width - deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width - deltaX : bounds.width - deltaX,
            height: !!maxConstraints ? bounds.height + deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height + deltaY : bounds.height + deltaY,
          });
        }
      })} className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] w-4 h-4 cursor-sw-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width - deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width - deltaX : bounds.width - deltaX,
          });
        }
      })} className="absolute bottom-0 left-0 translate-x-[-50%] w-3 h-full cursor-w-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (bounds.top !== undefined && bounds.left !== undefined && bounds.width !== undefined && bounds.height !== undefined) {
          setBounds({
            ...bounds,
            width: !!maxConstraints ? bounds.width - deltaX >= maxConstraints[0] ? maxConstraints[0] : bounds.width - deltaX : bounds.width - deltaX,
            height: !!maxConstraints ? bounds.height - deltaY >= maxConstraints[1] ? maxConstraints[1] : bounds.height - deltaY : bounds.height - deltaY,
          });
        }
      })} className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] w-4 h-4 cursor-nw-resize" />
    </div>
  );
}
