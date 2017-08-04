import { addMemberEvent, playEvents } from './events'

export const addMember = async attrs => {
  await addMemberEvent(attrs)
  await playEvents()
}
