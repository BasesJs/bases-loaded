export function ParamSerializer(params: any): string {
  const serializedParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
  return serializedParams;
}
