import { cleanup, fireEvent, render, screen } from 'solid-testing-library'
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
    const {debug} =render(() => (
      <A11yDialog>
        <A11yDialog.Open>Open Dialog</A11yDialog.Open>
        <A11yDialog.Container>
          <A11yDialog.Dialog>
            <A11yDialog.Title>Title</A11yDialog.Title>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    ))

    expect(screen.getByRole('dialog', {hidden:true}).getAttribute('aria-hidden')).toBe('true')
    const button = screen.getByText('Open Dialog') as HTMLButtonElement
    await clickButton(button)

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
    await clickButton(button)
    expect(screen.getByRole('dialog').getAttribute('aria-hidden')).toBe(null)

    const close = screen.getByText('Close Dialog') as HTMLButtonElement
    await clickButton(close)
    expect(screen.getByRole('dialog', {hidden:true}).getAttribute('aria-hidden')).toBe('true')
  })
})

async function clickButton(button?: HTMLButtonElement) {
  if (!button) return

  fireEvent.click(button)
  await Promise.resolve()
}
