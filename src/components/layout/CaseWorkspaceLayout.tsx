import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppNavbar } from './AppNavbar';
import { useCase } from '../../context/CaseContext';
import { Stage2ConfirmModal } from '../modals/Stage2ConfirmModal';
import { ActorCluster } from '../../types/investigation';

export const CaseWorkspaceLayout: React.FC = () => {
  const { clusters, confirmStage2, activeCase, selectCase } = useCase();
  const { caseId } = useParams<{ caseId?: string }>();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [modalCluster, setModalCluster] = useState<ActorCluster | null>(null);

  useEffect(() => {
    if (caseId && caseId !== activeCase.id) {
      selectCase(caseId);
    }
  }, [caseId, activeCase.id, selectCase]);

  const handleOpenStage2Modal = (cluster: ActorCluster) => {
    setModalCluster(cluster);
  };

  const handleConfirmStage2 = (clusterId: string, reason?: string) => {
    confirmStage2(
      clusterId, 
      reason || 'Investigator approved Stage 2 entity resolution transition.', 
      'Senior Investigator INV-017'
    );
    setModalCluster(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#0A0D12] text-slate-100 font-sans selection:bg-orange-500/20 selection:text-orange-300">
      {/* 1. FIXED PERMANENT SIDEBAR: Full viewport height, never participates in page scrolling */}
      <div className="hidden lg:flex w-64 h-screen flex-shrink-0 flex-col bg-[#0D0F12] border-r border-[#1E232B] z-30">
        <AppSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full bg-[#0D0F12]">
            <AppSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* 2. MAIN APPLICATION AREA */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        {/* COMPACT TOP BAR: Fixed/sticky header inside main area */}
        <AppNavbar 
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          isSidebarOpen={isMobileSidebarOpen}
        />

        {/* 3. SCROLLABLE CONTENT REGION: Dedicated scroll container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet context={{ onOpenStage2Modal: handleOpenStage2Modal }} />
          </div>
        </main>
      </div>

      {/* Critical Decision Gate Modal */}
      <Stage2ConfirmModal
        cluster={modalCluster}
        isOpen={!!modalCluster}
        onClose={() => setModalCluster(null)}
        onConfirm={handleConfirmStage2}
      />
    </div>
  );
};

export default CaseWorkspaceLayout;
