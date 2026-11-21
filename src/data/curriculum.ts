export interface LearningDay {
  day: number;
  title: string;
  topic: string;
  available: boolean;
}

export const curriculum: LearningDay[] = [
  { day: 1, title: 'Building Basic Sentences', topic: 'Describe work with subject + verb + object', available: true },
  { day: 2, title: 'Find the Subject', topic: 'Who is doing the task in a work sentence?', available: true },
  { day: 3, title: 'Actions and Objects', topic: 'Build sentences about tasks, reports and people', available: true },
  { day: 4, title: 'Is, Am & Are at Work', topic: 'Describe your role, team and current status', available: true },
  { day: 5, title: 'Describe Work Clearly', topic: 'Use is, am and are for tasks and findings', available: true },
  { day: 6, title: 'Give a Status Update', topic: 'Practise is, am and are in short updates', available: true },
  { day: 7, title: 'Using Has & Have', topic: 'Talk about information, tools and deadlines', available: true },
  { day: 8, title: 'Choose Has or Have', topic: 'Match has and have to people and teams', available: true },
  { day: 9, title: 'Using Had', topic: 'Describe what was available or completed before', available: true },
  { day: 10, title: 'Talk About Your Routine', topic: 'Use simple present for regular work tasks', available: true },
  { day: 11, title: 'Explain a Work Process', topic: 'Put routine instructions into clear sentences', available: true },
  { day: 12, title: 'Describe Work in Progress', topic: 'Use present continuous for current tasks', available: true },
  { day: 13, title: 'Describe Completed Work', topic: 'Use simple past to report finished tasks', available: true },
  { day: 14, title: 'Share What You Found', topic: 'Write about findings and actions already taken', available: true },
  { day: 15, title: 'Plan Next Steps', topic: 'Use will to discuss future work and deadlines', available: true },
  { day: 16, title: 'Ask Clear Work Questions', topic: 'Form questions about tasks and instructions', available: true },
  { day: 17, title: 'Ask for Work Details', topic: 'Use who, what, when, where and which', available: true },
  { day: 18, title: 'Explain What Is Not Ready', topic: 'Use negatives for delays and problems', available: true },
  { day: 19, title: 'A, An & The at Work', topic: 'Use articles in emails, reports and instructions', available: true },
  { day: 20, title: 'Prepositions for Work', topic: 'Describe dates, locations, attachments and tasks', available: true },
  { day: 21, title: 'Connect Ideas Clearly', topic: 'Join work updates with and, but and because', available: false },
  { day: 22, title: 'Introduce Yourself at Work', topic: 'Share your role and responsibilities', available: false },
  { day: 23, title: 'Make Polite Requests', topic: 'Ask colleagues for help or information', available: false },
  { day: 24, title: 'Give a Useful Work Update', topic: 'Share progress and hand over a task', available: false },
  { day: 25, title: 'Write a Clear Email', topic: 'Practise subject, greeting, request and closing', available: false },
  { day: 26, title: 'Discuss Findings in a Meeting', topic: 'Explain results and respond to questions', available: false },
  { day: 27, title: 'Clarify a Problem', topic: 'Ask for clarification and explain an issue', available: false },
  { day: 28, title: 'Write a Short Work Report', topic: 'Organise a purpose, findings and next steps', available: false },
  { day: 29, title: 'Summarise Findings', topic: 'Write a clear paragraph about results and evidence', available: false },
  { day: 30, title: 'Workplace Communication Review', topic: 'Final email, short report and spoken update', available: false },
];
