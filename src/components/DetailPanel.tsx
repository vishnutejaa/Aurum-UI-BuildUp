import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
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
  Users,
  Calendar,
  DollarSign,
  FileText,
  Package,
  Clock,
  Building,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  User,
  Plus,
  Trash2,
  Package2,
} from "lucide-react";

interface DetailPanelProps {
  item: any;
  itemType: string;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
}

type SubSectionType =
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
}: DetailPanelProps) {
  const [editedItem, setEditedItem] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubSection, setSelectedSubSection] =
    useState<SubSectionType>("rfq-in");
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
      status: "Required",
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
      status: "Ordered",
      leadTime: "6 weeks",
      notes: "Specialized components",
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
      status: "Quoted",
      leadTime: "8 weeks",
      notes: "Heavy duty application",
    },
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
    // Set default sub-section based on item type
    if (itemType === "rfq" || itemType === "project")
      setSelectedSubSection("rfq-in");
    else if (itemType === "quote")
      setSelectedSubSection("quote-in");
    else if (itemType === "po") setSelectedSubSection("po-in");
    else setSelectedSubSection("materials");
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
    {
      id: "materials",
      label: "MATERIALS",
      active: selectedSubSection === "materials",
    },
  ];

  const renderWorkingSpace = () => {
    if (!isOperationalItem || !item) {
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>
              Select an operational item to view working space
            </p>
            <p className="text-sm">Item Type: {itemType}</p>
            <p className="text-sm">
              Item: {item ? "Selected" : "None"}
            </p>
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
              {selectedSubSection.includes("rfq") &&
                renderRFQWorkspace()}
              {selectedSubSection.includes("quote") &&
                renderQuoteWorkspace()}
              {selectedSubSection.includes("po") &&
                renderPOWorkspace()}
              {selectedSubSection === "materials" &&
                renderMaterialsWorkspace()}
            </div>
          </div>
        </ScrollArea>
      </div>
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

  const renderMaterialsWorkspace = () => (
    <div className="space-y-6">
      {/* Materials Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-base">
                Project Materials
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

  const renderRFQWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">
              RFQ Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rfqNumber">RFQ Number</Label>
              <Input
                id="rfqNumber"
                value={
                  editedItem?.id || editedItem?.rfqNumber || ""
                }
                onChange={(e) =>
                  updateField("rfqNumber", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={editedItem?.status || ""}
                onChange={(e) =>
                  updateField("status", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={
                editedItem?.title || editedItem?.name || ""
              }
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedItem?.description || ""}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              disabled={!isEditing}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={
                editedItem?.dueDate ||
                editedItem?.deadline ||
                ""
              }
              onChange={(e) =>
                updateField("dueDate", e.target.value)
              }
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQuoteWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base">
              Quote Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quoteNumber">Quote Number</Label>
              <Input
                id="quoteNumber"
                value={
                  editedItem?.id ||
                  editedItem?.quoteNumber ||
                  ""
                }
                onChange={(e) =>
                  updateField("quoteNumber", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={editedItem?.supplier || ""}
                onChange={(e) =>
                  updateField("supplier", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                value={
                  editedItem?.amount ||
                  editedItem?.totalAmount ||
                  ""
                }
                onChange={(e) =>
                  updateField("totalAmount", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={
                  editedItem?.validUntil ||
                  editedItem?.deadline ||
                  ""
                }
                onChange={(e) =>
                  updateField("validUntil", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPOWorkspace = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-base">
              Purchase Order Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="poNumber">PO Number</Label>
              <Input
                id="poNumber"
                value={
                  editedItem?.id || editedItem?.poNumber || ""
                }
                onChange={(e) =>
                  updateField("poNumber", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={editedItem?.supplier || ""}
                onChange={(e) =>
                  updateField("supplier", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={editedItem?.amount || ""}
                onChange={(e) =>
                  updateField("amount", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate">
                Delivery Date
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                value={editedItem?.deliveryDate || ""}
                onChange={(e) =>
                  updateField("deliveryDate", e.target.value)
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="h-full flex bg-white">
      {/* Left Side: Working Space */}
      {renderWorkingSpace()}

      {/* Right Side: Project Details Section */}
      {renderProjectDetailsSection()}
    </div>
  );
}