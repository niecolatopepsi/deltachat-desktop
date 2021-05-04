import React from 'react'
import { DeltaBackend } from '../../delta-remote'
import { Classes } from '@blueprintjs/core'
import { DialogProps } from './DialogController'
import { DCContact, Message } from '../../../shared/shared-types'
import { SmallDialog } from './DeltaDialog'
import { useTranslationFunction } from '../../contexts'
import { deleteMessage, selectChat } from '../helpers/ChatMethods'

/**
 * handle contact requests
 */
export default function DeadDrop(props: {
  contact: DCContact
  message: Message
  onClose: DialogProps['onClose']
}) {
  const { contact, message, onClose } = props

  const never = () => {
    DeltaBackend.call('contacts.blockContact', contact.id)
    deleteMessage(message.id)
    onClose()
  }

  const notNow = async () => {
    const contactId = contact.id
    await DeltaBackend.call('contacts.markNoticedContact', contactId)
    onClose()
  }

  const yes = async () => {
    const messageId = message.id
    const contactId = contact.id
    const chatId = await DeltaBackend.call('contacts.acceptContactRequest', {
      messageId,
      contactId,
    })
    selectChat(chatId)
    onClose()
  }

  const isOpen = !!contact
  const nameAndAddr = contact && contact.nameAndAddr

  const tx = useTranslationFunction()

  return (
    <SmallDialog isOpen={isOpen} onClose={onClose}>
      <div className='bp3-dialog-body-with-padding'>
        <p>{tx('ask_start_chat_with', nameAndAddr)}</p>
        <div className={Classes.DIALOG_FOOTER}>
          <div
            className={Classes.DIALOG_FOOTER_ACTIONS}
            style={{ justifyContent: 'space-between', marginTop: '7px' }}
          >
            <p className='delta-button danger' onClick={never}>
              {tx('never').toUpperCase()}
            </p>
            <p className='delta-button' onClick={notNow}>
              {tx('not_now').toUpperCase()}
            </p>
            <p className='delta-button primary' onClick={yes}>
              {tx('yes').toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </SmallDialog>
  )
}
