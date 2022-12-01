import React, {FC} from 'react';

import {
  Canvas,
  Image,
  Path,
  SkFont,
  Skia,
  SkiaMutableValue,
  Text,
  useImage,
} from '@shopify/react-native-skia';
import {StyleSheet, View} from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  font: SkFont;
  smallerFont: SkFont;
  targetPercentage: number;
  children?: React.ReactNode;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  targetPercentage,
  smallerFont,
  children,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const width = font.getTextWidth(targetText);
  const titleWidth = smallerFont.getTextWidth('Power');
  const image = useImage(require("./resources/images/Checkmark.png"));

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="orange"
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          size={32}
          opacity={percentageComplete}
        />
        {image && (
          <Image
            image={image}
            fit="contain"
            x={0}
            y={0}
            width={256}
            height={256}
          />
        )}

      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
