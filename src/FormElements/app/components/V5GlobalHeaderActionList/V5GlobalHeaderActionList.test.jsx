import React from 'react'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { create } from 'react-test-renderer'
import V5GlobalHeaderActionList from './V5GlobalHeaderActionList'

afterEach(cleanup)

const addClient = jest.fn()
const handleFilterClick = jest.fn()
const downloadClientDetails = jest.fn()
const props = {
    title: 'Client Management',
    iconsList: [
        {
            iconType: 'SaveAltIcon',
            tooltipTitle: 'Download Excel',
            areaLabel: 'upload picture',
            iconComponent: 'span',
            iconClickHandler: downloadClientDetails,
        },
        {
            iconType: 'PersonAddIcon',
            tooltipTitle: 'Add Client',
            areaLabel: 'upload picture',
            iconComponent: 'span',
            iconClickHandler: addClient,
        },
        {
            iconType: 'Filter',
            tooltipTitle: 'Filter',
            areaLabel: 'upload picture',
            iconComponent: 'span',
            iconClickHandler: handleFilterClick,
            ref: {
                current: undefined,
            },
        },
    ],
}

describe('V5GlobalHeaderActionList', () => {
    test('Should render V5GlobalHeaderActionList ', () => {
        const V5GlobalActionHeader = render(
            <V5GlobalHeaderActionList {...props} />
        )
        expect(V5GlobalActionHeader).toBeTruthy()
    })
    test('Should check heading tag', () => {
        const { rerender } = render(<V5GlobalHeaderActionList {...props} />)

        const headingElement = screen.getByRole('heading', { level: 3 })
        // screen.debug(headingElement)
        expect(headingElement).toHaveTextContent('Client Management')
    })

    test('Should Check Buttons in header component', () => {
        render(<V5GlobalHeaderActionList {...props} />)

        const buttonElement = screen.getAllByRole('button')
        // screen.debug(buttonElement)
        expect(buttonElement).toHaveLength(3)
    })
})

describe('Should Render V5GlobalHeaderActionList', () => {
    it('should render <V5GlobalHeaderActionList/>', () => {
        const V5GlobalActionHeader = render(
            <V5GlobalHeaderActionList {...props} />
        )
        expect(V5GlobalActionHeader).toBeTruthy()
    })

    it('Should Render First Child', () => {
        const { getByTestId } = render(<V5GlobalHeaderActionList {...props} />)
        const firstElement = getByTestId('header-Action-Div')
        expect(firstElement.firstChild).toBeTruthy()
    })

    it('Should Render Last Child', () => {
        const { getByTestId } = render(<V5GlobalHeaderActionList {...props} />)
        const lastElement = getByTestId('header-Action-Div')
        expect(lastElement.lastChild).toBeTruthy()
    })

    it('Should Check in Document', () => {
        const { getByTestId } = render(<V5GlobalHeaderActionList {...props} />)
        const headerAction = getByTestId('header-Action-Div')
        expect(headerAction).toBeInTheDocument()
    })

    it('Check Title props', () => {
        const { getByTestId } = render(<V5GlobalHeaderActionList {...props} />)
        expect(getByTestId('title')).toHaveAttribute(
            'title',
            'Client Management'
        )
    })

    it('should render same text as passed in to title prop', async () => {
        const { queryByText, rerender } = render(
            <V5GlobalHeaderActionList {...props} />
        )
        expect(queryByText('Client Management')).toBeTruthy()

        //change props
        rerender(
            <V5GlobalHeaderActionList {...props} title="User Management" />
        )
        expect(queryByText('User Management')).toBeTruthy()
    })

    it('should render V5GlobalIconButtons component', async () => {
        const { getByTestId } = render(<V5GlobalHeaderActionList {...props} />)
        const component = getByTestId('header-Action-Div')
    })

    it('Render Component without Creashing', async () => {
        render(<V5GlobalHeaderActionList {...props} />)
        // screen.debug()
        const title = screen.getByTestId('title')
        expect(title).toHaveAttribute('title')
    })
})
