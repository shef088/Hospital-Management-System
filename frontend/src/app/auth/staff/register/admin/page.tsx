// src/app/auth/staff/register/admin/page.tsx
'use client';

import AdminRegisterForm from '@/components/Auth/AdminRegisterForm';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminRegisterPage = () => (
  <Layout style={{ minHeight: '100vh' }}>

    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <AdminRegisterForm />
    </Content>

  </Layout>
);

export default AdminRegisterPage;