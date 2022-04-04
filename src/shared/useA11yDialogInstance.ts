import { Accessor, createSignal, onCleanup, onMount } from 'solid-js'
import A11yDialogInstance from 'a11y-dialog'

type UseA11yDialogInstanceResult = {
  instance: Accessor<A11yDialogInstance | null | undefined>
  isOpen: Accessor<boolean>
  ref: (node: Element) => void
  hide: () => void
  show: () => void
}

export const useA11yDialogInstance = (): UseA11yDialogInstanceResult => {
  const [instance, setInstance] = createSignal<A11yDialogInstance | null>()
  const [isOpen, setIsOpen] = createSignal(false)

  const ref = (node: Element) => {
    node ? setInstance(new A11yDialogInstance(node)) : null
  }
  const hide = () => {
    instance()?.hide()
  }
  const show = () => {
    instance()?.show()
  }

  onMount(() => {
    instance()?.on('show', () => {
      setIsOpen(true)
    })

    instance()?.on('hide', () => {
      setIsOpen(false)
    })
  })

  onCleanup(() => instance()?.destroy())

  return { instance, ref, show, hide, isOpen }
}
