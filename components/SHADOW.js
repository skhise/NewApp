//  Method to produce shadow
/**
 * Returns shadow(Elevation in Android).
 *
 * @param {number} elevation Amount of shadow.
 * @param {string} shadowColor The color of shadow.
 */
const shadow = (elevation, shadowColor) => {
  return {
    elevation,
    shadowColor: shadowColor,
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
};

export default shadow;
