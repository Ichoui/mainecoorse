export const sortItemsByLabel = (val: { label: string }[]): any[] => {
  return val ? val.sort((a, b) => -b.label[0].localeCompare(a.label[0])) : val;
};
