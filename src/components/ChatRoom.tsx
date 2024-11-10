// src/components/ChatRoom.tsx
import {
    InfoCircleOutlined,
    LogoutOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Modal, Tooltip, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { pusherClient } from '../config/pusher';
import { chatService } from '../services/chatService';
import { Message } from '../types/Chat';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const { Header, Content, Footer } = Layout;

interface ChatRoomProps {
    roomId: string;
    currentUser: string;
    onLeaveRoom: () => void;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({
    roomId,
    currentUser,
    onLeaveRoom,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const [onlineUsers] = useState(new Set([currentUser]));
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                const roomMessages = await chatService.getRoomMessages(roomId);
                setMessages(roomMessages);
                scrollToBottom();
            } catch (error) {
                message.error('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        loadMessages();

        const channel = pusherClient.subscribe(`chat-${roomId}`);

        channel.bind('new-message', (newMessage: Message) => {
            setMessages(prev => [...prev, newMessage]);
            scrollToBottom();

            if (newMessage.sender !== currentUser) {
                const notification = new Audio('/message-notification.mp3');
                notification.play().catch(() => { });
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [roomId, currentUser]);

    const handleSendMessage = async (content: string) => {
        try {
            await chatService.sendMessage(content, currentUser, roomId);
        } catch (error) {
            message.error('Failed to send message');
        }
    };

    const handleLeaveRoom = () => {
        Modal.confirm({
            title: 'Leave Room',
            content: 'Are you sure you want to leave this chat room?',
            okText: 'Leave',
            cancelText: 'Stay',
            okButtonProps: { danger: true },
            onOk: onLeaveRoom
        });
    };

    return (
        <Layout className="h-screen bg-gray-50">
            <Header className="px-6 bg-white border-b shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Badge count={onlineUsers.size} offset={[-5, 5]}>
                        <Avatar
                            icon={<TeamOutlined />}
                            className="bg-blue-500"
                        />
                    </Badge>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800 m-0">
                            Room: {roomId}
                        </h1>
                        <p className="text-sm text-gray-500 m-0">
                            {onlineUsers.size} online
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Tooltip title="Room Info">
                        <Button
                            onClick={() => setIsInfoModalVisible(true)}
                            variant="solid"
                            size="small"
                            className="text-gray-600 hover:text-blue-500"
                        >
                            <InfoCircleOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Leave Room">
                        <Button
                            onClick={handleLeaveRoom}
                            variant="solid"
                            size="small"
                            className="text-gray-600 hover:text-red-500"
                        >
                            <LogoutOutlined />
                        </Button>
                    </Tooltip>
                </div>
            </Header>

            <Content className="flex-1 overflow-hidden">
                <div className="h-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
                    <MessageList
                        messages={messages}
                        currentUser={currentUser}
                        loading={loading}
                    />
                    <div ref={messagesEndRef} />
                </div>
            </Content>

            <Footer className="p-0 bg-transparent">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
                    <MessageInput onSendMessage={handleSendMessage} />
                </div>
            </Footer>

            <Modal
                title="Room Information"
                open={isInfoModalVisible}
                onCancel={() => setIsInfoModalVisible(false)}
                footer={null}
            >
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-700">Room ID</h4>
                        <p className="text-gray-600">{roomId}</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-700">Your Username</h4>
                        <p className="text-gray-600">{currentUser}</p>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-700">Online Users</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Array.from(onlineUsers).map(user => (
                                <Badge
                                    key={user}
                                    status="success"
                                    text={user}
                                    className="bg-gray-100 px-2 py-1 rounded"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};