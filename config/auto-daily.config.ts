/**
 * Auto-Daily Placeholder Configuration
 * Controls automatic daily placeholder entry creation
 */

export const autoDailyConfig = {
  // Enable/disable the auto-daily placeholder feature
  enabled: true,

  // Date system
  useCurrentSystemDate: true,
  autoUpdateDateDaily: true,

  // Today's dashboard
  autoCreateNewDay: true,
  defaultTodayValues: {
    revenue: "$0.00",
    impressions: 0,
    clicks: 0,
    ecpm: "$0.00",
    ctr: "0.00%",
  },

  // Recent activity
  autoAddCurrentDate: true,
  defaultActivityValues: {
    revenue: "$0.00",
    impressions: 0,
    clicks: 0,
    ecpm: "$0.00",
    ctr: "0.00%",
  },

  // Reports
  autoCreateDailyReport: true,
  defaultReportValues: {
    revenue: "$0.00",
    impressions: "0",
    clicks: "0",
    ecpm: "$0.00",
    ctr: "0.00%",
  },

  // Statistics
  includeNewDateInStatistics: true,
  updateLast7Days: true,
  updateLast30Days: true,
  updateLast3Months: true,

  // Earnings over time graph
  autoAddGraphPoint: true,
  defaultGraphRevenue: "$0.00",

  // Rules
  doNotChangeDesign: true,
  doNotChangeLayout: true,
  doNotChangeTheme: true,
  createOnlyWithZeroValues: true,
  allowManualUpdateLater: true,
}

/**
 * Feature flags for auto-daily functionality
 */
export const autoDailyFeatures = {
  // Core functionality
  enabled: autoDailyConfig.enabled,

  // Components affected
  affectsWidget: {
    today: autoDailyConfig.autoCreateNewDay,
    recentActivity: autoDailyConfig.autoAddCurrentDate,
    reports: autoDailyConfig.autoCreateDailyReport,
    statistics: autoDailyConfig.includeNewDateInStatistics,
    earnings: autoDailyConfig.autoAddGraphPoint,
  },

  // Update intervals
  checkInterval: 60000, // Check every minute
  autoUpdateOnPageLoad: true,
}

/**
 * Helper function to check if a feature is enabled
 */
export function isAutoDailyEnabled(): boolean {
  return autoDailyConfig.enabled && autoDailyFeatures.enabled
}

/**
 * Helper function to get default values for a section
 */
export function getDefaultValues(section: 'today' | 'activity' | 'report' | 'graph') {
  const valueMap = {
    today: autoDailyConfig.defaultTodayValues,
    activity: autoDailyConfig.defaultActivityValues,
    report: autoDailyConfig.defaultReportValues,
    graph: { revenue: autoDailyConfig.defaultGraphRevenue },
  }
  return valueMap[section]
}
