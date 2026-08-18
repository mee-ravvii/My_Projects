import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <> 
        <div className="wave-container wave">
            <p>© {year}, Developed & Designed with ❤️ by <a className='footer_faizan' target='_faizan' href='https://raviyadav.netlify.app/'>Yadav RaviKishan </a></p>
        </div>
    </>
  )
}

export default Footer