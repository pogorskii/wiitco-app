import React from "react";
import { getColors } from "react-native-image-colors";

export const useImageColors = ({ imageUrl }: { imageUrl: string }) => {
  const [colors, setColors] = React.useState(null);

  React.useEffect(() => {
    const url = imageUrl;

    getColors(url, {
      fallback: "#228B22",
      cache: true,
      key: url,
    }).then(setColors);

    console.log(colors);
  }, []);

  return colors;
};
