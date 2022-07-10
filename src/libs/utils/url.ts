export const silentUpdateQuery = (queries: Record<string, unknown>) => {
  if (!history.pushState) return;

  const parameters = new URLSearchParams();
  Object.entries(queries).forEach(([key, value]) => {
    if (typeof value === "string" && value !== "") parameters.set(key, value);
    else if (typeof value === "boolean") parameters.set(key, value ? "true" : "false");
    else if (typeof value === "number") parameters.set(key, value.toString());
    else if (Array.isArray(value) && value.length > 0) value.forEach((id) => parameters.append(key, `${id}`));
    else console.warn("silentUpdateQuery: unknown value type", value);
  });

  history.pushState({}, "", "?" + parameters.toString());
};
