import { useEffect, useRef } from 'react'

/**
 * A custom React hook that listens for clicks outside of a specified element
 * and executes a callback function when detected.
 *
 * @param onOutsideClick The callback function to execute when an outside click is detected
 *
 * @returns A map object containing the following properties:
 *    `elementRef`: A React ref object that should be attached to the element that
 *                  should listen for outside clicks
 *
 */
const useListenForOutsideClicks = (onOutsideClick: () => void) => {
  const elementRef = useRef<any>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick?.()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onOutsideClick])

  return { elementRef }
}

export default useListenForOutsideClicks