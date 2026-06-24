/**
 * Auto-Daily Placeholder Utility
 * Automatically creates placeholder entries for new days with zero values
 */

export interface DailyPlaceholder {
  date: string
  revenue: number
  impressions: number
  clicks: number
  ecpm: string
  ctr: string
}

export interface ReportPlaceholder {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

/**
 * Formats current date to "Month DD, YYYY" format
 */
export function getCurrentFormattedDate(): string {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return now.toLocaleDateString('en-US', options)
}

/**
 * Gets the last stored date from data array
 */
export function getLastStoredDate(dates: string[]): string | null {
  if (dates.length === 0) return null
  return dates[0]
}

/**
 * Checks if a new day has occurred
 */
export function isNewDay(lastStoredDate: string | null, currentFormattedDate: string): boolean {
  if (!lastStoredDate) return true
  return lastStoredDate !== currentFormattedDate
}

/**
 * Creates a daily placeholder with zero values
 */
export function createDailyPlaceholder(date: string): DailyPlaceholder {
  return {
    date,
    revenue: 0,
    impressions: 0,
    clicks: 0,
    ecpm: "$0.00",
    ctr: "0.00%"
  }
}

/**
 * Creates a report placeholder with zero values
 */
export function createReportPlaceholder(date: string): ReportPlaceholder {
  return {
    date,
    impressions: "0",
    clicks: "0",
    ctr: "0.00%",
    ecpm: "$0.00",
    revenue: "$0.00"
  }
}

/**
 * Auto-initializes dashboard data for new day
 * Returns updated data if new day detected, null otherwise
 */
export function autoDailyInitialize(currentDate: string, existingDates: string[]) {
  const lastDate = getLastStoredDate(existingDates)
  
  if (isNewDay(lastDate, currentDate)) {
    return {
      placeholder: createDailyPlaceholder(currentDate),
      reportPlaceholder: createReportPlaceholder(currentDate),
      isNewDay: true
    }
  }
  
  return {
    placeholder: null,
    reportPlaceholder: null,
    isNewDay: false
  }
}

/**
 * Formats zero-value placeholder data for display
 */
export function formatPlaceholderDisplay(placeholder: DailyPlaceholder) {
  return {
    revenue: `$${placeholder.revenue.toFixed(2)}`,
    impressions: placeholder.impressions.toString(),
    clicks: placeholder.clicks.toString(),
    ctr: placeholder.ctr,
    ecpm: placeholder.ecpm
  }
}
