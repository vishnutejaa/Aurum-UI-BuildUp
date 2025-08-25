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

interface RFQListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
}

const rfqData = [
  {
    id: 1,
    rfqNumber: 'RFQ-2024-001',
    title: 'CNC Machine Components',
    customer: 'Acme Manufacturing Corp',
    project: 'PRJ-2024-001',
    dueDate: '2024-02-15',
    status: 'Active',
    priority: 'High',
    estimatedValue: '$450,000',
    suppliersInvited: 5,
    responsesReceived: 3,
    description: 'Precision machined components for CNC equipment upgrade'
  },
  {
    id: 2,
    rfqNumber: 'RFQ-2024-002',
    title: 'Network Infrastructure Equipment',
    customer: 'Global Industries Ltd',
    project: 'PRJ-2024-002',
    dueDate: '2024-02-20',
    status: 'Draft',
    priority: 'Medium',
    estimatedValue: '$125,000',
    suppliersInvited: 3,
    responsesReceived: 0,
    description: 'Switches, routers, and cabling for office infrastructure'
  },
  {
    id: 3,
    rfqNumber: 'RFQ-2024-003',
    title: 'Automation Control Systems',
    customer: 'Tech Solutions Inc',
    project: 'PRJ-2024-003',
    dueDate: '2024-02-10',
    status: 'Closed',
    priority: 'High',
    estimatedValue: '$750,000',
    suppliersInvited: 6,
    responsesReceived: 6,
    description: 'PLC systems and control panels for warehouse automation'
  },
  {
    id: 4,
    rfqNumber: 'RFQ-2024-004',
    title: 'Security Camera Systems',
    customer: 'European Manufacturing',
    project: 'PRJ-2024-004',
    dueDate: '2024-01-30',
    status: 'Expired',
    priority: 'Low',
    estimatedValue: '$85,000',
    suppliersInvited: 4,
    responsesReceived: 2,
    description: 'IP cameras and surveillance equipment installation'
  }
];

export function RFQListView({ onItemSelect }: RFQListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredRFQs = rfqData.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.rfqNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Request for Quotations (RFQs)</CardTitle>
              <CardDescription className="mt-2">
                Manage incoming and outgoing RFQs across all projects and customers
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New RFQ
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search RFQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Active', 'Draft', 'Closed', 'Expired'].map((status) => (
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
                  <TableHead>RFQ</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRFQs.map((rfq) => (
                  <TableRow 
                    key={rfq.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(rfq, 'rfq')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{rfq.rfqNumber}</p>
                        <p className="text-sm text-gray-600">{rfq.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{rfq.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{rfq.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{rfq.dueDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rfq.status)}>
                        {rfq.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(rfq.priority)}>
                        {rfq.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{rfq.responsesReceived}</span>
                        <span className="text-gray-500"> / {rfq.suppliersInvited}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{rfq.estimatedValue}</span>
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
                            onItemSelect(rfq, 'rfq');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit RFQ
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            View Responses
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Send Reminder
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