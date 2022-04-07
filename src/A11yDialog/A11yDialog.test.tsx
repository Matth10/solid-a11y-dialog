import { cleanup, fireEvent, render, screen } from 'solid-testing-library'
import { describe, expect, afterEach, it } from 'vitest'

import A11yDialog from './A11yDialog'

describe('<A11Dialog/>', () => {
  afterEach(cleanup)

  it('should render a container with the right aria-hidden', () => {
    const { getByRole } = render(() => (
      <A11yDialog>
        <A11yDialog.Container>Test</A11yDialog.Container>
      </A11yDialog>
    ))

    const container = getByRole('dialog', { hidden: true }) as HTMLDivElement

    expect(container).toBeInTheDocument()
    expect(container.getAttribute('aria-hidden')).toBe('true')
  })

  it('should render a title', () => {
    render(() => (
      <A11yDialog>
        <A11yDialog.Container>
          <A11yDialog.Dialog>
            <A11yDialog.Title>Title</A11yDialog.Title>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    const title = screen.getByText('Title') as HTMLHeadingElement

    expect(title).toBeInTheDocument()
    expect(title.id).toBeDefined()
  })

  it('should render some content', () => {
    render(() => (
      <A11yDialog>
        <A11yDialog.Container>
          <A11yDialog.Dialog>Content</A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    const content = screen.getByText('Content')

    expect(content).toBeInTheDocument()
  })

  it('should automatically update the aria-labelledby of the container', () => {
    render(() => (
      <A11yDialog>
        <A11yDialog.Container>
          <A11yDialog.Dialog>
            <A11yDialog.Title id="some-id">Title</A11yDialog.Title>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    const container = screen.getByRole('dialog', { hidden: true }) as HTMLDivElement

    expect(container.getAttribute('aria-labelledby')).toBe('some-id')
  })

  it('should render a button to show the dialog', async () => {
    render(() => (
      <A11yDialog>
        <A11yDialog.Open>Open Dialog</A11yDialog.Open>
        <A11yDialog.Container>
          <A11yDialog.Dialog>
            <A11yDialog.Title>Title</A11yDialog.Title>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    expect(screen.getByRole('dialog', { hidden: true }).getAttribute('aria-hidden')).toBe('true')
    const button = screen.getByText('Open Dialog') as HTMLButtonElement
    await click(button)

    expect(screen.getByRole('dialog').getAttribute('aria-hidden')).toBe(null)
  })

  it('should render a button to hide the dialog', async () => {
    render(() => (
      <A11yDialog>
        <A11yDialog.Open>Open Dialog</A11yDialog.Open>
        <A11yDialog.Container>
          <A11yDialog.Dialog>
            <A11yDialog.Close>Close Dialog</A11yDialog.Close>
            <A11yDialog.Title>Title</A11yDialog.Title>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    const button = screen.getByText('Open Dialog') as HTMLButtonElement
    await click(button)
    expect(screen.getByRole('dialog').getAttribute('aria-hidden')).toBe(null)

    const close = screen.getByText('Close Dialog') as HTMLButtonElement
    await click(close)
    expect(screen.getByRole('dialog', { hidden: true }).getAttribute('aria-hidden')).toBe('true')
  })

  describe('<A11yDialog.Overlay />', () => {
    afterEach(cleanup)

    it('should let the user close the dialog by clicking on it if the dialog has a role="dialog"', async () => {
      render(() => (
        <A11yDialog role="dialog">
          <A11yDialog.Open>Open Dialog</A11yDialog.Open>
          <A11yDialog.Container>
            <A11yDialog.Overlay></A11yDialog.Overlay>
            <A11yDialog.Dialog>
              <A11yDialog.Close>Close Dialog</A11yDialog.Close>
              <A11yDialog.Title>Title</A11yDialog.Title>
            </A11yDialog.Dialog>
          </A11yDialog.Container>
        </A11yDialog>
      ))

      await openDialog()
      expect(screen.getByRole('dialog').getAttribute('aria-hidden')).toBe(null)

      const close = screen.getByTestId('overlay') as HTMLDivElement
      await click(close)
      expect(screen.getByRole('dialog', { hidden: true }).getAttribute('aria-hidden')).toBe('true')
    })

    it('should not let the user close the dialog by clicking on it if the dialog has a role="alertdialog"', async () => {
      render(() => (
        <A11yDialog role="alertdialog">
          <A11yDialog.Open>Open Dialog</A11yDialog.Open>
          <A11yDialog.Container>
            <A11yDialog.Overlay></A11yDialog.Overlay>
            <A11yDialog.Dialog>
              <A11yDialog.Close>Close Dialog</A11yDialog.Close>
              <A11yDialog.Title>Title</A11yDialog.Title>
            </A11yDialog.Dialog>
          </A11yDialog.Container>
        </A11yDialog>
      ))

      await openDialog()
      expect(screen.getByRole('alertdialog').getAttribute('aria-hidden')).toBe(null)

      const close = screen.getByTestId('overlay') as HTMLDivElement
      await click(close)
      expect(screen.getByRole('alertdialog').getAttribute('aria-hidden')).toBe(null)
    })
  })
})

async function click(element?: HTMLElement | undefined) {
  if (!element) return

  fireEvent.click(element)
  await Promise.resolve()
}

async function openDialog() {
  const button = screen.getByText('Open Dialog') as HTMLButtonElement
  await click(button)
}
