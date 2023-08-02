import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useInput<T = unknown>(
  init: T
): [
  T,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
] {
  const [input, setInput] = useState<T>(init);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setInput(e.target.value as unknown as T);
    },
    []
  );

  return [input, handleOnChange, setInput];
}
