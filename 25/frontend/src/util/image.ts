export const generateBase64FromImage = (imageFile: Blob) => {
  const reader = new FileReader();
  const promise = new Promise<string>((resolve, reject) => {
    reader.onload = (e) => {
      const target = e.target as FileReader;
      resolve(target.result as string);
    };
    reader.onerror = (err) => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};
