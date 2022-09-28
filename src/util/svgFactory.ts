import { StaticImageData } from "next/image";

export const svgFactory = (name: string, color: string) => {
  console.log("design system");
  console.log(name, color);
  const Icon = getIcon(name);

  // <Icon/>
};

const getIcon = (name: string): StaticImageData => {
  return require(`@/public/assets/${name}.svg`);
};
