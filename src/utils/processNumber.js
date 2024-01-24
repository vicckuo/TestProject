export function addComma(number) {
  if (!number) return '';
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function getNumberIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let overlap = [];
  let notInclude = [];
  let lastEnd = -1;

  for (let i = 0; i < intervals.length; i++) {
    let [start, end] = intervals[i];

    if (start === end) {
      continue;
    }

    if (start > lastEnd + 1) {
      notInclude.push([lastEnd + 1, start - 1]);
    }

    for (let j = i + 1; j < intervals.length; j++) {
      let [nextStart, nextEnd] = intervals[j];
      if (nextStart === nextEnd) {
        continue;
      }
      if (nextStart <= end) {
        overlap.push([nextStart, Math.min(end, nextEnd)]);
      }
    }

    lastEnd = Math.max(lastEnd, end);
  }

  if (lastEnd < 20) {
    notInclude.push([lastEnd + 1, 20]);
  }

  return { overlap, notInclude };
}
