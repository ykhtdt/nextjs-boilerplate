"use client";

import { PropsWithChildren, useCallback, useLayoutEffect, useRef, useState } from "react";

import clsx from "clsx";

type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

type Props = {
  className?: string;
  resizeHandleAxis?: ResizeHandleAxis[];
  maxConstraints?: [number, number];
};

export default function ResizableBox({ children, className, resizeHandleAxis, maxConstraints }: PropsWithChildren<Props>) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>();

  const resizeRegister = (onDragChange: (deltaX: number, deltaY: number) => void) => {
    return {
      onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
        clickEvent.stopPropagation();

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
    if (boundaryRef.current) {
      const boundary = boundaryRef.current.getBoundingClientRect();

      setDimensions({
        width: boundary.width,
        height: boundary.height,
      });
    }
  }, []);

  // const resizeHandlers = useCallback(() => {
  //   const resizeHandlerProps = {
  //     ...resizeRegister((deltaX, deltaY) => {
  //       if (dimensions) {
  //         setDimensions({
  //           width: !!maxConstraints ? dimensions.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : dimensions.width + deltaX : dimensions.width + deltaX,
  //           height: dimensions.height,
  //         });
  //       }
  //     })
  //   }

  //   return <span {...resizeHandlerProps} className="absolute top-0 right-0 translate-x-[50%] w-1 h-full cursor-w-resize" />
  // }, [dimensions, maxConstraints])

  return (
    <div ref={boundaryRef} style={{ ...dimensions }} className={clsx(className, "relative border border-red-500")}>
      {children}
      <span {...resizeRegister((deltaX, _deltaY) => {
        if (dimensions) {
          setDimensions({
            width: !!maxConstraints ? dimensions.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : dimensions.width + deltaX : dimensions.width + deltaX,
            height: dimensions.height,
          });
        }
      })} className="absolute top-0 right-0 translate-x-[50%] w-1 h-full cursor-w-resize" />
      <span {...resizeRegister((deltaX, deltaY) => {
        if (dimensions) {
          setDimensions({
            width: !!maxConstraints ? dimensions.width + deltaX >= maxConstraints[0] ? maxConstraints[0] : dimensions.width + deltaX : dimensions.width + deltaX,
            height: !!maxConstraints ? dimensions.height + deltaY >= maxConstraints[1] ? maxConstraints[1] : dimensions.height + deltaY : dimensions.height + deltaY,
          });
        }
      })} className="absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] w-2 h-2 cursor-se-resize" />
    </div>
  );
}
