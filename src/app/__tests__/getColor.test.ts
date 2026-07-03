import getColor from '@/features/swagger/SwaggerViewer/getColor';

describe('getColor', () => {
  it.each([
    ['POST', '#1B2927', '#193927'],
    ['PATCH', '#201D35', '#34235A'],
    ['DELETE', '#2B2026', '#582D30'],
    ['GET', '#1D293A', '#203A60'],
    ['UNKNOWN', '#1D293A', '#203A60'],
  ])('returns correct colors for %s', (method, bg, border) => {
    expect(getColor(method)).toEqual({
      methodBgColor: bg,
      methodBorderColor: border,
    });
  });
});
