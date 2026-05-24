import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1

/**
 * Toast removal is intentionally delayed - toasts are dismissed via user
 * interaction (onOpenChange) rather than timeout. The long delay ensures
 * dismissed toasts aren't prematurely removed from the DOM during transitions.
 * Value: 1,000,000ms ≈ 16.7 minutes.
 */
const TOAST_REMOVE_DELAY = 1_000_000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// actionTypes is only used as a type-level reference; the value itself is
// consumed by the reducer's Action union via `typeof actionTypes`.
const _actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

type Action = {
  type: (typeof _actionTypes)[keyof typeof _actionTypes]
} & (
  | { type: typeof _actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof _actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof _actionTypes.DISMISS_TOAST; toastId?: ToasterToast["id"] }
  | { type: typeof _actionTypes.REMOVE_TOAST; toastId?: ToasterToast["id"] }
)

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case _actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case _actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case _actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case _actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

/**
 * Module-level state for the toast store. This is intentionally kept in
 * module scope (not React state) to allow imperative access from outside
 * React components (e.g., from async handlers). React state is synced via
 * the listeners array on every dispatch.
 */
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  // Generates a short unique ID for each toast.
  // Uses crypto.randomUUID for collision-resistant IDs without
  // module-level mutable counter state.
  const id = crypto.randomUUID().slice(0, 8)

  const update = (props: ToasterToast) =>
    dispatch({
      type: _actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: _actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: _actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: _actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }