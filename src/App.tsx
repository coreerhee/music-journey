import './App.css'
import MusicMap from './components/MusicMap'
import GuidedTour from './components/GuidedTour'
import { useState } from 'react';

type ExploreMode = "home" | "free" | "guided" | null;

function App() {
  const [mode, setMode] = useState<ExploreMode>(null);

  if (mode === "free") {
    return (
      <main className="explore-screen">
        <header className="explore-header">
          <button type="button" onClick={() => setMode("home")}>
            홈으로 이동
          </button>
          <h2>자유롭게 탐방</h2>
        </header>

        <MusicMap/>
      </main>
    );
  }

  if (mode === "guided") {
    return <GuidedTour onHome={() => setMode("home")} />;
  }

  return (
    <main className="home-screen">
      <h1>동양음악 감상 지도</h1>
      <h3>목소리를 따라 떠나는 아시아 음악 여행</h3>
      <div>
        <button type="button" onClick={() => setMode("free")}>
          자유롭게 탐방
        </button>

        <button type="button" onClick={() => setMode("guided")}>
          순서대로 탐방
        </button>
      </div>
    </main>
  )
}

export default App
