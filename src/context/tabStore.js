import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const MAX_TABS = 7;

export const useTabStore = create(
  persist(
    (set, get) => ({
      tabs: [
        { id: 'discover', title: 'Discover Neary', type: 'discover', pinned: true, data: {} }
      ],
      activeTabId: 'discover',
      closedTabsStack: [],

      addTab: (tab) => {
        if (!tab || !tab.type) return;
        
        // Ensure ID exists
        if (!tab.id) {
          tab.id = `${tab.type}-${Date.now()}`;
        }
        
        const { tabs } = get();
        // Check if tab already exists
        const existingTab = tabs.find(t => t.id === tab.id);
        if (existingTab) {
          set({ activeTabId: tab.id });
          return;
        }

        // Limit tabs
        let newTabs = [...tabs];
        if (newTabs.length >= MAX_TABS) {
          // Remove first unpinned tab
          const firstUnpinnedIndex = newTabs.findIndex(t => !t.pinned);
          if (firstUnpinnedIndex !== -1) {
            newTabs.splice(firstUnpinnedIndex, 1);
          } else {
            // If all pinned, remove oldest unpinned if possible (shouldn't happen with logic, but for safety)
            newTabs.shift();
          }
        }

        set({
          tabs: [...newTabs, tab],
          activeTabId: tab.id
        });
      },

      removeTab: (tabId) => {
        const { tabs, activeTabId, closedTabsStack } = get();
        const tabToRemove = tabs.find(t => t.id === tabId);
        if (tabToRemove?.pinned) return; // Cannot close pinned tabs

        const newTabs = tabs.filter(t => t.id !== tabId);
        let nextActiveId = activeTabId;

        if (activeTabId === tabId) {
          nextActiveId = newTabs[newTabs.length - 1]?.id || 'discover';
        }

        set({
          tabs: newTabs,
          activeTabId: nextActiveId,
          closedTabsStack: [tabToRemove, ...closedTabsStack].slice(0, 10) // Keep last 10 closed
        });
      },

      setActiveTab: (tabId) => set({ activeTabId: tabId }),

      reorderTabs: (startIndex, endIndex) => {
        set((state) => {
          const newTabs = Array.from(state.tabs);
          const [removed] = newTabs.splice(startIndex, 1);
          newTabs.splice(endIndex, 0, removed);
          return { tabs: newTabs };
        });
      },

      reopenLastTab: () => {
        const { closedTabsStack, addTab } = get();
        if (closedTabsStack.length === 0) return;
        const [lastTab, ...remaining] = closedTabsStack;
        addTab(lastTab);
        set({ closedTabsStack: remaining });
      },

      pinTab: (tabId) => {
        set((state) => ({
          tabs: state.tabs.map(t => t.id === tabId ? { ...t, pinned: true } : t)
        }));
      },

      unpinTab: (tabId) => {
        set((state) => ({
          tabs: state.tabs.map(t => t.id === tabId ? { ...t, pinned: false } : t)
        }));
      },

      updateTab: (tabId, updates) => {
        set((state) => ({
          tabs: state.tabs.map(t => t.id === tabId ? { ...t, ...updates } : t)
        }));
      }
    }),
    {
      name: 'ekalgo-tabs-storage',
      storage: createJSONStorage(() => localStorage),
      // Prevent hydration from blocking the UI
      skipHydration: true,
    }
  )
);
