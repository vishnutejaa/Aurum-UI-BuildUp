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
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface SuppliersTableProps {
  searchTerm: string;
}

const suppliersData = [
  { id: 1, name: 'Steel Works Industries', category: 'Raw Materials', contactPerson: 'David Chen', email: 'david@steelworks.com', rating: 4.8, status: 'Verified' },
  { id: 2, name: 'Precision Components Ltd', category: 'Machined Parts', contactPerson: 'Emma Thompson', email: 'emma@precision.co.uk', rating: 4.9, status: 'Verified' },
  { id: 3, name: 'Global Fasteners Corp', category: 'Fasteners', contactPerson: 'Carlos Rodriguez', email: 'carlos@globalfast.com', rating: 4.6, status: 'Verified' },
  { id: 4, name: 'Electronic Solutions Inc', category: 'Electronics', contactPerson: 'Alex Kim', email: 'alex@elecsol.com', rating: 4.7, status: 'Pending' },
  { id: 5, name: 'Quality Tools Manufacturing', category: 'Tools', contactPerson: 'Jennifer Lee', email: 'jennifer@qualitytools.com', rating: 4.5, status: 'Verified' },
  { id: 6, name: 'European Alloys Group', category: 'Metals', contactPerson: 'Stefan Weber', email: 'stefan@euroalloys.de', rating: 4.4, status: 'Verified' },
  { id: 7, name: 'Asian Manufacturing Hub', category: 'Assembly', contactPerson: 'Yuki Tanaka', email: 'yuki@asianhub.com', rating: 4.3, status: 'Review' },
  { id: 8, name: 'Specialty Chemicals Co', category: 'Chemicals', contactPerson: 'Robert Wilson', email: 'robert@specialchem.com', rating: 4.6, status: 'Verified' },
];

export function SuppliersTable({ searchTerm }: SuppliersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = suppliersData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              <TableHead>Supplier Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.category}</TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {supplier.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{supplier.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      supplier.status === 'Verified' ? 'default' :
                      supplier.status === 'Pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {supplier.status}
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send RFQ
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
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