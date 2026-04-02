import { type SortField, type SortOrder } from './api';

export type State = {
  search: string;
  debouncedSearch: string;
  page: number;
  sortBy: SortField;
  sortOrder: SortOrder;
};

export type Action =
  | { type: 'SET_SEARCH'; search: string }
  | { type: 'COMMIT_SEARCH' }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SORT'; field: SortField };

export const initialState: State = {
  search: '',
  debouncedSearch: '',
  page: 1,
  sortBy: 'title',
  sortOrder: 'asc',
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.search };
    case 'COMMIT_SEARCH':
      return { ...state, debouncedSearch: state.search.trim(), page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    case 'SORT':
      if (action.field === state.sortBy) {
        return { ...state, sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc', page: 1 };
      }
      return { ...state, sortBy: action.field, sortOrder: 'asc', page: 1 };
  }
}
