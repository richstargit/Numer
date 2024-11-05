import { expect, test } from 'vitest';
import { render } from '@testing-library/react'; // Ensure this is from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Matrix from '../src/components/Matrix/MainLinear';
import { bisection } from '../src/components/Root/rootcontroller';
import { LuDecomposition } from '../src/components/Matrix/LinearCal';

test('Matrix', async () => {
  const { getByText, getByRole, getByPlaceholderText } = render(
    <MemoryRouter>
      <Matrix />
    </MemoryRouter>
  );

  expect(getByText('Linear Algebraic Equations')).toBeInTheDocument();

  const selectElement = getByRole('combobox');
  expect(selectElement.value).toBe('select');
  await userEvent.selectOptions(selectElement, 'LU_Decomposition_Method');
  expect(selectElement.value).toBe('LU_Decomposition_Method');

  const N = getByPlaceholderText('N');
  await userEvent.type(N, '3');
  expect(N.value).toBe('3');
  const M = getByPlaceholderText('M');
  await userEvent.type(M, '3');
  expect(M.value).toBe('3');

  const resultLU = LuDecomposition([[-2,3,1],[3,4,-5],[1,-2,1]],[9,0,-4]);
  expect(resultLU.vectorX).toEqual([-1, 2, 1]);

});
