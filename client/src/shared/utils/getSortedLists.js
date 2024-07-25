const getSortedListIssues = (issues, status) => {
  return issues.filter(issue => issue.status === status);
};

export default getSortedListIssues;
