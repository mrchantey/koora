//@ts-nocheck dont know how to do this

// https://on.cypress.io/configuration
import './commands'
import { setCypressDarkTheme } from './theme'
before(setCypressDarkTheme)