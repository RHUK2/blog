'use client';

import { motion, MotionConfig } from 'motion/react';
import { createContext, useContext, useState } from 'react';
import { ChatForm } from './ChatForm';

interface Tab {
  id: string;
  title: string;
}

interface State {
  currId: string;
  tabs: Tab[];
}

const tabsSetStateContext = createContext<React.Dispatch<React.SetStateAction<State>>>(() => {});

export function TabsForm() {
  const [state, setState] = useState<State>(() => {
    const id = String(Date.now());

    return {
      currId: id,
      tabs: [{ id: id, title: 'New Tab' }],
    };
  });

  function moveTab(tabId: string) {
    setState((prev) => ({
      ...prev,
      currId: tabId,
    }));
  }

  function DeleteTab(tabId: string) {
    setState((prev) => {
      if (prev.tabs.length <= 1) return prev;

      if (prev.currId === tabId) {
        return {
          currId: prev.tabs[prev.tabs.length - 2].id,
          tabs: prev.tabs.filter((prevTab) => prevTab.id !== tabId),
        };
      } else {
        return {
          ...prev,
          tabs: prev.tabs.filter((prevTab) => prevTab.id !== tabId),
        };
      }
    });
  }

  function AddTab() {
    setState((prev) => {
      const newId = String(Date.now());

      return {
        currId: newId,
        tabs: [...prev.tabs, { id: newId, title: 'New Tab' }],
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
        <ul className='flex h-16 items-end gap-2 overflow-x-auto border-b border-gray-400 px-0.5 dark:border-gray-700'>
          {state.tabs.map((tab, tab_index) => (
            <motion.li
              key={tab.id}
              tabIndex={0}
              initial={false}
              animate={{
                paddingTop: tab.id === state.currId ? '10px' : '8px',
                paddingBottom: tab.id === state.currId ? '10px' : '8px',
              }}
              whileHover={{
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
              whileFocus={{
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
              className={
                'flex w-36 cursor-pointer items-center justify-between gap-2 rounded-t-md border border-b-0 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-3 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'
              }
              onClick={() => {
                moveTab(tab.id);
              }}
            >
              <span className='overflow-hidden text-ellipsis whitespace-nowrap'>{tab.title}</span>
              <motion.button
                className='block h-5 w-5 cursor-pointer rounded-[50%] leading-none hover:bg-black/20 hover:dark:bg-white/20'
                onClick={(event) => {
                  event.stopPropagation();

                  DeleteTab(tab.id);
                }}
              >
                ⨉
              </motion.button>
            </motion.li>
          ))}
          <motion.li className='rounded-none rounded-t-md border border-b-0 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
            <motion.button
              className='cursor-pointer rounded-none rounded-t-md px-4 py-2 text-2xl leading-none hover:bg-black/20 hover:dark:bg-white/20'
              onClick={AddTab}
            >
              +
            </motion.button>
          </motion.li>
        </ul>

        <tabsSetStateContext.Provider value={setState}>
          {state.tabs.map((tab) => (
            <ChatForm
              key={tab.id}
              id={tab.id}
              className={`flex-[1_0_0px] ${tab.id === state.currId ? 'flex' : 'hidden'}`}
            />
          ))}
        </tabsSetStateContext.Provider>
      </div>
    </MotionConfig>
  );
}

export function useTabsSetStateContext() {
  return useContext(tabsSetStateContext);
}
