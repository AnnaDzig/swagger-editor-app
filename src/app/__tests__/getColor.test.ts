import {
  getMethodColor,
  getResponseColor,
} from '@/features/swagger/SwaggerViewer/getColor';

describe('getColor', () => {
  describe('getMethodColor', () => {
    it.each([
      ['POST', '#23863618', '#23863635', '#56d364'],
      ['PUT', '#7c3aed18', '#7c3aed35', '#a78bfa'],
      ['DELETE', '#f8514918', '#f8514935', '#ff7b72'],
      ['GET', '#1D293A', '#203A60', '#79c0ff'],
      ['PATCH', '#1D293A', '#203A60', '#79c0ff'],
      ['UNKNOWN', '#1D293A', '#203A60', '#79c0ff'],
      ['', '#1D293A', '#203A60', '#79c0ff'],
    ])('returns correct colors for %s', (method, bg, border, color) => {
      expect(getMethodColor(method)).toEqual({
        methodBgColor: bg,
        methodBorderColor: border,
        methodColor: color,
      });
    });
  });

  describe('getResponseColor', () => {
    it.each([
      ['200', '#54CD61', '#1C2128', '#2A2E4D'],
      ['201', '#54CD61', '#1C2128', '#2A2E4D'],
      ['400', '#C49B3B', '#0D1117', '#30363D'],
      ['404', '#C49B3B', '#0D1117', '#30363D'],
      ['500', '#C49B3B', '#0D1117', '#30363D'],
      ['UNKNOWN', '#C49B3B', '#0D1117', '#30363D'],
      ['', '#C49B3B', '#0D1117', '#30363D'],
    ])(
      'returns correct colors for status %s',
      (status, color, bgColor, borderColor) => {
        expect(getResponseColor(status)).toEqual({
          statusColor: color,
          statusBgColor: bgColor,
          statusBorderColor: borderColor,
        });
      },
    );
  });
});
