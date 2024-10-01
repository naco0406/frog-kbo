export interface Game {
    id?: number;
    date: string;
    homeTeam: string;
    awayTeam: string;
    stadium: string;
    result: string;
    attendanceCount?: number;
}