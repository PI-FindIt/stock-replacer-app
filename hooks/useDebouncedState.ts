import { Dispatch, SetStateAction, useState } from "react";
import { useDebounce } from "use-debounce";

/*
 * This hook is used to create a debounced state.
 * Its usage is similar to the `useState` hook, but it adds a delay before updating the state.
 *
 * @param initialValue - The initial value of the state.
 * @param delay - The delay in milliseconds before the state is updated. Default is 500ms.
 *
 * @returns [debouncedValue, setValue: Dispatch, value]
 *
 * @example
 * const [debouncedValue, setValue, value] = useDebouncedState<string>("", 300);
 */
export const useDebouncedState = <T>(
  initialValue: T,
  delay: number = 500,
): [T, Dispatch<SetStateAction<T>>, T] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue] = useDebounce<T>(value, delay);

  return [debouncedValue, setValue, value];
};
