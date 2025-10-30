## [1.0.5](https://github.com/ehzack/lt-front/compare/v1.0.4...v1.0.5) (2025-10-30)


### Bug Fixes

* remove GitHub plugin from semantic-release and handle tag collisions ([c90b930](https://github.com/ehzack/lt-front/commit/c90b9306acdacf6544eef07a6b28226a9c7b4d69))

## [1.0.4](https://github.com/ehzack/lt-front/compare/v1.0.3...v1.0.4) (2025-10-30)


### Bug Fixes

* configure semantic-release to trigger production-release workflow ([9d35d88](https://github.com/ehzack/lt-front/commit/9d35d887763bc1a51c8c6af01fe9454e62729360))

## [1.0.3](https://github.com/ehzack/lt-front/compare/v1.0.2...v1.0.3) (2025-10-30)


### Bug Fixes

* apply same zip naming and exe inclusion fixes to production workflow ([b054223](https://github.com/ehzack/lt-front/commit/b0542231773f0142633e6f2552f143946abd1cd8))

## [1.0.2](https://github.com/ehzack/lt-front/compare/v1.0.1...v1.0.2) (2025-10-30)


### Bug Fixes

* improve staging tag number extraction with simpler regex ([1cae2bc](https://github.com/ehzack/lt-front/commit/1cae2bcd684b17930b5cbe39137ece1e8367937a))
* update staging release workflow to find correct simplified tags ([72ae4f4](https://github.com/ehzack/lt-front/commit/72ae4f4cf4a7a4a86fa62293ca87ba9fb0798b3f))
* use specific pattern to match only new simplified staging tags ([7861f18](https://github.com/ehzack/lt-front/commit/7861f18f6260e784d5205b4e53232a4c9ef847aa))

## [1.0.1](https://github.com/ehzack/lt-front/compare/v1.0.0...v1.0.1) (2025-10-30)


### Bug Fixes

* correct zip naming and include Windows exe in zip archives ([bd38153](https://github.com/ehzack/lt-front/commit/bd3815354c46b0366bce1a4f8f08187c934ac647))
* reset package.json to clean 1.0.0 and merge updated staging-release workflow ([8ba6a87](https://github.com/ehzack/lt-front/commit/8ba6a872dd312fe3d5e28b2f331d96cab597d398))

# 1.0.0 (2025-10-30)


### Bug Fixes

* add OpenSSL legacy provider for Node.js 22.14.0 compatibility ([5f20ddd](https://github.com/ehzack/lt-front/commit/5f20ddd90a5084b583d1f3feb92550fa53e5e082))
* include Config.js in repository for CI/CD builds ([6cbab82](https://github.com/ehzack/lt-front/commit/6cbab829fe04f97475ce70c3a278ace5133b2d94))
* reset package.json version to clean 1.0.0 for simplified staging releases ([e94b67f](https://github.com/ehzack/lt-front/commit/e94b67fd2d9fd83088e6d22c847928c0075c1c70))
* resolve webpack version conflict for Create React App ([51b02b7](https://github.com/ehzack/lt-front/commit/51b02b7a17153a42b19dd94ac0df6e55f2ce9eb4))
* test ([98babb3](https://github.com/ehzack/lt-front/commit/98babb33287b4d00cf7705a141e5c08381f07174))
* update port references in workflow documentation ([a7983f3](https://github.com/ehzack/lt-front/commit/a7983f30075eb25c8ce80ef8e794923b51c787f9))


### Features

* add Go HTTP server for standalone Windows executable ([3cf7782](https://github.com/ehzack/lt-front/commit/3cf778209b48cf8902785a1e137ae8c4b3d75730))
* add Windows executable generation to release workflows ([ff5043b](https://github.com/ehzack/lt-front/commit/ff5043b53d27d1407b83e4bb8976013a9dc72ec0))
* simplify staging release naming to use incremental numbering ([0343094](https://github.com/ehzack/lt-front/commit/0343094711e85fa0a8c286bd72268b127c9ec4b6))
* update server to use port 80 by default ([38a5cb8](https://github.com/ehzack/lt-front/commit/38a5cb822b0b8b63f928bfc488c94b2744071154))


### BREAKING CHANGES

* Removed direct webpack dependencies from production build

# Changelog

All notable changes to this project will be documented in this file.
