# Solid A11y Dialog

![example workflow](https://github.com/Matth10/solid-a11y-dialog/actions/workflows/main.yml/badge.svg)

Solid implementation of a11y-dialog to build lightweight yet flexible script to create accessible dialog windows

## Setup

Install the npm package.

#### With npm/pnpm

`npm install solid-a11y-dialog // or pnpm install solid-a11y-dialog`

#### With yarn

`npm install solid-a11y-dialog // or pnpm install solid-a11y-dialog`

## How to use it?

### Headless Mode

To have full control over your Dialog component. You can use a composable function that will give you the right attributes and event handlers for each dialog element.
This is very handful if you don't want to have a pre-defined HTML semantic and component architecture.

```tsx
export const A11yDialog = (props: A11yDialogProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['classNames'])
  // Custom composables
  const [instance, attrs] = useA11yDialog()

  // Can have access to the A11yDialog instance and hide or show the dialog programmatically
  const openModal = () => instance && instance()?.show()

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <div {...attrs().containerProps} class={local.classNames?.container} {...rest}>
        <div {...attrs().overlayProps} class={local.classNames?.overlay}></div>
        <div {...attrs().dialogProps} class={local.classNames?.dialog}>
          <button
            {...attrs().closeButtonProps}
            class={local.classNames?.closeButton}
            aria-label="Close dialog"
          >
            &times;
          </button>
          <h1 {...attrs().titleProps}>Your dialog title</h1>
          {props.children}
        </div>
      </div>
    </>
  )
}
```

#### API

### Component Mode

On the other hand, you can have a set of components to create your own `<Dialog/>`. This method will help you setup some HTML semantic and some basic styling.

```tsx
export const A11yDialog = (props: A11yDialogProps): JSX.Element => {
  const [local, rest] = splitProps(props, ['classNames'])

  return (
    <A11yDialog>
      <A11yDialog.Open>Open Modal</A11yDialog.Open>
      <A11yDialog.Container {...rest}>
        <A11yDialog.Overlay class={local.classNames?.overlay}></A11yDialog.Overlay>
        <Dialog class={local.classNames?.dialog}>
          <Dialog.Close class={local.classNames?.closeButton}>&times;</Dialog.Close>
          <Dialog.Title>Your dialog title</Dialog.Title>
          {props.children}
        </Dialog>
      </A11yDialog.Container>
    </A11yDialog>
  )
}
```
