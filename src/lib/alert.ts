import Swal, { SweetAlertOptions } from 'sweetalert2'

// Custom styled SweetAlert that matches shadcn/ui aesthetic
export const showAlert = (options: SweetAlertOptions) => {
  const defaultStyles = {
    // Font styling
    confirmButtonColor: 'hsl(222.2 47.4% 11.2%)',
    cancelButtonColor: 'transparent',

    // Typography
    customClass: {
      container: 'font-sans',
      popup: 'rounded-lg border border-border bg-background p-6 shadow-lg',
      title: '!text-lg !font-semibold !text-foreground !text-left !p-0 !font-manrope',
      htmlContainer: '!text-sm !text-muted-foreground !text-left !p-0 !font-manrope',
      confirmButton:
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
      cancelButton:
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-muted-foreground',
      actions: 'gap-2 !w-full !flex flex-row-reverse !items-center !justify-start'
    },

    // Background colors
    background: 'hsl(0 0% 100%)',
    backdrop: 'bg-background/80 backdrop-blur-sm',

    // Button styling
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',

    // Animation
    showClass: {
      popup: 'animate-in fade-in-0 slide-in-from-bottom-2 duration-300'
    },
    hideClass: {
      popup: 'animate-out fade-out-0 slide-out-to-bottom-2 duration-200'
    }
  }

  return Swal.fire({
    ...defaultStyles,
    ...options
  })
}

// Usage examples
export const showSuccess = (title: string, message: string) => {
  return showAlert({
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'OK',
    showCancelButton: false
  })
}

export const showError = (title: string, message: string) => {
  return showAlert({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'OK',
    showCancelButton: false
  })
}

export const showConfirm = (props: SweetAlertOptions) => {
  return showAlert(props)
}
