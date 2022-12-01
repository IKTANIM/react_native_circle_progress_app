import React, {FC} from 'react';

import {
  Canvas,
  Fill,
  Image,
  Path,
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
  targetPercentage: number;
  children?: React.ReactNode;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  targetPercentage,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const image = useImage(require("./resources/images/Goal1.png"));

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
        {image && (
          <Image
            image={image}
            fit="contain"
            x={10}
            y={10}
            width={60}
            height={60}
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
