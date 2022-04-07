import A11yDialogInstance from 'a11y-dialog'
import { Accessor, createMemo, createUniqueId, JSX, mergeProps, splitProps } from 'solid-js'

import { DialogRole, useA11yDialogInstance } from './shared'

export type UseA11yDialogProps = {
  id?: string
  role?: DialogRole
  titleId?: string
}
export type UseA11yDialogResults = [
  Accessor<A11yDialogInstance | undefined | null>,
  Accessor<Props>
]

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
  const mergedProps = mergeProps(defaultProps, props || {})
  const [local] = splitProps(mergedProps, ['id', 'role', 'titleId'])

  const { instance, ref, hide } = useA11yDialogInstance()
  const titleId = () => local.titleId || createUniqueId()

  const attributes = createMemo(() => ({
    containerProps: {
      ref,
      id: local.id || createUniqueId(),
      role: local.role,
      'aria-hidden': true,
      'aria-labelledby': titleId(),
    },
    overlayProps: {
      onClick: local.role === 'dialog' ? hide : undefined,
    },
    dialogProps: {
      role: 'document' as const,
    },
    closeButtonProps: {
      type: 'button' as const,
      onClick: hide,
    },
    titleProps: {
      id: titleId(),
    },
  }))

  return [instance, attributes]
}
