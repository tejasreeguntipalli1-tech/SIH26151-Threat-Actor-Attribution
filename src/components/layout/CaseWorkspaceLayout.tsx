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

  const handleConfirmStage2 = (clusterId: string) => {
    confirmStage2(clusterId, 'Investigator approved Stage 2 entity resolution transition.', 'Senior Investigator INV-017');
    setModalCluster(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-300">
      {/* Top Navbar with Global Case Context & Investigator Profile */}
      <AppNavbar 
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        isSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Container: Sidebar + Active Route Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Mobile / Tablet Drawer Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative z-50">
              <AppSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Primary Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
          <Outlet context={{ onOpenStage2Modal: handleOpenStage2Modal }} />
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
