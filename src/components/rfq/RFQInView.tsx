import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PageHeader } from '../PageHeader';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  Clock,
  Building,
  User
} from 'lucide-react';

interface RFQInViewProps {
  onItemSelect?: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

// Mock data for RFQs In
const mockExternalRFQs = [
  {
    id: 'RFQ-EXT-001',
    title: 'Steel Pipes and Fittings',
    customer: 'ABC Construction Ltd',
    submissionDate: '2024-01-15',
    closingDate: '2024-01-30',
    status: 'open',
    type: 'external',
    materialCount: 15,
    value: 250000,
    priority: 'high'
  },
  {
    id: 'RFQ-EXT-002',
    title: 'Electrical Components',
    customer: 'Power Systems Inc',
    submissionDate: '2024-01-12',
    closingDate: '2024-01-25',
    status: 'submitted',
    type: 'external',
    materialCount: 8,
    value: 75000,
    priority: 'medium'
  },
  {
    id: 'RFQ-EXT-003',
    title: 'HVAC Equipment',
    customer: 'Climate Control Co',
    submissionDate: '2024-01-10',
    closingDate: '2024-01-28',
    status: 'closed',
    type: 'external',
    materialCount: 12,
    value: 180000,
    priority: 'low'
  }
];

const mockInternalRFQs = [
  {
    id: 'RFQ-INT-001',
    title: 'Office Supplies Q1',
    department: 'Administration',
    submissionDate: '2024-01-16',
    closingDate: '2024-01-31',
    status: 'draft',
    type: 'internal',
    materialCount: 25,
    value: 15000,
    priority: 'low'
  },
  {
    id: 'RFQ-INT-002',
    title: 'IT Hardware Upgrade',
    department: 'IT Department',
    submissionDate: '2024-01-14',
    closingDate: '2024-01-29',
    status: 'open',
    type: 'internal',
    materialCount: 18,
    value: 120000,
    priority: 'high'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-green-100 text-green-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'submitted': return 'bg-blue-100 text-blue-800';
    case 'closed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function RFQInView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: RFQInViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('external');

  const currentData = activeTab === 'external' ? mockExternalRFQs : mockInternalRFQs;
  const filteredData = currentData.filter(rfq =>
    rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rfq.customer || rfq.department)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    // Navigate to add new RFQ page
    console.log(`Adding new ${activeTab} RFQ`);
  };

  const handleEdit = (rfq: any) => {
    onItemSelect?.(rfq, `rfq-in-${activeTab}`);
  };

  const handleView = (rfq: any) => {
    onItemSelect?.(rfq, `rfq-in-${activeTab}-view`);
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Inbound RFQs"
        subtitle="Manage incoming requests for quotations from customers and internal departments"
        navigationHistory={navigationHistory}
        onBack={onBack}
        onNavigate={onNavigate}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add New RFQ
            </Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-6">

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search RFQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="external" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                External RFQs ({mockExternalRFQs.length})
              </TabsTrigger>
              <TabsTrigger value="internal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Internal RFQs ({mockInternalRFQs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RFQ ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>{activeTab === 'external' ? 'Customer' : 'Department'}</TableHead>
                      <TableHead>Materials</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Closing Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((rfq) => (
                      <TableRow key={rfq.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{rfq.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            {rfq.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          {activeTab === 'external' ? rfq.customer : rfq.department}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{rfq.materialCount} items</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${rfq.value.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(rfq.priority)}>
                            {rfq.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(rfq.status)}>
                            {rfq.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {new Date(rfq.closingDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(rfq)}
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(rfq)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No RFQs found matching your criteria</p>
                  <Button onClick={handleAddNew} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First RFQ
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}