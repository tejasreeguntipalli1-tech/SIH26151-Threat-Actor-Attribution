import { DigitalIdentity } from '../../types/investigation';
import { syntheticIdentities } from '../../data/syntheticData';

export const identityService = {
  async getIdentitiesByCase(_caseId: string): Promise<DigitalIdentity[]> {
    await new Promise((r) => setTimeout(r, 100));
    return syntheticIdentities;
  },

  async getIdentityById(identityId: string): Promise<DigitalIdentity | null> {
    await new Promise((r) => setTimeout(r, 80));
    return syntheticIdentities.find((id) => id.id === identityId || id.username === identityId) || null;
  }
};
