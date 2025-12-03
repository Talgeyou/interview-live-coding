import type { UserDetails } from './user';

export async function getUserDetails(
  id: number,
  options?: RequestInit,
): Promise<UserDetails> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    options,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // This is only for easier demonstration purpose
  // Imitates inconsistency of time consumed by request
  // ---
  await new Promise((resolve, reject) => {
    const timeout = window.setTimeout(resolve, (id % 2) * 1000);

    options?.signal?.addEventListener('abort', () => {
      window.clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
  // ---

  return data;
}
