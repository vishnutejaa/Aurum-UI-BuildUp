import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, DollarSign, Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface POListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
}

const poData = [
  {
    id: 1,
    poNumber: 'PO-2024-001',
    quoteReference: 'QUO-2024-002',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    orderDate: '2024-02-15',
    expectedDelivery: '2024-04-20',
    status: 'Approved',
    totalAmount: '$420,000',
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'CNC machine components purchase order'
  },
  {
    id: 2,
    poNumber: 'PO-2024-002',
    quoteReference: 'QUO-2024-003',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    orderDate: '2024-02-18',
    expectedDelivery: '2024-03-25',
    status: 'Pending Approval',
    totalAmount: '$118,500',
    currency: 'USD',
    paymentTerms: 'Net 15',
    description: 'Network infrastructure equipment'
  },
  {
    id: 3,
    poNumber: 'PO-2024-003',
    quoteReference: 'QUO-2024-005',
    supplier: 'Industrial Supplies Co',
    project: 'PRJ-2024-004',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-02-28',
    status: 'Delivered',
    totalAmount: '$75,000',
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Security equipment and accessories'
  },
  {
    id: 4,
    poNumber: 'PO-2024-004',
    quoteReference: 'QUO-2024-007',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    orderDate: '2024-02-20',
    expectedDelivery: '2024-05-15',
    status: 'In Transit',
    totalAmount: '$285,000',
    currency: 'USD',
    paymentTerms: 'Net 45',
    description: 'Solar panel and battery systems'
  }
];

export function POListView({ onItemSelect }: POListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredPOs = poData.filter(po => {
    const matchesSearch = po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.quoteReference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription className="mt-2">
                Track and manage purchase orders from approval to delivery
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New PO
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Pending Approval', 'Approved', 'In Transit', 'Delivered'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Quote Ref</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Terms</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPOs.map((po) => (
                  <TableRow 
                    key={po.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(po, 'po')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{po.poNumber}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">{po.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{po.quoteReference}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{po.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{po.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{po.orderDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{po.expectedDelivery}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(po.status)}>
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{po.totalAmount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{po.paymentTerms}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            onItemSelect(po, 'po');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit PO
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Track Shipment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            View Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}