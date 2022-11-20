export const checkImageExists = (url: string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
};
