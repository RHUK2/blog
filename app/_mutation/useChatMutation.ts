import { useChatMutationBody, useChatMutationResponse } from '@/_type';
import { useMutation } from '@tanstack/react-query';

export function useChatMutation() {
  return useMutation<useChatMutationResponse, unknown, useChatMutationBody>({
    mutationFn: async (body) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
      } catch (error) {
        throw error;
      }
    },
  });
}
