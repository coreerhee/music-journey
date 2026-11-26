import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { MusicLocation } from "../types/music";
import { getListeningUrl } from "../utils/musicUrl";

interface MusicCardProps {
    location: MusicLocation;
    onClose?: () => void;
    inline?: boolean;
    closeLabel?: string;
    footer?: ReactNode;
    comparison?: string;
}

export default function MusicCard({location, onClose, inline = false, closeLabel, footer, comparison}: MusicCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if(inline || !dialog) return;

        dialog.showModal();

        return () => {
            dialog.close();
        };
    }, [inline]);

    const content = (
        <>
            <header className="music-card-header">
                <div>
                    <h2 id="music-card-title">{location.title}</h2>
                    {comparison && <p className="music-card-comparison">{comparison}</p>}
                </div>

                {!inline && <button
                    type="button"
                    aria-label={closeLabel ?? "상세 정보 닫기"}
                    onClick={onClose}
                    autoFocus
                >
                    {closeLabel ?? "×"}
                </button>}
            </header>

            <div className="music-card-body">
            <section>
                <h3>감상 대상</h3>
                <p>나라: {location.country}</p>
                <p>갈래: {location.genre}</p>
                <p>곡명: {location.piece ?? "별도 곡명 없음"}</p>
            </section>

            <section>
                <h3>장소</h3>
                <p>발생 지역: {location.origin}</p>
                <p>현대 관찰 지역: {location.observationLocation}</p>
            </section>

            {location.image && (
                <figure className="music-card-image">
                    <img src={location.image.src} alt={location.image.alt} loading="lazy" />
                    {location.image.caption && <figcaption>{location.image.caption}</figcaption>}
                </figure>
            )}

            <section>
                <h3>음악적 특징과 역사·문화적 맥락</h3>
                <p className="music-card-text">{location.description}</p>
            </section>

            <section>
                <h3>감상 영상과 감상평</h3>
                <p>
                    주목할 구간: {location.startTime} ~ {location.endTime}
                </p>
                <a
                    href={getListeningUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    YouTube에서 영상 보기
                </a>
                <h4>감상평</h4>
                <p className="music-card-text">{location.reflection}</p>
            </section>

            <section>
                <h3>참고 자료</h3>
                {location.references.length > 0 ? (
                    <ul>
                        {location.references.map((url) => (
                            <li key={url}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>등록된 참고 자료가 없습니다.</p>
                )}
            </section>

            </div>
            {footer && <footer>{footer}</footer>}
        </>
    );

    if (inline) return <article className="music-card music-card-inline">{content}</article>;

    return (
        <dialog
            ref={dialogRef}
            className="music-card"
            aria-labelledby="music-card-title"
            onCancel={(event) => {
                event.preventDefault();
                onClose?.();
            }}
        >
            {content}
        </dialog>
    )
};
