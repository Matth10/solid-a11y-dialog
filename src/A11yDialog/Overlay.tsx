/* eslint-disable jsx-a11y/click-events-have-key-events */
import { JSX, splitProps, useContext } from 'solid-js'

import { a11yDialogContext } from './context'

export type OverlayProps = JSX.HTMLAttributes<HTMLDivElement>

export const Overlay = (props: OverlayProps) => {
  const [local, rest] = splitProps(props, ['children'])

  const [state, { hide }] = useContext(a11yDialogContext)

  return (
    <div
      data-testid="overlay"
      style={{ 'background-color': 'gray' }}
      onClick={state.role === 'dialog' ? hide : undefined}
      {...rest}
    >
      {local.children}
    </div>
  )
}
