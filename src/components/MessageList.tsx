// src/components/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { Spin, Avatar, Tooltip } from 'antd';
import { Message } from '../types/Chat';
import { format } from 'date-fns';

interface MessageListProps {
    messages: Message[];
    currentUser: string;
    loading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
    messages,
    currentUser,
    loading = false,
}) => {
    const listRef = useRef<HTMLDivElement>(null);

    const isNewDay = (current: Message, previous: Message | undefined) => {
        if (!previous) return true;

        const currentDate = new Date(current.created_at);
        const previousDate = new Date(previous.created_at);

        return currentDate.toDateString() !== previousDate.toDateString();
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
        >
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <img
                        src="/empty-chat.svg"
                        alt="No messages"
                        className="w-48 h-48 mb-4 opacity-50"
                    />
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Be the first to start the conversation!</p>
                </div>
            )}

            {messages.map((message, index) => {
                const isCurrentUser = message.sender === currentUser;
                const showDateDivider = isNewDay(message, messages[index - 1]);

                return (
                    <React.Fragment key={message.id}>
                        {showDateDivider && (
                            <div className="flex justify-center my-4">
                                <div className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-500">
                                    {format(new Date(message.created_at), 'MMMM d, yyyy')}
                                </div>
                            </div>
                        )}

                        <div
                            className={`flex items-end space-x-2 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                                }`}
                        >
                            <Tooltip title={message.sender}>
                                <Avatar
                                    size="small"
                                    className={`${isCurrentUser ? 'bg-blue-500' : 'bg-gray-400'
                                        }`}
                                >
                                    {message.sender[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>

                            <div
                                className={`group max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${isCurrentUser
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white border'
                                    }`}
                            >
                                {!isCurrentUser && (
                                    <div className="text-xs text-gray-500 mb-1">
                                        {message.sender}
                                    </div>
                                )}
                                <div className="break-words">{message.content}</div>
                                <div
                                    className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser
                                            ? 'text-blue-100'
                                            : 'text-gray-400'
                                        }`}
                                >
                                    {format(new Date(message.created_at), 'HH:mm')}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default MessageList;