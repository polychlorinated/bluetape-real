import { intersection } from "lodash";
import moment from "moment";

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter(issue =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (userIds.length > 0) {
    issues = issues.filter(
      issue => intersection([issue.assigneeId], userIds).length > 0
    );
  }
  if (myOnly && currentUserId) {
    issues = issues.filter(issue => issue.assigneeId === currentUserId);
  }
  if (recent) {
    issues = issues.filter(issue =>
      moment(issue.updatedAt).isAfter(moment().subtract(3, "days"))
    );
  }
  return issues;
};

export default filterIssues;
