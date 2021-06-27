import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { renderHook, act } from '@testing-library/react-hooks';
import useAsync from './hooks/useAsync';
import { getAllPlanets } from './swapi';


const getPlanetById = async () => {
    let resp = await fetch(`https://swapi.dev/api/planets/1`);
    return resp.json();
}

test('fetches planet data by ID', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync(getPlanetById))

    await waitForNextUpdate()
    expect(result.current.status).toBe("success");
    expect(result.current.value.name).toBe("Tatooine");
});

test('fetches all planet data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync(getAllPlanets))

    await waitForNextUpdate()
    expect(result.current.status).toBe("success");
    expect(result.current.value.length).toBe(60);
});