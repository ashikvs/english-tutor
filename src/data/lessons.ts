export type ChoiceExercise = {
  kind: 'choice';
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
};

export type WordOrderExercise = {
  kind: 'word-order';
  prompt: string;
  words: string[];
  answer: number[];
  hint: string;
};

export type PracticeExercise = ChoiceExercise | WordOrderExercise;

export interface DailyLesson {
  day: number;
  title: string;
  concept: string;
  explanation: string;
  malayalam: string;
  examples: string[];
  exercises: PracticeExercise[];
  writingPrompt: string;
  assessment: ChoiceExercise;
}

const choice = (prompt: string, options: string[], answer: number, hint: string): ChoiceExercise => ({
  kind: 'choice',
  prompt,
  options,
  answer,
  hint,
});

const wordOrder = (prompt: string, words: string[], answer: number[], hint: string): WordOrderExercise => ({
  kind: 'word-order',
  prompt,
  words,
  answer,
  hint,
});

export const lessons: DailyLesson[] = [
  {
    day: 1,
    title: 'Building Basic Sentences',
    concept: 'Subject + Verb + Object',
    explanation: 'A basic English sentence often follows this order: the subject (who or what), the verb (the action), and the object (who or what receives the action). Some verbs take extra details instead of an object. In “I work in a laboratory,” “in a laboratory” tells us where I work.',
    malayalam: 'ഒരു ലളിതമായ ഇംഗ്ലീഷ് വാക്യത്തിൽ സാധാരണയായി ആദ്യം ചെയ്യുന്നയാൾ (Subject), പിന്നെ പ്രവൃത്തി (Verb), അവസാനം ആ പ്രവൃത്തി ബാധിക്കുന്ന കാര്യം (Object) വരും.',
    examples: ['I prepare samples.', 'She reads the report.', 'We discuss the findings.', 'He sends an email.', 'They attend a meeting.'],
    exercises: [
      wordOrder('Arrange the words to describe your workplace.', ['I', 'work', 'in', 'a', 'laboratory'], [0, 1, 2, 3, 4], 'Start with the person, then the action.'),
      choice('Which word is the action in “We discuss the findings”?', ['We', 'discuss', 'the findings'], 1, 'The verb tells what the subject does.'),
      choice('Choose the sentence with a clear subject, verb and object.', ['The report reads she.', 'She reads the report.', 'Reads she report the.'], 1, 'Put the person first, then the action, then the thing.'),
      choice('Complete: “The team ___ the results.”', ['reviews', 'the results reviews', 'reviewing'], 0, 'The subject is “the team”; follow it with an action.'),
      wordOrder('Arrange this workplace sentence.', ['They', 'send', 'a', 'weekly', 'email'], [0, 1, 2, 3, 4], 'The subject comes before the verb.'),
    ],
    writingPrompt: 'Write one sentence about a task you do at work. Use a person or team, an action, and an object.',
    assessment: choice('Which sentence follows Subject + Verb + Object?', ['The findings are clear.', 'We prepare the report.', 'In the meeting.'], 1, 'Look for who does what to which thing.'),
  },
  {
    day: 2,
    title: 'Find the Subject',
    concept: 'The subject does the action',
    explanation: 'The subject tells us who or what a sentence is about. Find the action first, then ask “who?” or “what?” does it.',
    malayalam: 'വാക്യത്തിൽ ആരാണ് പ്രവൃത്തി ചെയ്യുന്നത് എന്ന് പറയുന്നതാണ് Subject. പ്രവൃത്തി കണ്ടെത്തിയ ശേഷം “ആരാണ്?” അല്ലെങ്കിൽ “എന്താണ്?” എന്ന് ചോദിക്കുക.',
    examples: ['Amrtha checks the report.', 'The manager sends an email.', 'Our team studies the findings.', 'The meeting starts at ten.', 'The new sample arrived today.'],
    exercises: [
      choice('Find the subject: “The manager approved the report.”', ['The manager', 'approved', 'the report'], 0, 'Who approved it?'),
      choice('Find the subject: “Our team meets on Monday.”', ['meets', 'Monday', 'Our team'], 2, 'Who meets on Monday?'),
      choice('Find the subject: “The email explains the delay.”', ['the delay', 'The email', 'explains'], 1, 'What explains the delay?'),
      choice('Which is the subject in “My colleague shared the results”?', ['shared', 'the results', 'My colleague'], 2, 'Who shared the results?'),
      choice('Choose a subject for “___ presented the findings.”', ['The analyst', 'Presented', 'The findings'], 0, 'The subject is the person doing the presenting.'),
    ],
    writingPrompt: 'Write two sentences about your work. Underline or identify who or what each sentence is about.',
    assessment: choice('In “The supervisor called the client,” what is the subject?', ['called', 'the client', 'The supervisor'], 2, 'Ask who called the client.'),
  },
  {
    day: 3,
    title: 'Actions and Objects',
    concept: 'Verb + Object',
    explanation: 'A verb names an action. The object is the person or thing affected by that action. Together they help you explain work clearly.',
    malayalam: 'Verb പ്രവൃത്തിയെ സൂചിപ്പിക്കുന്നു. ആ പ്രവൃത്തി ബാധിക്കുന്ന വ്യക്തിയോ വസ്തുവോ ആണ് Object.',
    examples: ['I update the spreadsheet.', 'She answers the client.', 'We review the proposal.', 'He schedules the meeting.', 'They compare the results.'],
    exercises: [
      choice('What is the verb in “She answers the client”?', ['She', 'answers', 'the client'], 1, 'Which word names the action?'),
      choice('What is the object in “I update the spreadsheet”?', ['I', 'update', 'the spreadsheet'], 2, 'What does the person update?'),
      choice('Complete: “We ___ the proposal.”', ['review', 'the proposal', 'reviewing'], 0, 'Choose the action word.'),
      choice('Choose the object: “He schedules the meeting.”', ['He', 'schedules', 'the meeting'], 2, 'What does he schedule?'),
      choice('Which sentence has a clear action and object?', ['They compare the results.', 'They the results.', 'Compare they results the.'], 0, 'A clear sentence puts the subject, action and object in order.'),
    ],
    writingPrompt: 'Write two sentences about work actions. In each, include a verb and the thing or person affected by it.',
    assessment: choice('In “The analyst prepared a summary,” what is the object?', ['The analyst', 'prepared', 'a summary'], 2, 'What did the analyst prepare?'),
  },
  {
    day: 4,
    title: 'Is, Am & Are at Work',
    concept: 'Am / Is / Are + description',
    explanation: 'Use “I am,” “he/she/it is,” and “you/we/they are” to describe people, things and work situations.',
    malayalam: 'I-യോടൊപ്പം am, he/she/it-നൊപ്പം is, you/we/they-യോടൊപ്പം are ഉപയോഗിച്ച് ആളുകളെയും സാഹചര്യങ്ങളെയും വിവരിക്കാം.',
    examples: ['I am a project assistant.', 'The report is ready.', 'The findings are useful.', 'We are available this afternoon.', 'The meeting is online.'],
    exercises: [
      choice('Complete: “I ___ ready for the meeting.”', ['is', 'am', 'are'], 1, 'Use “am” with “I.”'),
      choice('Complete: “The report ___ ready.”', ['are', 'am', 'is'], 2, '“The report” is one thing, so use “is.”'),
      choice('Complete: “The results ___ clear.”', ['is', 'are', 'am'], 1, '“Results” is plural.'),
      choice('Choose the correct sentence.', ['She are my supervisor.', 'She is my supervisor.', 'She am my supervisor.'], 1, 'Use “is” with she.'),
      choice('Complete: “We ___ available after lunch.”', ['are', 'is', 'am'], 0, 'Use “are” with we.'),
    ],
    writingPrompt: 'Write three work sentences: one beginning with “I am,” one with a singular work item, and one with “we are.”',
    assessment: choice('Complete: “The team ___ ready to share its update.”', ['am', 'are', 'is'], 2, 'Treat “the team” as one group here.'),
  },
  {
    day: 5,
    title: 'Describe Work Clearly',
    concept: 'Be + adjective',
    explanation: 'Adjectives describe people, tasks and results. Put an adjective after am, is or are to give a clear detail.',
    malayalam: 'ഒരു വ്യക്തിയെയോ ജോലിയെയോ ഫലത്തെയോ വിവരിക്കുന്ന വാക്കാണ് adjective. Am, is, are എന്നിവയ്ക്കു ശേഷം ഇത് ഉപയോഗിക്കാം.',
    examples: ['The instructions are clear.', 'I am responsible for the summary.', 'The first draft is complete.', 'Our schedule is flexible.', 'The findings are consistent.'],
    exercises: [
      choice('Which word describes the instructions in “The instructions are clear”?', ['instructions', 'are', 'clear'], 2, 'The describing word tells us what the instructions are like.'),
      choice('Complete: “The first draft is ___.”', ['complete', 'completes', 'completing'], 0, 'Use a describing word after “is.”'),
      choice('Choose the correct sentence.', ['The findings is consistent.', 'The findings are consistent.', 'The findings am consistent.'], 1, 'Use “are” with plural “findings.”'),
      choice('Which adjective best completes: “The email is ___ and polite.”', ['clear', 'clears', 'clearing'], 0, 'Choose a word that describes the email.'),
      choice('Complete: “I am ___ for the meeting notes.”', ['responsible', 'responsibility', 'responsibly'], 0, 'Use an adjective after “am.”'),
    ],
    writingPrompt: 'Describe a task, a document and a result using one adjective in each sentence.',
    assessment: choice('Choose the correct sentence.', ['The schedule are flexible.', 'The schedule is flexible.', 'The schedule am flexible.'], 1, '“The schedule” is singular.'),
  },
  {
    day: 6,
    title: 'Give a Status Update',
    concept: 'Be verbs for status and ongoing work',
    explanation: 'Use am, is or are with an adjective or status phrase to report progress. Use am/is/are + verb-ing for an action happening now. Match am, is or are to the subject.',
    malayalam: 'ജോലിയുടെ സ്ഥിതി പറയാൻ am, is, are എന്നിവ adjective-നൊപ്പം ഉപയോഗിക്കാം. ഇപ്പോൾ നടക്കുന്ന പ്രവൃത്തി പറയാൻ am/is/are + verb-ing ഉപയോഗിക്കുക.',
    examples: ['I am reviewing the figures.', 'The draft is ready.', 'Two tasks are pending.', 'We are on schedule.', 'The client is waiting for an update.'],
    exercises: [
      choice('Complete: “I ___ reviewing the figures.”', ['is', 'am', 'are'], 1, 'Use “am” with “I.”'),
      choice('Complete: “The draft ___ ready.”', ['are', 'is', 'am'], 1, 'The singular subject “draft” takes “is.”'),
      choice('Complete: “Two tasks ___ pending.”', ['is', 'am', 'are'], 2, 'Use “are” with a plural subject.'),
      choice('Choose the clearest update.', ['We schedule.', 'We are on schedule.', 'We is schedule.'], 1, 'A useful status update uses a complete sentence.'),
      choice('Complete: “The client ___ waiting for our response.”', ['are', 'am', 'is'], 2, '“The client” is one person.'),
    ],
    writingPrompt: 'Write a short two-sentence update: say what is complete and what is still pending.',
    assessment: choice('Complete: “The presentation ___ ready, and I ___ available to discuss it.”', ['is / am', 'are / is', 'am / are'], 0, 'Match “presentation” with is and “I” with am.'),
  },
  {
    day: 7,
    title: 'Using Has & Have',
    concept: 'Has / Have + information or things',
    explanation: 'Use “has” with he, she, it and one person or thing. Use “have” with I, you, we, they and plural subjects.',
    malayalam: 'He, she, it, ഒരാൾ അല്ലെങ്കിൽ ഒരു വസ്തു എന്നിവയ്ക്കൊപ്പം has ഉപയോഗിക്കുക. I, you, we, they, ബഹുവചനം എന്നിവയ്ക്കൊപ്പം have ഉപയോഗിക്കുക.',
    examples: ['I have the meeting notes.', 'She has the latest figures.', 'We have a new deadline.', 'The report has three sections.', 'They have the client’s feedback.'],
    exercises: [
      choice('Complete: “I ___ the meeting notes.”', ['has', 'have'], 1, 'Use “have” with “I.”'),
      choice('Complete: “She ___ the latest figures.”', ['has', 'have'], 0, 'Use “has” with she.'),
      choice('Complete: “The report ___ three sections.”', ['have', 'has'], 1, 'The singular subject “report” takes has.'),
      choice('Complete: “They ___ the client’s feedback.”', ['has', 'have'], 1, 'Use “have” with they.'),
      choice('Choose the correct sentence.', ['Our team have a deadline.', 'Our team has a deadline.', 'Our team haves a deadline.'], 1, 'Treat “our team” as one group.'),
    ],
    writingPrompt: 'Write two sentences about information or resources you have at work, and one about what a colleague has.',
    assessment: choice('Complete: “My manager ___ the updated schedule.”', ['have', 'has'], 1, '“My manager” is one person.'),
  },
  {
    day: 8,
    title: 'Choose Has or Have',
    concept: 'Match the verb to the subject',
    explanation: 'Before choosing has or have, find the subject. One person or thing usually takes has; I, you, we, they and plural subjects take have.',
    malayalam: 'Has അല്ലെങ്കിൽ have തിരഞ്ഞെടുക്കുന്നതിനു മുമ്പ് subject കണ്ടെത്തുക. ഒരാൾ/ഒരു വസ്തുവിന് has; I, you, we, they, ബഹുവചനത്തിന് have.',
    examples: ['My colleague has a question.', 'Our colleagues have a meeting.', 'The client has a concern.', 'You have the correct file.', 'This email has an attachment.'],
    exercises: [
      choice('“My colleagues ___ a meeting at two.”', ['has', 'have'], 1, '“Colleagues” is plural.'),
      choice('“The client ___ a concern.”', ['have', 'has'], 1, '“The client” is one person.'),
      choice('“You ___ the correct file.”', ['has', 'have'], 1, 'Use “have” with you.'),
      choice('“This email ___ an attachment.”', ['have', 'has'], 1, '“This email” is one thing.'),
      choice('“My supervisor and I ___ a call today.”', ['has', 'have'], 1, '“My supervisor and I” means we.'),
    ],
    writingPrompt: 'Write three sentences about what you, a colleague and your team have for a current task.',
    assessment: choice('Choose the correct sentence.', ['The reports has an appendix.', 'The reports have an appendix.', 'The reports haves an appendix.'], 1, '“Reports” is plural.'),
  },
  {
    day: 9,
    title: 'Using Had',
    concept: 'Had for the past',
    explanation: 'Use “had” for all subjects when talking about something a person or team possessed or needed in the past.',
    malayalam: 'ഭൂതകാലത്തിൽ ഉണ്ടായിരുന്നതോ ആവശ്യമായിരുന്നതോ പറയാൻ എല്ലാ subject-കളോടും had ഉപയോഗിക്കുക.',
    examples: ['I had a deadline yesterday.', 'She had the earlier version.', 'We had a useful discussion.', 'The report had one error.', 'They had enough time to review it.'],
    exercises: [
      choice('Complete: “We ___ a useful discussion yesterday.”', ['have', 'had', 'has'], 1, '“Yesterday” signals the past.'),
      choice('Complete: “She ___ the earlier version.”', ['had', 'has', 'having'], 0, 'Use had to describe the past.'),
      choice('Choose the past sentence.', ['The report has one error.', 'The report had one error.', 'The report have one error.'], 1, 'Look for the past form.'),
      choice('Complete: “They ___ enough time last week.”', ['have', 'has', 'had'], 2, 'Use had for a past time.'),
      choice('Which is correct?', ['I had a question this morning.', 'I has a question this morning.', 'I have a question yesterday.'], 0, 'Use had when the time is in the past.'),
    ],
    writingPrompt: 'Write two sentences about a previous task, meeting or deadline using “had.”',
    assessment: choice('Complete: “The team ___ a short meeting before the presentation.”', ['have', 'had', 'has'], 1, 'The meeting happened before the presentation, so use had.'),
  },
  {
    day: 10,
    title: 'Talk About Your Routine',
    concept: 'Simple present for regular work',
    explanation: 'Use the simple present for routines and repeated tasks. With he, she or one person, many verbs add -s; with I, you, we and they, use the base verb.',
    malayalam: 'പതിവായി ചെയ്യുന്ന ജോലികൾ simple present-ൽ പറയാം. He/she/ഒരാൾ വന്നാൽ പല verb-കൾക്കും -s ചേർക്കും; I/you/we/they വന്നാൽ അടിസ്ഥാന verb ഉപയോഗിക്കുക.',
    examples: ['I check my email each morning.', 'She prepares a weekly summary.', 'We review the schedule on Mondays.', 'He answers client questions.', 'They share updates with the team.'],
    exercises: [
      choice('Complete: “I ___ my email each morning.”', ['checks', 'check', 'checking'], 1, 'Use the base verb with “I.”'),
      choice('Complete: “She ___ a weekly summary.”', ['prepare', 'prepares', 'preparing'], 1, 'Add -s to many simple-present verbs with she.'),
      choice('Complete: “We ___ the schedule on Mondays.”', ['reviews', 'review', 'reviewing'], 1, 'Use the base verb with we.'),
      choice('Choose the correct sentence.', ['He answer client questions.', 'He answers client questions.', 'He answering client questions.'], 1, 'Add -s to the verb with he.'),
      choice('Complete: “They ___ updates with the team.”', ['shares', 'share', 'sharing'], 1, 'Use the base verb with they.'),
    ],
    writingPrompt: 'Describe three tasks you do regularly at work. Include a time phrase such as “each day” or “every week.”',
    assessment: choice('Choose the correct sentence.', ['My manager send a report every Friday.', 'My manager sends a report every Friday.', 'My manager sending a report every Friday.'], 1, '“My manager” is one person, so the simple-present verb takes -s.'),
  },
  {
    day: 11,
    title: 'Explain a Work Process',
    concept: 'Simple present + sequence words',
    explanation: 'Use the simple present to explain regular instructions. Sequence words such as first, next, then and finally make the order easy to follow.',
    malayalam: 'പതിവ് ജോലിയുടെ ഘട്ടങ്ങൾ simple present-ൽ പറയാം. First, next, then, finally എന്നീ വാക്കുകൾ ക്രമം വ്യക്തമാക്കുന്നു.',
    examples: ['First, I read the request.', 'Next, I check the details.', 'Then, I update the file.', 'Finally, I send the summary.', 'We follow the same process each week.'],
    exercises: [
      wordOrder('Put the first instruction in order.', ['First,', 'I', 'read', 'the', 'request.'], [0, 1, 2, 3, 4], 'Start with the sequence word, then the subject and action.'),
      choice('Complete: “Next, she ___ the details.”', ['check', 'checks', 'checking'], 1, 'With she, add -s to this simple-present verb.'),
      choice('Which word usually introduces the last step?', ['First', 'Finally', 'Next'], 1, 'Choose the word that signals the end of a sequence.'),
      choice('Choose the clearest process instruction.', ['Then, update the file I.', 'Then, I update the file.', 'Then, I updates the file.'], 1, 'Use subject + verb + object.'),
      choice('Complete: “We ___ the same process each week.”', ['follow', 'follows', 'following'], 0, 'Use the base verb with we.'),
    ],
    writingPrompt: 'Write three steps for a task you do at work. Use First, Next and Finally.',
    assessment: choice('Choose the best sequence sentence.', ['Finally, she sends the report.', 'Finally, she send the report.', 'She finally the report sends.'], 0, 'With she, use sends; keep the subject before the verb.'),
  },
  {
    day: 12,
    title: 'Describe Work in Progress',
    concept: 'Am / Is / Are + verb-ing',
    explanation: 'Use am, is or are + a verb ending in -ing for an action happening now or around now. Match the helping verb to the subject.',
    malayalam: 'ഇപ്പോൾ അല്ലെങ്കിൽ ഈ സമയത്ത് നടക്കുന്ന പ്രവൃത്തി പറയാൻ am/is/are + verb-ing ഉപയോഗിക്കുക. Subject-നനുസരിച്ച് സഹായക verb തിരഞ്ഞെടുക്കുക.',
    examples: ['I am reviewing the draft.', 'She is speaking with a client.', 'We are preparing the slides.', 'The team is discussing the findings.', 'They are updating the schedule.'],
    exercises: [
      choice('Complete: “I ___ reviewing the draft.”', ['am', 'is', 'are'], 0, 'Use am with I.'),
      choice('Complete: “She is ___ with a client.”', ['speak', 'speaking', 'speaks'], 1, 'After is, use the verb ending in -ing.'),
      choice('Complete: “We ___ preparing the slides.”', ['is', 'are', 'am'], 1, 'Use are with we.'),
      choice('Choose the sentence about an action happening now.', ['They update the schedule every week.', 'They are updating the schedule now.', 'They updated the schedule yesterday.'], 1, 'Look for am/is/are + verb-ing and a current-time clue.'),
      choice('Complete: “The manager ___ checking the figures.”', ['are', 'am', 'is'], 2, 'The singular subject manager takes is.'),
    ],
    writingPrompt: 'Write two sentences about work you are doing now and one thing a colleague is doing.',
    assessment: choice('Choose the correct sentence.', ['We are prepare the slides.', 'We is preparing the slides.', 'We are preparing the slides.'], 2, 'Use are + verb-ing with we.'),
  },
  {
    day: 13,
    title: 'Describe Completed Work',
    concept: 'Simple past for finished tasks',
    explanation: 'Use the simple past for an action that is finished. Many verbs add -ed; some common work verbs change form, such as send → sent and write → wrote.',
    malayalam: 'കഴിഞ്ഞ് പൂർത്തിയായ പ്രവൃത്തി പറയാൻ simple past ഉപയോഗിക്കുക. പല verb-കൾക്കും -ed ചേർക്കും; ചിലത് മാറും, ഉദാ: send → sent.',
    examples: ['I completed the report yesterday.', 'She sent the email this morning.', 'We reviewed the proposal.', 'He wrote the meeting notes.', 'They shared the final figures.'],
    exercises: [
      choice('Complete: “I ___ the report yesterday.”', ['complete', 'completed', 'completing'], 1, 'A finished action in the past uses completed.'),
      choice('Choose the past form of send.', ['sended', 'sent', 'sending'], 1, 'Send is irregular; its past form is sent.'),
      choice('Complete: “We ___ the proposal last week.”', ['review', 'reviewed', 'reviews'], 1, 'Add -ed to this regular verb.'),
      choice('Choose the correct sentence.', ['He wrote the notes yesterday.', 'He writes the notes yesterday.', 'He write the notes yesterday.'], 0, 'Wrote is the past form of write.'),
      choice('Complete: “They ___ the final figures on Friday.”', ['shared', 'share', 'sharing'], 0, 'The sentence describes a finished past action.'),
    ],
    writingPrompt: 'Write three sentences about tasks you completed yesterday or last week.',
    assessment: choice('Choose the past-tense sentence.', ['She sends the update yesterday.', 'She sent the update yesterday.', 'She sending the update yesterday.'], 1, 'Sent is the past form of send.'),
  },
  {
    day: 14,
    title: 'Share What You Found',
    concept: 'Past-tense findings',
    explanation: 'When you report findings, say what you checked and what you found. Use past-tense verbs for completed checks and observations.',
    malayalam: 'കണ്ടെത്തലുകൾ പറയുമ്പോൾ എന്താണ് പരിശോധിച്ചതെന്നും എന്താണ് കണ്ടതെന്നും വ്യക്തമാക്കുക. പൂർത്തിയായ പരിശോധനകൾക്ക് past tense ഉപയോഗിക്കുക.',
    examples: ['I checked the figures and found an error.', 'The team found two differences.', 'We reviewed the feedback.', 'The survey showed a clear preference.', 'I shared the results with my manager.'],
    exercises: [
      choice('Complete: “We ___ the feedback and found two themes.”', ['review', 'reviewed', 'reviews'], 1, 'The review is finished, so use the past form.'),
      choice('Choose the correct past form of find.', ['finded', 'found', 'finds'], 1, 'Find is irregular; its past form is found.'),
      choice('Complete: “The survey ___ a clear preference.”', ['show', 'showed', 'shows'], 1, 'Use showed for a completed survey.'),
      choice('Which sentence reports a finding clearly?', ['The figures are checked and an error.', 'I checked the figures and found an error.', 'I check the figures and found an error.'], 1, 'Say what you did and what you found.'),
      choice('Complete: “I ___ the results with my manager.”', ['shared', 'share', 'sharing'], 0, 'The sharing already happened.'),
    ],
    writingPrompt: 'Write two sentences about a finding from a task, review or discussion. Say what you checked and what you found.',
    assessment: choice('Choose the clear, correct finding.', ['The review found three issues.', 'The review finded three issues.', 'The review finding three issues.'], 0, 'Found is the past form of find.'),
  },
  {
    day: 15,
    title: 'Plan Next Steps',
    concept: 'Will + base verb',
    explanation: 'Use will + the base form of a verb to talk about a future action or decision. After will, do not add -s or -ed.',
    malayalam: 'ഭാവിയിൽ ചെയ്യാൻ പോകുന്ന പ്രവൃത്തി അല്ലെങ്കിൽ തീരുമാനം പറയാൻ will + അടിസ്ഥാന verb ഉപയോഗിക്കുക. Will-നുശേഷം -s അല്ലെങ്കിൽ -ed ചേർക്കരുത്.',
    examples: ['I will send the draft today.', 'We will discuss the findings tomorrow.', 'She will update the schedule.', 'The team will review the proposal.', 'They will share a decision on Friday.'],
    exercises: [
      choice('Complete: “I will ___ the draft today.”', ['sent', 'send', 'sends'], 1, 'Use the base verb after will.'),
      choice('Complete: “She will ___ the schedule.”', ['updates', 'updated', 'update'], 2, 'Do not add -s after will.'),
      choice('Choose the future sentence.', ['We reviewed the proposal.', 'We will review the proposal.', 'We are reviewing the proposal now.'], 1, 'Look for will + base verb.'),
      choice('Complete: “The team will ___ the findings tomorrow.”', ['discuss', 'discusses', 'discussed'], 0, 'Use the base verb after will.'),
      choice('Choose the correct sentence.', ['They will shares a decision.', 'They will share a decision.', 'They will shared a decision.'], 1, 'Will is followed by share.'),
    ],
    writingPrompt: 'Write three sentences about tasks you will do tomorrow or later this week.',
    assessment: choice('Complete: “Our manager will ___ the final version on Friday.”', ['approved', 'approves', 'approve'], 2, 'Use the base verb after will.'),
  },
  {
    day: 16,
    title: 'Ask Clear Work Questions',
    concept: 'Do / Does / Is / Are in questions',
    explanation: 'Use do or does to ask about actions and routines. Use is or are when the sentence uses be. Put the helping verb before the subject.',
    malayalam: 'പ്രവൃത്തികളെയും പതിവുകളെയും കുറിച്ച് ചോദിക്കാൻ do/does ഉപയോഗിക്കുക. Be verb ഉള്ളപ്പോൾ is/are ഉപയോഗിക്കുക. സഹായക verb subject-ന് മുമ്പിൽ വരും.',
    examples: ['Do you have the latest file?', 'Does she lead the meeting?', 'Is the report ready?', 'Are we meeting today?', 'Do they need more time?'],
    exercises: [
      choice('Choose the question about an action.', ['You have the file?', 'Do you have the file?', 'Does you have the file?'], 1, 'Use do before you.'),
      choice('Complete: “___ she lead the meeting?”', ['Do', 'Does', 'Is'], 1, 'Use does with she for an action question.'),
      choice('Complete: “___ the report ready?”', ['Is', 'Do', 'Does'], 0, 'Ready describes the report, so use is.'),
      choice('Choose the correct question.', ['Are we meeting today?', 'Do we meeting today?', 'Is we meeting today?'], 0, 'Use are + subject + verb-ing.'),
      choice('Complete: “___ they need more time?”', ['Does', 'Do', 'Are'], 1, 'Use do with they.'),
    ],
    writingPrompt: 'Write three questions you could ask a colleague about a task, a meeting and a document.',
    assessment: choice('Choose the correct question.', ['Does your team have the latest update?', 'Do your team has the latest update?', 'Is your team have the latest update?'], 0, 'Use does with the singular group noun, then the base verb have.'),
  },
  {
    day: 17,
    title: 'Ask for Work Details',
    concept: 'Who, what, when, where, which and why',
    explanation: 'Question words help you get specific information. Use who for a person, what for a thing or action, when for a time, where for a place, which for a choice and why for a reason.',
    malayalam: 'കൃത്യമായ വിവരം ചോദിക്കാൻ question words ഉപയോഗിക്കുക: who = ആര്, what = എന്ത്, when = എപ്പോൾ, where = എവിടെ, which = ഏത്, why = എന്തുകൊണ്ട്.',
    examples: ['Who will lead the meeting?', 'What does the report cover?', 'When is the deadline?', 'Where is the shared folder?', 'Which version should I send?'],
    exercises: [
      choice('___ is the deadline for the report?', ['Who', 'When', 'Where'], 1, 'Ask about time with when.'),
      choice('___ will lead the meeting?', ['Who', 'Why', 'When'], 0, 'Ask about a person with who.'),
      choice('___ version should I send, the draft or the final one?', ['Where', 'Which', 'Who'], 1, 'Choose which when selecting between options.'),
      choice('___ does the report cover?', ['What', 'When', 'Who'], 0, 'Ask about the topic with what.'),
      choice('___ is the shared folder?', ['Why', 'Where', 'Which'], 1, 'Ask about a place with where.'),
    ],
    writingPrompt: 'Write five work questions, each beginning with a different question word.',
    assessment: choice('You need to ask for a reason. Which word should begin the question?', ['Why', 'Where', 'Which'], 0, 'Use why to ask for a reason.'),
  },
  {
    day: 18,
    title: 'Explain What Is Not Ready',
    concept: 'Negative sentences with not',
    explanation: 'Use do not/don’t with I, you, we and they; use does not/doesn’t with he, she and it. With be, add not after am, is or are.',
    malayalam: 'I/you/we/they-യോടൊപ്പം do not; he/she/it-നൊപ്പം does not. Am/is/are ഉള്ള വാക്യത്തിൽ അതിന് ശേഷം not ചേർക്കുക.',
    examples: ['I do not have the final file.', 'She does not need more time.', 'The report is not ready.', 'We are not meeting today.', 'They do not agree with the change.'],
    exercises: [
      choice('Complete: “I ___ have the final file.”', ['does not', 'do not', 'is not'], 1, 'Use do not with I.'),
      choice('Complete: “She ___ need more time.”', ['do not', 'does not', 'are not'], 1, 'Use does not with she.'),
      choice('Complete: “The report ___ ready.”', ['does not', 'is not', 'do not'], 1, 'Use is not with a description using be.'),
      choice('Choose the correct sentence.', ['We does not agree.', 'We do not agree.', 'We are not agree.'], 1, 'Use do not with we + the base verb.'),
      choice('Complete: “They ___ meeting today.”', ['is not', 'does not', 'are not'], 2, 'Use are not with they + verb-ing.'),
    ],
    writingPrompt: 'Write three polite, clear sentences explaining a delay, a missing item or a task that is not complete.',
    assessment: choice('Choose the correct negative sentence.', ['He do not have the file.', 'He does not have the file.', 'He is not have the file.'], 1, 'Use does not with he and the base verb have.'),
  },
  {
    day: 19,
    title: 'A, An & The at Work',
    concept: 'Articles before nouns',
    explanation: 'Use a before a singular noun that begins with a consonant sound, an before a vowel sound, and the when the reader knows which person or thing you mean.',
    malayalam: 'Consonant sound-ന് മുമ്പ് a, vowel sound-ന് മുമ്പ് an. ഏത് വ്യക്തിയെയോ വസ്തുവെയോ ഉദ്ദേശിക്കുന്നു എന്ന് വ്യക്തമായാൽ the ഉപയോഗിക്കുക.',
    examples: ['Please send an update.', 'I attached a report.', 'The report includes the final figures.', 'We scheduled a meeting.', 'She sent an email to the client.'],
    exercises: [
      choice('Complete: “Please send ___ update.”', ['a', 'an', 'the'], 1, 'Update begins with a vowel sound.'),
      choice('Complete: “I attached ___ report.”', ['a', 'an', 'are'], 0, 'Report begins with a consonant sound and is mentioned generally.'),
      choice('Complete: “___ report you sent is clear.”', ['A', 'An', 'The'], 2, 'Use the when both people know which report.'),
      choice('Choose the correct phrase.', ['a email', 'an email', 'the email' ], 1, 'Email begins with a vowel sound.'),
      choice('Complete: “We scheduled ___ meeting for Tuesday.”', ['a', 'an', 'are'], 0, 'Meeting begins with a consonant sound.'),
    ],
    writingPrompt: 'Write three workplace sentences that correctly use a, an and the.',
    assessment: choice('Choose the correct sentence.', ['She sent an update about the meeting.', 'She sent a update about a meeting.', 'She sent the update about an meeting.'], 0, 'Use an before update and the for the specific meeting.'),
  },
  {
    day: 20,
    title: 'Prepositions for Work',
    concept: 'In, on, at, to and with',
    explanation: 'Prepositions show where, when or how things relate. Use in for enclosed places or longer time periods, on for days and surfaces, at for specific times or places, to for direction and with for company or tools.',
    malayalam: 'Preposition സ്ഥലം, സമയം, ദിശ, ബന്ധം എന്നിവ വ്യക്തമാക്കുന്നു. In, on, at, to, with എന്നിവയുടെ ശരിയായ ഉപയോഗം വാക്യത്തിന്റെ അർത്ഥം വ്യക്തമാക്കും.',
    examples: ['The file is in the shared folder.', 'The meeting is on Thursday.', 'Please call me at two.', 'I sent the draft to my manager.', 'She reviewed the figures with her team.'],
    exercises: [
      choice('Complete: “The file is ___ the shared folder.”', ['in', 'on', 'at'], 0, 'Use in for something inside a folder or place.'),
      choice('Complete: “The meeting is ___ Thursday.”', ['in', 'on', 'at'], 1, 'Use on with days of the week.'),
      choice('Complete: “Please call me ___ two o’clock.”', ['in', 'on', 'at'], 2, 'Use at with a specific time.'),
      choice('Complete: “I sent the draft ___ my manager.”', ['to', 'with', 'on'], 0, 'Use to for the recipient or direction.'),
      choice('Complete: “She reviewed the figures ___ her team.”', ['at', 'with', 'to'], 1, 'Use with to say who joined her.'),
    ],
    writingPrompt: 'Write four sentences about a work document, meeting or colleague. Use in, on, at and with at least once.',
    assessment: choice('Choose the correct sentence.', ['The meeting is in Friday at three.', 'The meeting is on Friday at three.', 'The meeting is at Friday on three.'], 1, 'Use on with the day and at with the time.'),
  },
];
