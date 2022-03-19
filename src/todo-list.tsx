import { A11yDialog } from './A11yDialog'

export const App = () => {
  return (
    <div class="container">
      <A11yDialog
        classNames={{
          overlay: 'dialog-overlay',
          dialog: 'dialog-content',
          container: 'dialog-container',
          closeButton: 'dialog-close-button',
        }}
      >
        <div>Content</div>
      </A11yDialog>
    </div>
  )
}
