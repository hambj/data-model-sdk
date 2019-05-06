# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2019-05-06

### Added

### Changed

- all files in src go to lib
- rename types.d.ts to types.ts

### Removed

## [0.2.0] - 2019-05-06

### Added

- init.js - initialization (essentially credentials for now)
- todo notes on improvements to be carried out
  - translators for segmentation and subscription
  - make dataCollectionInformation mandatory on create and update

### Changed

- restructured to clearly indicate entry points (init, profiles, tables), moving all internal stuff to a "helpers" folder
- ISegmentation now allows for simple or optional segmentations (i.e. with belongs)
- profile is now optional in IProfileSpec
- await for delete response

### Removed

- index.js which was a catch-all of things that should not be published
