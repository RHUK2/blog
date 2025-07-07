'use client';

import { ITabListState } from '@/data/dynamic/chat.types';
import { Plus, X } from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { createContext, useContext, useState } from 'react';
import { ChatForm } from './ChatForm';

const setTabListStateContext = createContext<React.Dispatch<React.SetStateAction<ITabListState>>>(() => {});

export function TabsForm() {
  const [tabListState, setTabListState] = useState<ITabListState>({
    currentId: '0',
    tabList: [{ id: '0', title: 'New Tab' }],
  });

  function moveTab(tabId: string) {
    setTabListState((prev) => ({
      ...prev,
      currentId: tabId,
    }));
  }

  function DeleteTab(tabId: string) {
    setTabListState((prev) => {
      if (prev.tabList.length <= 1) return prev;

      if (prev.currentId === tabId) {
        return {
          currentId: prev.tabList[prev.tabList.length - 2].id,
          tabList: prev.tabList.filter((prevTab) => prevTab.id !== tabId),
        };
      } else {
        return {
          ...prev,
          tabList: prev.tabList.filter((prevTab) => prevTab.id !== tabId),
        };
      }
    });
  }

  function AddTab() {
    setTabListState((prev) => {
      const newId = String(Date.now());

      return {
        currentId: newId,
        tabList: [...prev.tabList, { id: newId, title: 'New Tab' }],
      };
    });
  }

  return (
    <MotionConfig
      transition={{
        duration: 0.1,
      }}
    >
      <div className='flex h-full flex-col gap-3'>
        <ul
          role='tablist'
          className='hide-scrollbar flex h-18 items-end gap-1 overflow-x-auto border-b border-gray-400 px-0.5 dark:border-gray-700'
        >
          {tabListState.tabList.map((tab) => (
            <motion.li
              key={tab.id}
              role='tab'
              tabIndex={0}
              initial={false}
              animate={{
                paddingTop: tab.id === tabListState.currentId ? '10px' : '8px',
                paddingBottom: tab.id === tabListState.currentId ? '10px' : '8px',
              }}
              whileHover={{
                paddingTop: '12px',
                paddingBottom: '12px',
              }}
              whileFocus={{
                paddingTop: '12px',
                paddingBottom: '12px',
              }}
              className={
                'flex cursor-pointer items-center justify-between gap-2 rounded-t-md border border-b-0 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-3 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'
              }
              onClick={() => {
                moveTab(tab.id);
              }}
            >
              <span className='w-28 overflow-hidden text-ellipsis whitespace-nowrap'>{tab.title}</span>
              {tab.id !== '0' && (
                <motion.button
                  aria-label='delete-tab'
                  className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-[50%] hover:bg-black/20 hover:dark:bg-white/20'
                  onClick={(event) => {
                    event.stopPropagation();

                    DeleteTab(tab.id);
                  }}
                >
                  <X size={16} />
                </motion.button>
              )}
            </motion.li>
          ))}

          <motion.li className='rounded-none rounded-t-md border border-b-0 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
            <motion.button
              aria-label='add-tab'
              className='cursor-pointer rounded-none rounded-t-md px-4 pt-2.5 pb-2 text-2xl leading-none hover:bg-black/20 hover:dark:bg-white/20'
              onClick={AddTab}
            >
              <Plus size={16} />
            </motion.button>
          </motion.li>
        </ul>

        <setTabListStateContext.Provider value={setTabListState}>
          {tabListState.tabList.map((tab) => (
            <ChatForm
              key={tab.id}
              id={tab.id}
              className={`flex-[1_0_0px] ${tab.id === tabListState.currentId ? 'flex' : 'hidden'}`}
            />
          ))}
        </setTabListStateContext.Provider>
      </div>
    </MotionConfig>
  );
}

export function useSetTabListStateContext() {
  return useContext(setTabListStateContext);
}
