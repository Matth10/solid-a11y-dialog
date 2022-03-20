import { Accessor, createContext } from 'solid-js'
import A11yDialogInstance from 'a11y-dialog'

export type A11yDialogContext = [
  {
    role: 'dialog' | 'alertdialog'
    instance?: Accessor<A11yDialogInstance | undefined | null>
    titleId?: Accessor<string>
  },
  {
    ref?: (node: Element) => void
    show?: () => void
    hide?: () => void
    setTitleId?: (value: string) => void
  }
]

export const a11yDialogContext = createContext<A11yDialogContext>([{role: 'dialog'}, {}])