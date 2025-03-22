// src/app/staff/nurse/dashboard/page.tsx
'use client';

import React from 'react';
import { Typography } from 'antd';
import NurseDashboardLayout from '@/components/Layout/NurseDashboardLayout';

const { Title } = Typography;

const NurseDashboard = () => {
  return (
    <NurseDashboardLayout >
      <Title level={3}>Nurse Dashboard</Title>
      <p>Welcome, Nurse! Manage patient care, medications, and vitals here.</p>
      {/* Add Nurse-specific content here */}



      {/* add view appointment for patients nurses have been assigned to later if schema changes */}
    </NurseDashboardLayout>
  );
};

export default NurseDashboard;