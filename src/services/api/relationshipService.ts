import { PairwiseRelationship } from '../../types/investigation';
import { initialPairwiseRelationships } from '../../data/syntheticData';

export const relationshipService = {
  async getRelationshipsByCase(_caseId: string): Promise<PairwiseRelationship[]> {
    await new Promise((r) => setTimeout(r, 100));
    return initialPairwiseRelationships;
  },

  async getRelationshipById(relId: string): Promise<PairwiseRelationship | null> {
    await new Promise((r) => setTimeout(r, 80));
    return initialPairwiseRelationships.find((r) => r.id === relId) || null;
  }
};
