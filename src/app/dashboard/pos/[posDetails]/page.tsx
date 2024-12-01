'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { PosData } from '../types';
import Image from 'next/image';

function PosDetailsPage({ params }: { params: { posDetails: string } }) {
  const [posDetails, setPosDetails] = useState<PosData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.posDetails) {
      setLoading(true);
      api.post(
        'api/forms',
        {
          filter: { id: params.posDetails },
          pageNumber: 1,
          pageSize: 10,
        }
      )
        .then((response) => setPosDetails(response.data?.response[0]))
        .catch((error) => setError(error.message || 'Failed to fetch POS details'))
        .finally(() => setLoading(false));
    }
  }, [params?.posDetails]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  if (!posDetails)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">No details available</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Details for {posDetails.first_name} {posDetails.last_name}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <DetailRow label="Phone 1" value={posDetails.phone_1} />
        <DetailRow label="Phone 2" value={posDetails.phone_2 || 'N/A'} />
        <DetailRow label="Wilaya" value={posDetails.wilaya} />
        <DetailRow label="Commune" value={posDetails.commune} />
        <DetailRow label="Surface" value={posDetails.surface} />
        <DetailRow label="Location/Owner" value={posDetails.location_or_owner} />
        <DetailRow label="Warehouse Surface" value={posDetails.wharehouse_surface} />
        <DetailRow label="Employees Count" value={posDetails.employees_cout.toString()} />
        <DetailRow label="Cars Count" value={posDetails.cars_cout.toString()} />
        <DetailRow label="IT Tools" value={posDetails.it_tools ? 'Yes' : 'No'} />
        <DetailRow label="Activity Type" value={posDetails.activity_type} />
        <DetailRow label="Product Family" value={posDetails.product_family} />
        <DetailRow label="Sell Type" value={posDetails.sell_type} />
        <DetailRow label="Monthly Revenue" value={posDetails.ca_global_monthly} />
        <DetailRow label="Main Supplier" value={posDetails.main_suplier} />
        <DetailRow label="Commercial Brands" value={posDetails.comm_brands} />
        <DetailRow label="Main Brands" value={posDetails.main_brands} />
        <DetailRow label="Iris Brand" value={posDetails.has_iris_brand ? 'Yes' : 'No'} />
        <DetailRow label="Iris Family" value={posDetails.iris_family || 'N/A'} />
        <DetailRow label="Monthly Revenue (Iris)" value={posDetails.ca_iris_monthly} />
        <DetailRow
          label="Created At"
          value={new Date(posDetails.createdAt).toLocaleString()}
        />
        <DetailRow label="Classification" value={posDetails.classification} />
        <DetailRow label="Comments" value={posDetails.comments || 'No comments'} />
      </div>
      <div className="mt-6">
        <Image
          src={posDetails?.photo_url ?? ""}
          alt="POS"
          className="w-full h-auto rounded-lg shadow-sm"
          width={1500}
          height={750}
        />
      </div>
    </div>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default PosDetailsPage;
