import React, { useState } from 'react';
// old: import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from './ui/sidebar';
// new: added SidebarHeader to place a logo at the top of the sidebar
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
  SidebarHeader,
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
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

// old: (no logo import)
// new: import the Aurum Impex logo to display in the sidebar header
// old: import aurumLogo from '../../assets/aurum-impex-web-logo-gold-white.png';
// new: use URL-based asset reference for TypeScript compatibility without additional type declarations
const aurumLogo = new URL('../../assets/aurum-impex-web-logo-gold-blacktext-v2.png', import.meta.url).href;


interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  currentMasterData: string;
  onMasterDataChange: (section: string) => void;
  onNavigate?: () => void;
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
  { id: 'projects', label: 'All Projects', icon: FolderOpen },
  // { id: 'rfq', label: 'Project RFQs', icon: HelpCircle },
  // { id: 'quotes', label: 'Project Quotes', icon: MessageSquare },
  // { id: 'po', label: 'Project POs', icon: DollarSign },
];

export function AppSidebar({ currentView, onViewChange, currentMasterData, onMasterDataChange, onNavigate }: AppSidebarProps) {

  const handleNavigation = (view: string, masterData?: string) => {
    // Only close panels if we're navigating to a different view
    if (view !== 'projects' || masterData) {
      onNavigate?.(); // Close any open panels
    }
    onViewChange(view);
    if (masterData) {
      onMasterDataChange(masterData);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* old: no header/logo at the top */}
        {/* new: sidebar header with company logo */}
        <SidebarHeader className="px-3 pt-3 pb-1">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded p-1">
              <img src={aurumLogo} alt="AURUM IMPEX" className="h-16 w-auto" />
            </div>
          </div>
        </SidebarHeader>

        
        {/* old: Dashboard was inside RFQ MANAGEMENT */}
        {/* new: Dashboard as separate section */}
        <SidebarGroup>
          <SidebarGroupLabel>DASHBOARD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('dashboard')}
                  isActive={currentView === 'dashboard'}
                  className="pl-0"
                >
                  <Database className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* old: RFQ MANAGEMENT section */}
        {/* new: RFQ MANAGEMENT section - reorganized */}
        <SidebarGroup>
          <SidebarGroupLabel>RFQ MANAGEMENT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {/* old: Projects Section - standalone collapsible */}
              {/* new: Projects Section - remains as is */}
              <Collapsible defaultOpen={currentView === 'projects' || currentView.startsWith('project-')}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      onClick={() => handleNavigation('projects')}
                      isActive={currentView === 'projects' || currentView.startsWith('project-')}
                      className="pl-0"
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
                          onClick={() => handleNavigation('projects')}
                          isActive={currentView === 'projects'}
                        >
                          <FolderOpen className="h-3 w-3" />
                          <span>All Projects</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {projectSubItems.slice(1).map((item) => (
                        <SidebarMenuSubItem key={item.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleNavigation(item.id)}
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

              {/* old: Procurement Operations - collapsible group */}
              {/* new: Standalone Operations - flat list */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('rfq')}
                  isActive={currentView === 'rfq'}
                  className="pl-0"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>RFQs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('quotes')}
                  isActive={currentView === 'quotes'}
                  className="pl-0"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Quotes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('po')}
                  isActive={currentView === 'po'}
                  className="pl-0"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Purchase Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('goods')}
                  isActive={currentView === 'goods'}
                  className="pl-0"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Goods</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('payments')}
                  isActive={currentView === 'payments'}
                  className="pl-0"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation('reports')}
                  isActive={currentView === 'reports'}
                  className="pl-0"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Reports & Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* old: Master Data Section - inline label */}
        {/* new: Master Data Section - proper group structure */}
        <SidebarGroup>
          <SidebarGroupLabel>MASTER DATA</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Master Data Categories - all groups are collapsible */}
              {masterDataGroups.map((group) => {
                return (
                  <Collapsible key={group.id} defaultOpen={currentView === 'masters' && (currentMasterData === group.id || currentMasterData.startsWith(group.id))}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          onClick={() => handleNavigation('masters', group.id)}
                          isActive={currentView === 'masters' && currentMasterData === group.id}
                          className="pl-6"
                        >
                          <group.icon className="h-4 w-4" />
                          <span>{group.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.items.map((item) => (
                            <SidebarMenuSubItem key={item.id}>
                              <SidebarMenuSubButton
                                onClick={() => handleNavigation('masters', item.id)}
                                isActive={currentView === 'masters' && currentMasterData === item.id}
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
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}