// src/app/dashboard/staff/admin/shift/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Button, Modal, message } from 'antd';
import AdminDashboardLayout from '@/components/Layout/AdminDashboardLayout';
import { useAppSelector } from "@/store/store";
import { useRouter } from 'next/navigation';

import ShiftList from '@/components/Shift/ShiftList';
import ShiftCreateForm from '@/components/Shift/ShiftCreateForm';
import ShiftEditForm from '@/components/Shift/ShiftEditForm';
import ShiftView from '@/components/Shift/ShiftView';
import ShiftDelete from '@/components/Shift/ShiftDelete';
import { Shift } from '@/services/shift/shiftSliceAPI';

const { Title } = Typography;

const AdminShiftManagementPage = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user || (user.userType !== "Staff" || user.role?.name?.toLowerCase() !== "admin" )) {
            messageApi.error("You are not authorized to view this page.");
            router.push('/auth');
        }
    }, [user, router]);

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const handleCreateSuccess = () => {
        setIsCreateModalVisible(false);
    };

    const handleEdit = (shift: Shift) => {
        setSelectedShift(shift);
        setIsEditModalVisible(true);
    };

    const handleView = (shift: Shift) => {
        setSelectedShift(shift);
        setIsViewModalVisible(true);
    };

    const handleEditSuccess = () => {
        setIsEditModalVisible(false);
        setSelectedShift(null);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setSelectedShift(null);
    };

   

    return (
        <>
            {contextHolder}
            <AdminDashboardLayout  >
                <Title level={3}>Shift Management</Title>
                <p>Manage Shifts here.</p>

                <Button type="primary" onClick={showCreateModal} style={{ marginBottom: 16 }}>
                    Create Shift
                </Button>
                <ShiftList
                    onEdit={handleEdit}
                    onView={handleView}
                    
                />
                <Modal
                    title="Create Shift"
                    open={isCreateModalVisible}
                    onCancel={() => setIsCreateModalVisible(false)}
                    footer={null}
                >
                    <ShiftCreateForm onSuccess={handleCreateSuccess} />
                </Modal>
                <Modal
                    title="Edit Shift"
                    open={isEditModalVisible}
                    onCancel={() => setIsEditModalVisible(false)}
                    footer={null}
                >
                    {selectedShift && (
                        <ShiftEditForm
                            shift={selectedShift}
                            onSuccess={handleEditSuccess}
                            onCancel={handleEditCancel}
                        />
                    )}
                </Modal>

                <Modal
                    title="View Shift"
                    open={isViewModalVisible}
                    onCancel={() => setIsViewModalVisible(false)}
                    footer={null}
                >
                    {selectedShift && (
                        <ShiftView shift={selectedShift} />
                    )}
                </Modal>
 
            </AdminDashboardLayout>
        </>
    );
};

export default AdminShiftManagementPage;