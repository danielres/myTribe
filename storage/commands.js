import { playEvents } from './events/playEvents'
import addedMember from './events/addedMember'

export const addMember = async attrs => {
  await addedMember(attrs)
  await playEvents()
}
