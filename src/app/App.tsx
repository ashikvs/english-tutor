import { useState } from 'react';
import type { ReactNode } from 'react';
import { BookOpen, BookOpenText, Check, ChevronRight, CircleHelp, Flame, House, PenLine, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { curriculum } from '../data/curriculum';
import { lessons } from '../data/lessons';
import { readCompletedDays, saveCompletedDays } from '../storage/progress';
import styles from './App.module.css';

type Destination = 'Home' | 'Learn' | 'Practice' | 'Write' | 'Progress';
type Screen = Destination | 'Lesson';
const destinations: { name: Destination; icon: typeof House }[] = [
  { name: 'Home', icon: House }, { name: 'Learn', icon: BookOpen },
  { name: 'Practice', icon: Sparkles }, { name: 'Write', icon: PenLine },
  { name: 'Progress', icon: Trophy },
];

function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>(readCompletedDays);
  const openLesson = (day = 1) => { setSelectedDay(day); setScreen('Lesson'); };
  const completeLesson = (day: number) => {
    if (completedDays.includes(day)) return;
    const updated = [...completedDays, day].sort((first, second) => first - second);
    saveCompletedDays(updated);
    setCompletedDays(updated);
  };
  const navTo = (name: Destination) => setScreen(name);
  const active = screen === 'Lesson' ? 'Learn' : screen;
  const availableDays = curriculum.filter((day) => day.available);
  const nextDay = availableDays.find((day) => !completedDays.includes(day.day)) ?? availableDays[0];
  const totalXp = completedDays.length * 20;

  return <div className={styles.appShell}>
    <aside className={styles.sidebar} aria-label="Main navigation">
      <a className={styles.brand} href="#home" onClick={(event) => { event.preventDefault(); navTo('Home'); }}>
        <span className={styles.brandIcon}><BookOpenText size={21} /></span><span>English <b>with Amrtha</b></span>
      </a>
      <p className={styles.navLabel}>YOUR SPACE</p>
      <nav className={styles.navList}>{destinations.map(({ name, icon: Icon }) =>
        <button key={name} className={styles.navItem + (active === name ? ' ' + styles.navItemActive : '')} onClick={() => navTo(name)} aria-current={active === name ? 'page' : undefined}>
          <Icon size={19} /><span>{name}</span>{name === 'Learn' && <span className={styles.navDot} />}
        </button>)}</nav>
      <div className={styles.sidebarCard}><Sparkles size={19} /><strong>Small steps add up</strong><p>A little practice each day makes a big difference.</p></div>
      <div className={styles.profile}><div className={styles.avatar}>A</div><div><strong>Amrtha</strong><span>English learner</span></div></div>
    </aside>
    <main className={styles.main}>
      <header className={styles.topbar}><span className={styles.mobileBrand}><BookOpenText size={20} /> English with Amrtha</span><div className={styles.topbarRight}><span className={styles.streak}><Flame size={17} /> 0 day streak</span><span className={styles.xp}><Sparkles size={16} /> {totalXp} XP</span></div></header>
      {screen === 'Home' && <Dashboard nextDay={nextDay} completedCount={completedDays.length} totalXp={totalXp} onContinue={openLesson} onLearn={() => navTo('Learn')} />}
      {screen === 'Learn' && <Curriculum completedDays={completedDays} onOpenLesson={openLesson} />}
      {screen === 'Lesson' && <Lesson key={selectedDay} day={selectedDay} onComplete={completeLesson} onBack={() => navTo('Learn')} />}
      {screen !== 'Home' && screen !== 'Learn' && screen !== 'Lesson' && <ComingSoon destination={screen} />}
    </main>
    <nav className={styles.mobileNav} aria-label="Main navigation">{destinations.map(({ name, icon: Icon }) =>
      <button key={name} className={styles.mobileNavItem + (active === name ? ' ' + styles.mobileNavActive : '')} onClick={() => navTo(name)} aria-current={active === name ? 'page' : undefined}><Icon size={19} /><span>{name}</span></button>)}</nav>
  </div>;
}

function Dashboard({ nextDay, completedCount, totalXp, onContinue, onLearn }: { nextDay: (typeof curriculum)[number]; completedCount: number; totalXp: number; onContinue: (day: number) => void; onLearn: () => void }) {
  return <div className={styles.content}>
    <div className={styles.greeting}><div><p className={styles.eyebrow}>YOUR WORKPLACE ENGLISH JOURNEY</p><h1>Welcome, Amrtha <span aria-hidden="true">🌼</span></h1><p className={styles.subheading}>Build confidence describing your work in English.</p></div><div className={styles.greetingArt} aria-hidden="true"><span>✦</span><BookOpenText size={48} /></div></div>
    <section className={styles.heroCard}><div className={styles.heroCopy}><span className={styles.dayPill}><Sparkles size={14} /> YOUR NEXT STEP · DAY {nextDay.day}</span><h2>{completedCount === 0 ? <>Every great sentence<br />starts somewhere.</> : <>Keep building<br />your confidence.</>}</h2><p>{nextDay.title}: {nextDay.topic}.</p><button className={styles.primaryButton} onClick={() => onContinue(nextDay.day)}>{completedCount === 20 ? 'Review lessons' : `Continue Day ${nextDay.day}`} <ChevronRight size={18} /></button></div><div className={styles.heroIllustration} aria-hidden="true"><span>☀</span><BookOpenText size={62} /><i>✦</i></div></section>
    <div className={styles.statsGrid}><StatCard icon={<Flame size={20} />} label="Daily streak" value="0 days" caption="Daily streak tracking coming later" tone="peach" /><StatCard icon={<Sparkles size={19} />} label="Total XP" value={`${totalXp} XP`} caption="20 XP for each completed lesson" tone="lavender" /><StatCard icon={<BookOpen size={20} />} label="Lessons complete" value={`${completedCount} of 20`} caption="Your progress is saved on this device" tone="mint" /></div>
    <section className={styles.todaySection}><div className={styles.sectionHeader}><div><p className={styles.eyebrow}>YOUR LEARNING PATH</p><h2>Today's little plan</h2></div><button className={styles.textButton} onClick={onLearn}>View all days <ChevronRight size={16} /></button></div><button className={styles.planRow} onClick={() => onContinue(nextDay.day)}><span className={styles.planNumber}>{String(nextDay.day).padStart(2, '0')}</span><span className={styles.planCopy}><strong>{nextDay.title}</strong><small>{nextDay.topic}</small></span><span className={styles.planTime}>5 min</span><ChevronRight size={18} /></button></section>
  </div>;
}

function StatCard({ icon, label, value, caption, tone }: { icon: ReactNode; label: string; value: string; caption: string; tone: string }) {
  return <article className={styles.statCard}><div className={styles.statIcon + ' ' + styles[tone]}>{icon}</div><div><span className={styles.statLabel}>{label}</span><strong className={styles.statValue}>{value}</strong><small className={styles.statCaption}>{caption}</small></div></article>;
}

function Curriculum({ completedDays, onOpenLesson }: { completedDays: number[]; onOpenLesson: (day: number) => void }) {
  return <div className={styles.content}>
    <div className={styles.pageHeading}><p className={styles.eyebrow}>YOUR LEARNING PATH</p><h1>Learn, one day at a time</h1><p className={styles.subheading}>The first twenty lessons are ready, with the rest of your 30-day path to follow.</p></div>
    <section className={styles.curriculumIntro}><div className={styles.curriculumIcon}><BookOpenText size={24} /></div><div><strong>30 days of professional English</strong><p>Start with twenty lessons on workplace grammar, emails, reports and conversations.</p></div><div className={styles.curriculumProgress}><strong>20</strong><span>ready</span></div></section>
    <div className={styles.dayList}>{curriculum.map((day) => <article key={day.day} className={styles.dayCard + (day.available ? ' ' + styles.dayAvailable : ' ' + styles.dayLocked)}>
      <div className={styles.dayNumber + (day.available ? ' ' + styles.dayNumberAvailable : '')}>{day.available ? <BookOpen size={19} /> : String(day.day).padStart(2, '0')}</div>
      <div className={styles.dayInfo}><span>DAY {String(day.day).padStart(2, '0')}</span><h2>{day.title}</h2><p>{day.topic}</p></div>
      {day.available ? <button className={styles.dayAction + (completedDays.includes(day.day) ? ' ' + styles.dayActionCompleted : '')} onClick={() => onOpenLesson(day.day)}>{completedDays.includes(day.day) ? <>Completed <Check size={15} /></> : <>Start <ChevronRight size={16} /></>}</button> : <span className={styles.comingLabel}>Coming soon</span>}
    </article>)}</div>
  </div>;
}

function Lesson({ day, onComplete, onBack }: { day: number; onComplete: (day: number) => void; onBack: () => void }) {
  const lesson = lessons.find((item) => item.day === day);
  const [phase, setPhase] = useState<'practice' | 'writing' | 'assessment' | 'complete'>('practice');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'retry' | null>(null);
  const [writing, setWriting] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<'accepted' | 'retry' | null>(null);
  const [assessmentOption, setAssessmentOption] = useState<number | null>(null);
  const [assessmentFeedback, setAssessmentFeedback] = useState<'correct' | 'retry' | null>(null);

  if (!lesson) return <div className={styles.content}><h1>Lesson not available</h1><button className={styles.backButton} onClick={onBack}>Back to learning path</button></div>;
  const exercise = lesson.exercises[exerciseIndex];

  const checkPractice = () => {
    let correct = false;
    if (exercise.kind === 'word-order') {
      correct = selectedWords.length === exercise.answer.length
        && selectedWords.every((wordIndex, position) => wordIndex === exercise.answer[position]);
    } else {
      correct = selectedOption === exercise.answer;
    }
    setPracticeFeedback(correct ? 'correct' : 'retry');
  };

  const nextExercise = () => {
    if (exerciseIndex + 1 < lesson.exercises.length) {
      setExerciseIndex(exerciseIndex + 1);
      setSelectedOption(null);
      setSelectedWords([]);
      setPracticeFeedback(null);
    } else {
      setPhase('writing');
    }
  };

  const checkWriting = () => {
    const trimmed = writing.trim();
    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
    setWritingFeedback(wordCount >= 5 && /[.!?]$/.test(trimmed) ? 'accepted' : 'retry');
  };

  const checkAssessment = () => {
    setAssessmentFeedback(assessmentOption === lesson.assessment.answer ? 'correct' : 'retry');
  };

  return <div className={styles.content}>
    <button className={styles.backButton} onClick={onBack}>‹ <span>Back to learning path</span></button>
    <div className={styles.lessonHeading}><span className={styles.dayPill}><Sparkles size={14} /> DAY {String(day).padStart(2, '0')} · 5 MIN</span><h1>{lesson.title}</h1><p className={styles.subheading}>Build useful English for conversations and writing at work.</p></div>
    <section className={styles.conceptCard}><div className={styles.conceptTop}><div><p className={styles.eyebrow}>TODAY'S PATTERN</p><h2>{lesson.concept}</h2></div><div className={styles.conceptIcon}><BookOpenText size={23} /></div></div><p>{lesson.explanation}</p><div className={styles.malayalam}><strong>മലയാളത്തിൽ</strong><p>{lesson.malayalam}</p></div></section>
    <section className={styles.examplesSection}><div className={styles.sectionHeader}><div><p className={styles.eyebrow}>SEE IT IN ACTION</p><h2>Five work examples</h2></div></div><div className={styles.examplesGrid}>{lesson.examples.map((example, index) => <div className={styles.example} key={example}><span>{String(index + 1).padStart(2, '0')}</span><strong>{example}</strong><Check size={16} /></div>)}</div></section>

    {phase === 'practice' && <section className={styles.exerciseCard}>
      <div className={styles.exerciseHeader}><span className={styles.exerciseIcon}><Sparkles size={19} /></span><div><p className={styles.eyebrow}>PRACTICE {exerciseIndex + 1} OF {lesson.exercises.length}</p><h2>{exercise.kind === 'word-order' ? 'Build a sentence' : 'Choose the best answer'}</h2></div></div>
      <p className={styles.exercisePrompt}>{exercise.prompt}</p>
      {exercise.kind === 'word-order' ? <><div className={styles.answerArea} aria-live="polite">{selectedWords.length === 0 ? <span className={styles.answerHint}>Your sentence will appear here…</span> : selectedWords.map((index, position) => <span className={styles.answerWord} key={position}>{exercise.words[index]}</span>)}</div><div className={styles.wordBank} aria-label="Available words">{exercise.words.map((word, index) => <button key={index} className={styles.wordButton} disabled={selectedWords.includes(index) || practiceFeedback === 'correct'} onClick={() => { setSelectedWords((current) => [...current, index]); setPracticeFeedback(null); }}>{word}</button>)}</div></>
        : <div className={styles.choiceList}>{exercise.options.map((option, index) => <button key={option} className={styles.choiceButton + (selectedOption === index ? ' ' + styles.choiceSelected : '')} aria-pressed={selectedOption === index} disabled={practiceFeedback === 'correct'} onClick={() => { setSelectedOption(index); setPracticeFeedback(null); }}>{option}</button>)}</div>}
      {practiceFeedback === 'correct' && <div className={styles.feedback + ' ' + styles.feedbackCorrect} role="status"><Check size={18} /><span><strong>Correct!</strong> {exercise.hint}</span></div>}
      {practiceFeedback === 'retry' && <div className={styles.feedback + ' ' + styles.feedbackRetry} role="status"><CircleHelp size={18} /><span>Not quite. Try again. Hint: {exercise.hint}</span></div>}
      <div className={styles.exerciseActions}>{(selectedWords.length > 0 || selectedOption !== null) && practiceFeedback !== 'correct' && <button className={styles.resetButton} onClick={() => { setSelectedWords([]); setSelectedOption(null); setPracticeFeedback(null); }}><RotateCcw size={16} /> Start over</button>}{practiceFeedback === 'correct' ? <button className={styles.primaryButton} onClick={nextExercise}>{exerciseIndex + 1 === lesson.exercises.length ? 'Writing challenge' : 'Next practice'} <ChevronRight size={18} /></button> : <button className={styles.primaryButton} disabled={exercise.kind === 'word-order' ? selectedWords.length !== exercise.words.length : selectedOption === null} onClick={checkPractice}>Check answer <ChevronRight size={18} /></button>}</div>
    </section>}

    {phase === 'writing' && <section className={styles.exerciseCard}><div className={styles.exerciseHeader}><span className={styles.exerciseIcon}><PenLine size={19} /></span><div><p className={styles.eyebrow}>WRITING CHALLENGE</p><h2>Put it into your own words</h2></div></div><p className={styles.exercisePrompt}>{lesson.writingPrompt}</p><textarea className={styles.writingInput} value={writing} onChange={(event) => { setWriting(event.target.value); setWritingFeedback(null); }} rows={4} placeholder="Write your answer here…" aria-label="Your writing challenge response" /><p className={styles.writingHint}>Quick check: write at least five words and finish with a full stop, question mark or exclamation mark.</p>{writingFeedback === 'accepted' && <div className={styles.feedback + ' ' + styles.feedbackCorrect} role="status"><Check size={18} /><span>Your response meets the basic length and punctuation check. Read it once to check that it says what you mean.</span></div>}{writingFeedback === 'retry' && <div className={styles.feedback + ' ' + styles.feedbackRetry} role="status"><CircleHelp size={18} /><span>Add a little more and finish with punctuation. You can try again.</span></div>}<div className={styles.exerciseActions}>{writingFeedback === 'accepted' ? <button className={styles.primaryButton} onClick={() => setPhase('assessment')}>Continue to assessment <ChevronRight size={18} /></button> : <button className={styles.primaryButton} disabled={!writing.trim()} onClick={checkWriting}>Check my writing <ChevronRight size={18} /></button>}</div></section>}

    {phase === 'assessment' && <section className={styles.exerciseCard}><div className={styles.exerciseHeader}><span className={styles.exerciseIcon}><Trophy size={19} /></span><div><p className={styles.eyebrow}>DAY {day} ASSESSMENT</p><h2>One final question</h2></div></div><p className={styles.exercisePrompt}>{lesson.assessment.prompt}</p><div className={styles.choiceList}>{lesson.assessment.options.map((option, index) => <button key={option} className={styles.choiceButton + (assessmentOption === index ? ' ' + styles.choiceSelected : '')} aria-pressed={assessmentOption === index} disabled={assessmentFeedback === 'correct'} onClick={() => { setAssessmentOption(index); setAssessmentFeedback(null); }}>{option}</button>)}</div>{assessmentFeedback === 'correct' && <div className={styles.feedback + ' ' + styles.feedbackCorrect} role="status"><Check size={18} /><span><strong>Well done!</strong> {lesson.assessment.hint}</span></div>}{assessmentFeedback === 'retry' && <div className={styles.feedback + ' ' + styles.feedbackRetry} role="status"><CircleHelp size={18} /><span>Try once more. Hint: {lesson.assessment.hint}</span></div>}<div className={styles.exerciseActions}>{assessmentFeedback === 'correct' ? <button className={styles.primaryButton} onClick={() => { onComplete(day); setPhase('complete'); }}>Finish lesson <Check size={18} /></button> : <button className={styles.primaryButton} disabled={assessmentOption === null} onClick={checkAssessment}>Check assessment <ChevronRight size={18} /></button>}</div></section>}

    {phase === 'complete' && <section className={styles.exerciseCard}><div className={styles.completionMark}><Trophy size={28} /></div><p className={styles.eyebrow}>DAY {day} COMPLETE</p><h2>Good work, Amrtha!</h2><p className={styles.subheading}>You practised {lesson.concept.toLowerCase()} in workplace English. Lesson completion is saved on this device; your writing response is not saved.</p><div className={styles.exerciseActions}><button className={styles.primaryButton} onClick={onBack}>Back to learning path <ChevronRight size={18} /></button></div></section>}
  </div>;
}

function ComingSoon({ destination }: { destination: Destination }) {
  const icon = destination === 'Write' ? <PenLine size={26} /> : destination === 'Progress' ? <Trophy size={26} /> : <Sparkles size={26} />;
  return <div className={styles.comingPage}><div className={styles.comingIcon}>{icon}</div><p className={styles.eyebrow}>A NEW WAY TO GROW</p><h1>{destination} is on its way</h1><p className={styles.subheading}>We’re preparing this part of your learning journey. For now, start with your first lesson and practise building sentences.</p><span className={styles.comingPill}>Coming in a future lesson sprint</span></div>;
}

export default App;
