// src/app/staff/doctor/dashboard/page.tsx
'use client';

import React from 'react';
import { Typography } from 'antd';
import DoctorDashboardLayout from '@/components/Layout/DoctorDashboardLayout';

const { Title } = Typography;

const DoctorDashboard = () => {
  return (
    <DoctorDashboardLayout >
      <Title level={3}>Doctor Dashboard</Title>
      <p>Welcome, Doctor! Manage patients, appointments, and medical records here.</p>
       
    </DoctorDashboardLayout>
  );
};

export default DoctorDashboard;