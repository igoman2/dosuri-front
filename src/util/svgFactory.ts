export const svgFactory = (name, color) => {
  console.log("design system");
  console.log(name, color);
  getIcon(name);
};

const getIcon = (name: string) => {
  return require(`@/public/assets/${name}.svg`);
};
