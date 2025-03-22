// src/app/staff/receptionist/dashboard/page.tsx
'use client';

import React from 'react';
import { Typography } from 'antd';
import ReceptionistDashboardLayout from '@/components/Layout/ReceptionistDashboardLayout';

const { Title } = Typography;

const ReceptionistDashboard = () => {
  return (
    <ReceptionistDashboardLayout >
      <Title level={3}>Receptionist Dashboard</Title>
      <p>Welcome, Receptionist! Manage appointments, patient check-in, and billing here.</p>
      {/* Add Receptionist-specific content here */}
    </ReceptionistDashboardLayout>
  );
};

export default ReceptionistDashboard;