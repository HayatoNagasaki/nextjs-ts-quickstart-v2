export const splitToParahraph = (text: string) => {
  return text.split('\n').filter((paragraph) => paragraph !== '');
};
