import {
  JSX,
  createUniqueId,
  splitProps,
  mergeProps,
  createSignal,
  onCleanup,
  Accessor,
} from 'solid-js'
import A11yDialogInstance from 'a11y-dialog'

export type UseA11yDialogProps = {
  id?: string
  role?: 'dialog' | 'alertdialog'
  titleId?: string
}
export type UseA11yDialogResults = [Accessor<A11yDialogInstance | undefined | null>, Props]

export type Props = {
  containerProps: ContainerProps
  overlayProps: OverlayProps
  dialogProps: DialogProps
  titleProps: TitleProps
  closeButtonProps: CloseBtnProps
}
export type ContainerProps = {
  ref: (node: Element) => void
  id: string
  role: UseA11yDialogProps['role']
  'aria-labelledby': string
  'aria-hidden': boolean
}
export type OverlayProps = {
  onClick: JSX.HTMLAttributes<HTMLElement>['onClick']
}
export type DialogProps = {
  role: 'document'
}
export type TitleProps = {
  id: string
}
export type CloseBtnProps = {
  type: 'button'
  onClick: JSX.HTMLAttributes<HTMLElement>['onClick']
}

const defaultProps = {
  role: 'dialog',
}

export const useA11yDialog = (props?: UseA11yDialogProps): UseA11yDialogResults => {
  const [local] = splitProps(mergeProps(defaultProps, props || {}), ['id', 'role', 'titleId'])
  const [instance, setInstance] = createSignal<A11yDialogInstance | null>()
  const titleId = local.titleId || createUniqueId()

  const ref = (node: Element) => (node ? setInstance(new A11yDialogInstance(node)) : null)
  const hide = () => instance && instance()?.hide()

  onCleanup(() => instance && instance()?.destroy())

  return [
    instance,
    {
      containerProps: {
        ref,
        id: local.id || createUniqueId(),
        role: local.role,
        'aria-hidden': true,
        'aria-labelledby': titleId,
      },
      overlayProps: {
        onClick: local.role === 'dialog' ? hide : undefined,
      },
      dialogProps: {
        role: 'document',
      },
      closeButtonProps: {
        type: 'button',
        onClick: hide,
      },
      titleProps: {
        id: titleId,
      },
    },
  ]
}
