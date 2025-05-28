function importAll(r) {
  let images = {};
  r.keys().forEach((key) => {
    images[key.replace('./', '')] = r(key);
  });
  return images;
}

const images = importAll(require.context('../assets', true, /\.(png|jpe?g|svg|mp4|pdf)$/));

export default images;
