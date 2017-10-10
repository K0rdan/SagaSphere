# TODO :
Resolve Yarn install alerts :
```
warning "ajv-keywords@1.5.1" has incorrect peer dependency "ajv@>=4.10.0".
warning "eslint-config-airbnb@15.1.0" has incorrect peer dependency "eslint-plugin-jsx-a11y@^5.1.1".
```

## Installation
```yarn install```

## Run
If there is not android folder, regenerate the full react-native boiler plate, with the command :

> ```react-native upgrade```

To run the APK generation and deployment on the device run :

> ```react-native run-android```

## Plugins
List of plugins installed (or to install):
* [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
* [react-native-orientation](https://github.com/yamill/react-native-orientation)
* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel/)

## Specifications
### Saga specifications
| Title | Type (MySQL Type) | Size |
|---|---|---|
| Title | String (VARCHAR) | 50 |
| Image  | String (VARCHAR) | 200 |
| Author  | String (VARCHAR) | 50 |
| Creation | Date (EPOCH) | - |
| Url | String (VARCHAR) | 200 |
| Followers | Number (MEDIUMINT)| 2^53-1 |
| Tracks | Array of Object (List of (table tracks) ID) | - |

```
{
  title: "Donjon de Naheulbeuk",
  image: "http://static.sagasphere.com/sagas/images/ddn.png",
  author: "Pen Of Chaos",
  creation: "2000/01/01-00:00:00"
  url: "http://penofchaos.com/donjon/",
  followers: 0,
  tracks: [
    {
      name: "Episode 1",
      playlistIDs: [1, ...],
      trackID: 1
    },
    ...
  ]
}
```

### Tracks specifications
```
{
  name: "Episode 1",
  playlistIDs: [1, ...],
  trackID: 1
}
```

### Playlist specifications
```

```