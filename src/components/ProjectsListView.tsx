import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Users, Calendar, DollarSign } from 'lucide-react';
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

interface ProjectsListViewProps {
  onItemSelect: (item: any, itemType: string) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onBack?: () => void;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
}

const projectsData = [
  {
    id: 1,
    projectCode: 'PRJ-2024-001',
    projectName: 'Manufacturing Equipment Upgrade',
    customer: 'Acme Manufacturing Corp',
    projectManager: 'Sarah Wilson',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'Active',
    phase: 'RFQ Collection',
    totalValue: '$2,500,000',
    rfqCount: 5,
    quoteCount: 12,
    poCount: 2,
    description: 'Complete overhaul of manufacturing line with new CNC machines and automation systems'
  },
  {
    id: 2,
    projectCode: 'PRJ-2024-002',
    projectName: 'Office Infrastructure Renewal',
    customer: 'Global Industries Ltd',
    projectManager: 'Mike Johnson',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    status: 'Active',
    phase: 'Quote Evaluation',
    totalValue: '$850,000',
    rfqCount: 8,
    quoteCount: 24,
    poCount: 5,
    description: 'IT infrastructure upgrade including servers, networking equipment, and workstations'
  },
  {
    id: 3,
    projectCode: 'PRJ-2024-003',
    projectName: 'Warehouse Automation System',
    customer: 'Tech Solutions Inc',
    projectManager: 'Emily Chen',
    startDate: '2024-01-10',
    endDate: '2024-12-20',
    status: 'Planning',
    phase: 'Requirements Gathering',
    totalValue: '$4,200,000',
    rfqCount: 2,
    quoteCount: 3,
    poCount: 0,
    description: 'Automated storage and retrieval system with robotic handling and inventory management'
  },
  {
    id: 4,
    projectCode: 'PRJ-2024-004',
    projectName: 'Security System Upgrade',
    customer: 'European Manufacturing',
    projectManager: 'David Rodriguez',
    startDate: '2023-11-15',
    endDate: '2024-04-30',
    status: 'Completed',
    phase: 'Project Closure',
    totalValue: '$675,000',
    rfqCount: 6,
    quoteCount: 18,
    poCount: 8,
    description: 'Comprehensive security system including CCTV, access control, and alarm systems'
  },
  {
    id: 5,
    projectCode: 'PRJ-2024-005',
    projectName: 'Green Energy Initiative',
    customer: 'Nordic Components',
    projectManager: 'Lisa Anderson',
    startDate: '2024-03-01',
    endDate: '2024-11-30',
    status: 'On Hold',
    phase: 'Budget Approval',
    totalValue: '$3,100,000',
    rfqCount: 1,
    quoteCount: 2,
    poCount: 0,
    description: 'Solar panel installation and energy storage systems for sustainable operations'
  },
  {
    id: 6,
    projectCode: 'PRJ-2024-006',
    projectName: 'Production Line Expansion',
    customer: 'Automotive Parts Ltd',
    projectManager: 'Robert Kim',
    startDate: '2024-02-15',
    endDate: '2024-09-30',
    status: 'Active',
    phase: 'Construction',
    totalValue: '$1,800,000',
    rfqCount: 12,
    quoteCount: 28,
    poCount: 15,
    description: 'New production line for automotive component manufacturing with quality control systems'
  },
  {
    id: 7,
    projectCode: 'PRJ-2024-007',
    projectName: 'Data Center Modernization',
    customer: 'Digital Solutions Corp',
    projectManager: 'Jennifer Martinez',
    startDate: '2024-01-20',
    endDate: '2024-07-15',
    status: 'Active',
    phase: 'Implementation',
    totalValue: '$2,300,000',
    rfqCount: 9,
    quoteCount: 22,
    poCount: 12,
    description: 'Upgrade of data center infrastructure with new servers, storage, and cooling systems'
  },
  {
    id: 8,
    projectCode: 'PRJ-2024-008',
    projectName: 'Chemical Processing Plant',
    customer: 'Industrial Chemicals Inc',
    projectManager: 'Thomas Wang',
    startDate: '2024-03-10',
    endDate: '2025-02-28',
    status: 'Planning',
    phase: 'Design Phase',
    totalValue: '$8,500,000',
    rfqCount: 3,
    quoteCount: 5,
    poCount: 0,
    description: 'New chemical processing facility with safety systems and environmental controls'
  },
  {
    id: 9,
    projectCode: 'PRJ-2024-009',
    projectName: 'Logistics Hub Development',
    customer: 'Global Logistics Group',
    projectManager: 'Amanda Foster',
    startDate: '2024-02-28',
    endDate: '2024-12-15',
    status: 'Active',
    phase: 'Site Preparation',
    totalValue: '$3,800,000',
    rfqCount: 15,
    quoteCount: 35,
    poCount: 18,
    description: 'Regional logistics hub with automated sorting, storage, and distribution systems'
  },
  {
    id: 10,
    projectCode: 'PRJ-2024-010',
    projectName: 'Research Laboratory Setup',
    customer: 'Advanced Research Institute',
    projectManager: 'Dr. Michael Chang',
    startDate: '2024-01-05',
    endDate: '2024-08-20',
    status: 'Completed',
    phase: 'Project Closure',
    totalValue: '$1,200,000',
    rfqCount: 7,
    quoteCount: 19,
    poCount: 9,
    description: 'State-of-the-art research laboratory with specialized equipment and safety systems'
  },
  {
    id: 11,
    projectCode: 'PRJ-2024-011',
    projectName: 'Textile Manufacturing Upgrade',
    customer: 'Fashion Textiles Co',
    projectManager: 'Sofia Rodriguez',
    startDate: '2024-04-01',
    endDate: '2024-10-31',
    status: 'Active',
    phase: 'Equipment Installation',
    totalValue: '$2,100,000',
    rfqCount: 11,
    quoteCount: 26,
    poCount: 14,
    description: 'Modernization of textile manufacturing equipment with digital control systems'
  },
  {
    id: 12,
    projectCode: 'PRJ-2024-012',
    projectName: 'Food Processing Facility',
    customer: 'Organic Foods Ltd',
    projectManager: 'James Thompson',
    startDate: '2024-03-15',
    endDate: '2024-11-30',
    status: 'On Hold',
    phase: 'Regulatory Approval',
    totalValue: '$4,800,000',
    rfqCount: 4,
    quoteCount: 8,
    poCount: 2,
    description: 'New food processing plant with automated packaging and quality control systems'
  }
];

export function ProjectsListView({ 
  onItemSelect, 
  navigationHistory = [], 
  onBack, 
  onNavigate 
}: ProjectsListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Requirements Gathering': return 'bg-purple-100 text-purple-800';
      case 'RFQ Collection': return 'bg-blue-100 text-blue-800';
      case 'Quote Evaluation': return 'bg-orange-100 text-orange-800';
      case 'Budget Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Project Closure': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Projects"
        subtitle="Manage your project portfolio and track progress across RFQs, quotes, and purchase orders"
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
              New Project
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Active', 'Planning', 'On Hold', 'Completed'].map((status) => (
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
                  <TableHead>Project</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow 
                    key={project.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onItemSelect(project, 'project')}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-blue-600 hover:underline">{project.projectCode}</p>
                        <p className="text-sm text-gray-600">{project.projectName}</p>
                      </div>
                    </TableCell>
                    <TableCell>{project.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{project.projectManager}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <div className="text-sm">
                          <div>{project.startDate}</div>
                          <div className="text-gray-500">to {project.endDate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPhaseColor(project.phase)}>
                        {project.phase}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 text-xs">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {project.rfqCount} RFQs
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {project.quoteCount} Quotes
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {project.poCount} POs
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{project.totalValue}</span>
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
                            onItemSelect(project, 'project');
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            View RFQs
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            View Quotes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            View POs
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Project Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold">{projectsData.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold">
                      {projectsData.filter(p => p.status === 'Active').length}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Badge className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold">$11.3M</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
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