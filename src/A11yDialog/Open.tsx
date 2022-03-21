import { JSX, splitProps, useContext } from 'solid-js'
import { a11yDialogContext } from './context'

export type OpenProps = JSX.HTMLAttributes<HTMLButtonElement>

export const Open = (props: OpenProps) => {
  const [local, rest] = splitProps(props, ['children', 'aria-label'])

  const [_, { show }] = useContext(a11yDialogContext)
  const ariaLabel = local['aria-label'] || 'Open Dialog'

  return (
    <button type="button" onClick={show} aria-label={ariaLabel} {...rest}>
      {local.children}
    </button>
  )
}
