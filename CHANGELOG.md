# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
### Changed
### Fixed

## [0.1.0] - 2017-04-03
### Changed
- Refactoring (client):
  - reorganized /src files in a better file structure (ducks).
- Refactoring (server):
  - load routes dynamically and split logic in services.
  - systematically call catch(next) on routes.
  - express error handler

### Fixed
  - Regression: strange behavior when saving items.
    - Part 1 introduced in commit 5d6eb06e (missing ids in models)
    - Part 2 introduced in commit 645e72a9 (break in promise chain)

## [0.0.0] - 2017-03-31
### Added
- Suggestion mode: possibility to ban words (globally).
- Suggestion mode: possibility to hide words (user-based).

### Changed
- Suggestion mode: removed all words composed of one single character.
- Edit mode: changed status origin of Chars/Words to 'Text #{order}'.
- Edit mode: Char/Words stats are now displayed on top of tables.
