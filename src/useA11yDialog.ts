import { JSX, createUniqueId, splitProps, mergeProps, Accessor } from 'solid-js'
import A11yDialogInstance from 'a11y-dialog'
import { DialogRole, useA11yDialogInstance } from './shared'

export type UseA11yDialogProps = {
  id?: string
  role?: DialogRole
  titleId?: string
}
export type UseA11yDialogResults = [Accessor<A11yDialogInstance | undefined | null>, Props]

export type Props = {
  containerProps: ContainerAttrs
  overlayProps: OverlayAttrs
  dialogProps: DialogAttrs
  titleProps: TitleAttrs
  closeButtonProps: CloseBtnAttrs
}
export type ContainerAttrs = {
  ref: (node: Element) => void
  id: string
  role: UseA11yDialogProps['role']
  'aria-labelledby': string
  'aria-hidden': boolean
}
export type OverlayAttrs = {
  onClick: JSX.HTMLAttributes<HTMLElement>['onClick']
}
export type DialogAttrs = {
  role: 'document'
}
export type TitleAttrs = {
  id: string
}
export type CloseBtnAttrs = {
  type: 'button'
  onClick: JSX.HTMLAttributes<HTMLElement>['onClick']
}

const defaultProps = {
  role: 'dialog',
}

export const useA11yDialog = (props?: UseA11yDialogProps): UseA11yDialogResults => {
  const [local] = splitProps(mergeProps(defaultProps, props || {}), ['id', 'role', 'titleId'])

  const { instance, ref, hide } = useA11yDialogInstance()
  const titleId = local.titleId || createUniqueId()

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
