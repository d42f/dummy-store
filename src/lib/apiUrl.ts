export function apiUrl(path: string, params?: Record<string, string | number | undefined>): string {
  return buildUrl(`${import.meta.env.VITE_API_BASE_URL}${path}`, params);
}

function buildUrl(base: string, params?: Record<string, string | number | undefined>): string {
  if (!params) return base;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  return qs ? `${base}?${qs}` : base;
}
