import { ActorCluster } from '../../types/investigation';
import { initialActorClusters } from '../../data/syntheticData';
import { CorrelationAnalysisRequest } from './types';

export const correlationService = {
  async getCorrelationByCase(_caseId: string): Promise<{ clusters: ActorCluster[]; primaryCluster: ActorCluster }> {
    await new Promise((r) => setTimeout(r, 120));
    return {
      clusters: initialActorClusters,
      primaryCluster: initialActorClusters[0]
    };
  },

  async analyzeCorrelation(
    _caseId: string, 
    options?: CorrelationAnalysisRequest
  ): Promise<ActorCluster> {
    await new Promise((r) => setTimeout(r, 300));
    // Dynamic recalculation simulation
    const baseCluster = initialActorClusters[0];
    if (options?.weights) {
      // Re-weight slightly to reflect custom analytical weight updates
      return {
        ...baseCluster,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      };
    }
    return baseCluster;
  }
};
