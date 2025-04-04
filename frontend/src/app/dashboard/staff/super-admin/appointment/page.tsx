// src/app/dashboard/staff/super-admin/appointment/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Button, Modal, message } from 'antd';
import SuperAdminDashboardLayout from '@/components/Layout/SuperAdminDashboardLayout';
import { useAppSelector } from "@/store/store";
import { useRouter } from 'next/navigation';
import AppointmentList from '@/components/Appointment/AppointmentList';
import AppointmentCreateForm from '@/components/Appointment/AppointmentCreateForm';
import AppointmentEditForm from '@/components/Appointment/AppointmentEditForm';
import AppointmentView from '@/components/Appointment/AppointmentView';
import AppointmentDelete from '@/components/Appointment/AppointmentDelete';
import { Appointment } from '@/services/appointment/appointmentSliceAPI';

const { Title } = Typography;

const SuperAdminAppointmentManagementPage = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (!user || (user.userType !== "Staff" || user.role?.name?.toLowerCase() !== "super admin")) {
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


    const handleView = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsViewModalVisible(true);
    };

    const handleEdit = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsEditModalVisible(true);
    };

    const handleEditSuccess = () => {
        setIsEditModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleDeleteSuccess = () => {
        setIsDeleteModalVisible(false);
        setSelectedAppointment(null);
    };

    const handleDelete = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsDeleteModalVisible(true);
    };

    return (
        <>
            {contextHolder}
            <SuperAdminDashboardLayout >
                <Title level={3}>Appointment Management</Title>
                <p>Manage Appointments here.</p>

                <Button type="primary" onClick={showCreateModal} style={{ marginBottom: 16 }}>
                    Create Appointment
                </Button>
                <AppointmentList
                    onEdit={handleEdit}
                    onView={handleView}
                    onDelete={handleDelete}
                />
                <Modal
                    title="Create Appointment"
                    open={isCreateModalVisible}
                    onCancel={() => setIsCreateModalVisible(false)}
                    footer={null}
                >
                    <AppointmentCreateForm onSuccess={handleCreateSuccess} />
                </Modal>
                <Modal
                    title="Edit Appointment"
                    open={isEditModalVisible}
                    onCancel={() => setIsEditModalVisible(false)}
                    footer={null}
                >
                    {selectedAppointment && (
                        <AppointmentEditForm
                            appointment={selectedAppointment}
                            onSuccess={handleEditSuccess}
                            onCancel={handleEditCancel}
                        />
                    )}
                </Modal>
                <Modal
                    title="View Appointment"
                    open={isViewModalVisible}
                    onCancel={() => setIsViewModalVisible(false)}
                    footer={null}
                >
                    {selectedAppointment && (
                        <AppointmentView appointment={selectedAppointment} />
                    )}
                </Modal>
                <Modal
                    title="Delete Appointment"
                    onCancel={handleCancelDelete}
                    open={isDeleteModalVisible}
                    footer={null}
                >
                    {selectedAppointment && (
                        <AppointmentDelete
                            appointment={selectedAppointment}
                            onSuccess={handleDeleteSuccess}
                            onCancel={handleCancelDelete}
                        />
                    )}
                </Modal>
            </SuperAdminDashboardLayout>
        </>
    );
};

export default SuperAdminAppointmentManagementPage;