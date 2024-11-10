// src/components/MessageInput.tsx
import React, { useState, useRef } from 'react';
import { Button, Input, InputRef, Tooltip } from 'antd';
import { SendOutlined, SmileOutlined, PaperClipOutlined } from '@ant-design/icons';
// import EmojiPicker from 'emoji-picker-react';

interface MessageInputProps {
    onSendMessage: (content: string) => Promise<void>;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const inputRef = useRef<InputRef>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !sending) {
            setSending(true);
            try {
                await onSendMessage(message.trim());
                setMessage('');
                setShowEmoji(false);
            } finally {
                setSending(false);
            }
        }
    };

    // const handleEmojiSelect = (emoji: EmojiClickData) => {
    //     setMessage(prev => prev + emoji.emoji);
    //     inputRef.current?.focus();
    // };

    return (
        <div className="relative">
            {/* {showEmoji && (
                <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker
                        onEmojiClick={handleEmojiSelect}
                        width={350}
                        height={400}
                    />
                </div>
            )} */}

            <form onSubmit={handleSubmit} className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                        <Input.TextArea
                            ref={inputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            disabled={sending}
                            onPressEnter={(e) => {
                                if (!e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            className="pr-24"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <Tooltip title="Add emoji">
                                <Button
                                    type="text"
                                    icon={<SmileOutlined />}
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className={`text-gray-400 hover:text-blue-500 ${showEmoji ? 'text-blue-500' : ''
                                        }`}
                                />
                            </Tooltip>
                            <Tooltip title="Attach file">
                                <Button
                                    type="text"
                                    icon={<PaperClipOutlined />}
                                    className="text-gray-400 hover:text-blue-500"
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        loading={sending}
                        disabled={!message.trim()}
                        onClick={handleSubmit}
                        className="h-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;