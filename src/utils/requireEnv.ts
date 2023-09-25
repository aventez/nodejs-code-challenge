export function requireEnv (name: string, defaultVal?: string): string {
  const envValue = process.env[name]
  if (envValue == null) {
    if (defaultVal !== undefined) return defaultVal
    throw new Error(`Required ENV VAR ${name} not set`)
  }
  return envValue
}
