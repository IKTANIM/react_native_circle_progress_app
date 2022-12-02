import React, {FC} from 'react';

import {
  Canvas,
  Fill,
  Image,
  ImageSVG,
  Path,
  processTransform2d,
  Rect,
  Skia,
  SkiaMutableValue,
  Text,
  useImage,
  useSVG,
} from '@shopify/react-native-skia';
import {StyleSheet, View} from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  strokeColor: string;
  radius: number;
  percentageComplete: SkiaMutableValue<number>;
  targetPercentage: number;
  children?: React.ReactNode;
  image: any;
  dashed?: boolean;
  showCheck?: boolean;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  targetPercentage,
  strokeColor,
  image,
  dashed,
  showCheck,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  dashed && path.dash(2, 6, 0);
  // path.transform(processTransform2d([{ translateY: 0, translateX: 0, rotate: 45,  }]));
  // path.addCircle(30, 30, 14);
  // path.rArcTo(innerRadius, innerRadius, 0, false, false, 0, -innerRadius * 2);
  // path.addPoly([{x: 110, y: 0}], false)
  // path.close();

  // console.log('path', path.toSVGString());

  //// Start from top /////

  const imageResources = useImage(image);
  // const svg = useSVG(require("./dash-circle-dotted-svgrepo-com.svg"));

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
        {/* { svg && (
        <ImageSVG
          svg={svg}
          x={0}
          y={0}
          width={100}
          height={100}
        />)
      } */}
        {imageResources && (
          <Image
            image={imageResources}
            fit="contain"
            x={8}
            y={8}
            width={radius * 2 - 16}
            height={radius * 2 - 16}
            // opacity={1}
          />
        )}
        {/* {showCheck && checkImage && (
          <Image
            image={checkImage}
            x={15}
            y={15}
            width={radius * 2 - 30}
            height={radius * 2 - 30}
          />
        )} */}

      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
