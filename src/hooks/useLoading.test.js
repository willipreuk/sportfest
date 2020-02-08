import { renderHook, act } from '@testing-library/react-hooks';
import useLoading from './useLoading';

jest.useFakeTimers();

describe('hook useLoading', () => {
  it('should set loading', () => {
    expect.assertions(1);

    const { result } = renderHook(() => useLoading());

    act(() => result.current.setLoading(true));

    expect(result.current.loading).toBe(true);
  });
  it('should wait min 400ms', async () => {
    expect.assertions(1);

    const { result } = renderHook(() => useLoading());

    act(() => result.current.setLoading(true));
    act(() => result.current.setLoading(false));

    act(jest.runOnlyPendingTimers);
    expect(result.current.loading).toBe(false);
  });
});
