export const formatLabel = (text: string) =>
  text
    .replace(/_/g, " ")
    .charAt(0).toUpperCase() + text.replace(/_/g, " ").slice(1);