import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { StatusBadge } from './ui/status-badge';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, DollarSign, Building, CreditCard } from 'lucide-react';
import { PageHeader } from './PageHeader';
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

interface PaymentsListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

const paymentsData = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    poReference: 'PO-2024-001',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    invoiceDate: '2024-04-25',
    dueDate: '2024-05-25',
    paymentDate: '2024-05-20',
    status: 'Paid',
    amount: '$420,000',
    currency: 'USD',
    paymentMethod: 'Wire Transfer',
    reference: 'REF-001-2024'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    poReference: 'PO-2024-002',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    invoiceDate: '2024-03-30',
    dueDate: '2024-04-14',
    paymentDate: null,
    status: 'Pending',
    amount: '$118,500',
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-002-2024'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    poReference: 'PO-2024-003',
    supplier: 'Industrial Supplies Co',
    project: 'PRJ-2024-004',
    invoiceDate: '2024-03-05',
    dueDate: '2024-04-04',
    paymentDate: '2024-04-01',
    status: 'Paid',
    amount: '$75,000',
    currency: 'USD',
    paymentMethod: 'ACH Transfer',
    reference: 'REF-003-2024'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-004',
    poReference: 'PO-2024-004',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    invoiceDate: '2024-05-20',
    dueDate: '2024-07-04',
    paymentDate: null,
    status: 'Approved',
    amount: '$285,000',
    currency: 'USD',
    paymentMethod: 'Wire Transfer',
    reference: 'REF-004-2024'
  },
  {
    id: 5,
    invoiceNumber: 'INV-2024-005',
    poReference: 'PO-2024-005',
    supplier: 'Security Systems Inc',
    project: 'PRJ-2024-004',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    paymentDate: null,
    status: 'Overdue',
    amount: '$45,000',
    currency: 'USD',
    paymentMethod: 'Check',
    reference: 'REF-005-2024'
  }
];

export function PaymentsListView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: PaymentsListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // old: Custom status color function
  // new: Using standardized StatusBadge component for consistency

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Payments Management"
        subtitle="Track invoices, payments, and financial obligations to suppliers"
        navigationHistory={navigationHistory}
        onBack={onBack}
        onNavigate={onNavigate}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Pending', 'Approved', 'Paid', 'Overdue'].map((status) => (
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
                  <TableHead>Invoice</TableHead>
                  <TableHead>PO Reference</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow 
                    key={payment.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(payment, 'payment')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{payment.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{payment.reference}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.poReference}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{payment.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{payment.invoiceDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{payment.dueDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{payment.paymentDate || 'Pending'}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} size="md" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{payment.paymentMethod}</span>
                      </div>
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
                            onItemSelect(payment, 'payment');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Payment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Process Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Download Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Payment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Outstanding</p>
                    <p className="text-2xl font-bold text-red-600">$448,500</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Paid This Month</p>
                    <p className="text-2xl font-bold text-green-600">$495,000</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overdue Amount</p>
                    <p className="text-2xl font-bold text-orange-600">$45,000</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-blue-600">$285,000</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}