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

interface QuotesListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
}

const quotesData = [
  {
    id: 1,
    quoteNumber: 'QUO-2024-001',
    rfqReference: 'RFQ-2024-001',
    supplier: 'MachCorp Industries',
    project: 'PRJ-2024-001',
    submittedDate: '2024-02-08',
    validUntil: '2024-03-08',
    status: 'Under Review',
    totalAmount: '$445,000',
    currency: 'USD',
    deliveryTime: '8-12 weeks',
    description: 'CNC machine components with installation'
  },
  {
    id: 2,
    quoteNumber: 'QUO-2024-002',
    rfqReference: 'RFQ-2024-001',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    submittedDate: '2024-02-10',
    validUntil: '2024-03-10',
    status: 'Accepted',
    totalAmount: '$420,000',
    currency: 'USD',
    deliveryTime: '6-10 weeks',
    description: 'Premium CNC components with extended warranty'
  },
  {
    id: 3,
    quoteNumber: 'QUO-2024-003',
    rfqReference: 'RFQ-2024-002',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    submittedDate: '2024-02-12',
    validUntil: '2024-03-12',
    status: 'Pending',
    totalAmount: '$118,500',
    currency: 'USD',
    deliveryTime: '4-6 weeks',
    description: 'Complete network infrastructure package'
  },
  {
    id: 4,
    quoteNumber: 'QUO-2024-004',
    rfqReference: 'RFQ-2024-003',
    supplier: 'AutoSys Controls',
    project: 'PRJ-2024-003',
    submittedDate: '2024-02-05',
    validUntil: '2024-03-05',
    status: 'Rejected',
    totalAmount: '$785,000',
    currency: 'USD',
    deliveryTime: '12-16 weeks',
    description: 'Advanced automation control systems'
  }
];

export function QuotesListView({ onItemSelect }: QuotesListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredQuotes = quotesData.filter(quote => {
    const matchesSearch = quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.rfqReference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quotes</CardTitle>
              <CardDescription className="mt-2">
                Manage supplier quotes and evaluate responses to RFQs
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Pending', 'Under Review', 'Accepted', 'Rejected'].map((status) => (
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
                  <TableHead>Quote</TableHead>
                  <TableHead>RFQ Reference</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow 
                    key={quote.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(quote, 'quote')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{quote.quoteNumber}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">{quote.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{quote.rfqReference}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{quote.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{quote.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{quote.submittedDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{quote.validUntil}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{quote.totalAmount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{quote.deliveryTime}</span>
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
                            onItemSelect(quote, 'quote');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Quote
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Accept Quote
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Compare Quotes
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