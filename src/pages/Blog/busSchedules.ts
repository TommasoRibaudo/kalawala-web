/**
 * MEPE timetables shared between articles.
 *
 * The Limón ↔ Puerto Viejo route (which stops in Cahuita) is shown on both
 * the bus-hours page and the Cahuita/Limón transport guide. Keeping the
 * times here means a schedule change only has to be made once.
 *
 * Each row is [route label, Monday–Saturday departures, Sunday & holiday
 * departures].
 */
export type SplitScheduleRow = [string, string[], string[]];

export const LIMON_PUERTO_VIEJO_SCHEDULE: SplitScheduleRow[] = [
    ['Limón → Puerto Viejo',
        ['5:30 AM', '6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '6:30 PM', '7:00 PM', '8:00 PM'],
        ['6:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '2:30 PM', '4:30 PM', '6:30 PM', '7:00 PM', '8:00 PM']],
    ['Puerto Viejo → Limón',
        ['5:30 AM', '6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
        ['5:30 AM', '7:30 AM', '9:30 AM', '11:30 AM', '1:30 PM', '3:30 PM', '5:30 PM', '6:30 PM', '8:15 PM']],
];
