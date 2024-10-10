import React from 'react'

function page() {
  return (
    <div>
        <div className='top-bar'> 
            <div className="left-section">
                img
            </div>
            <div className="link-section">
                
            </div>
            <div className="right-section">
                
            </div>
        </div>

        <div>
            <div className="mobile-view">
                
            </div>
            <div className="custom-links">
                <p> Customize your links </p>
                <p> Add/ Edit/ Remove links bellow and then share all your profiles with the world! </p>

                <button> + Add new link </button>

                <div className='link-section'>
                    <div> 
                        <div>
                            <span>=</span><span>link#</span><span>1</span>
                        </div>
                        <button>Remove</button>
                    </div>
                    <p> Platform </p>
                    <select name="Platform" id="Platform">
                        <option value="Github">     Github  </option>
                        <option value="Youtube">    Youtube  </option>
                        <option value="LinkedIn">   Linked  </option>
                        <option value="Facebook">   Facebook  </option>
                    </select>

                    <p> Link </p>
                    <input type='text' />

                </div>
                
                <button> Save </button>
                
            </div>
        </div>

    </div>
  )
}

export default page