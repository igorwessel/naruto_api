'use strict'

const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig')

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
}
