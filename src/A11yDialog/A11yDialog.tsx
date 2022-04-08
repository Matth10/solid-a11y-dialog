import { createSignal, createUniqueId, JSX, mergeProps } from 'solid-js'

import { DialogRole, useA11yDialogInstance } from '../shared'
import { Close } from './Close'
import { Container } from './Container'
import { a11yDialogContext } from './context'
import { Dialog } from './Dialog'
import { Open } from './Open'
import { Overlay } from './Overlay'
import { Title } from './Title'

export type ProviderProps = Pick<JSX.HTMLAttributes<HTMLElement>, 'children'> & {
  role?: DialogRole
}

const defaultProps: ProviderProps = { role: 'dialog' }

const A11yDialog = (props: ProviderProps) => {
  const mergedProps = mergeProps(defaultProps, props)

  const { instance, ref, show, hide, isOpen } = useA11yDialogInstance()
  const [titleId, setTitleId] = createSignal(createUniqueId())

  return (
    <a11yDialogContext.Provider
      value={[
        { role: mergedProps.role!, instance, titleId, isOpen },
        { ref, hide, show, setTitleId },
      ]}
    >
      {mergedProps.children}
    </a11yDialogContext.Provider>
  )
}

A11yDialog.Dialog = Dialog
A11yDialog.Container = Container
A11yDialog.Title = Title
A11yDialog.Close = Close
A11yDialog.Open = Open
A11yDialog.Overlay = Overlay

export { A11yDialog }
