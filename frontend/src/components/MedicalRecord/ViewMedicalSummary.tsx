// src/components/MedicalRecord/ViewMedicalSummary.tsx
'use client';

import React from 'react';
import { Typography, Card,  Alert } from 'antd';
import { useGetMedicalSummaryQuery,  MedicalRecord } from '@/services/medicalRecord/medicalRecordSliceAPI';
import Loader from '@/components/Layout/Loader';

interface ViewMedicalSummaryProps {
     record: MedicalRecord;
}

const ViewMedicalSummary: React.FC<ViewMedicalSummaryProps> = ({ record }) => {
    const { data: summaryData, isLoading, isError, error } = useGetMedicalSummaryQuery(record.patient._id);
 
     if (isLoading) return <Loader />;
        if (isError) return <p>Error fetching medical records summary: { (error as any)?.data?.message || "An unexpected error occurred."}</p>;
    

    if (!summaryData || !summaryData.summary) {
        return <Alert message="No medical summary available for this patient." type="info" showIcon />;
    }

    return (
        <Card title={<Typography.Title level={4}>Medical Summary</Typography.Title>}>
            <Typography.Paragraph>
                {summaryData.summary}
            </Typography.Paragraph>
        </Card>
    );
};

export default ViewMedicalSummary;