const executableRegex = /(\.exe)$/i;

export const isExecutablePath = (path: string): boolean => {
  return executableRegex.test(path);
};