import { NavigateFunction } from 'react-router-dom';

export const navigateTo = (navigate: NavigateFunction, path: string) => {
    navigate(`/${path}`);
};
