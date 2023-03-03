import {Loader} from '@/components/Loader';
import { useState } from 'react';

export function useLoader(){
    const [isLoaded, setLoaded] = useState<boolean>(false);
    return {
        isLoaded, 
        setLoaded: () => setLoaded(true),
        Loader
    }
}