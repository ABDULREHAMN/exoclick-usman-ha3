# Auto-Daily Placeholder Feature

## Overview

The Auto-Daily Placeholder feature automatically creates placeholder entries for new days with zero values across all analytics sections. This ensures that every new day is captured in your dashboard, reports, and statistics without manual intervention.

## How It Works

### Automatic Detection
- The system checks the current system date every minute
- When a new day is detected (date changes), it automatically initializes placeholder entries
- All values start at $0.00 or 0 and can be manually updated later

### Affected Sections

1. **Today Dashboard**
   - Date updates to current date
   - All metrics reset to 0 values

2. **Recent Activity**
   - New entry added for the current date
   - Ready to be populated with actual data

3. **Reports Section**
   - New daily report created with zero values
   - Appears in Last 7 Days, Last 30 Days, and Last 3 Months reports

4. **Statistics Page**
   - New date automatically included in all time period calculations
   - Last 7 Days, Last 30 Days, and Last 3 Months updated

5. **Earnings Over Time Graph**
   - New graph point added for the current date
   - Starts at $0.00 revenue

## Configuration

### Enable/Disable the Feature

Edit `config/auto-daily.config.ts`:

```typescript
export const autoDailyConfig = {
  enabled: true,  // Set to false to disable auto-daily placeholder creation
  // ... other settings
}
```

### Customize Default Values

All zero-value defaults can be customized in `config/auto-daily.config.ts`:

```typescript
defaultTodayValues: {
  revenue: "$0.00",
  impressions: 0,
  clicks: 0,
  ecpm: "$0.00",
  ctr: "0.00%",
}
```

### Feature Flags

Control which components are affected:

```typescript
affectsWidget: {
  today: true,           // Today dashboard
  recentActivity: true,  // Recent activity section
  reports: true,         // Reports
  statistics: true,      // Statistics calculations
  earnings: true,        // Earnings graph
}
```

## Implementation Details

### Key Files

1. **`lib/auto-daily-placeholder.ts`** - Core utility functions
   - `getCurrentFormattedDate()` - Gets current date in "Month DD, YYYY" format
   - `isNewDay()` - Checks if a new day has occurred
   - `createDailyPlaceholder()` - Creates dashboard placeholder with zero values
   - `createReportPlaceholder()` - Creates report placeholder with zero values

2. **`config/auto-daily.config.ts`** - Configuration and feature flags
   - `autoDailyConfig` - All configuration settings
   - `autoDailyFeatures` - Feature toggle flags
   - `isAutoDailyEnabled()` - Helper to check if feature is active

3. **`components/dashboard-content.tsx`** - Dashboard integration
   - Uses `useEffect` hook to check for new day every minute
   - Manages `lastInitializedDate` state
   - Logs initialization events for debugging

### Check Interval

The system checks for a new day every **60 seconds** (1 minute). This can be adjusted in `config/auto-daily.config.ts`:

```typescript
checkInterval: 60000, // milliseconds
```

## Usage

### For End Users

1. Enable the feature in project settings/config
2. Each new day automatically gets placeholder entries with $0.00 values
3. Update values as actual data comes in (no additional step needed)
4. All historical data is preserved
5. Design, layout, and theme remain unchanged

### For Developers

#### Manual Initialization (if needed)

```typescript
import { 
  getCurrentFormattedDate, 
  createDailyPlaceholder,
  createReportPlaceholder 
} from '@/lib/auto-daily-placeholder'

const today = getCurrentFormattedDate()
const placeholder = createDailyPlaceholder(today)
const reportPlaceholder = createReportPlaceholder(today)
```

#### Check if Auto-Daily is Enabled

```typescript
import { isAutoDailyEnabled } from '@/config/auto-daily.config'

if (isAutoDailyEnabled()) {
  // Auto-daily placeholder feature is active
}
```

#### Get Default Values for a Section

```typescript
import { getDefaultValues } from '@/config/auto-daily.config'

const defaultTodayValues = getDefaultValues('today')
const defaultReportValues = getDefaultValues('report')
```

## Design Constraints

The auto-daily placeholder feature respects these constraints:

- ✅ Only creates new entries with zero values
- ✅ Does not change existing design elements
- ✅ Does not modify layout structure
- ✅ Does not alter theme or colors
- ✅ Preserves all historical data
- ✅ Allows manual value updates immediately after creation
- ✅ Integrates seamlessly with existing update flows

## Debugging

### Enable Debug Logging

The feature logs to console when initialized:

```
[v0] Auto-daily placeholder ready for June 25, 2026
```

### Check Initialization Status

```typescript
// Check in browser console
if (window.localStorage.getItem('lastAutoDailyDate')) {
  console.log('Last initialized:', window.localStorage.getItem('lastAutoDailyDate'))
}
```

## FAQ

**Q: What time of day does it check for new days?**
A: It checks every minute, so it will typically catch the new day within 60 seconds of midnight.

**Q: Can I manually update values without waiting for auto-daily to initialize?**
A: Yes! You can always manually enter data for today. If auto-daily hasn't initialized yet, your manual entry will simply overwrite the placeholder.

**Q: Does auto-daily work if the app is closed?**
A: The placeholder creation happens when the app loads. It will check the current date and create any missing daily entries for dates that haven't been initialized yet.

**Q: Can I disable it temporarily?**
A: Yes, set `enabled: false` in `config/auto-daily.config.ts` and redeploy, or add a UI toggle button to enable/disable it at runtime.

**Q: Will it create duplicate entries?**
A: No. It tracks the `lastInitializedDate` and only creates an entry if the current date is different from what's already initialized.

## Future Enhancements

Possible improvements to the auto-daily placeholder feature:

- Dashboard UI toggle to enable/disable auto-daily without code changes
- Custom default values per section via UI
- Webhook integration to notify when new day placeholder is created
- Automatic backfill for missed days
- Customizable check interval
- Time zone support for date detection
