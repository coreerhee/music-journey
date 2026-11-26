interface TourControlsProps {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
}

export default function TourControls({ step, total, onBack, onNext }: TourControlsProps) {
  return (
    <nav className="tour-controls" aria-label="탐방 이동">
      <div>{step > 0 && <button type="button" onClick={onBack}>이전</button>}</div>
      <span>{step + 1} / {total}</span>
      <button type="button" onClick={onNext}>{step === total - 1 ? "종료" : "다음"}</button>
    </nav>
  );
}
