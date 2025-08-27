import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  X,
  Save,
  Edit,
  Calendar,
  DollarSign,
  FileText,
  Package,
  User,
  Plus,
  Trash2,
  Package2,
  Eye,
  Search,
  AlertTriangle,
} from "lucide-react";
import {
  getProjectRFQs,
  getProjectQuotes,
  getProjectPOs,
  getProjectGoods,
  getProjectSummary,
  getProjectTimelineSummary,
  type ProjectRFQ,
  type ProjectQuote,
  type ProjectPO,
  type ProjectGoods,
} from "../services/projectDataService";
import { PageHeader } from "./PageHeader";

interface DetailPanelProps {
  item: any;
  itemType: string;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
  navigationHistory?: Array<{view: string, masterData?: string, label: string}>;
  onNavigate?: (item: {view: string, masterData?: string, label: string}) => void;
  onResetNavigation?: () => void;
}

// old: SubSectionType without overview
// new: Add "overview" to support a project overview workspace
type SubSectionType =
  | "overview"
  | "rfq-in"
  | "rfq-out"
  | "quote-in"
  | "quote-out"
  | "po-in"
  | "po-out"
  | "materials";

export function DetailPanel({
  item,
  itemType,
  onClose,
  onSave,
  navigationHistory = [],
  onNavigate,
  onResetNavigation,
}: DetailPanelProps) {
  const [editedItem, setEditedItem] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
  // old: defaulted to "rfq-in"
  // new: keep initial as "rfq-in" but we will set to "overview" for projects in useEffect
  const [selectedSubSection, setSelectedSubSection] =
    useState<SubSectionType>("rfq-in");
  
  // Project-related data state
  const [projectRFQs, setProjectRFQs] = useState<ProjectRFQ[]>([]);
  const [projectQuotes, setProjectQuotes] = useState<ProjectQuote[]>([]);
  const [projectPOs, setProjectPOs] = useState<ProjectPO[]>([]);
  const [projectGoods, setProjectGoods] = useState<ProjectGoods[]>([]);
  const [projectSummary, setProjectSummary] = useState<any>(null);
  const [timelineSummary, setTimelineSummary] = useState<any>(null);
  
  const [projectMaterials, setProjectMaterials] = useState([
    {
      id: 1,
      materialCode: "STL-001",
      materialName: "Carbon Steel Sheets",
      specification: "10mm thickness, Grade A36",
      quantity: 50,
      unit: "pieces",
      estimatedPrice: 125.0,
      supplier: "Steel Works Inc",
      status: "Ordered",
      leadTime: "4 weeks",
      notes: "Critical for main structure",
    },
    {
      id: 2,
      materialCode: "ELC-002",
      materialName: "Control Panel Components",
      specification: "IP65 rated, 24V DC",
      quantity: 15,
      unit: "units",
      estimatedPrice: 350.0,
      supplier: "ElectroTech Ltd",
      status: "Quoted",
      leadTime: "6 weeks",
      notes: "Specialized components for automation",
    },
    {
      id: 3,
      materialCode: "HYD-003",
      materialName: "Hydraulic Cylinders",
      specification: "Double acting, 100mm bore",
      quantity: 8,
      unit: "pieces",
      estimatedPrice: 750.0,
      supplier: "Hydraulic Solutions",
      status: "Delivered",
      leadTime: "8 weeks",
      notes: "Heavy duty application for press operations",
    },
    {
      id: 4,
      materialCode: "CNC-004",
      materialName: "Spindle Bearings",
      specification: "Precision grade, 40mm ID",
      quantity: 24,
      unit: "pieces",
      estimatedPrice: 85.0,
      supplier: "Precision Bearings Co",
      status: "Required",
      leadTime: "3 weeks",
      notes: "High-speed machining requirements",
    },
    {
      id: 5,
      materialCode: "WIR-005",
      materialName: "Control Cables",
      specification: "Shielded, 16-core, 100m rolls",
      quantity: 12,
      unit: "rolls",
      estimatedPrice: 45.0,
      supplier: "CableTech Industries",
      status: "Quoted",
      leadTime: "2 weeks",
      notes: "Signal integrity critical for automation",
    }
  ]);

  // Check if item type should show operational workspace
  const isOperationalItem = [
    "project",
    "rfq",
    "quote",
    "po",
    "goods",
  ].includes(itemType);

  useEffect(() => {
    setEditedItem(item);
    setIsEditing(false);
    // old: defaulted project to rfq-in
    // new: set default to overview when itemType is project
    if (itemType === "project") setSelectedSubSection("overview");
    else if (itemType === "rfq") setSelectedSubSection("rfq-in");
    else if (itemType === "quote") setSelectedSubSection("quote-in");
    else if (itemType === "po") setSelectedSubSection("po-in");
    else setSelectedSubSection("materials");
    
    // Load project-related data if this is a project
    if (itemType === "project" && item) {
      // Load all project-related data
      const rfqs = getProjectRFQs(item.id);
      const quotes = getProjectQuotes(item.id);
      const pos = getProjectPOs(item.id);
      const goods = getProjectGoods(item.id);
      const summary = getProjectSummary(item.id);
      const timeline = getProjectTimelineSummary(item.id);
      
      setProjectRFQs(rfqs);
      setProjectQuotes(quotes);
      setProjectPOs(pos);
      setProjectGoods(goods);
      setProjectSummary(summary);
      setTimelineSummary(timeline);
    }
  }, [item, itemType]);

  const handleSave = () => {
    onSave(editedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  const updateField = (field: string, value: any) => {
    setEditedItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Helper functions for status and priority colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
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

  // Use actual item data or fallback to mock data
  const projectData = {
    projectId: item?.id || item?.projectId || "PRJ-2024-001",
    projectName:
      item?.name ||
      item?.projectName ||
      "Manufacturing Equipment Upgrade",
    customer: item?.customer || "Acme Manufacturing Corp",
    projectManager: item?.projectManager || "Sarah Wilson",
    deadLine: item?.deadline || item?.deadLine || "2024-06-30",
    phase: item?.phase || "Quote Evaluation",
    status: item?.status || "Active",
    contact: item?.contact || "+1 (555) 123-4567",
    email: item?.email || "sarah.wilson@acme.com",
  };

  const navigationButtons = [
    {
      id: "overview",
      label: "OVERVIEW",
      active: selectedSubSection === "overview",
    },
    {
      id: "rfq-in",
      label: "RFQ IN",
      active: selectedSubSection === "rfq-in",
    },
    {
      id: "rfq-out",
      label: "RFQ OUT",
      active: selectedSubSection === "rfq-out",
    },
    {
      id: "quote-in",
      label: "QUOTE IN",
      active: selectedSubSection === "quote-in",
    },
    {
      id: "quote-out",
      label: "QUOTE OUT",
      active: selectedSubSection === "quote-out",
    },
    {
      id: "po-in",
      label: "PO IN",
      active: selectedSubSection === "po-in",
    },
    {
      id: "po-out",
      label: "PO OUT",
      active: selectedSubSection === "po-out",
    },
    // {
    //   id: "materials",
    //   label: "MATERIALS",
    //   active: selectedSubSection === "materials",
    // },
  ];

  const renderRFQWorkspace = () => (
    <div className="space-y-6">
      {/* RFQ Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{projectSummary?.rfqs?.total || 0}</div>
            <div className="text-sm text-gray-600">Total RFQs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{projectSummary?.rfqs?.active || 0}</div>
            <div className="text-sm text-gray-600">Active RFQs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{projectSummary?.rfqs?.closed || 0}</div>
            <div className="text-sm text-gray-600">Closed RFQs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{projectSummary?.rfqs?.draft || 0}</div>
            <div className="text-sm text-gray-600">Draft RFQs</div>
          </CardContent>
        </Card>
      </div>

      {/* RFQs List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base">
                Project RFQs ({projectRFQs.length})
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={!isEditing}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add RFQ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projectRFQs.length > 0 ? (
            <div className="space-y-4">
              {projectRFQs.map((rfq) => (
                <Card key={rfq.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {rfq.rfqNumber}
                        </Badge>
                        <Badge className={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(rfq.priority)}>
                          {rfq.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Due: {rfq.dueDate}
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{rfq.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{rfq.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Customer:</span>
                        <span className="ml-2 font-medium">{rfq.customer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Value:</span>
                        <span className="ml-2 font-medium">{rfq.estimatedValue}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Responses:</span>
                        <span className="ml-2 font-medium">{rfq.responsesReceived}/{rfq.suppliersInvited}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No RFQs found for this project</p>
              <p className="text-sm">Click "Add RFQ" to create a new request</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderRFQOutWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">
              RFQ Out - Sent to Suppliers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>RFQ Out functionality coming soon</p>
            <p className="text-sm">This will show RFQs sent to suppliers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQuoteWorkspace = () => (
    <div className="space-y-6">
      {/* Quote Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{projectSummary?.quotes?.total || 0}</div>
            <div className="text-sm text-gray-600">Total Quotes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{projectSummary?.quotes?.pending || 0}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{projectSummary?.quotes?.received || 0}</div>
            <div className="text-sm text-gray-600">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{projectSummary?.quotes?.evaluated || 0}</div>
            <div className="text-sm text-gray-600">Evaluated</div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <CardTitle className="text-base">
                Project Quotes ({projectQuotes.length})
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={!isEditing}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Quote
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projectQuotes.length > 0 ? (
            <div className="space-y-4">
              {projectQuotes.map((quote) => (
                <Card key={quote.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {quote.quoteNumber}
                        </Badge>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          RFQ: {quote.rfqReference}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Valid until: {quote.validUntil}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-gray-500 text-sm">Supplier:</span>
                        <p className="font-medium">{quote.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Amount:</span>
                        <p className="font-medium text-lg">{quote.totalAmount}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{quote.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Submitted:</span>
                        <span className="ml-2 font-medium">{quote.submittedDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Delivery:</span>
                        <span className="ml-2 font-medium">{quote.deliveryTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Currency:</span>
                        <span className="ml-2 font-medium">{quote.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No quotes found for this project</p>
              <p className="text-sm">Click "Add Quote" to create a new quote</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderQuoteOutWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base">
              Quote Out - Sent to Customers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Quote Out functionality coming soon</p>
            <p className="text-sm">This will show quotes sent to customers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPOWorkspace = () => (
    <div className="space-y-6">
      {/* PO Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{projectSummary?.pos?.total || 0}</div>
            <div className="text-sm text-gray-600">Total POs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{projectSummary?.pos?.approved || 0}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{projectSummary?.pos?.pending || 0}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{projectSummary?.pos?.delivered || 0}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Orders List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-base">
                Project Purchase Orders ({projectPOs.length})
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={!isEditing}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add PO
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projectPOs.length > 0 ? (
            <div className="space-y-4">
              {projectPOs.map((po) => (
                <Card key={po.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {po.poNumber}
                        </Badge>
                        <Badge className={getStatusColor(po.status)}>
                          {po.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Quote: {po.quoteReference}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Expected: {po.expectedDelivery}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-gray-500 text-sm">Supplier:</span>
                        <p className="font-medium">{po.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Amount:</span>
                        <p className="font-medium text-lg">{po.totalAmount}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{po.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Order Date:</span>
                        <span className="ml-2 font-medium">{po.orderDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Terms:</span>
                        <span className="ml-2 font-medium">{po.paymentTerms}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Currency:</span>
                        <span className="ml-2 font-medium">{po.currency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No purchase orders found for this project</p>
              <p className="text-sm">Click "Add PO" to create a new purchase order</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderPOOutWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-base">
              PO Out - Sent to Suppliers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>PO Out functionality coming soon</p>
            <p className="text-sm">This will show purchase orders sent to suppliers</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMaterialsWorkspace = () => (
    <div className="space-y-6">
      {/* Goods/Shipments Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{projectSummary?.goods?.total || 0}</div>
            <div className="text-sm text-gray-600">Total Shipments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{projectSummary?.goods?.shipped || 0}</div>
            <div className="text-sm text-gray-600">Shipped</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{projectSummary?.goods?.inTransit || 0}</div>
            <div className="text-sm text-gray-600">In Transit</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{projectSummary?.goods?.received || 0}</div>
            <div className="text-sm text-gray-600">Received</div>
          </CardContent>
        </Card>
      </div>

      {/* Project Goods/Shipments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-base">
                Project Shipments ({projectGoods.length})
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={!isEditing}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Shipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projectGoods.length > 0 ? (
            <div className="space-y-4">
              {projectGoods.map((goods) => (
                <Card key={goods.id} className="border-l-4 border-l-indigo-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {goods.shipmentNumber}
                        </Badge>
                        <Badge className={getStatusColor(goods.status)}>
                          {goods.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          PO: {goods.poReference}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Expected: {goods.expectedArrival}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-gray-500 text-sm">Supplier:</span>
                        <p className="font-medium">{goods.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Carrier:</span>
                        <p className="font-medium">{goods.carrier}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{goods.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Shipped:</span>
                        <span className="ml-2 font-medium">{goods.shippedDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tracking:</span>
                        <span className="ml-2 font-medium font-mono">{goods.trackingNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Arrival:</span>
                        <span className="ml-2 font-medium">{goods.actualArrival || 'Pending'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No shipments found for this project</p>
              <p className="text-sm">Click "Add Shipment" to create a new shipment record</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Materials Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-base">
                Project Materials ({projectMaterials.length})
              </CardTitle>
            </div>
            <Button
              onClick={addMaterial}
              size="sm"
              disabled={!isEditing}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">
                {projectMaterials.length}
              </p>
              <p className="text-xs text-blue-600">
                Total Items
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-600">
                {
                  projectMaterials.filter(
                    (m) => m.status === "Ordered",
                  ).length
                }
              </p>
              <p className="text-xs text-green-600">Ordered</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-lg font-semibold text-yellow-600">
                {
                  projectMaterials.filter(
                    (m) => m.status === "Quoted",
                  ).length
                }
              </p>
              <p className="text-xs text-yellow-600">Quoted</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-lg font-semibold text-red-600">
                {
                  projectMaterials.filter(
                    (m) => m.status === "Required",
                  ).length
                }
              </p>
              <p className="text-xs text-red-600">Required</p>
            </div>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {projectMaterials.map((material) => (
              <Card
                key={material.id}
                className="border-l-4 border-l-indigo-500"
              >
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Material Code
                      </Label>
                      <Input
                        value={material.materialCode}
                        onChange={(e) =>
                          updateMaterial(
                            material.id,
                            "materialCode",
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Material Name
                      </Label>
                      <Input
                        value={material.materialName}
                        onChange={(e) =>
                          updateMaterial(
                            material.id,
                            "materialName",
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Status</Label>
                      <div className="flex gap-2 items-center">
                        <Select
                          value={material.status}
                          onValueChange={(value) =>
                            updateMaterial(
                              material.id,
                              "status",
                              value,
                            )
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="h-8 text-xs flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Required">
                              Required
                            </SelectItem>
                            <SelectItem value="Quoted">
                              Quoted
                            </SelectItem>
                            <SelectItem value="Ordered">
                              Ordered
                            </SelectItem>
                            <SelectItem value="Delivered">
                              Delivered
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              removeMaterial(material.id)
                            }
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Quantity & Unit
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={material.quantity}
                          onChange={(e) =>
                            updateMaterial(
                              material.id,
                              "quantity",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          disabled={!isEditing}
                          className="h-8 text-sm flex-1"
                        />
                        <Select
                          value={material.unit}
                          onValueChange={(value) =>
                            updateMaterial(
                              material.id,
                              "unit",
                              value,
                            )
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="h-8 w-20 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pieces">
                              pcs
                            </SelectItem>
                            <SelectItem value="kg">
                              kg
                            </SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="units">
                              units
                            </SelectItem>
                            <SelectItem value="liters">
                              L
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Price & Lead Time
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={material.estimatedPrice}
                          onChange={(e) =>
                            updateMaterial(
                              material.id,
                              "estimatedPrice",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          disabled={!isEditing}
                          placeholder="Price"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={material.leadTime}
                          onChange={(e) =>
                            updateMaterial(
                              material.id,
                              "leadTime",
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          placeholder="Lead time"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Supplier
                      </Label>
                      <Input
                        value={material.supplier}
                        onChange={(e) =>
                          updateMaterial(
                            material.id,
                            "supplier",
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Material Status Indicator */}
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-600">
                          Total Value:{" "}
                          <span className="font-medium">
                            $
                            {(
                              material.quantity *
                              material.estimatedPrice
                            ).toFixed(2)}
                          </span>
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          material.status === "Delivered"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : material.status === "Ordered"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : material.status === "Quoted"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : "bg-red-100 text-red-800 border-red-300"
                        }`}
                      >
                        {material.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {projectMaterials.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No materials added yet</p>
              <p className="text-sm">
                Click "Add Material" to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const addMaterial = () => {
    const newMaterial = {
      id: Date.now(),
      materialCode: "",
      materialName: "",
      specification: "",
      quantity: 0,
      unit: "pieces",
      estimatedPrice: 0,
      supplier: "",
      status: "Required",
      leadTime: "",
      notes: "",
    };
    setProjectMaterials((prev) => [...prev, newMaterial]);
  };

  const updateMaterial = (
    id: number,
    field: string,
    value: any,
  ) => {
    setProjectMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? { ...material, [field]: value }
          : material,
      ),
    );
  };

  const removeMaterial = (id: number) => {
    setProjectMaterials((prev) =>
      prev.filter((material) => material.id !== id),
    );
  };

  const renderProjectDetailsSection = () => (
    <div className="w-80 bg-gradient-to-b from-orange-100 to-red-100 border-l-2 border-orange-200 flex flex-col">
      {/* Header with close button */}
      <div className="p-4 border-b border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-orange-800">
              Project Details
            </h2>
            <p className="text-xs text-orange-600">
              Selected: {itemType.toUpperCase()} -{" "}
              {item?.id || "Unknown"}
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-orange-600 hover:text-orange-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Information */}
        <div className="space-y-3 mb-4">
          <div>
            <Label className="text-xs font-medium text-orange-700 uppercase tracking-wide">
              Project ID
            </Label>
            <p className="text-sm font-semibold text-orange-900">
              {projectData.projectId}
            </p>
          </div>
          <div>
            <Label className="text-xs font-medium text-orange-700 uppercase tracking-wide">
              Customer
            </Label>
            <p className="text-xs font-medium text-orange-800 truncate">
              {projectData.customer}
            </p>
          </div>
          <div>
            <Label className="text-xs font-medium text-orange-700 uppercase tracking-wide">
              Manager
            </Label>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-orange-600" />
              <p className="text-xs font-medium text-orange-800 truncate">
                {projectData.projectManager}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-xs font-medium text-orange-700 uppercase tracking-wide">
                Deadline
              </Label>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-orange-600" />
                <p className="text-xs font-medium text-orange-800">
                  {projectData.deadLine}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300 text-xs"
            >
              {projectData.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Scrollable */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-orange-700 uppercase tracking-wide mb-2 block">
            Navigation
          </Label>
          {navigationButtons.map((btn) => (
            <Button
              key={btn.id}
              variant={btn.active ? "default" : "outline"}
              size="sm"
              className={`w-full h-auto py-2 px-3 font-semibold transition-all duration-200 text-xs ${
                btn.active
                  ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                  : "bg-white hover:bg-orange-50 text-orange-700 border-orange-300 hover:border-orange-400"
              }`}
              onClick={() =>
                setSelectedSubSection(btn.id as SubSectionType)
              }
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const renderWorkingSpace = () => {
    if (!isOperationalItem || !item) {
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Select an operational item to view working space</p>
            <p className="text-sm">Item Type: {itemType}</p>
            <p className="text-sm">Item: {item ? "Selected" : "None"}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Working Space Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">
                WORKING SPACE
              </h3>
              <Badge variant="outline" className="text-xs">
                {selectedSubSection
                  .toUpperCase()
                  .replace("-", " ")}
              </Badge>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Based on Selected Section */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="space-y-6">
              {selectedSubSection === "overview" && (
                <div className="space-y-6">
                  {/* Quick KPIs */}
                  <div className="grid grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{projectSummary?.rfqs?.total || 0}</div>
                        <div className="text-sm text-gray-600">RFQs</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{projectSummary?.quotes?.total || 0}</div>
                        <div className="text-sm text-gray-600">Quotes</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{projectSummary?.pos?.total || 0}</div>
                        <div className="text-sm text-gray-600">POs</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-600">{projectSummary?.goods?.total || 0}</div>
                        <div className="text-sm text-gray-600">Shipments</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline and critical alerts */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="col-span-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            <CardTitle className="text-base">Timeline</CardTitle>
                          </div>
                          {timelineSummary?.nextDeadline && (
                            <Badge variant="outline" className="text-xs">Next: {timelineSummary.nextDeadline}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Active RFQs</p>
                            <p className="font-semibold">{timelineSummary?.activeRFQs || 0}</p>
                            <Progress value={Math.min(100, (timelineSummary?.activeRFQs || 0) * 10)} className="h-2" />
                          </div>
                          <div>
                            <p className="text-gray-500">Pending POs</p>
                            <p className="font-semibold">{timelineSummary?.pendingPOs || 0}</p>
                            <Progress value={Math.min(100, (timelineSummary?.pendingPOs || 0) * 10)} className="h-2" />
                          </div>
                          <div>
                            <p className="text-gray-500">In Transit</p>
                            <p className="font-semibold">{timelineSummary?.inTransitGoods || 0}</p>
                            <Progress value={Math.min(100, (timelineSummary?.inTransitGoods || 0) * 10)} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <CardTitle className="text-base">Critical</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm list-disc pl-5 space-y-1 text-red-700">
                          {timelineSummary?.nextDeadline ? (
                            <li>Deadline approaching on {timelineSummary.nextDeadline}</li>
                          ) : (
                            <li>No immediate deadlines</li>
                          )}
                          {projectSummary?.quotes?.pending ? (
                            <li>{projectSummary.quotes.pending} quotes pending review</li>
                          ) : (
                            <li>No pending quotes</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Latest records */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-base">Latest RFQ</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {projectRFQs[0] ? (
                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="font-mono text-xs">{projectRFQs[0].rfqNumber}</Badge>
                              <Badge className={getStatusColor(projectRFQs[0].status)}>{projectRFQs[0].status}</Badge>
                            </div>
                            <p className="font-medium">{projectRFQs[0].title}</p>
                            <p className="text-gray-600">{projectRFQs[0].description}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500">No RFQs yet</p>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <CardTitle className="text-base">Latest Quote</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {projectQuotes[0] ? (
                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="font-mono text-xs">{projectQuotes[0].quoteNumber}</Badge>
                              <Badge className={getStatusColor(projectQuotes[0].status)}>{projectQuotes[0].status}</Badge>
                            </div>
                            <p className="text-gray-600">Supplier: {projectQuotes[0].supplier}</p>
                            <p className="font-medium">Amount: {projectQuotes[0].totalAmount}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500">No quotes yet</p>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <CardTitle className="text-base">Latest PO</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {projectPOs[0] ? (
                          <div className="text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="font-mono text-xs">{projectPOs[0].poNumber}</Badge>
                              <Badge className={getStatusColor(projectPOs[0].status)}>{projectPOs[0].status}</Badge>
                            </div>
                            <p className="text-gray-600">Supplier: {projectPOs[0].supplier}</p>
                            <p className="font-medium">Amount: {projectPOs[0].totalAmount}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500">No purchase orders yet</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              {selectedSubSection === "rfq-in" && renderRFQWorkspace()}
              {selectedSubSection === "rfq-out" && renderRFQOutWorkspace()}
              {selectedSubSection === "quote-in" && renderQuoteWorkspace()}
              {selectedSubSection === "quote-out" && renderQuoteOutWorkspace()}
              {selectedSubSection === "po-in" && renderPOWorkspace()}
              {selectedSubSection === "po-out" && renderPOOutWorkspace()}
              {selectedSubSection === "materials" && renderMaterialsWorkspace()}
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation Header */}
      {navigationHistory.length > 0 && (
        <div className="border-b border-gray-200">
          <PageHeader
            title={itemType === "project" ? "Project Details" : `${itemType} Details`}
            subtitle={itemType === "project" ? item.name : item.id}
            navigationHistory={navigationHistory}
            onNavigate={onNavigate}
            onResetNavigation={onResetNavigation}
            showBackButton={false}
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            }
          />
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side: Working Space */}
        {renderWorkingSpace()}

        {/* Right Side: Project Details Section */}
        {renderProjectDetailsSection()}
      </div>
    </div>
  );
}
