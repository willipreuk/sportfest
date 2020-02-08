import { renderHook, act } from '@testing-library/react-hooks';
import usePagination from './usePagination';

describe('hook usePagination', () => {
  it('should return default state', () => {
    expect.assertions(2);
    const { result } = renderHook(() => usePagination());
    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(10);
  });
  it('should change page', () => {
    expect.assertions(1);
    const { result } = renderHook(() => usePagination([]));
    act(() => result.current.onChangePage(null, 2));
    expect(result.current.page).toBe(2);
  });
  it('should change rows and reset page', () => {
    expect.assertions(2);
    const { result } = renderHook(() => usePagination([]));
    act(() => result.current.onChangeRows({ target: { value: 50 } }));
    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(50);
  });
});
