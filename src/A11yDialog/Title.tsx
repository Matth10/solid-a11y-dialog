import { createEffect, JSX, mergeProps, splitProps, useContext } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { a11yDialogContext } from './context'

export type TitleProps = JSX.HTMLAttributes<HTMLHeadingElement> & {
  id?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const defaultProps: TitleProps = {
  level: 1
}

export const Title = (props: TitleProps) => {
  const [local, rest] = splitProps(mergeProps(defaultProps, props), ['id', 'level', 'children'])

  const [state, {setTitleId}] = useContext(a11yDialogContext)

  createEffect(() => {
    // Update titleId to update aria-labelledby of the container
    if(local.id) setTitleId?.(local.id)
  })

  return (
    <Dynamic component={`h${local.level}`} id={state.titleId?.()} {...rest}>
      {local.children}
    </Dynamic>
  )
}
