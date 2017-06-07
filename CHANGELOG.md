# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [UNRELEASED]
### Added
### Modified
### Fixed

##[1.1.1] - 2017-06-07
## Added
- Forest "Clone Project" smart action

### Fixed
- Fix bug when switching project
- Successive reordering not saved correct in DB (added REFRESH_ORDERS action)

##[1.1.0] - 2017-04-12
### Added
- Edit text infos
- Bonus attribute for texts
- Reorder texts in a project via Drag & drop
- Calculate displayedOrder for the UI

##[1.0.2] - 2017-04-08
### Added
- Error messages 'No Internet connexion' and 'Cannot reach the server'.

### Changed
- Refactoring: Make async API calls DRY with fetch/success/failure helper.
- Refactoring: Move logic out of containers when possible.

### Fixed
- Existing tests that were failing since 1.0.0

##[1.0.1] - 2017-04-07
### Fixed
- Words already used in a project should not appear in suggestions

## [1.0.0] - 2017-04-07
### Added
- Texts can now be organized among projects.
- Projects and texts belongs to users.
- Possibility to switch projects via a dropdown menu.

### Changed
- Items status are now calculated in deserializers and stored in redux state.
- Items status and suggestions are calculated in the scope of the current project.
- Text orders is now defined on the textProject joined table.

### Fixed
- Error when saving lists - increased the limit of body-parser in the server.
- Wrong origin status - use of 'require: true' in sequelize queries.

## [0.2.0] - 2017-04-04
### Added
- Suggestion mode: favorite / unfavorite a word.

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
