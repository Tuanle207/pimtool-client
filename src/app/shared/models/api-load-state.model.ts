

export type LoadingState =  'idle' | 'loading' | 'success' | 'error';

export interface ApiLoadState {
    status: LoadingState;
    error?: string;
    action?: string;
}