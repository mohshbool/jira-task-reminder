let issues = [];
chrome.storage.local.get(['username', 'email'], function(result) {
  const { username, email } = result;
  document.querySelectorAll('#ghx-pool > div.ghx-swimlane > ul > li:nth-child(2)').forEach(function(e) { //per section
    for (let card of e.children[0].children) { // per card
      const assignee = card.children[3].children[1].children[0].children[0].alt.slice(10);
      if (new RegExp(username, 'i').test(assignee)) {
        issues.push({ assignee, email, issueKey, issueTitle });
      };
    }; 
  }); 
  let data = {
    username,
    email,
  };
  fetch('https://jira-task-reminder.glitch.me/sendmail', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {}).catch(() => {});
});