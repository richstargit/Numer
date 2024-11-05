import { expect, test } from 'vitest';
import { render } from '@testing-library/react'; // Ensure this is from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Root from '../src/components/Root/MainRoot';
import { bisection } from '../src/components/Root/rootcontroller';
import { LuDecomposition } from '../src/components/Matrix/LinearCal';

test('Root', async () => {
  const { getByText, getByRole, getByPlaceholderText } = render(
    <MemoryRouter>
      <Root />
    </MemoryRouter>
  );

  expect(getByText('Root of equations')).toBeInTheDocument();

  const selectElement = getByRole('combobox');

  expect(selectElement.value).toBe('select');

  await userEvent.selectOptions(selectElement, 'bisection_method');

  expect(selectElement.value).toBe('bisection_method');

  const inputField = getByPlaceholderText('43x-180');
  await userEvent.type(inputField, '43x-180');
  expect(inputField.value).toBe('43x-180');

  const X0 = getByPlaceholderText('1.00');
  await userEvent.type(X0, '1');
  expect(X0.value).toBe('1');

  const X1 = getByPlaceholderText('10.00');
  await userEvent.type(X1, '10');
  expect(X1.value).toBe('10');

  const error = getByPlaceholderText('0.000001');
  await userEvent.type(error, '0.000001');
  expect(error.value).toBe('0.000001');

  const submitButton = getByRole('button', { name: 'Submit' });
  

  await userEvent.click(submitButton);

  expect(getByText('Result x = 4.186046421528')).toBeInTheDocument();

  const result = bisection("43x-180", 1, 10, 0.000001);
  expect(result.xresult).toBeCloseTo(4.186, 3);

});
