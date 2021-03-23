///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.

import React from 'react';
import Display from '../Display';
import { screen, render, waitFor } from '@testing-library/react'

import mockFetchShow from '../../api/fetchShow';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/fetchShow');

test("renders without props", () => {
    render(<Display />);
});

const testShow = {
    name: 'Show Name',
    summary: 'Show Summary',
    seasons: [
        {   id: 0, 
            name: '1', 
            episodes: [
                {id: 1, 
                name: 'Episode Name', 
                image: null, 
                season: 1, 
                number: 1, 
                summary: 'Episode Summary', 
                runtime: 1
            }
        ]},
        {
            id: 1,
            name: 'season 2',
            episodes: [],
        }
    ]
}

test('When get show button pressed show component', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow) 
    const button = screen.queryByRole('button');
    userEvent.click(button);
    const showDetails = await screen.findByTestId("show-container")
    expect(showDetails).toBeInTheDocument();
})

test('When get show button pressed, num seasons = num seasons in test data', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow) 

    const button = screen.queryByRole('button');
    userEvent.click(button);

    const seasons = await screen.findAllByTestId('season-option')
    expect(seasons).toHaveLength(2);
})

test('displayFunc is called when fetch button is clicked', async () => {
    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc} />)

    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(() => expect(mockDisplayFunc).toHaveBeenCalled());
});

