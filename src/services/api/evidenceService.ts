import { DigitalIndicatorItem } from '../../types/investigation';
import { initialDigitalIndicators } from '../../data/syntheticData';

export const evidenceService = {
  async getEvidenceByCase(_caseId: string): Promise<DigitalIndicatorItem[]> {
    await new Promise((r) => setTimeout(r, 100));
    return initialDigitalIndicators;
  },

  async filterEvidenceByCategory(
    _caseId: string, 
    category: 'Identity' | 'Behavioural' | 'Technical' | 'Financial' | 'Infrastructure'
  ): Promise<DigitalIndicatorItem[]> {
    await new Promise((r) => setTimeout(r, 80));
    return initialDigitalIndicators.filter((item) => item.type === category);
  }
};
