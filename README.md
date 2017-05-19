## Installation
```yarn install```

## Run
```react-native run-android```

## Specifications
### Saga specifications
| Title | Type (MySQL Type) | Size |
|---|---|---|
| Title | String (VARCHAR) | 50 |
| Image  | String (VARCHAR) | 200 |
| Author  | String (VARCHAR) | 50 |
| Url | String (VARCHAR) | 200 |
| Followers | Number (MEDIUMINT)| 2^53-1 |
| Tracks | Array of Object (List of (table tracks) ID) | - |

```
{
  title: "Donjon de Naheulbeuk",
  image: "http://static.sagasphere.com/sagas/images/ddn.png",
  author: "Pen Of Chaos",
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