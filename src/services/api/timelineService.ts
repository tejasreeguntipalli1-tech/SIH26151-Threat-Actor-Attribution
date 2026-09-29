import { TimelineEvent } from '../../types/investigation';
import { syntheticTimelineEvents } from '../../data/syntheticData';

export const timelineService = {
  async getTimelineByCase(_caseId: string): Promise<TimelineEvent[]> {
    await new Promise((r) => setTimeout(r, 100));
    return syntheticTimelineEvents;
  },

  async appendTimelineEvent(_caseId: string, event: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
    await new Promise((r) => setTimeout(r, 120));
    const newEvent: TimelineEvent = {
      ...event,
      id: `EVT-${Date.now()}`
    };
    return newEvent;
  }
};
