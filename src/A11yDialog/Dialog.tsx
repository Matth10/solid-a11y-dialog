import { JSX } from 'solid-js'

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement>

export const Dialog = (props: DialogProps) => {
  return <div role="document" {...props}></div>
}
