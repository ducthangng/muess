export const isImageExists = (url: string) => {
  let exists = false;

  const image = new Image();
  image.src = url;

  if (image.complete) {
    exists = true;
  } else {
    image.onload = () => {
      exists = true;
    };
    image.onerror = () => {
      exists = false;
    };
  }
  return exists;
};
