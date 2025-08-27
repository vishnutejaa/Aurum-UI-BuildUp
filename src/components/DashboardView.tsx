import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { StatusBadge } from './ui/status-badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Package, 
  Users, 
  Building, 
  FileText, 
  DollarSign, 
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Bell,
  TrendingUp,
  TrendingDown,
  Truck,
  CreditCard,
  Target,
  Briefcase,
  AlertCircle,
  Timer,
  UserX
} from 'lucide-react';

export function DashboardView() {
  const keyMetrics = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      subtitle: '3 in critical phase'
    },
    {
      title: 'Open RFQs',
      value: '12',
      change: '+2',
      changeType: 'increase', 
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: '1 per project'
    },
    {
      title: 'Pending Quotes',
      value: '34',
      change: '-3',
      changeType: 'decrease',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      subtitle: '12 awaiting response'
    },
    {
      title: 'Active POs',
      value: '19',
      change: '+4',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      subtitle: '8 pending delivery'
    }
  ];

  // old: Multiple RFQs per project (5, 8, 2)
  // new: One RFQ per project as per updated data structure
  const projectStatusOverview = [
    {
      projectCode: 'PRJ-2024-001',
      projectName: 'Manufacturing Equipment Upgrade',
      phase: 'Quote Evaluation',
      rfqs: { total: 1, active: 1, closed: 0 },
      quotes: { total: 12, pending: 4, received: 6, evaluated: 2 },
      pos: { total: 2, approved: 1, pending: 1 },
      healthStatus: 'good'
    },
    {
      projectCode: 'PRJ-2024-002',
      projectName: 'Office Infrastructure Renewal',
      phase: 'RFQ Collection',
      rfqs: { total: 1, active: 1, closed: 0 },
      quotes: { total: 15, pending: 10, received: 5, evaluated: 0 },
      pos: { total: 1, approved: 1, pending: 0 },
      healthStatus: 'warning'
    },
    {
      projectCode: 'PRJ-2024-003',
      projectName: 'Warehouse Automation System',
      phase: 'Requirements Gathering',
      rfqs: { total: 1, active: 1, closed: 0 },
      quotes: { total: 3, pending: 3, received: 0, evaluated: 0 },
      pos: { total: 0, approved: 0, pending: 0 },
      healthStatus: 'good'
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      type: 'urgent',
      category: 'deadline',
      title: 'RFQ Deadline Alert',
      message: 'RFQ-2024-001 for Steel Components expires in 4 hours - no quotes received',
      project: 'PRJ-2024-001',
      time: '30 minutes ago',
      actionRequired: 'Extend deadline or contact suppliers'
    },
    {
      id: 2,
      type: 'warning',
      category: 'supplier',
      title: 'Supplier Non-Response',
      message: 'TechCorp Industries has not responded to 3 consecutive RFQs in the past 2 weeks',
      project: 'PRJ-2024-002',
      time: '2 hours ago',
      actionRequired: 'Review supplier status'
    },
    {
      id: 3,
      type: 'warning',
      category: 'lead-time',
      title: 'Lead Time Exceeded',
      message: 'Quote from AutoSys Controls shows 16-week delivery for critical components (expected: 8 weeks)',
      project: 'PRJ-2024-003',
      time: '4 hours ago',
      actionRequired: 'Evaluate alternative suppliers'
    },
    {
      id: 4,
      type: 'urgent',
      category: 'deadline',
      title: 'Quote Evaluation Overdue',
      message: 'Quote evaluation for RFQ-2024-001 is 3 days overdue - project timeline at risk',
      project: 'PRJ-2024-001',
      time: '6 hours ago',
      actionRequired: 'Complete evaluation immediately'
    }
  ];

  const recentActivity = [
    { 
      type: 'Project', 
      title: 'New project initiated: Security System Upgrade', 
      time: '15 minutes ago', 
      status: 'created', 
      user: 'Sarah Wilson',
      project: 'PRJ-2024-006'
    },
    { 
      type: 'RFQ', 
      title: 'RFQ-2024-002 sent to 5 suppliers for Network Components', 
      time: '45 minutes ago', 
      status: 'sent', 
      user: 'Mike Johnson',
      project: 'PRJ-2024-002'
    },
    { 
      type: 'Quote', 
      title: 'Quote received from Industrial Solutions for Automation Parts', 
      time: '1 hour ago', 
      status: 'received', 
      user: 'System',
      project: 'PRJ-2024-003'
    },
    { 
      type: 'Alert', 
      title: 'Supplier MachCorp marked as non-responsive', 
      time: '2 hours ago', 
      status: 'alert', 
      user: 'System',
      project: 'PRJ-2024-001'
    },
    { 
      type: 'PO', 
      title: 'Purchase order PO-2024-089 approved for Steel Components', 
      time: '3 hours ago', 
      status: 'approved', 
      user: 'Emily Chen',
      project: 'PRJ-2024-001'
    },
    { 
      type: 'Quote', 
      title: 'Quote evaluation completed for Electrical Components RFQ', 
      time: '4 hours ago', 
      status: 'evaluated', 
      user: 'David Rodriguez',
      project: 'PRJ-2024-002'
    },
  ];

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'deadline': return Clock;
      case 'supplier': return UserX;
      case 'lead-time': return Timer;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': case 'sent': case 'approved': case 'evaluated': case 'received':
        return 'bg-green-100 text-green-800';
      case 'pending': case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Overview</h1>
          <p className="text-gray-600 mt-1">Monitor project progress, deadlines, and supplier performance across your portfolio.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({criticalAlerts.filter(a => a.type === 'urgent').length})
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Critical Alerts & Deadlines</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        {criticalAlerts.slice(0, 3).map((alert) => {
          const AlertIcon = getAlertIcon(alert.category);
          return (
            <Alert key={alert.id} className={getAlertColor(alert.type)}>
              <AlertIcon className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {alert.title}
                  <Badge variant="outline" className="text-xs">{alert.project}</Badge>
                </div>
                <span className="text-xs font-normal text-gray-500">{alert.time}</span>
              </AlertTitle>
              <AlertDescription>
                <div className="mt-1">
                  <p>{alert.message}</p>
                  <p className="text-xs mt-1 font-medium">Action Required: {alert.actionRequired}</p>
                </div>
              </AlertDescription>
            </Alert>
          );
        })}
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-1 p-1 rounded-full ${
                    activity.type === 'Project' ? 'bg-blue-100' :
                    activity.type === 'RFQ' ? 'bg-purple-100' :
                    activity.type === 'Quote' ? 'bg-green-100' :
                    activity.type === 'PO' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}>
                    {activity.type === 'Project' && <Briefcase className="h-3 w-3 text-blue-600" />}
                    {activity.type === 'RFQ' && <FileText className="h-3 w-3 text-purple-600" />}
                    {activity.type === 'Quote' && <DollarSign className="h-3 w-3 text-green-600" />}
                    {activity.type === 'PO' && <ShoppingCart className="h-3 w-3 text-orange-600" />}
                    {activity.type === 'Alert' && <AlertCircle className="h-3 w-3 text-red-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                                      <StatusBadge status={activity.status} size="sm" />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-600">{activity.user}</p>
                        {activity.project && (
                          <Badge variant="outline" className="text-xs">{activity.project}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Briefcase className="h-5 w-5 mb-2 text-blue-600" />
                <span className="text-sm font-medium">New Project</span>
                <span className="text-xs text-gray-500">Start new project</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <FileText className="h-5 w-5 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Create RFQ</span>
                <span className="text-xs text-gray-500">Send to suppliers</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <DollarSign className="h-5 w-5 mb-2 text-green-600" />
                <span className="text-sm font-medium">Evaluate Quotes</span>
                <span className="text-xs text-gray-500">Compare responses</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <ShoppingCart className="h-5 w-5 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Issue PO</span>
                <span className="text-xs text-gray-500">Purchase order</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Users className="h-5 w-5 mb-2 text-indigo-600" />
                <span className="text-sm font-medium">Supplier Review</span>
                <span className="text-xs text-gray-500">Performance analysis</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Target className="h-5 w-5 mb-2 text-red-600" />
                <span className="text-sm font-medium">View Alerts</span>
                <span className="text-xs text-gray-500">Critical issues</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      <div className="flex"> 
        {/* Project Status Overview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
            <CardDescription>Real-time status across active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectStatusOverview.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3 h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{project.projectCode}</h4>
                        <div className={`w-2 h-2 rounded-full ${getHealthStatusColor(project.healthStatus)}`}></div>
                      </div>
                      <p className="text-xs text-gray-600">{project.projectName}</p>
                                              <StatusBadge status={project.phase} variant="outline" size="sm" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="font-medium mb-1">RFQs</div>
                      <div className="flex justify-between">
                        <span>Active</span>
                        <span className="font-medium">{project.rfqs.active}/{project.rfqs.total}</span>
                      </div>
                      <Progress 
                        value={(project.rfqs.active / project.rfqs.total) * 100} 
                        className="h-1 mt-1" 
                      />
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Quotes</div>
                      <div className="flex justify-between">
                        <span>Received</span>
                        <span className="font-medium">{project.quotes.received}/{project.quotes.total}</span>
                      </div>
                      <Progress 
                        value={(project.quotes.received / project.quotes.total) * 100} 
                        className="h-1 mt-1" 
                      />
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">POs</div>
                      <div className="flex justify-between">
                        <span>Approved</span>
                        <span className="font-medium">{project.pos.approved}/{project.pos.total || 'N/A'}</span>
                      </div>
                      <Progress 
                        value={project.pos.total ? (project.pos.approved / project.pos.total) * 100 : 0} 
                        className="h-1 mt-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="ghost" className="w-full justify-center">
                View All Projects
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Performance & Issues */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
            <CardDescription>Response rates and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-sm font-medium">TechCorp Industries</p>
                  </div>
                  <p className="text-xs text-gray-600">No response to last 3 RFQs</p>
                  <div className="text-xs text-red-600 mt-1">Response Rate: 25% (Last 30 days)</div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-sm font-medium">AutoSys Controls</p>
                  </div>
                  <p className="text-xs text-gray-600">Extended lead times reported</p>
                  <div className="text-xs text-yellow-600 mt-1">Avg Lead Time: +40% vs baseline</div>
                </div>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium">Industrial Solutions</p>
                  </div>
                  <p className="text-xs text-gray-600">Consistent performance</p>
                  <div className="text-xs text-green-600 mt-1">Response Rate: 95% (Last 30 days)</div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium">MachCorp Industries</p>
                  </div>
                  <p className="text-xs text-gray-600">Above average pricing</p>
                  <div className="text-xs text-green-600 mt-1">Competitive Pricing: 15% below market avg</div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}