import React from 'react';
import {StyledEntryCard} from "./Styles";

function EntryCard({ children }){
    return(
        <StyledEntryCard>
            {children}
        </StyledEntryCard>
    )
}

export default EntryCard;