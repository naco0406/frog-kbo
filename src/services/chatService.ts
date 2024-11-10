// src/services/chatService.ts
import axios from 'axios';
import { Message } from '../types/Chat';
import { API_BASE_URL } from '../constants.ts/api';

export const chatService = {
    async sendMessage(content: string, sender: string, roomId: string): Promise<Message> {
        const response = await axios.post(`${API_BASE_URL}/chat/messages`, {
            content,
            sender,
            roomId,
        });
        return response.data;
    },

    async getRoomMessages(roomId: string): Promise<Message[]> {
        const response = await axios.get(`${API_BASE_URL}/chat/rooms/${roomId}/messages`);
        return response.data;
    },
};