import { JSX, splitProps } from 'solid-js'
import styles from './a11ydialog.module.css'

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement>

export const Dialog = (props: DialogProps) => {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div role="document" class={`${local.class} ${styles['a11ydialog-dialog']}`} {...rest}></div>
  )
}
