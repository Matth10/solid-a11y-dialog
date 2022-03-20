import { JSX, splitProps, useContext } from 'solid-js'
import { a11yDialogContext } from './context'

export type CloseProps = JSX.HTMLAttributes<HTMLButtonElement>

export const Close = (props: CloseProps) => {
  const [local, rest] = splitProps(props, ['children', 'aria-label'])

  const [_, {hide}] = useContext(a11yDialogContext)
  const ariaLabel = local['aria-label'] || 'Close Dialog'

  return (
    <button type="button" onClick={hide} aria-label={ariaLabel} {...rest}>
      {local.children}
    </button>
  )
}
