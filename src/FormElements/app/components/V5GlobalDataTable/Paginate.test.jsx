import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import  renderer from 'react-test-renderer'
import '@testing-library/jest-dom'

import Paginate from 'src/FormElements/app/components/V5GlobalDataTable/Paginate'

afterEach(cleanup)

describe('<Paginate/>', () => {
    it('renders correctly', () => {
        const paginate = renderer.create(<Paginate />).toJSON()
        expect(paginate).toMatchSnapshot()
    })

    it('Paginate added in Dom ', () => {
        const paginate = renderer.create(<Paginate />).toJSON()
        expect(paginate).toBeTruthy()
    })

    it('Buttons in Paginate ', async () => {
        render(<Paginate />)
        const button = screen.getAllByRole('button')
        expect(button).toBeTruthy()
    })

    it('check 4 Buttons in Paginate ', () => {
        render(<Paginate />)
        const button = screen.getAllByRole('button')
        expect(button).toHaveLength(4)
    })

    it('check first page Buttons in Paginate ', () => {
        render(<Paginate />)
        const button = screen.getByLabelText('Go to first page')
        expect(button).toBeTruthy()
    })

    it('check previous page Buttons in Paginate ', () => {
        render(<Paginate />)
        const button = screen.getByLabelText('Go to previous page')
        expect(button).toBeTruthy()
    })

    it('check next page Buttons in Paginate ', () => {
        render(<Paginate />)
        const button = screen.getByLabelText('Go to next page')
        expect(button).toBeTruthy()
    })

    it('check last page Buttons in Paginate ', () => {
        render(<Paginate />)
        const button = screen.getByLabelText('Go to last page')
        expect(button).toBeTruthy()
    })
})
