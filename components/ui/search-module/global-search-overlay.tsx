import { clsx } from "clsx";
import { useRef } from "react";

export function GlobalSearchOverlay({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const overlayBackdropRef = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayBackdropRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 h-full w-full bg-black/20 p-10",
        { block: isOpen },
        { hidden: !isOpen },
      )}
      onClick={handleClick}
      ref={overlayBackdropRef}
    >
      <div className="abosulte left-1/2 top-1/2 m-auto flex h-full max-h-[80dvh] w-[80dvw] max-w-[600px] flex-col overflow-hidden rounded-md border border-foreground bg-popover text-popover-foreground">
        {children}
      </div>
    </div>
  );
}
