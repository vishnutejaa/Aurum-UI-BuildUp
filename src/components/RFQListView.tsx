import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Calendar, DollarSign, Building, ArrowRight, ArrowLeft } from 'lucide-react';
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
import { RFQInView } from './rfq/RFQInView';
import { RFQOutView } from './rfq/RFQOutView';
import { PageHeader } from './PageHeader';

interface RFQListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

export const rfqData = [
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

export function RFQListView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: RFQListViewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (activeTab === 'inbound') {
    return <RFQInView 
      onItemSelect={onItemSelect} 
      navigationHistory={navigationHistory}
      onBack={onBack}
      onNavigate={onNavigate}
    />;
  }

  if (activeTab === 'outbound') {
    return <RFQOutView 
      onItemSelect={onItemSelect}
      navigationHistory={navigationHistory}
      onBack={onBack}
      onNavigate={onNavigate}
    />;
  }

  // Overview/Dashboard view
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="RFQ Management"
        subtitle="Comprehensive view of all RFQ activities - incoming requests and outbound quotations"
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
              Quick Actions
            </Button>
          </>
        }
      />
      
      <div className="flex-1 p-6 space-y-6">

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inbound" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Inbound RFQs
          </TabsTrigger>
          <TabsTrigger value="outbound" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Outbound RFQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* RFQ Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Inbound RFQs</CardTitle>
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Outbound RFQs</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">-1 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">5 due today</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total RFQ Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.2M</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Inbound RFQ Actions
                </CardTitle>
                <CardDescription>
                  Manage incoming requests from customers and internal departments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('inbound')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All Inbound RFQs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create External RFQ
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Building className="h-4 w-4 mr-2" />
                  Create Internal RFQ
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Outbound RFQ Actions
                </CardTitle>
                <CardDescription>
                  Generate and send RFQs to suppliers based on customer requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('outbound')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All Outbound RFQs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate RFQ for External
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Building className="h-4 w-4 mr-2" />
                  Generate RFQ for Internal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}