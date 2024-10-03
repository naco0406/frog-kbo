import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface ScheduleItem {
    date: string;
    time: string;
    match: string;
    stadium: string;
}

const KBOSchedule: React.FC = () => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get<ScheduleItem[]>('https://dev.naco.kr/api/crawling');
                setSchedule(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch KBO schedule');
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">KBO Schedule</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Match</th>
                            <th className="px-4 py-2">Stadium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">{item.time}</td>
                                <td className="border px-4 py-2">{item.match}</td>
                                <td className="border px-4 py-2">{item.stadium}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KBOSchedule;