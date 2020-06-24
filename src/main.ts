import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const myInput: string = core.getInput('myInput')
    core.debug(`Hello ${myInput}  ...`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
