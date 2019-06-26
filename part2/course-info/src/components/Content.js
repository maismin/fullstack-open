import React from 'react'
import Part from './Part'

const Content = ({ contents }) => {
    const parts = contents.map(part => <Part part={part} key={part.id} />)
    return (
        <div>
            {parts}
        </div>
    )
}

export default Content