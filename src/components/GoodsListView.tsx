import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, Package, Building } from 'lucide-react';
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

interface GoodsListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

export const goodsData = [
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
  },
  {
    id: 5,
    shipmentNumber: 'SH-2024-005',
    poReference: 'PO-2024-005',
    supplier: 'Automotive Parts Ltd',
    project: 'PRJ-2024-006',
    shippedDate: '2024-04-18',
    expectedArrival: '2024-04-25',
    actualArrival: '2024-04-23',
    status: 'Received',
    trackingNumber: 'TRK-555666777',
    carrier: 'TNT Express',
    description: 'Production line components - 45 units'
  },
  {
    id: 6,
    shipmentNumber: 'SH-2024-006',
    poReference: 'PO-2024-006',
    supplier: 'Digital Solutions Corp',
    project: 'PRJ-2024-007',
    shippedDate: '2024-04-20',
    expectedArrival: '2024-04-27',
    actualArrival: null,
    status: 'In Transit',
    trackingNumber: 'TRK-111222333',
    carrier: 'DHL Express',
    description: 'Server racks and cooling systems - 12 units'
  },
  {
    id: 7,
    shipmentNumber: 'SH-2024-007',
    poReference: 'PO-2024-007',
    supplier: 'Industrial Chemicals Inc',
    project: 'PRJ-2024-008',
    shippedDate: '2024-05-05',
    expectedArrival: '2024-05-15',
    actualArrival: null,
    status: 'Shipped',
    trackingNumber: 'TRK-444555666',
    carrier: 'Custom Freight',
    description: 'Chemical processing equipment - 8 units'
  },
  {
    id: 8,
    shipmentNumber: 'SH-2024-008',
    poReference: 'PO-2024-008',
    supplier: 'Global Logistics Group',
    project: 'PRJ-2024-009',
    shippedDate: '2024-04-12',
    expectedArrival: '2024-04-19',
    actualArrival: '2024-04-17',
    status: 'Quality Check',
    trackingNumber: 'TRK-777888999',
    carrier: 'UPS Ground',
    description: 'Automated sorting systems - 6 units'
  },
  {
    id: 9,
    shipmentNumber: 'SH-2024-009',
    poReference: 'PO-2024-009',
    supplier: 'Advanced Research Institute',
    project: 'PRJ-2024-010',
    shippedDate: '2024-03-15',
    expectedArrival: '2024-03-22',
    actualArrival: '2024-03-20',
    status: 'Received',
    trackingNumber: 'TRK-000111222',
    carrier: 'FedEx International',
    description: 'Laboratory equipment and safety systems - 20 units'
  },
  {
    id: 10,
    shipmentNumber: 'SH-2024-010',
    poReference: 'PO-2024-010',
    supplier: 'Fashion Textiles Co',
    project: 'PRJ-2024-011',
    shippedDate: '2024-05-01',
    expectedArrival: '2024-05-08',
    actualArrival: null,
    status: 'In Transit',
    trackingNumber: 'TRK-333444555',
    carrier: 'DHL Express',
    description: 'Textile manufacturing equipment - 18 units'
  },
  {
    id: 11,
    shipmentNumber: 'SH-2024-011',
    poReference: 'PO-2024-011',
    supplier: 'Organic Foods Ltd',
    project: 'PRJ-2024-012',
    shippedDate: '2024-04-28',
    expectedArrival: '2024-05-05',
    actualArrival: null,
    status: 'Shipped',
    trackingNumber: 'TRK-666777888',
    carrier: 'Custom Freight',
    description: 'Food processing equipment - 25 units'
  },
  {
    id: 12,
    shipmentNumber: 'SH-2024-012',
    poReference: 'PO-2024-012',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    shippedDate: '2024-05-12',
    expectedArrival: '2024-05-19',
    actualArrival: null,
    status: 'Shipped',
    trackingNumber: 'TRK-999000111',
    carrier: 'DHL Express',
    description: 'Additional CNC components - 10 units'
  }
];

export function GoodsListView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: GoodsListViewProps) {
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
    <div className="h-full flex flex-col">
      <PageHeader
        title="Goods Management"
        subtitle="Track shipments, deliveries, and inventory from suppliers"
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
              Record Receipt
            </Button>
          </>
        }
      />

      <div className="flex-1 p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
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
    </div>
  );
}