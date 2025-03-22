// src/components/Layout/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Space, Avatar, Dropdown, Menu, Badge, message } from 'antd'; // Import message
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { UserOutlined, BellOutlined } from '@ant-design/icons'; // Import BellOutlined
import { useLogoutMutation } from '@/services/auth/authSliceAPI';
import { persistor } from '@/store/store';
import { logout } from '@/services/auth/authSlice';
import Link from 'next/link';
import { useGetMyNotificationsQuery } from '@/services/notification/notificationSliceAPI'; // Import the notification query
import type { Notification as NotificationType } from '@/services/notification/notificationSliceAPI'; // Import API Notification Type
import { getSocket } from '@/services/socket/socket'; // Import your socket instance

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token); // Get Token from Redux store
    const [logoutMutation, { isLoading }] = useLogoutMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const { data: notificationsData, isLoading: isNotificationsLoading, isError: isNotificationsError, refetch } = useGetMyNotificationsQuery({
        read:false
    });
    const [notifications, setNotifications] = useState<NotificationType[]>([]); // State to hold notifications
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (notificationsData?.notifications) {
            setNotifications(notificationsData.notifications);
        }
    }, [notificationsData]);

    useEffect(() => {
        if (notifications) {
            const count = notifications.length;
            setUnreadCount(count);
        }
    }, [notifications]);

   const showNotification = (notification: NotificationType) => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new window.Notification(notification.message, { // Correct to Window.Notification
                    body: `Type: ${notification.type}, Priority: ${notification.priority}`,
                    icon: '/icon.png', // Optional: Replace with your icon URL
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new window.Notification(notification.message, {  // Correct to Window.Notification
                            body: `Type: ${notification.type}, Priority: ${notification.priority}`,
                            icon: '/icon.png',
                        });
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (user && token) {

            //Fetch the socket
            const socket = getSocket()

            socket.auth = (cb) => {
                cb({ token: token });
            };

            socket.connect();
            //To connect socket

            // Function to handle new notifications from the socket
            const handleNewNotification = (notification: NotificationType) => { // Correct to NotificationType
                setNotifications((prevNotifications) => [notification, ...prevNotifications]);
                showNotification(notification); // Show browser notification
                refetch(); // Refresh the notifications list from the API
            };

            // Function to update unreadCount
            const handleNotificationCount = (data: { count: number }) => {
                console.log("the count ::", data.count);
                setUnreadCount(data.count);
            };

            socket.on("connect", () => {
                console.log("socket is connected!");
            });

            socket.on('newNotification', handleNewNotification);

            socket.on("notificationCount", handleNotificationCount);

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            // Clean up the socket listeners
            return () => {
                socket.off('connect');
                socket.off('newNotification', handleNewNotification);
                socket.off('notificationCount', handleNotificationCount);
                socket.off('disconnect');

                socket.disconnect();
            };
        }
    }, [user, refetch, token]); // Re-run effect when user or token changes

    const handleLogout = async () => {
        try {
            // 1. Call the backend logout mutation (if it exists)
            try {
                await logoutMutation().unwrap();
            } catch (e) {
                console.log("no logout function", e)
            }

            // 2. Clear the Redux state
            dispatch(logout());

            // 3. Persist store
            persistor.purge();

            // 4. Redirect to the login page
            router.push('/auth');
        } catch (error: any) {
            console.error('Logout failed:', error.message || error.error);
            // Handle logout error (e.g., display an error message)
        }
    };

    const menuItems = [
        {
            key: 'logout',
            label: 'Logout',
            onClick: handleLogout,
            loading: isLoading,
        },
    ];

    const menu = { items: menuItems };

    return (
        <Header style={{
            backgroundColor: '#fff',
            padding: '0 50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
        }}>
            {contextHolder}
            <div>
                <Title level={3} style={{ color: '#1890ff', margin: 0, float: 'left', marginRight: '20px' }}>
                    Hospital System
                </Title>

            </div>
            {user ? (
               <Space align="center">
               <Badge count={unreadCount}>
                   <Dropdown menu={menu} placement="bottomRight" arrow>
                       <Avatar icon={<BellOutlined />} style={{ cursor: 'pointer' }} />
                   </Dropdown>
               </Badge>
               <Text>
                   {user.firstName} {user.lastName} ({user.userType})
               </Text>
               <Dropdown menu={menu} placement="bottomRight" arrow>
                   <a onClick={e => e.preventDefault()}>
                       <Avatar icon={<UserOutlined />} />
                   </a>
               </Dropdown>
              
           </Space>
            ) : (
                <Link href="/auth">
                    <Button type="primary">
                        Login
                    </Button>
                </Link>
            )}
        </Header>
    );
};

export default AppHeader;