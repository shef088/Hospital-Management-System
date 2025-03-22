// src/app/auth/patient/register/page.tsx
'use client';
import PatientRegisterForm from '@/components/Auth/PatientRegisterForm';

import { Layout } from 'antd';

const { Content } = Layout;

const PatientRegisterPage = () => (
  <Layout style={{ minHeight: '100vh' }}>
    
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <PatientRegisterForm />
    </Content>
    
  </Layout>
);

export default PatientRegisterPage;