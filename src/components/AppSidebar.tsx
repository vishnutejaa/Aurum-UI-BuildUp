import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';
import { 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  DollarSign, 
  ShoppingCart, 
  CreditCard,
  Package,
  Users,
  Building,
  MapPin,
  Truck,
  FileText,
  Globe,
  Mail,
  Shield,
  Layers,
  Database,
  BarChart3,
  Factory,
  Target,
  ChevronRight,
  FolderOpen,
  Briefcase
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';


interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentMasterData: string;
  onMasterDataChange: (section: string) => void;
}

const masterDataGroups = [
  {
    id: 'materials',
    label: 'Materials Management',
    icon: Package,
    items: [
      { id: 'materials', label: 'Materials', icon: Package },
      { id: 'material-units', label: 'Material Units', icon: BarChart3 },
      { id: 'material-categories', label: 'Material Categories', icon: Layers },
      { id: 'material-weight-measures', label: 'Material Weight Measures', icon: BarChart3 },
      { id: 'material-lockin-price', label: 'Material Lockin Price', icon: DollarSign },
    ]
  },
  {
    id: 'stakeholders',
    label: 'Stakeholders',
    icon: Users,
    items: [
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'suppliers', label: 'Suppliers', icon: Building },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'manufacturers', label: 'Manufacturers', icon: Factory },
      { id: 'competitors', label: 'Competitors', icon: Target },
    ]
  },
  {
    id: 'locations',
    label: 'Locations & Logistics',
    icon: MapPin,
    items: [
      { id: 'offices', label: 'Offices', icon: Building },
      { id: 'office-stores', label: 'Office Stores', icon: MapPin },
      { id: 'countries', label: 'Countries', icon: Globe },
      { id: 'transport-modes', label: 'Transport Modes', icon: Truck },
      { id: 'carriers', label: 'Carriers', icon: Truck },
    ]
  },
  {
    id: 'bidding',
    label: 'Bidding & Procurement',
    icon: FileText,
    items: [
      { id: 'bid-types', label: 'Bid Types', icon: FileText },
      { id: 'win-statuses', label: 'Win Statuses', icon: BarChart3 },
      { id: 'response-formats', label: 'Response Formats', icon: FileText },
      { id: 'submission-modes', label: 'Submission Modes', icon: FileText },
      { id: 'tender-types', label: 'Tender Types', icon: FileText },
      { id: 'trade-categories', label: 'Trade Categories', icon: Layers },
    ]
  },
  {
    id: 'system',
    label: 'System Configuration',
    icon: Settings,
    items: [
      { id: 'organization', label: 'Organization', icon: Building },
      { id: 'currencies', label: 'Currencies', icon: DollarSign },
      { id: 'extra-cost-types', label: 'Extra Cost Types', icon: DollarSign },
      { id: 'configurations', label: 'Configurations', icon: Settings },
      { id: 'email-formats', label: 'Email Formats', icon: Mail },
      { id: 'page-permissions', label: 'Page Permissions', icon: Shield },
    ]
  }
];

const projectSubItems = [
  { id: 'project-rfqs', label: 'Project RFQs', icon: HelpCircle },
  { id: 'project-quotes', label: 'Project Quotes', icon: MessageSquare },
  { id: 'project-pos', label: 'Project POs', icon: DollarSign },
];

export function AppSidebar({ currentView, onViewChange, currentMasterData, onMasterDataChange }: AppSidebarProps) {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>RFQ MANAGEMENT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('dashboard')}
                  isActive={currentView === 'dashboard'}
                >
                  <Database className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Projects Section */}
              <Collapsible defaultOpen={currentView === 'projects' || currentView.startsWith('project-')}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      onClick={() => onViewChange('projects')}
                      isActive={currentView === 'projects' || currentView.startsWith('project-')}
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>Projects</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={() => onViewChange('projects')}
                          isActive={currentView === 'projects'}
                        >
                          <FolderOpen className="h-3 w-3" />
                          <span>All Projects</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {projectSubItems.map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => onViewChange(item.id)}
                            isActive={currentView === item.id}
                          >
                            <item.icon className="h-3 w-3" />
                            <span>{item.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Standalone Operations */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('rfq')}
                  isActive={currentView === 'rfq'}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>RFQs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('quotes')}
                  isActive={currentView === 'quotes'}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Quotes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('po')}
                  isActive={currentView === 'po'}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Purchase Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('goods')}
                  isActive={currentView === 'goods'}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Goods</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('payments')}
                  isActive={currentView === 'payments'}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Master Data Section */}
              <SidebarMenuItem>
                {/* Fixed Master Data Label */}
                <div className="px-3 py-2 border-t border-sidebar-border mt-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Master Data</span>
                </div>
              </SidebarMenuItem>

              {/* Master Data Categories */}
              {masterDataGroups.map((group) => 
                group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => {
                        onViewChange('masters');
                        onMasterDataChange(item.id);
                      }}
                      isActive={currentView === 'masters' && currentMasterData === item.id}
                      className="pl-6"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}