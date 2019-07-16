## Installation

```
yarn install
```

## Run

If there is not android folder, regenerate the full react-native boiler plate, with the command :

> `react-native upgrade`

To run the APK generation and deployment on the device run :

> `react-native run-android`

## Plugins

List of installed plugins (or to **install**):

* [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
* [react-native-orientation](https://github.com/yamill/react-native-orientation)
* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel/)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob)
* [react-native-zip-archive](https://github.com/mockingbot/react-native-zip-archive)
* [react-native-sound](https://github.com/zmxv/react-native-sound/wiki/Installation)
* [react-native-circular-progress](https://github.com/bgryszko/react-native-circular-progress)

### Notes :

* In the **React-Native-Circular-Progress** plugin, i'd to change the following file, to allow transparent background.
  > `.../react-native-circular-progress/src/CircularProgress.js` line 35
  >
  > ````
  > {backgroundColor !== "transparent" && (
  >    <Shape
  >      d={backgroundPath}
  >      stroke={backgroundColor}
  >      strokeWidth={backgroundWidth != null ? backgroundWidth : width}
  >    />
  >  )}```
  > ````
