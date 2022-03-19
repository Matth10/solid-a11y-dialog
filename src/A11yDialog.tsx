import { JSX, onMount, splitProps } from 'solid-js'
import { useA11yDialog } from './useA11yDialog'

export type A11yDialogProps = {
  children?: JSX.ArrayElement
  classNames?: {
    container?: string
    overlay?: string
    dialog?: string
    closeButton?: string
  }
}

export const A11yDialog = (props: A11yDialogProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['classNames'])
  const [instance, attrs] = useA11yDialog()

  const openModal = () => instance && instance()?.show()

  return (
    <>
      <button onClick={openModal} class="-primary">
        Open Modal
      </button>
      <div {...attrs.containerProps} class={local.classNames?.container} {...rest}>
        <div {...attrs.overlayProps} class={local.classNames?.overlay}></div>
        <div {...attrs.dialogProps} class={local.classNames?.dialog}>
          <button
            {...attrs.closeButtonProps}
            class={local.classNames?.closeButton}
            aria-label="Close dialog"
          >
            &times;
          </button>
          <h1 {...attrs.titleProps}>Your dialog title</h1>
          {props.children}
        </div>
      </div>
    </>
  )
}
