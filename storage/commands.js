import { playEvents } from './events/playEvents'
import addMemberEvent from './events/addMemberEvent'

export const addMember = async attrs => {
  await addMemberEvent(attrs)
  await playEvents()
}
