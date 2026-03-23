export function getTopGenreIds(savedItems) {
  const counts = {};

  savedItems.forEach((item) => {
    (item.genre_ids || []).forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
}