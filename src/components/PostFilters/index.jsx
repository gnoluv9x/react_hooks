import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

PostFilters.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilters.defaultProps = {
    onSubmit: null,
}

function PostFilters(props) {
    const { onSubmit }= props;
    const [ searchValue , setSearchValue] = useState('');
    const searchValueRef = useRef(null);

    function handleChangeValue(e){
        setSearchValue(e.target.value);
        
        // use debounce to avoid the need to call submit
        if ( searchValueRef.current ){
            clearTimeout( searchValueRef.current );
        }

        searchValueRef.current = setTimeout(() => {
            const formValues = {
                searchValue: e.target.value,
            }
            if( !onSubmit) return;
    
            onSubmit(formValues);    
        }, 300);
        
    }

    return (
        <form>
            <input 
                type="text"
                value={searchValue}
                onChange={handleChangeValue}
            />
        </form>
    );
}

export default PostFilters;