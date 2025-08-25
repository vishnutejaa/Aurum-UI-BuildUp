import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Search, Filter, Download, Upload, ChevronRight } from 'lucide-react';
import { MaterialsTable } from './master-data/MaterialsTable';
import { CustomersTable } from './master-data/CustomersTable';
import { SuppliersTable } from './master-data/SuppliersTable';
import { UsersTable } from './master-data/UsersTable';
import { GenericMasterTable } from './master-data/GenericMasterTable';

interface MasterDataViewProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onItemSelect?: (item: any, itemType: string) => void;
}

const masterDataConfig = {
  materials: { title: 'Materials', description: 'Manage your material catalog and specifications', group: 'Materials Management' },
  'material-units': { title: 'Material Units', description: 'Define units of measurement for materials', group: 'Materials Management' },
  'material-categories': { title: 'Material Categories', description: 'Organize materials into categories', group: 'Materials Management' },
  'material-weight-measures': { title: 'Material Weight Measures', description: 'Configure weight measurement standards', group: 'Materials Management' },
  'material-lockin-price': { title: 'Material Lockin Price', description: 'Configure price locking mechanisms', group: 'Materials Management' },
  
  customers: { title: 'Customers', description: 'Manage customer information and contacts', group: 'Stakeholders' },
  suppliers: { title: 'Suppliers', description: 'Maintain supplier database and relationships', group: 'Stakeholders' },
  users: { title: 'Users', description: 'User management and access control', group: 'Stakeholders' },
  manufacturers: { title: 'Manufacturers', description: 'Maintain manufacturer information', group: 'Stakeholders' },
  competitors: { title: 'Competitors', description: 'Track competitor information', group: 'Stakeholders' },
  
  offices: { title: 'Offices', description: 'Manage office locations and details', group: 'Locations & Logistics' },
  'office-stores': { title: 'Office Stores', description: 'Configure storage locations within offices', group: 'Locations & Logistics' },
  countries: { title: 'Countries', description: 'Manage country and region data', group: 'Locations & Logistics' },
  'transport-modes': { title: 'Transport Modes', description: 'Define transportation options', group: 'Locations & Logistics' },
  carriers: { title: 'Carriers', description: 'Manage shipping and logistics carriers', group: 'Locations & Logistics' },
  
  'bid-types': { title: 'Bid Types', description: 'Configure different types of bidding processes', group: 'Bidding & Procurement' },
  'win-statuses': { title: 'Win Statuses', description: 'Define possible win/loss statuses for bids', group: 'Bidding & Procurement' },
  'response-formats': { title: 'Response Formats', description: 'Define standard response formats', group: 'Bidding & Procurement' },
  'submission-modes': { title: 'Submission Modes', description: 'Configure submission methods', group: 'Bidding & Procurement' },
  'tender-types': { title: 'Tender Types', description: 'Configure tender classifications', group: 'Bidding & Procurement' },
  'trade-categories': { title: 'Trade Categories', description: 'Organize trades by category', group: 'Bidding & Procurement' },
  
  organization: { title: 'Organization', description: 'Configure organizational structure', group: 'System Configuration' },
  currencies: { title: 'Currencies', description: 'Configure supported currencies', group: 'System Configuration' },
  'extra-cost-types': { title: 'Extra Cost Types', description: 'Define additional cost categories', group: 'System Configuration' },
  configurations: { title: 'Configurations', description: 'System configuration settings', group: 'System Configuration' },
  'email-formats': { title: 'Email Formats', description: 'Configure email templates and formats', group: 'System Configuration' },
  'page-permissions': { title: 'Page Permissions', description: 'Manage user access permissions', group: 'System Configuration' },
};

export function MasterDataView({ activeSection, onSectionChange, onItemSelect }: MasterDataViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const currentConfig = masterDataConfig[activeSection as keyof typeof masterDataConfig];

  const renderTable = () => {
    const commonProps = {
      searchTerm,
      onItemSelect: onItemSelect || (() => {})
    };

    switch (activeSection) {
      case 'materials':
        return <MaterialsTable {...commonProps} />;
      case 'customers':
        return <CustomersTable {...commonProps} />;
      case 'suppliers':
        return <SuppliersTable {...commonProps} />;
      case 'users':
        return <UsersTable {...commonProps} />;
      default:
        return <GenericMasterTable section={activeSection} {...commonProps} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Masters</span>
        <ChevronRight className="h-4 w-4" />
        <span>{currentConfig?.group || 'Master Data'}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{currentConfig?.title || 'Data'}</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentConfig?.title || 'Master Data'}
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  {currentConfig?.group || 'General'}
                </span>
              </CardTitle>
              <CardDescription className="mt-2">
                {currentConfig?.description || 'Manage master data entries'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {renderTable()}
        </CardContent>
      </Card>
    </div>
  );
}