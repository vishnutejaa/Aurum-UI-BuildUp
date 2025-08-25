import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, Package, Building } from 'lucide-react';
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

interface GoodsListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
}

const goodsData = [
  {
    id: 1,
    shipmentNumber: 'SH-2024-001',
    poReference: 'PO-2024-001',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    shippedDate: '2024-04-15',
    expectedArrival: '2024-04-22',
    actualArrival: '2024-04-20',
    status: 'Received',
    trackingNumber: 'TRK-789456123',
    carrier: 'DHL Express',
    description: 'CNC machine components - 15 units'
  },
  {
    id: 2,
    shipmentNumber: 'SH-2024-002',
    poReference: 'PO-2024-002',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    shippedDate: '2024-03-20',
    expectedArrival: '2024-03-27',
    actualArrival: null,
    status: 'In Transit',
    trackingNumber: 'TRK-456123789',
    carrier: 'FedEx International',
    description: 'Network switches and routers - 25 units'
  },
  {
    id: 3,
    shipmentNumber: 'SH-2024-003',
    poReference: 'PO-2024-003',
    supplier: 'Industrial Supplies Co',
    project: 'PRJ-2024-004',
    shippedDate: '2024-02-25',
    expectedArrival: '2024-03-01',
    actualArrival: '2024-02-28',
    status: 'Quality Check',
    trackingNumber: 'TRK-123789456',
    carrier: 'UPS Ground',
    description: 'Security cameras and accessories - 8 units'
  },
  {
    id: 4,
    shipmentNumber: 'SH-2024-004',
    poReference: 'PO-2024-004',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    shippedDate: '2024-05-10',
    expectedArrival: '2024-05-20',
    actualArrival: null,
    status: 'Shipped',
    trackingNumber: 'TRK-987654321',
    carrier: 'Custom Freight',
    description: 'Solar panels and battery units - 50 units'
  }
];

export function GoodsListView({ onItemSelect }: GoodsListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredGoods = goodsData.filter(goods => {
    const matchesSearch = goods.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goods.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goods.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || goods.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Quality Check': return 'bg-yellow-100 text-yellow-800';
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
              <CardTitle>Goods Management</CardTitle>
              <CardDescription className="mt-2">
                Track shipments, deliveries, and inventory from suppliers
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Record Receipt
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search shipments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Shipped', 'In Transit', 'Received', 'Quality Check'].map((status) => (
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
                  <TableHead>Shipment</TableHead>
                  <TableHead>PO Reference</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Shipped Date</TableHead>
                  <TableHead>Expected Arrival</TableHead>
                  <TableHead>Actual Arrival</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tracking</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGoods.map((goods) => (
                  <TableRow 
                    key={goods.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(goods, 'goods')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{goods.shipmentNumber}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">{goods.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{goods.poReference}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{goods.supplier}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{goods.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{goods.shippedDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{goods.expectedArrival}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{goods.actualArrival || 'Pending'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(goods.status)}>
                        {goods.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{goods.trackingNumber}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{goods.carrier}</span>
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
                            onItemSelect(goods, 'goods');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Package className="mr-2 h-4 w-4" />
                            Track Shipment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Quality Check
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