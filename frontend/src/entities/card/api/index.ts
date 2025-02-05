import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ICard } from '../models';

export const cardsApi = createApi({
  reducerPath: 'cards',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  endpoints: builder => ({
    getAllCards: builder.query<ICard[], void>({
      query: () => 'cards',
    }),
    getCardById: builder.query<ICard, string>({
      query: id => `cards/${id}`,
    }),
  }),
});

export const { useGetAllCardsQuery, useGetCardByIdQuery } = cardsApi;
