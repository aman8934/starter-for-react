import React,{useId} from 'react'

function Select({
    options = [],
    className = '',
    label = '',
    ...props
},ref) {
    const id = useId();
  return (
    <div className="w-full">
        {label && <label className='inline-block mb-1 pl-1' htmlFor={id}></label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`${className}`}
        >
            {options ?.map((option) => (
                <options
                 key={option}
                value={option}>
                    {option}
                </options>
            ) ) }
        </select>

    </div>
  )
}

export default React.forwardRef(Select)