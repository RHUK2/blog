import { useMutation } from '@tanstack/react-query';

export function useChatMutation() {
  return useMutation({
    mutationFn: (body) =>
      fetch('/api/chat', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          message: body,
        }),
      }),
  });
}
