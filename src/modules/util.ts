export const filterAsync = <T>(data: T[]) => async (
  predicate: (value: T, index: number, array: T[]) => Promise<boolean>
) => {
  const dataClone = Array.from(data);
  const result = await Promise.all(
    dataClone.map((element, index) => predicate(element, index, dataClone))
  );
  return dataClone.filter((element, index) => {
    return result[index];
  });
};
