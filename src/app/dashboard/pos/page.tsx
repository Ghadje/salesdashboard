'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
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

const API_URL = 'http://10.119.26.100:3006/api/forms';

function Order() {
  const [data, setData] = useState<any[]>([]);
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
      const token = Cookies.get('token'); // Get the token from cookies
      const response = await axios.post(
        API_URL,
        {
          filter: {}, // Adjust the filter if needed
          pageNumber,
          pageSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      );
      console.log("🚀 ~ fetchData ~ response:", response.data.response);
      setTotal(response?.data?.total || 0);
      setData(response.data.response || []); // Assuming `forms` contains the data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Trigger data fetch on page load and when `pageNumber` changes
  useEffect(() => {
    fetchData();
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
              <TableHead>Form Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
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
            ) : data.length > 0 ? (
              data.map((form, index) => (
                <TableRow key={form.id}>
                  <TableCell>{(pageNumber - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.status}</TableCell>
                  <TableCell>{form.owner}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No forms found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination className="flex justify-end mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPageNumber(1)}>
                1
              </PaginationLink>
              <PaginationLink href="#" onClick={() => setPageNumber(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setPageNumber(pageNumber + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
}

export default withAuth(Order);
