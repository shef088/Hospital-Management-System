// src/components/Layout/ReceptionistDashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
    CalendarOutlined,
    FileTextOutlined,
    UserOutlined,
    NotificationOutlined,
    UnorderedListOutlined,
    ProfileOutlined,
    KeyOutlined,
        ScheduleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { usePathname } from 'next/navigation';

const { Header, Content, Sider } = Layout;

interface ReceptionistDashboardLayoutProps {
    children: ReactNode;
    dashboardRoute?: string;
}

const ReceptionistDashboardLayout: React.FC<ReceptionistDashboardLayoutProps> = ({ children }) => {
    const user = useAppSelector((state) => state.auth.user);
    const pathname = usePathname();
    const role="Receptionist"
    const dashboardRoute = "/dashboard/staff/receptionist" 

    const getSelectedKey = () => {
         if (pathname === dashboardRoute) {
            return '1';
        } else if (pathname === `${dashboardRoute}/appointment`) {
            return '2';
        } else if (pathname === `${dashboardRoute}/patient`) {
            return '3';
        }  else if (pathname === `${dashboardRoute}/task/my-task`) { 
            return '4';
        } else if (pathname === `${dashboardRoute}/notification/my-notification`) {
            return '5';
        }
        else if (pathname === `${dashboardRoute}/shift/my-shift`) {
            return '6';
        }
         else if (pathname === '/dashboard/staff/receptionist/profileview') {  
             return '7';
        } else if (pathname === '/dashboard/staff/receptionist/passwordreset') { 
            return '8';
        }
         else {
            return '1';
        }
    };

    const selectedKey = getSelectedKey();

    const menuItems = [
        {
            key: 'sub1',
            label: 'Management',
            children: [
                { key: '1', label: <Link href={dashboardRoute}>Dashboard</Link> },
                { key: '2', label: <Link href="/dashboard/staff/receptionist/appointment">Appointments</Link>, icon: <CalendarOutlined /> },
                { key: '3', label: <Link href="/dashboard/staff/receptionist/patient">Patients</Link>, icon: <UserOutlined /> },

            ],
        },
         {
            key: 'sub2',
            icon: <NotificationOutlined />,
            label: 'My Panel',
            children: [
                { key: '4', label: <Link href="/dashboard/staff/receptionist/task/my-task">My Tasks</Link>, icon: <UnorderedListOutlined /> },
                { key: '5', label: <Link href="/dashboard/staff/receptionist/notification/my-notification">Notifications</Link>, icon: <NotificationOutlined /> },
                 { key: '6', label: <Link href="/dashboard/staff/receptionist/shift/my-shift">My Shifts</Link>, icon: <ScheduleOutlined /> },
            ],
        },
       {
            key: 'sub3',
            icon: <UserOutlined />,
            label: 'My Account',
            children: [
                { key: '7', label: <Link href="/auth/profile">Profile View</Link>, icon: <ProfileOutlined/>},
                { key: '8', label:  <Link href="/auth/password-reset">Password Reset</Link>, icon: <KeyOutlined/> },
            ],
        },

    ];

    return (
        <Layout>
            <Header className="header" style={{ backgroundColor: '#fff' }}>
                <div className="logo" style={{ float: 'left', width: '120px', height: '31px', margin: '16px 24px 16px 0', background: 'rgba(255,255,255,.3)' }}>
                    <Typography.Title level={5} style={{ color: 'black' }}>Hospital MS</Typography.Title>
                </div>
                <Typography.Text style={{ float: 'right', color: 'black', margin: '24px' }}>Role: {role}</Typography.Text>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background" style={{ backgroundColor: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default ReceptionistDashboardLayout;