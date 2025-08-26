import React, { useState, useEffect } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Header } from './components/Header';
import { MasterDataView } from './components/MasterDataView';
import { DashboardView } from './components/DashboardView';
import { ProjectsListView } from './components/ProjectsListView';
import { RFQListView } from './components/RFQListView';
import { QuotesListView } from './components/QuotesListView';
import { POListView } from './components/POListView';
import { GoodsListView } from './components/GoodsListView';
import { PaymentsListView } from './components/PaymentsListView';
import { DetailPanel } from './components/DetailPanel';
import { ReportsView } from './components/reports/ReportsView';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentMasterData, setCurrentMasterData] = useState('materials');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<Array<{view: string, masterData?: string, label: string}>>([
    { view: 'dashboard', label: 'Dashboard' }
  ]);

  // Clean up navigation history if it gets corrupted
  useEffect(() => {
    if (navigationHistory.length > 20) {
      // If history gets too long, trim it
      setNavigationHistory(prev => prev.slice(-10));
    }
    
    // Check for duplicate consecutive entries
    const hasDuplicates = navigationHistory.some((item, index) => {
      if (index === 0) return false;
      const prev = navigationHistory[index - 1];
      return prev.view === item.view && prev.masterData === item.masterData;
    });
    
    if (hasDuplicates) {
      // Remove duplicates
      const cleaned = navigationHistory.filter((item, index) => {
        if (index === 0) return true;
        const prev = navigationHistory[index - 1];
        return !(prev.view === item.view && prev.masterData === item.masterData);
      });
      setNavigationHistory(cleaned);
    }
  }, [navigationHistory]);

  const handleItemSelect = (item: any, itemType: string) => {
    setSelectedItem(item);
    setSelectedItemType(itemType);
    setIsDetailPanelOpen(true);
  };

  const handleDetailPanelClose = () => {
    setIsDetailPanelOpen(false);
    setSelectedItem(null);
    setSelectedItemType('');
  };

  const getViewLabel = (view: string, masterData?: string) => {
    const viewLabels: Record<string, string> = {
      dashboard: 'Dashboard',
      masters: masterData ? `Masters - ${masterData}` : 'Masters',
      projects: 'Projects',
      rfq: 'RFQs',
      quotes: 'Quotes', 
      po: 'Purchase Orders',
      goods: 'Goods',
      payments: 'Payments',
      reports: 'Reports & Analytics'
    };
    return viewLabels[view] || view;
  };

  const handleViewChangeWithHistory = (view: string, masterData?: string) => {
    // Don't add to navigation history for sub-navigation items
    // Only add for main section changes
    const isMainNavigation = !view.includes('-') && view !== 'masters';
    
    if (isMainNavigation) {
      const newEntry = {
        view,
        masterData,
        label: getViewLabel(view, masterData)
      };
      
      // Check if this is the same as current page - don't add if so
      const lastEntry = navigationHistory[navigationHistory.length - 1];
      const isSamePage = lastEntry?.view === view && lastEntry?.masterData === masterData;
      
      if (!isSamePage) {
        // Limit navigation history to prevent infinite accumulation
        setNavigationHistory(prev => {
          const newHistory = [...prev, newEntry];
          // Keep only last 10 entries to prevent memory issues
          return newHistory.slice(-10);
        });
      }
    }
    
    setCurrentView(view);
    if (masterData) {
      setCurrentMasterData(masterData);
    }
  };

  const handleBackNavigation = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setCurrentView(previousPage.view);
      if (previousPage.masterData) {
        setCurrentMasterData(previousPage.masterData);
      }
    }
  };

  const handleBreadcrumbNavigation = (targetItem: {view: string, masterData?: string, label: string}) => {
    // Find the target item in history
    const targetIndex = navigationHistory.findIndex(item => 
      item.view === targetItem.view && item.masterData === targetItem.masterData
    );
    
    if (targetIndex !== -1) {
      // Trim history to the target item
      const newHistory = navigationHistory.slice(0, targetIndex + 1);
      setNavigationHistory(newHistory);
      setCurrentView(targetItem.view);
      if (targetItem.masterData) {
        setCurrentMasterData(targetItem.masterData);
      }
    } else {
      // If item not found in history, add it and navigate
      const newEntry = {
        view: targetItem.view,
        masterData: targetItem.masterData,
        label: getViewLabel(targetItem.view, targetItem.masterData)
      };
      setNavigationHistory([newEntry]);
      setCurrentView(targetItem.view);
      if (targetItem.masterData) {
        setCurrentMasterData(targetItem.masterData);
      }
    }
  };

  // Function to clear corrupted navigation history
  const clearNavigationHistory = () => {
    setNavigationHistory([{ view: 'dashboard', label: 'Dashboard' }]);
    setCurrentView('dashboard');
  };

  const renderMainContent = () => {
    const commonProps = {
      onItemSelect: handleItemSelect,
      navigationHistory,
      onBack: handleBackNavigation,
      onNavigate: handleBreadcrumbNavigation,
      onResetNavigation: clearNavigationHistory
    };

    switch (currentView) {
      case 'masters':
        return <MasterDataView activeSection={currentMasterData} onSectionChange={setCurrentMasterData} {...commonProps} />;
      case 'projects':
        return <ProjectsListView {...commonProps} />;
      case 'rfq':
        return <RFQListView {...commonProps} />;
      case 'quotes':
        return <QuotesListView {...commonProps} />;
      case 'po':
        return <POListView {...commonProps} />;
      case 'goods':
        return <GoodsListView {...commonProps} />;
      case 'payments':
        return <PaymentsListView {...commonProps} />;
      case 'reports':
        return <ReportsView {...commonProps} />;
      default:
        return <DashboardView {...commonProps} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Left Sidebar - Always accessible */}
        <div className="w-64 transition-all duration-300 flex-shrink-0 z-40 relative">
          <AppSidebar 
            currentView={currentView} 
            onViewChange={handleViewChangeWithHistory}
            currentMasterData={currentMasterData}
            onMasterDataChange={setCurrentMasterData}
            onNavigate={() => {
              // Close detail panel when navigating
              if (isDetailPanelOpen) {
                handleDetailPanelClose();
              }
            }}
          />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 relative overflow-hidden">
            {/* Middle pane - Always full size */}
            <main className="h-full w-full overflow-auto bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="h-full">
                {renderMainContent()}
              </div>
            </main>
            
            {/* DetailPanel - Overlay only over main content, not sidebar */}
            {isDetailPanelOpen && (
              <div className="absolute inset-0 z-30 bg-white shadow-xl">
                <DetailPanel
                  item={selectedItem}
                  itemType={selectedItemType}
                  onClose={handleDetailPanelClose}
                  onSave={(updatedItem) => {
                    console.log('Saving item:', updatedItem);
                    setSelectedItem(updatedItem);
                  }}
                  onBack={handleDetailPanelClose}
                  navigationHistory={navigationHistory}
                  onNavigate={handleBreadcrumbNavigation}
                  onResetNavigation={clearNavigationHistory}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}