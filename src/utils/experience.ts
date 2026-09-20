import type { CollectionEntry } from 'astro:content';

type ExperienceData = CollectionEntry<'experience'>['data'];

/** Entries carry no date at all when both years are blank — memberships, typically. */
const isDated = (data: ExperienceData) => data.startDate !== undefined;

/** A dated entry with no end year is still running. */
const isOngoing = (data: ExperienceData) => isDated(data) && data.endDate === undefined;

/**
 * Newest first, with anything still running pinned above everything else: ongoing entries,
 * then start year descending, then end year descending — so 2014–2016 sits above 2014–2015.
 * Undated entries sort last, after every dated one.
 */
export function byRecency(a: ExperienceData, b: ExperienceData): number {
	return (
		Number(isDated(b)) - Number(isDated(a)) ||
		Number(isOngoing(b)) - Number(isOngoing(a)) ||
		Number(b.startDate ?? 0) - Number(a.startDate ?? 0) ||
		Number(b.endDate ?? 0) - Number(a.endDate ?? 0)
	);
}

/**
 * The year label shown next to an entry: '2019' when it started and ended in the same year,
 * '2014 – 2016' for a closed range, '2018 – dabar' while it is still ongoing. Undated entries
 * get `null`, and the page drops the column rather than leaving it blank.
 */
export function dateLabel(data: ExperienceData, present: string): string | null {
	if (!isDated(data)) {
		return null;
	}
	if (isOngoing(data)) {
		return `${data.startDate} – ${present}`;
	}
	return data.endDate === data.startDate
		? data.startDate!
		: `${data.startDate} – ${data.endDate}`;
}
