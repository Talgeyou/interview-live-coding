import type { User } from './user';

type Params = {
  search?: string;
};

export async function getUsers(
  params?: Params,
  options?: RequestInit,
): Promise<User[]> {
  const url = new URL('https://jsonplaceholder.typicode.com/users');

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status} ${response.statusText}`,
    );
  }

  let data: User[] = await response.json();

  if (params?.search) {
    const search = params.search.toLowerCase();

    data = data.filter((user) => user.name.toLowerCase().includes(search));
  }

  return data;
}
