// src/config/pusher.ts
import Pusher from 'pusher-js';

export const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_KEY!, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER!,
});