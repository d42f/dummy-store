export async function apiFetch<T>(
  url: string,
  accessToken?: string | null,
  init?: Pick<RequestInit, 'method' | 'body' | 'headers'>,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
