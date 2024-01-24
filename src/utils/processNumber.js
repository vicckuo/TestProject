export function addComma(number) {
  if (!number) return '';
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function getNumberIntervals(intervals) {
  if (!Array.isArray(intervals) || intervals.length === 0) {
    return { overlap: [], notInclude: [[0, 20]] };
  }

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

    if (i > 0 && start <= intervals[i - 1][1]) {
      overlap.push([start, Math.min(end, intervals[i - 1][1])]);
    }

    lastEnd = Math.max(lastEnd, end);
  }

  if (lastEnd < 20) {
    notInclude.push([lastEnd + 1, 20]);
  }

  return { overlap, notInclude };
}
