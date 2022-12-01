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
  strokeColor: string;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  targetPercentage: number;
  children?: React.ReactNode;
  image: any;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  targetPercentage,
  strokeColor,
  image
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  // path.close();

  //// Start from top /////

  const imageResources = useImage(image);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color={strokeColor}
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        {imageResources && (
          <Image
            image={imageResources}
            fit="contain"
            x={10}
            y={10}
            width={radius * 2 - 20}
            height={radius * 2 - 20}
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
