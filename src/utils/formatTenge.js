const tengeFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

export function formatTenge(amount) {
  return `₸${tengeFormatter.format(amount)}`;
}
