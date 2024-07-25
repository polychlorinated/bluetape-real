export const IssueStatus = {
  SELECTED: 'ready',

  DONE: 'done',
};

export const BacklogIssueStatus = {
  UNPLANNED: 'unplanned',
  PLANNED: 'planned',
};

export const HistoryIssueStatus = {
  ARCHIVED: 'archived',
};

export const IssuePriority = {
  HIGHEST: '5',
  HIGH: '4',
  MEDIUM: '3',
  LOW: '2',
  LOWEST: '1',
};
export const CategoryType = {
  PLUMBING: 'PLUMBING',
  ELECTRICAL: 'ELECTRICAL',
  PAINT: 'PAINT',
  FLOORING: 'FLOORING',
  WINDOWS: 'WINDOWS',
  DOORS: 'DOORS',
  TRIM: 'TRIM',
  ROOFING: 'ROOFING',
};

export const IssueStatusCopy = {
  // [IssueStatus.BLOCKED]: 'Blocked',
  [IssueStatus.SELECTED]: 'To Review',
  // [IssueStatus.INPROGRESS]: 'In progress',
  // [IssueStatus.INQA]: 'In QA',
  [IssueStatus.DONE]: 'Reviewed',
};

export const BacklogIssueStatusCopy = {
  [BacklogIssueStatus.UNPLANNED]: 'Tasks Pending',
  [BacklogIssueStatus.PLANNED]: 'Tasks Done',
};

export const HistoryIssueStatusCopy = {
  [HistoryIssueStatus.ARCHIVED]: 'Archived',
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: 'Highest',
  [IssuePriority.HIGH]: 'High',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.LOWEST]: 'Lowest',
};
export const CategoryTypesCopy = {
  [CategoryType.PLUMBING]: 'PLUMBING',
  [CategoryType.ELECTRICAL]: 'ELECTRICAL',
  [CategoryType.PAINT]: 'PAINT',
  [CategoryType.FLOORING]: 'FLOORING',
  [CategoryType.WINDOWS]: 'WINDOWS',
  [CategoryType.DOORS]: 'DOORS',
  [CategoryType.TRIM]: 'TRIM',
  [CategoryType.ROOFING]: 'ROOFING',
};
