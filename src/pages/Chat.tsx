// pages/Chat.tsx
import React, { useState } from 'react';
import { Form, Input, Card, Modal } from 'antd';
import { UserOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ChatRoom } from '../components/ChatRoom';
import { motion, AnimatePresence } from 'framer-motion';

const Chat: React.FC = () => {
    const [isJoined, setIsJoined] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [form] = Form.useForm();

    const handleJoinRoom = async (values: { username: string; roomId: string }) => {
        if (values.username && values.roomId) {
            try {
                // 여기에 실제 방 참가 로직 추가 가능
                setIsJoined(true);
            } catch (error) {
                Modal.error({
                    title: 'Failed to join room',
                    content: 'Please try again later.',
                });
            }
        }
    };

    const handleLeaveRoom = () => {
        setIsJoined(false);
        form.resetFields();
    };

    if (!isJoined) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-md mx-auto mt-20"
                    >
                        <Card
                            className="shadow-xl border-0 rounded-xl overflow-hidden"
                            title={
                                <div className="text-center pt-4">
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Welcome to Chat
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Join a room to start chatting
                                    </p>
                                </div>
                            }
                        >
                            <Form
                                form={form}
                                onFinish={handleJoinRoom}
                                layout="vertical"
                                requiredMark={false}
                                className="mt-4"
                            >
                                <Form.Item
                                    name="username"
                                    label={
                                        <span className="text-gray-700 font-medium">
                                            Username
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: 'Please enter your username' },
                                        { min: 2, message: 'Username must be at least 2 characters' },
                                        { max: 20, message: 'Username must be at most 20 characters' }
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-gray-400" />}
                                        placeholder="Enter your username"
                                        size="large"
                                        className="rounded-lg"
                                        autoComplete="off"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="roomId"
                                    label={
                                        <span className="text-gray-700 font-medium">
                                            Room ID
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: 'Please enter a room ID' },
                                        { min: 0, message: 'Room ID must be at least 0 characters' }
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Enter an existing room ID or create a new one
                                        </span>
                                    }
                                >
                                    <Input
                                        prefix={<TeamOutlined className="text-gray-400" />}
                                        placeholder="Enter room ID"
                                        size="large"
                                        className="rounded-lg"
                                        autoComplete="off"
                                    />
                                </Form.Item>

                                <Form.Item className="mb-2">
                                    <button
                                        type="submit"
                                        className="w-full h-12 bg-blue-500 text-white rounded-lg 
                                                 hover:bg-blue-600 transition-colors duration-200
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                 focus:ring-opacity-50 font-medium text-lg"
                                    >
                                        Join Room
                                    </button>
                                </Form.Item>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowHelp(true)}
                                        className="text-blue-500 hover:text-blue-600 text-sm 
                                                 focus:outline-none inline-flex items-center gap-1"
                                    >
                                        <InfoCircleOutlined />
                                        Need help?
                                    </button>
                                </div>
                            </Form>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <Modal
                    title="How to use the chat"
                    open={showHelp}
                    onCancel={() => setShowHelp(false)}
                    footer={null}
                    className="rounded-lg"
                >
                    <div className="space-y-4 text-gray-600">
                        <div>
                            <h4 className="font-medium text-gray-800">Joining a Room</h4>
                            <p>Enter a username and room ID to join. If the room doesn't exist, it will be created automatically.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">Username Rules</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>2-20 characters long</li>
                                <li>Will be visible to other users</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">Room ID Rules</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>At least 3 characters</li>
                                <li>Case-sensitive</li>
                                <li>Can contain letters, numbers, and hyphens</li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <ChatRoom
            roomId={form.getFieldValue('roomId')}
            currentUser={form.getFieldValue('username')}
            onLeaveRoom={handleLeaveRoom}
        />
    );
};

export default Chat;