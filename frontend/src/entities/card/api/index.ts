import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ICard } from '../models';

export const cardsApi = createApi({
  reducerPath: 'cards',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Cards'],
  endpoints: builder => ({
    getAllCards: builder.query<ICard[], string | void>({
      query: search => 'cards' + (search ? `?search=${search}` : ''),
      providesTags: res =>
        res
          ? [
              ...res.map(({ id }) => ({ type: 'Cards' as const, id })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
    }),
    getCardById: builder.query<ICard, string>({
      query: id => `cards/${id}`,
      providesTags: res => [{ type: 'Cards', id: res?.id }],
    }),
    getFavorites: builder.query<ICard[], void>({
      query: () => 'users/current/favorites',
      providesTags: res =>
        res
          ? [
              ...res.map(({ id }) => ({ type: 'Cards' as const, id })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
    }),
    favorite: builder.mutation<ICard, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `cards/${id}/favorite`,
        method: isFavorite ? 'DELETE' : 'POST',
      }),
      invalidatesTags: res => [{ type: 'Cards', id: res?.id }],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useGetCardByIdQuery,
  useFavoriteMutation,
  useGetFavoritesQuery,
} = cardsApi;
