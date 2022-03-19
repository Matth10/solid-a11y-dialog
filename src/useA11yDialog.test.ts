import { createRoot } from 'solid-js'
import { describe, expect, it } from 'vitest'
import { useA11yDialog } from './useA11yDialog'

describe('useA11yDialog', () => {
  describe('dialog container', () => {
    it('must have a unique name/id', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()
        const [instance_1, props_1] = useA11yDialog({ id: 'some-id' })

        expect(props.containerProps.id).toBeDefined()
        expect(props_1.containerProps.id).toBe('some-id')
        dispose()
      })
    })

    it('it should have an initial aria-hidden="true" attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()

        expect(props.containerProps['aria-hidden']).toBeTruthy()
        dispose()
      })
    })

    it('it could have a role of dialog', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()

        expect(props.containerProps.role).toBe('dialog')
        dispose()
      })
    })

    it('it could have a role of alertdialog', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog({ role: 'alertdialog' })

        expect(props.containerProps.role).toBe('alertdialog')
        dispose()
      })
    })

    it('it should have a aria-labelledby attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()
        const [instance_1, props_1] = useA11yDialog({ titleId: 'some-id' })

        expect(props.containerProps['aria-labelledby']).toBeDefined()
        expect(props_1.containerProps['aria-labelledby']).toBe('some-id')
        dispose()
      })
    })
  })

  describe('dialog overlay', () => {
    it('it should have the onClick attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()

        expect(props.overlayProps.onClick).toBeDefined()
        dispose()
      })
    })
    it('it should not have the data-a11y-dialog-hide attribute if it is an alertdialog', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog({ role: 'alertdialog' })

        expect(props.overlayProps.onClick).not.toBeDefined()
        dispose()
      })
    })
  })

  describe('dialog', () => {
    it('it should have the role="document" attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog({ role: 'alertdialog' })

        expect(props.dialogProps.role).toBe('document')
        dispose()
      })
    })
  })
  describe('dialog close button', () => {
    it('it should have the type="button" attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()

        expect(props.closeButtonProps.type).toBe('button')
        dispose()
      })
    })
    it('it should not have the data-a11y-dialog-hide attribute', () => {
      createRoot(dispose => {
        const [instance, props] = useA11yDialog()

        expect(props.closeButtonProps.onClick).toBeDefined()
        dispose()
      })
    })
  })
})
