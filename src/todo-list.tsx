import A11yDialog from './A11yDialog/A11yDialog'
import { A11yDialogComposable } from './A11yDialogComposable.example'

export const App = () => {
  return (
    <div class="container">
      <A11yDialogComposable
        classNames={{
          overlay: 'dialog-overlay',
          dialog: 'dialog-content',
          container: 'dialog-container',
          closeButton: 'dialog-close-button',
        }}
      >
        <div>Content</div>
      </A11yDialogComposable>

      <A11yDialog>
        <A11yDialog.Open class="-primary">Open Modal</A11yDialog.Open>
        <A11yDialog.Container class="dialog-container">
          <A11yDialog.Overlay class="dialog-overlay" />
          <A11yDialog.Dialog class="dialog-content">
            <A11yDialog.Close> &times;</A11yDialog.Close>
            <A11yDialog.Title id="some-id">Super Title</A11yDialog.Title>
            <div>Content</div>
          </A11yDialog.Dialog>
        </A11yDialog.Container>
      </A11yDialog>
    </div>
  )
}
