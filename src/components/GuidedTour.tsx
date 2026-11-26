import { useMemo, useState } from "react";
import { locations } from "../data/locations";
import { tourPairs } from "../data/tour";
import MusicCard from "./MusicCard";
import MusicMap from "./MusicMap";
import TourControls from "./TourControls";
import TourPopup from "./TourPopup";
import type { MusicLocation } from "../types/music";

export default function GuidedTour({ onHome }: { onHome: () => void }) {
  const [step, setStep] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const pair = tourPairs[Math.floor(step / 3)];
  const stage = step % 3;
  const country = stage === 0 ? null : pair.countries[stage - 1];
  const location = country ? locations.find((item) => item.id === country.id) : null;
  const total = tourPairs.length * 3;
  const summaryIds = useMemo(
    () => isPopupOpen ? [] : country ? [country.id] : pair.countries.map((item) => item.id),
    [isPopupOpen, country, pair],
  );

  const controls = (
    <TourControls
      step={step}
      total={total}
      onBack={() => setStep((current) => Math.max(0, current - 1))}
      onNext={() => step === total - 1 ? onHome() : setStep((current) => current + 1)}
    />
  );

  function openCountry(selected: MusicLocation) {
    const pairIndex = tourPairs.findIndex((item) =>
      item.countries.some((entry) => entry.id === selected.id),
    );
    if (pairIndex < 0) return;
    const countryIndex = tourPairs[pairIndex].countries.findIndex((entry) => entry.id === selected.id);
    setStep(pairIndex * 3 + countryIndex + 1);
    setIsPopupOpen(true);
  }

  return (
    <main className="explore-screen">
      <header className="explore-header">
        <button type="button" onClick={onHome}>홈으로 이동</button>
        <h2>순서대로 탐방</h2>
      </header>
      <MusicMap guided summaryIds={summaryIds} onGuidedSelect={openCountry} />
      {!isPopupOpen && (
        <button className="resume-tour" type="button" onClick={() => setIsPopupOpen(true)}>
          탐방 계속하기
        </button>
      )}
      {isPopupOpen && (stage === 0 ? (
        <TourPopup
          key={step}
          title={`${pair.title} · 비교 소개`}
          onClose={() => setIsPopupOpen(false)}
          controls={controls}
        >
          <article>
            <h3>{pair.question}</h3>
            <p>{pair.introduction}</p>
            {pair.countries.map((item) => (
              <section key={item.id}>
                <h4>{item.name}</h4>
                <p>{item.summary}</p>
              </section>
            ))}
          </article>
        </TourPopup>
      ) : location ? (
        <MusicCard
          key={step}
          location={location}
          onClose={() => setIsPopupOpen(false)}
          closeLabel="잠시 지도 보기"
          comparison={`${pair.title} · ${pair.criterion}`}
          footer={controls}
        />
      ) : null)}
    </main>
  );
}
