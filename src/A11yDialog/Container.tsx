import { createUniqueId, JSX, splitProps, useContext } from 'solid-js'

import { a11yDialogContext } from './context'

export type ContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  id?: string
}

export const Container = (props: ContainerProps) => {
  const [local, rest] = splitProps(props, ['id', 'children'])

  const id = () => local.id || createUniqueId()
  const [state, { ref }] = useContext(a11yDialogContext)

  return (
    <div
      ref={ref}
      role={state.role}
      id={id()}
      aria-hidden={true}
      aria-labelledby={state.titleId && state.titleId()}
      style={{
        position: 'fixed',
        inset: '0',
        'z-index': 10,
        display: state.isOpen?.() ? 'grid' : 'none',
        'place-items': 'center',
      }}
      {...rest}
    >
      {local.children}
    </div>
  )
}
