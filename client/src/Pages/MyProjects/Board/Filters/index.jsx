import React from "react";
import PropTypes from "prop-types";

import { Filters, SearchInput, ClearAll } from "./Styles";

const propTypes = {
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired
};

const ProjectBoardFilters = ({ defaultFilters, filters, mergeFilters }) => {
  const { searchTerm, userIds, myOnly, recent } = filters;

  const areFiltersCleared =
    !searchTerm && userIds && userIds.length === 0 && !myOnly && !recent;

  return (
    <Filters data-testid="board-filters">
      <SearchInput
        icon="search"
        value={searchTerm}
        onChange={value => mergeFilters({ searchTerm: value })}
      />
      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>
          Clear all
        </ClearAll>
      )}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
