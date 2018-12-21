const spacingFactor = 8;
export const spacing = {
  space0: `${spacingFactor / 2}px`,  // 4
  space1: `${spacingFactor}px`,      // 8
  space2: `${spacingFactor * 2}px`,  // 16
  space3: `${spacingFactor * 3}px`,  // 24
  space4: `${spacingFactor * 4}px`,  // 32
  space5: `${spacingFactor * 5}px`,  // 40
  space6: `${spacingFactor * 6}px`,  // 48

  space8: `${spacingFactor * 8}px`,  // 64
  space9: `${spacingFactor * 9}px`,  // 72
  space13: `${spacingFactor * 13}px`, // 104
};

function computeGoldenRatio(spacingFactor, exp) {
  return Math.round(spacingFactor * Math.pow(1.618, exp));
}
