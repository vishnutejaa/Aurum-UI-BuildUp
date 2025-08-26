import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PageHeader } from '../PageHeader';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Calendar,
  DollarSign,
  Package,
  Users,
  FileText,
  Eye,
  RefreshCw
} from 'lucide-react';

interface ReportsViewProps {
  onItemSelect?: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

// Mock data for reports
const reportTemplates = [
  {
    id: 'purchase-order-report',
    title: 'Purchase Order Report',
    description: 'Comprehensive analysis of all purchase orders',
    category: 'procurement',
    lastGenerated: '2024-01-20',
    frequency: 'Weekly',
    status: 'active'
  },
  {
    id: 'rfq-analysis',
    title: 'RFQ Analysis Report',
    description: 'Performance metrics and trend analysis for RFQs',
    category: 'analytics',
    lastGenerated: '2024-01-18',
    frequency: 'Monthly',
    status: 'active'
  },
  {
    id: 'supplier-performance',
    title: 'Supplier Performance Dashboard',
    description: 'Evaluation of supplier delivery and quality metrics',
    category: 'suppliers',
    lastGenerated: '2024-01-19',
    frequency: 'Bi-weekly',
    status: 'active'
  },
  {
    id: 'cost-analysis',
    title: 'Cost Analysis Report',
    description: 'Material cost trends and savings opportunities',
    category: 'financial',
    lastGenerated: '2024-01-17',
    frequency: 'Monthly',
    status: 'scheduled'
  }
];

const quickStats = [
  {
    title: 'Total PO Value',
    value: '$2.4M',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Active RFQs',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    title: 'Supplier Response Rate',
    value: '87%',
    change: '+5%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: 'Materials Tracked',
    value: '1,247',
    change: '+23',
    trend: 'up',
    icon: Package,
    color: 'text-orange-600'
  }
];

export function ReportsView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: ReportsViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredReports = reportTemplates.filter(report => 
    selectedCategory === 'all' || report.category === selectedCategory
  );

  const handleGenerateReport = (reportId: string) => {
    console.log('Generating report:', reportId);
  };

  const handleViewReport = (report: any) => {
    onItemSelect?.(report, 'report');
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive insights and analysis for procurement operations"
        navigationHistory={navigationHistory}
        onBack={onBack}
        onNavigate={onNavigate}
        actions={
          <>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-6">

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    )}
                    {stat.change} from last period
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Purchase Order Trends
                </CardTitle>
                <CardDescription>
                  Monthly purchase order volume and value trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <BarChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Supplier Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of purchase orders by supplier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="procurement">Procurement</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="suppliers">Suppliers</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All Reports
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="mb-2">
                      {report.category}
                    </Badge>
                    <Badge 
                      variant={report.status === 'active' ? 'default' : 'secondary'}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Generated:</span>
                      <span className="font-medium">
                        {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{report.frequency}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleGenerateReport(report.id)}
                      >
                        Generate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  RFQ Performance Analytics
                </CardTitle>
                <CardDescription>
                  Response rates and completion times analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Average Response Time</p>
                      <p className="text-2xl font-bold">4.2 days</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Response Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Average Quote Value</p>
                      <p className="text-2xl font-bold">$45,200</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Supplier Analytics
                </CardTitle>
                <CardDescription>
                  Performance metrics and relationship insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Top Performing Supplier</p>
                      <p className="text-lg font-bold">TechCorp Industries</p>
                      <p className="text-sm text-gray-600">98% on-time delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Average Lead Time</p>
                      <p className="text-2xl font-bold">14 days</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Quality Score</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}