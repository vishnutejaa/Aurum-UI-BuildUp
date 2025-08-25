import React, { useState } from 'react';
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

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentMasterData, setCurrentMasterData] = useState('materials');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

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

  const renderMainContent = () => {
    const commonProps = {
      onItemSelect: handleItemSelect
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
      default:
        return <DashboardView />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Left Sidebar - Keep original width */}
        <div className="w-64 transition-all duration-300 flex-shrink-0">
          <AppSidebar 
            currentView={currentView} 
            onViewChange={setCurrentView}
            currentMasterData={currentMasterData}
            onMasterDataChange={setCurrentMasterData}
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
            
            {/* DetailPanel - Overlay completely over middle pane */}
            {isDetailPanelOpen && (
              <div className="absolute inset-0 z-50 bg-white shadow-xl">
                <DetailPanel
                  item={selectedItem}
                  itemType={selectedItemType}
                  onClose={handleDetailPanelClose}
                  onSave={(updatedItem) => {
                    console.log('Saving item:', updatedItem);
                    setSelectedItem(updatedItem);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}