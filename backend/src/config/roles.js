const allRoles = {
  member: [
    'checkAuth',
    'getIssues',
    'getProjects',
    'createProject',
    'createEpic',
    'createIssue',
    'manageIssues',
    'createComment',
    'manageComments',
    'getEpics',
    'manageEpics',
    'manageProjects',
    'inviteMembers',
    'manageSprint',
    'getNotifications',
    'readNotifications',
  ],
  owner: [
    'getUsers',
    'manageUsers',
    'checkAuth',
    'getIssues',
    'getProjects',
    'createProject',
    'createEpic',
    'createIssue',
    'manageIssues',
    'createComment',
    'manageComments',
    'getEpics',
    'manageEpics',
    'manageProjects',
    'inviteMembers',
    'manageSprint',
    'getNotifications',
    'readNotifications',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
