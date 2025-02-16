import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ICard, ICardCreate } from '../models';

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
    getCardsByType: builder.query<ICard[], string | void>({
      query: type => 'cards' + (type ? `?type=${type}` : ''),
      providesTags: res =>
        res
          ? [
              ...res.map(({ id }) => ({ type: 'Cards' as const, id })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
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
    createCard: builder.mutation<ICard, ICardCreate>({
      query: data => ({
        url: 'cards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    archiveCard: builder.mutation<ICard, string>({
      query: id => ({
        url: `cards/${id}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: res => [{ type: 'Cards', id: res?.id }],
    }),
    unarchiveCard: builder.mutation<ICard, string>({
      query: id => ({
        url: `cards/${id}/activate`,
        method: 'POST',
      }),
      invalidatesTags: res => [{ type: 'Cards', id: res?.id }],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useGetCardByIdQuery,
  useGetCardsByTypeQuery,
  useFavoriteMutation,
  useGetFavoritesQuery,
  useCreateCardMutation,
  useArchiveCardMutation,
  useUnarchiveCardMutation,
} = cardsApi;
