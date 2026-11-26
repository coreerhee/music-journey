type MinuteSecond = `${number}:${number}`;

export interface MusicLocation {
    id: string;
    title: string;
    country: string;
    genre: string;
    piece: string | null;
    origin: string;
    observationLocation: string;
    /** src/data에 저장한 사진을 import한 값을 src에 지정합니다. */
    image?: {
        src: string;
        alt: string;
        caption?: string;
    };

    /** 지도에 표시할 대표 지역의 대략적인 좌표 */
    latitude: number;
    longitude: number;

    description: string;
    reflection: string;
    musicUrl: string;
    startTime: MinuteSecond;
    endTime: MinuteSecond;

    references: Array<string>;
    order: number;
}
