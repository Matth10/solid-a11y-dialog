import { JSX, splitProps } from 'solid-js'

export type DialogProps = JSX.HTMLAttributes<HTMLDivElement>

export const Dialog = (props: DialogProps) => {

  return (
    <div
      role="document"
      style={{ 'z-index': 10, position: 'relative', 'background-color': 'white' }}
      {...props}
    ></div>
  )
}
