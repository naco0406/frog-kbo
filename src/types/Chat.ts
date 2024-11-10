// src/types/chat.ts
export interface Message {
    id: number;
    content: string;
    sender: string;
    room_id: string;
    created_at: Date;
}