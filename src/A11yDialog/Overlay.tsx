import { JSX, splitProps, useContext } from 'solid-js'
import { a11yDialogContext } from './context'
import styles from './a11ydialog.module.css'

export type OverlayProps = JSX.HTMLAttributes<HTMLDivElement>

export const Overlay = (props: OverlayProps) => {
  const [local, rest] = splitProps(props, ['children', 'class'])

  const [state, { hide }] = useContext(a11yDialogContext)

  return (
    <div
      class={`${local.class} ${styles['a11ydialog-overlay']}`}
      onClick={state.role === 'dialog' ? hide : undefined}
      {...rest}
    >
      {local.children}
    </div>
  )
}
