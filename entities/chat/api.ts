import { useMutation } from '@tanstack/react-query';
import { ChatListRequest } from './types';

export function useChatMutation(signal?: AbortSignal) {
  return useMutation<Response, unknown, ChatListRequest>({
    mutationFn: async (body) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
          signal: signal,
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
  });
}
