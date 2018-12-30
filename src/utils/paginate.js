import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // This creates lodash object & allows...
    .slice(startIndex) // Chaining of Methods
    .take(pageSize) // Just as LINQ in .Net
    .value();
}
