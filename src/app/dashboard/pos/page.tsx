'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { withAuth } from '@/lib/withAuth';
import { api } from '@/lib/api';
import { PosData } from './types';




function Page() {
  const [formData, setFormData] = useState<Array<PosData>>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 20;
  const [total, setTotal] = useState<number>(0);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "api/forms",
        {
          filter: {},
          pageNumber,
          pageSize,
        },
      );
      setTotal(response?.data?.total || 0);
      setFormData(response.data.response || []); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Trigger data fetch on page load and when `pageNumber` changes
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center gap-x-2">
              <div className="w-1/3">
                <Input placeholder="Rechercher ici..." />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nom de Pos</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Wilaya</TableHead>
              <TableHead>Commune</TableHead>
              <TableHead>Superficie</TableHead>
              <TableHead>Locataire/Propriétaire</TableHead>
              <TableHead>Créé à</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : formData.length > 0 ? (
              formData.map((data, index) => (
                <TableRow key={data.id} id={data.id}>
                  <TableCell>{(pageNumber - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>{data?.first_name} {data?.last_name}</TableCell>
                  <TableCell>{data?.phone_1}</TableCell>
                  <TableCell>{data?.wilaya}</TableCell>
                  <TableCell>{data?.commune}</TableCell>
                  <TableCell>{data?.surface}</TableCell>
                  <TableCell>{data?.location_or_owner ? "Locataire" : "Propriétaire"}</TableCell>
                  <TableCell>{data?.createdAt}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9}>No forms found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination className="flex justify-end my-4">
          <PaginationContent>
             {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
              />
            </PaginationItem>
             {/* Page Numbers */}
             {Array.from({ length: Math.ceil(total / pageSize) }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    className={page === pageNumber ? "font-bold text-black" : ""}
                    onClick={() => setPageNumber(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => pageNumber < Math.ceil(total / pageSize) && setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= Math.ceil(total / pageSize)}
                />
              </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
}

export default withAuth(Page);
