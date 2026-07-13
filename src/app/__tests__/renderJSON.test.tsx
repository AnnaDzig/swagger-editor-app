import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { renderJSON } from '../../features/swagger/SwaggerViewer/EndpointDetails/Responses/renderJSON';

describe('renderJSON', () => {
  const getColor = (container: HTMLElement, text: string) => {
    const elements = Array.from(container.querySelectorAll('span'));
    const element = elements.find((el) => el.textContent === text);
    return element?.style.color;
  };

  it('should render key-value pairs with correct colors', () => {
    const line = '  "id": "123",';
    const { container } = render(<>{renderJSON(line)}</>);

    // Ключ "id"
    expect(getColor(container, '"id"')).toBe('rgb(121, 192, 255)'); // #79c0ff
    // Разделитель :
    expect(getColor(container, ': ')).toBe('rgb(139, 148, 158)'); // #8b949e
    // Значение "123"
    expect(getColor(container, '"123"')).toBe('rgb(165, 214, 255)'); // #a5d6ff
    // Хвост ,
    expect(getColor(container, ',')).toBe('rgb(139, 148, 158)');
  });

  it('should colorize numeric values', () => {
    const line = '  "count": 100';
    const { container } = render(<>{renderJSON(line)}</>);
    expect(getColor(container, '100')).toBe('rgb(210, 168, 255)'); // #d2a8ff
  });

  it('should colorize boolean and null values', () => {
    const testCases = ['true', 'false', 'null'];
    testCases.forEach((val) => {
      const { container } = render(<>{renderJSON(`  "key": ${val}`)}</>);
      expect(getColor(container, val)).toBe('rgb(210, 168, 255)');
    });
  });

  it('should colorize brackets and braces', () => {
    const lines = ['{', '}', '[', ']'];
    lines.forEach((line) => {
      const { container } = render(<>{renderJSON(line)}</>);
      // Для одиночных символов попадает в финальный return или jsonValue
      const element = container.querySelector('span');
      expect(element?.style.color).toBe('rgb(139, 148, 158)');
    });
  });

  it('should render standalone strings (e.g. in arrays)', () => {
    const line = '  "only-string",';
    const { container } = render(<>{renderJSON(line)}</>);
    expect(getColor(container, '"only-string"')).toBe('rgb(165, 214, 255)');
    expect(getColor(container, ',')).toBe('rgb(139, 148, 158)');
  });

  it('should handle empty lines or unknown format', () => {
    const { container } = render(<>{renderJSON('')}</>);
    const element = container.querySelector('span');
    expect(element?.textContent).toBe(' ');
  });
});
