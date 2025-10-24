/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSlides, ApiRequestError } from './api';
import * as utils from '@shoppe/shared/utils'


const mockSlidesResponse = {
  data: [
    { id: 1, attributes: { title: 'Slide number 1' } },
    { id: 2, attributes: { title: 'Slide number 2' } },
  ],
};

describe('getSlides', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Must return data in response if request was successed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => mockSlidesResponse,
      }),
    );

    const result = await getSlides();

    expect(result).toEqual(mockSlidesResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.dev.cwe.su/api/promos/?populate=*',
    );
  });

  it('Must throw an error if request was failed', async () => {
    const errorResponse = {
      error: {
        status: 400,
        name: 'BadRequest',
        message: 'Invalid request',
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => errorResponse,
      }),
    );

    vi.spyOn(utils, 'isErrorResponse').mockReturnValue(true);

    try {
      await getSlides();
      throw new Error('Expected error was not thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(ApiRequestError);
      expect((e as ApiRequestError).errorMessage).toMatch(/BadRequest/);
    }
  });
});
