import type { AuthBuilder } from '@/features/auth/store/slice';

export function applyAsyncReducers(
  builder: AuthBuilder,
  ...asyncReducers: ((builder: AuthBuilder) => void)[]
) {
  asyncReducers.forEach(reducer => reducer(builder));
}
