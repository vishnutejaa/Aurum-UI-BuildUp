import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface MaterialsTableProps {
  searchTerm: string;
}

// Mock data that matches the reference image
const materialsData = [
  { id: 1, partNumber: '659C13G0026', materialUnit: 'Each', category: 'Steel Components', status: 'Active' },
  { id: 2, partNumber: 'T1A6675M3064', materialUnit: 'Each', category: 'Aluminum Parts', status: 'Active' },
  { id: 3, partNumber: 'Z2E434K67065', materialUnit: 'Each', category: 'Fasteners', status: 'Active' },
  { id: 4, partNumber: '594D207TP802', materialUnit: 'Each', category: 'Electrical', status: 'Inactive' },
  { id: 5, partNumber: '25645207U003', materialUnit: 'Each', category: 'Mechanical', status: 'Active' },
  { id: 6, partNumber: '556A5077M01', materialUnit: 'Each', category: 'Tools', status: 'Active' },
  { id: 7, partNumber: 'G19755244012', materialUnit: 'Each', category: 'Safety Equipment', status: 'Active' },
  { id: 8, partNumber: 'TT972514D079', materialUnit: 'Lots', category: 'Raw Materials', status: 'Active' },
  { id: 9, partNumber: 'Material Test', materialUnit: 'Each', category: 'Testing', status: 'Draft' },
  { id: 10, partNumber: '19401255M004', materialUnit: 'Each', category: 'Components', status: 'Active' },
];

export function MaterialsTable({ searchTerm }: MaterialsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = materialsData.filter(material =>
    material.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Number</TableHead>
              <TableHead>Material Unit</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium text-blue-600 hover:underline cursor-pointer">
                  {material.partNumber}
                </TableCell>
                <TableCell>{material.materialUnit}</TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      material.status === 'Active' ? 'default' :
                      material.status === 'Draft' ? 'secondary' : 'destructive'
                    }
                  >
                    {material.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}