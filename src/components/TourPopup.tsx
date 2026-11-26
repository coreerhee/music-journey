import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface TourPopupProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  controls: ReactNode;
}

export default function TourPopup({ title, onClose, children, controls }: TourPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="tour-popup"
      aria-labelledby="tour-popup-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <header>
        <h2 id="tour-popup-title">{title}</h2>
        <button type="button" onClick={onClose} autoFocus>잠시 지도 보기</button>
      </header>
      <div className="tour-popup-body">{children}</div>
      <footer>{controls}</footer>
    </dialog>
  );
}
