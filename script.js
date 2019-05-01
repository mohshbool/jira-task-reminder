let issues = [], username = '', email = '';
chrome.storage.local.get(['username', 'email'], function(result) {
  const { username: usernameS, email: emailS } = result;
  document.querySelectorAll('#ghx-pool > div.ghx-swimlane > ul > li:nth-child(2)').forEach(function(e) { //per section
    if (e.children[0].children.length > 0) {
      for (let card of e.children[0].children) { // per card
        const infoIndex = card.children.length === 5 ? 2 : 3;
        const assignee = card.children[infoIndex].children[1].children[0].children[0].alt.slice(10);
        const issueKey = card.children[infoIndex].children[1].children[1].getAttribute('aria-label');
        const issueTitle = card.children[0].getAttribute('title');
        if (new RegExp(username, 'i').test(assignee)) {
          issues.push({ assignee, email, issueKey, issueTitle });
          username = usernameS;
          email = emailS;
        };
      }; 
    };
  });
});

window.onbeforeunload =  async function(event) {
  let data = {
    username,
    email,
    issues: []
  };
  for (let { issueKey, issueTitle } of issues) {
    data.issues.push({ issueKey, issueTitle });
  }
  await fetch('https://jira-task-reminder.glitch.me/sendmail', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify(data)
  });
  event.returnValue = "You have attempted to leave this page. Are you sure?";
  return "You have attempted to leave this page. Are you sure?";
};