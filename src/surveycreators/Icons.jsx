import React from 'react'

function Icons({ name }) {
    return (
        <>{
            name == "text" ?

                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect xmlns="http://www.w3.org/2000/svg" x="5.75" y="15.75" width="28.5" height="8.5" rx="2.25" stroke="#4800FC" strokeWidth="1.5" />
                    <path xmlns="http://www.w3.org/2000/svg" d="M8.75 19.375H28.125" stroke="#01BCEA" strokeWidth="1.5" />
                </svg>
                :
                name == "radiogroup" ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="19.5" cy="20.5" r="12.75" stroke="#4800FC" stroke-width="1.5" />
                        <circle cx="19.5" cy="20.5" r="6.5" fill="#01BCEA" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <rect x="7.25" y="19.75" width="35.5" height="10.5" rx="2" stroke="#4800FC" strokeWidth="2" />
                        <path d="M10.9375 24.2188H35.1562" stroke="#01BCEA" strokeWidth="2" />
                    </svg>
        }
        </>
    )
}

export default Icons;