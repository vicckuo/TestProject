export function addComma(number) {
  if (!number) return '';
  let parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function getNumberIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let merged = [];
  let overlap = [];
  let notInclude = [];

  for (let interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      if (interval[0] === interval[1]) {
        continue;
      }
      overlap.push([
        Math.max(merged[merged.length - 1][0], interval[0]),
        Math.min(merged[merged.length - 1][1], interval[1]),
      ]);
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      );
    }
  }

  let lastEnd = -1;
  for (let [start, end] of merged) {
    if (lastEnd + 1 < start) {
      notInclude.push([lastEnd + 1, start - 1]);
    }
    lastEnd = end;
  }
  if (lastEnd < 20) {
    notInclude.push([lastEnd + 1, 20]);
  }

  return { overlap, notInclude };
}
