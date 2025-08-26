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
  Send, 
  FileText,
  Calendar,
  Building,
  User,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface RFQOutViewProps {
  onItemSelect?: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

// Mock data for RFQs Out
const mockExternalRFQOut = [
  {
    id: 'RFQ-OUT-EXT-001',
    title: 'Steel Pipes RFQ to Suppliers',
    originalRFQ: 'RFQ-EXT-001',
    suppliersCount: 12,
    responseReceived: 8,
    generatedDate: '2024-01-16',
    closingDate: '2024-01-28',
    status: 'sent',
    type: 'external',
    materialCount: 15,
    estimatedValue: 250000
  },
  {
    id: 'RFQ-OUT-EXT-002',
    title: 'Electrical Components RFQ',
    originalRFQ: 'RFQ-EXT-002',
    suppliersCount: 6,
    responseReceived: 4,
    generatedDate: '2024-01-13',
    closingDate: '2024-01-24',
    status: 'responses_received',
    type: 'external',
    materialCount: 8,
    estimatedValue: 75000
  },
  {
    id: 'RFQ-OUT-EXT-003',
    title: 'HVAC Equipment Procurement',
    originalRFQ: 'RFQ-EXT-003',
    suppliersCount: 8,
    responseReceived: 8,
    generatedDate: '2024-01-11',
    closingDate: '2024-01-26',
    status: 'closed',
    type: 'external',
    materialCount: 12,
    estimatedValue: 180000
  }
];

const mockInternalRFQOut = [
  {
    id: 'RFQ-OUT-INT-001',
    title: 'Office Supplies Internal RFQ',
    originalRFQ: 'RFQ-INT-001',
    suppliersCount: 4,
    responseReceived: 2,
    generatedDate: '2024-01-17',
    closingDate: '2024-01-30',
    status: 'draft',
    type: 'internal',
    materialCount: 25,
    estimatedValue: 15000
  },
  {
    id: 'RFQ-OUT-INT-002',
    title: 'IT Hardware RFQ',
    originalRFQ: 'RFQ-INT-002',
    suppliersCount: 5,
    responseReceived: 3,
    generatedDate: '2024-01-15',
    closingDate: '2024-01-27',
    status: 'sent',
    type: 'internal',
    materialCount: 18,
    estimatedValue: 120000
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'responses_received': return 'bg-green-100 text-green-800';
    case 'closed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'draft': return Clock;
    case 'sent': return Send;
    case 'responses_received': return CheckCircle;
    case 'closed': return AlertCircle;
    default: return Clock;
  }
};

export function RFQOutView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: RFQOutViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('external');

  const currentData = activeTab === 'external' ? mockExternalRFQOut : mockInternalRFQOut;
  const filteredData = currentData.filter(rfq =>
    rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.originalRFQ.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfq.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerate = () => {
    console.log(`Generating new ${activeTab} RFQ Out`);
  };

  const handleEdit = (rfq: any) => {
    onItemSelect?.(rfq, `rfq-out-${activeTab}`);
  };

  const handleView = (rfq: any) => {
    onItemSelect?.(rfq, `rfq-out-${activeTab}-view`);
  };

  const handleSend = (rfq: any) => {
    console.log('Sending RFQ:', rfq.id);
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Outbound RFQs"
        subtitle="Generate and manage RFQs sent to suppliers based on customer requirements"
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
            <Button onClick={handleGenerate}>
              <Plus className="h-4 w-4 mr-2" />
              Generate RFQ
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
                External RFQs ({mockExternalRFQOut.length})
              </TabsTrigger>
              <TabsTrigger value="internal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Internal RFQs ({mockInternalRFQOut.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RFQ ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Original RFQ</TableHead>
                      <TableHead>Suppliers</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Closing Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((rfq) => {
                      const StatusIcon = getStatusIcon(rfq.status);
                      return (
                        <TableRow key={rfq.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{rfq.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              {rfq.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{rfq.originalRFQ}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{rfq.suppliersCount} suppliers</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{rfq.responseReceived}</span>
                              <span className="text-gray-400">/ {rfq.suppliersCount}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ 
                                    width: `${(rfq.responseReceived / rfq.suppliersCount) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              ${rfq.estimatedValue.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(rfq.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {rfq.status.replace('_', ' ')}
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
                              {rfq.status === 'draft' && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleSend(rfq)}
                                  className="h-8 w-8 text-blue-600 hover:text-blue-700"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No outbound RFQs found matching your criteria</p>
                  <Button onClick={handleGenerate} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate First RFQ
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