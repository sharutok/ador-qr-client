import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const moduleAtom = atomWithStorage('module', 0)
