import React from 'react';
import GridTable from '@nadavshaar/react-grid-table';
import { GridContainer } from './Styes';
import { useHistory } from 'react-router-dom';
import ProjectDelete from './Delete';
import { connect } from 'react-redux';

const ProjectsTable = ({ user, projects, filters, fetchProjects, page }) => {
  const projectLead = ({ data }) => {
    return (
      <div
        style={{
          margin: '0 20px',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
          gap: '0.6rem',
        }}
      >
        <div>{data.projectLead.name}</div>
        {page !== 'account' && user.role === 'owner' && !user.isHalfOwner && (
          <ProjectDelete fetchProjects={fetchProjects} project={data} />
        )}
      </div>
    );
  };

  const projectName = ({ data }) => {
    return <div style={{ marginLeft: '20px' }}>{data.name}</div>;
  };

  const NoResults = () => {
    return (
      <div style={{ marginTop: '-20px', fontSize: '18px' }}>No Projects</div>
    );
  };

  const createdAt = ({ data }) => {
    const date = new Date(data.creationDate);
    return (
      <div style={{ marginLeft: '20px' }}>
        {date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear()}
      </div>
    );
  };

  const columns = [
    {
      id: 1,
      field: 'name',
      label: 'Name',
      width: '35%',
      cellRenderer: projectName,
      className: 'pointer',
    },
    {
      id: 2,
      field: 'key',
      label: 'Key',
      width: '15%',
      className: 'pointer',
    },
    {
      id: 3,
      field: 'creationDate',
      label: 'Created At',
      width: '25%',
      className: 'pointer',
      cellRenderer: createdAt,
      sort: ({ a, b, isAscending }) => {
        let aa = a
            .split('/')
            .reverse()
            .join(),
          bb = b
            .split('/')
            .reverse()
            .join();
        return aa < bb
          ? isAscending
            ? -1
            : 1
          : aa > bb
          ? isAscending
            ? 1
            : -1
          : 0;
      },
    },
    {
      id: 4,
      field: 'projectLead',
      label: 'Lead',
      width: '25%',
      className: 'pointer',
      cellRenderer: projectLead,
    },
  ];
  const history = useHistory();
  return (
    <GridContainer>
      <GridTable
        columns={columns}
        rows={projects}
        isPaginated={false}
        searchText={page !== 'account' ? filters.searchTerm : null}
        showSearch={false}
        showRowsInformation={false}
        showColumnVisibilityManager={false}
        onRowClick={(
          { rowIndex, data, column, isEdit, event },
          tableManager
        ) => {
          if (column.index !== 3) history.push(`/project/${data.id}/backlog`);
        }}
        components={{ NoResults }}
      />
    </GridContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(ProjectsTable);
