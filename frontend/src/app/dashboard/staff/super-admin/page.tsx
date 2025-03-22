// src/app/dashboard/staff/super-admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Typography, message } from 'antd';
import SuperAdminDashboardLayout from '@/components/Layout/SuperAdminDashboardLayout';
import { useAppSelector } from "@/store/store";  
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

const SuperAdminAdminDashboard = () => {
    const user = useAppSelector((state) => state.auth.user); // Get the logged-in user
    const router = useRouter();

    useEffect(() => {
        // Basic role check - improve with fine-grained permissions later
        if (!user || (user.userType !== "Staff" || user.role?.name?.toLowerCase() !== "super admin")) {
            message.error("You are not authorized to view this page.");
            router.push('/auth'); // Redirect to login or unauthorized page
        }
    }, [user, router]);

    // If the user is not authorized, don't render the dashboard
    if (!user || (user.userType !== "Staff" || user.role?.name?.toLowerCase() !== "super admin")) {
        return null; // Or render an "unauthorized" component
    }

    return (
        <SuperAdminDashboardLayout >
            <Title level={3}>Admin Dashboard</Title>
            <p>Welcome, Admin! Here's an overview of the system:</p>

            {/* Display some placeholder stats */}
            <Title level={4}>System Statistics</Title>
            <Paragraph>Total Users: [Fetch total users from backend]</Paragraph>
            <Paragraph>Total Patients: [Fetch total patients from backend]</Paragraph>
            <Paragraph>Total Staff: [Fetch total staff from backend]</Paragraph>
        </SuperAdminDashboardLayout>
    );
};

export default SuperAdminAdminDashboard;