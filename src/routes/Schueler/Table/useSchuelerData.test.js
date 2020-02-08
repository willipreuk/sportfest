import { renderHook, act } from '@testing-library/react-hooks';
import useSchuelerData, { __get__ } from './useSchuelerData';

describe('hook useSchuelerData', () => {
  const schuelerData = {
    allSchueler: {
      schueler: [
        { klasse: { stufe: 5, name: 1 }, id: 1, status: null },
        { klasse: { stufe: 6, name: 1 }, id: 2, status: 'E' },
        { klasse: { stufe: 10, name: 1 }, id: 3, status: null },
      ],
      total: 3,
    },
  };
  describe('create schuelerData', () => {
    const createSchuelerData = __get__('createData');
    it('should concat klasse', () => {
      expect.assertions(1);
      const schueler = createSchuelerData(schuelerData.allSchueler.schueler[0]);
      expect(schueler.klasse).toBe('5/1');
    });
    it('should return CheckBox', () => {
      expect.assertions(1);
      const schueler = createSchuelerData(schuelerData.allSchueler.schueler[0]);
      expect(schueler.checkbox).not.toBeNull();
    });
  });
  it('should return total', () => {
    expect.assertions(1);
    const { result } = renderHook(() => useSchuelerData());
    act(() => result.current.setData(schuelerData));
    expect(result.current.total).toBe(3);
  });
});
