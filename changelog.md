## Changelog

### v1.1.17

- Fix the bug of incorrect encoding of `Codec3D.getNeighbor` when it crosses the fifth and sixth levels

### v1.1.16

- Add GitHub repository link

### v1.1.15

- Fixed the issue where the 3D encoding did not comply with the specifications. Now, according to the specifications, the 2D and height encoding are cross combined

### v1.1.14

- Fix bug in getElevationNeighbor which leads to individual grid height error

### v1.1.13

- Add Codec3D.getNeighbors

### v1.1.12

- Fixed a bug where empty latitude and longitude could be passed to the `Codec2D.encode` function

- `Codec2D.getAmongUs` can now get all grids between any two grids at the same level (not necessarily under the same parent grid)
