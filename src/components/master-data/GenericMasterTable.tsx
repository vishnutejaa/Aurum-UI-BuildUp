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

interface GenericMasterTableProps {
  section: string;
  searchTerm: string;
}

// Mock data generator for different sections
const generateMockData = (section: string) => {
  const baseData = {
    'material-units': [
      { id: 1, name: 'Each', code: 'EA', description: 'Individual unit', status: 'Active' },
      { id: 2, name: 'Kilogram', code: 'KG', description: 'Weight measurement', status: 'Active' },
      { id: 3, name: 'Meter', code: 'M', description: 'Length measurement', status: 'Active' },
      { id: 4, name: 'Liter', code: 'L', description: 'Volume measurement', status: 'Active' },
      { id: 5, name: 'Lot', code: 'LOT', description: 'Batch quantity', status: 'Active' },
    ],
    'material-categories': [
      { id: 1, name: 'Raw Materials', code: 'RAW', description: 'Basic materials for manufacturing', status: 'Active' },
      { id: 2, name: 'Finished Goods', code: 'FIN', description: 'Completed products', status: 'Active' },
      { id: 3, name: 'Components', code: 'COMP', description: 'Part components', status: 'Active' },
      { id: 4, name: 'Tools & Equipment', code: 'TOOL', description: 'Manufacturing tools', status: 'Active' },
    ],
    'currencies': [
      { id: 1, name: 'US Dollar', code: 'USD', symbol: '$', rate: '1.00', status: 'Active' },
      { id: 2, name: 'Euro', code: 'EUR', symbol: '€', rate: '0.85', status: 'Active' },
      { id: 3, name: 'British Pound', code: 'GBP', symbol: '£', rate: '0.73', status: 'Active' },
      { id: 4, name: 'Japanese Yen', code: 'JPY', symbol: '¥', rate: '110.25', status: 'Active' },
    ],
    'countries': [
      { id: 1, name: 'United States', code: 'US', region: 'North America', currency: 'USD', status: 'Active' },
      { id: 2, name: 'Germany', code: 'DE', region: 'Europe', currency: 'EUR', status: 'Active' },
      { id: 3, name: 'United Kingdom', code: 'GB', region: 'Europe', currency: 'GBP', status: 'Active' },
      { id: 4, name: 'Japan', code: 'JP', region: 'Asia', currency: 'JPY', status: 'Active' },
    ],
    'offices': [
      { id: 1, name: 'Headquarters', location: 'New York, NY', type: 'Main Office', manager: 'John Smith', status: 'Active' },
      { id: 2, name: 'West Coast Branch', location: 'Los Angeles, CA', type: 'Branch Office', manager: 'Sarah Jones', status: 'Active' },
      { id: 3, name: 'European Hub', location: 'London, UK', type: 'Regional Office', manager: 'David Brown', status: 'Active' },
    ],
    'bid-types': [
      { id: 1, name: 'Open Bid', code: 'OPEN', description: 'Public bidding process', status: 'Active' },
      { id: 2, name: 'Closed Bid', code: 'CLOSED', description: 'Restricted bidding process', status: 'Active' },
      { id: 3, name: 'Negotiated', code: 'NEG', description: 'Direct negotiation', status: 'Active' },
      { id: 4, name: 'Emergency', code: 'EMRG', description: 'Emergency procurement', status: 'Active' },
    ],
  };

  // Return section-specific data or default data
  return baseData[section as keyof typeof baseData] || [
    { id: 1, name: 'Item 1', code: 'ITM1', description: 'Sample item 1', status: 'Active' },
    { id: 2, name: 'Item 2', code: 'ITM2', description: 'Sample item 2', status: 'Active' },
    { id: 3, name: 'Item 3', code: 'ITM3', description: 'Sample item 3', status: 'Inactive' },
  ];
};

export function GenericMasterTable({ section, searchTerm }: GenericMasterTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const data = generateMockData(section);
  
  const filteredData = data.filter(item =>
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get column headers based on data structure
  const getHeaders = () => {
    if (data.length === 0) return ['Name', 'Status'];
    const firstItem = data[0];
    return Object.keys(firstItem).filter(key => key !== 'id');
  };

  const headers = getHeaders();

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="capitalize">
                  {header.replace(/([A-Z])/g, ' $1').trim()}
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {headers.map((header) => (
                  <TableCell key={header}>
                    {header === 'status' ? (
                      <Badge 
                        variant={
                          item[header as keyof typeof item] === 'Active' ? 'default' : 'destructive'
                        }
                      >
                        {item[header as keyof typeof item]}
                      </Badge>
                    ) : header === 'name' ? (
                      <span className="font-medium">
                        {item[header as keyof typeof item]}
                      </span>
                    ) : (
                      item[header as keyof typeof item]
                    )}
                  </TableCell>
                ))}
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
      {totalPages > 1 && (
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
      )}
    </div>
  );
}