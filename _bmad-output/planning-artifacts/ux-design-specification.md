---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-thai-learn-playground-2026-01-09.md"
  - "_bmad-output/planning-artifacts/prd.md"
workflowType: 'ux-design'
lastStep: 9
completed: true
---

# UX Design Specification - thai-learning-v2

**Author:** thaieager
**Date:** 2026-01-09

---

## Executive Summary

### Project Vision

Thai Master is a mobile-first Thai language learning application that inverts traditional language app methodology by prioritizing script mastery before vocabulary. The 12-week POC validates that 4 weeks of character foundation (44 consonants, 32 vowels, 4 tone marks) enables faster vocabulary acquisition and independent reading ability. Success means users can decode any Thai word they encounter - even unfamiliar ones - by understanding the character system, not memorizing individual word pronunciations.

Post-POC expansion focuses on deepening Thai language mastery: growing vocabulary from 50 → 100 → 500 → 1,000+ words, adding advanced learning features (tone logic quizzes, custom vocabulary decks, content integration with Thai YouTube/social media), and optimizing the learning experience based on user data. Multi-language expansion is a distant future consideration - the priority is becoming THE definitive Thai learning application.

### Target Users

**Primary User: Asher - The Content-Driven Learner**

- **Profile**: Tech-savvy professional (early 30s), successfully learned Spanish (500-600 words) using flash cards, abandoned Japanese on Duolingo due to script barrier
- **Current Behavior**: Watches Thai YouTube content but relies on English subtitles, 50% listening comprehension but can't read Thai subtitles fast enough
- **Pain Points**: Thai script completely foreign, mainstream apps skip alphabet mastery, overwhelmed by 80%+ unknown vocabulary in sentences, locked out of Thai social media engagement
- **Success Vision**: Watch Thai YouTube with Thai subtitles, read/respond to Thai comments, decode unfamiliar words independently
- **Learning Style**: Visual learner first (needs to see/write characters), audio learner second, fast repetition preferred over lengthy explanations, logic-driven (wants to understand WHY tones work)
- **Usage Context**: Daily 10-15 minute sessions (morning coffee routine or evening wind-down), mobile phone primary device, budget-conscious (avoids expensive paid platforms)

### Key Design Challenges

**Challenge 1: Delayed Gratification (4-Week Script Focus)**

Users must practice characters for 4 full weeks before learning any vocabulary. Traditional apps provide "speaking Thai" gratification immediately. UX must deliver micro-wins throughout character mastery to sustain motivation:
- Day 5: Recognize first Thai character in YouTube title (breakthrough moment)
- Day 7: Decode entire YouTube title character-by-character
- Week 4: Character mastery completion unlocks vocabulary deck (achievement milestone)

**Challenge 2: Canvas Tracing Experience on Mobile**

Touch-based character tracing must feel natural and forgiving on small mobile screens:
- 30% opacity ghost font must be visible without eye strain
- <50ms touch latency requirement on mid-range Android devices
- Individual canvas reset for repetition practice without frustration
- Balance between guidance (ghost font) and validation (did I draw it correctly?)

**Challenge 3: Performance Tracking Without Discouragement**

70% alphabet accuracy and 50% vocabulary accuracy are success thresholds, meaning users will fail 30-50% of the time during learning:
- Report card dashboard must celebrate progress, not just highlight failures
- Weak area identification must feel helpful, not punishing
- Revision deck creation must feel like targeted improvement, not remedial work
- Trend visualization must show growth over time to counter accuracy anxiety

**Challenge 4: Offline-First Mobile Experience**

Users practice during commutes, morning routines, or locations without reliable connectivity:
- Audio caching must be invisible (progressive loading in background)
- Offline functionality must be 100% reliable after first load
- LocalStorage persistence must never lose progress (catastrophic for daily streak users)
- Network failures must not interrupt learning flow

### Design Opportunities

**Opportunity 1: Real-World Validation Moments**

Unlike traditional apps that exist in isolation, Thai Master can explicitly connect to users' content consumption goals:
- "Character Recognition in the Wild" feature: Pause YouTube, screenshot Thai text, identify characters learned
- Progress milestones tied to real-world capabilities ("You can now read Thai video titles!" badge at Week 4)
- Integration hints: "Try reading Thai comments on your favorite YouTuber's channel" prompts
- Success stories surface: "Recognized 3 words in Thai subtitle today" user achievements

**Opportunity 2: Logic-Based Tone Teaching as UX Advantage**

Tone rules (consonant class + vowel length = tone) can be taught as interactive puzzles rather than rote memorization:
- Visual tone mark highlighting during vocabulary flash cards
- "Predict the tone" quizzes that teach the WHY, not just the WHAT
- Tone rule reference easily accessible during practice (not buried in lessons)
- Audio pronunciation paired with visual tone indicators to reinforce pattern recognition

**Opportunity 3: Data-Driven Personalization**

Accuracy tracking enables highly personalized learning paths:
- Custom revision decks auto-generated from weak areas (<70%/<50% accuracy)
- Spaced repetition surfaces characters user struggles with more frequently
- Practice session composition adapts: more vowel practice if vowels are weak spot
- Weekly reports show exactly where user improved (celebrate vowel accuracy jump from 65% → 74%)

---

## Core User Experience

### Defining Experience

Thai Master's core experience centers on **touch-based character mastery with immediate audio reinforcement**, progressing through three distinct phases:

**Phase 1 (Weeks 1-4): Character Foundation**
Users trace Thai characters (44 consonants, 32 vowels, 4 tone marks) on a ghost-font guided canvas (30% opacity). Each completed character triggers native speaker pronunciation. Individual canvas reset enables unlimited repetition practice. Daily target: 3 new characters, building muscle memory and visual recognition.

**Phase 2 (Weeks 5-12): Vocabulary Building**
After character mastery completion, users study a 50-word foundational deck using flash-card methodology. Spaced repetition algorithm surfaces weak items automatically. 85% of cards reinforce known vocabulary, 15% introduce controlled sentence exposure (4-5 words, minimal unknown content). Audio pronunciation accompanies every word.

**Phase 3 (Continuous): Performance Assessment**
Character and vocabulary recognition quizzes validate learning effectiveness. Report card dashboard tracks accuracy (70% alphabet target, 50% vocabulary target). Weak area identification (<70%/<50% thresholds) automatically generates custom revision decks for targeted practice.

**The Critical Interaction:** Touch-based canvas tracing with <50ms latency and immediate audio feedback. If this feels laggy, imprecise, or frustrating, users abandon in Week 1. Everything else builds on this foundation.

### Platform Strategy

**Web-First Progressive Web App (Chrome-Optimized)**

- **Primary Platform:** Chrome browser (desktop development, Android mobile production)
- **Interaction Model:** Touch-first design - canvas tracing, tap navigation, mobile-optimized UI
- **Distribution:** Direct URL access (no app store submission for POC), optional "Add to Home Screen" for quick access
- **Performance Baseline:** Mid-range Android devices (Samsung Galaxy A-series equivalent)

**Offline-First Architecture:**
- Service Worker caches audio files progressively (next 10 items, not all 130 at once)
- LocalStorage persists all progress data (characters practiced, vocabulary learned, quiz scores)
- Full functionality after initial load: tracing, flash cards, quizzes work without network
- Audio playback from cache: <100ms start time, zero buffering delays

**Technical Requirements:**
- Canvas touch latency: <50ms on mid-range Android devices
- Initial app load: <2 seconds on 4G connection
- Subsequent navigation: <500ms when cached
- Thai font rendering: Unicode-compliant with accurate tone mark positioning
- Audio quality: Minimum 128kbps AAC, native speaker recordings

**Device Considerations:**
- Mobile phone primary device (single focal canvas)
- Tablet 2x3 grid practice mode deferred to Phase 2+
- Desktop support secondary (development and testing environment)

### Effortless Interactions

**Zero-Thought User Actions:**

1. **Audio Pronunciation:** Every character and vocabulary word plays native speaker audio on tap. No hunting for audio buttons, no loading delays, no configuration required. Audio should feel instant and inevitable.

2. **Progress Persistence:** All learning progress automatically saves to LocalStorage across browser sessions. Users never manually save, never worry about data loss, never export/import (unless device change). Progress just... persists.

3. **Spaced Repetition Intelligence:** Algorithm automatically surfaces weak characters and vocabulary more frequently based on accuracy patterns. Users don't choose what to practice - the system adapts invisibly based on performance data.

4. **Offline Mode Seamlessness:** After first load, app works identically offline and online. No network error messages, no degraded functionality, no "you're offline" warnings. Users practice during commutes without thinking about connectivity.

5. **Individual Canvas Reset:** One tap clears canvas for immediate re-practice of same character. No multi-step undo, no confirmation dialogs, no navigation away from current character. Reset → trace again.

6. **Custom Revision Deck Generation:** System auto-creates practice decks from items below accuracy thresholds (<70% alphabet, <50% vocabulary). Users see "Add to Revision Deck" option, tap once, deck is ready. No manual card selection, no configuration complexity.

### Critical Success Moments

**Week 1: First-Session Value Delivery (Onboarding Gate)**

- **The Moment:** User opens app for first time, immediately sees tracing canvas with ก character (ghost font visible), traces with finger, hears "gor gai" pronunciation, traces 5-6 characters in 5 minutes
- **Success Criteria:** User experiences tangible progress without signup barrier, feels "I'm learning already"
- **Failure Mode:** Canvas confusion, audio playback failure, lengthy tutorial before action, signup wall blocking immediate value
- **Design Implication:** Zero onboarding friction - straight to canvas, no explanations, prompt to save progress only AFTER demonstrating value

**Day 5-7: Real-World Recognition Breakthrough (Motivation Anchor)**

- **The Moment:** User watches Thai YouTube video, recognizes first learned character (ก) in video title, experiences "I can READ that!" emotional response
- **Success Criteria:** User makes explicit connection between practice and content consumption goal, shares breakthrough with friends/Reddit
- **Failure Mode:** User doesn't recognize connection by Week 1, or character recognition doesn't translate to real content
- **Design Implication:** Explicitly prompt users at Day 5: "Try spotting Thai characters in YouTube titles today - you know 15+ characters now!" Make the connection obvious.

**Week 4: Character Mastery Achievement (Progression Gate)**

- **The Moment:** User completes all 44 consonants + 32 vowels + 4 tone marks, receives "🎉 Character mastery complete! Ready for vocabulary?" celebration, vocabulary deck unlocks
- **Success Criteria:** User feels accomplished foundation is solid, excited to apply character knowledge to real words, confident in 70%+ alphabet accuracy
- **Failure Mode:** User burns out before Week 4 completion, or feels unprepared for vocabulary despite technical completion
- **Design Implication:** Week 4 milestone must feel like major achievement with visual/audio celebration. Gate vocabulary unlock on BOTH completion AND 70% accuracy threshold.

**Week 6-12: Content Consumption Validation (Retention)**

- **The Moment:** User watches Thai YouTube content, recognizes 3-5 familiar words from 50-word deck in subtitles, understands phrases without pausing video
- **Success Criteria:** Vocabulary learning transfers to real-world Thai content recognition, user validates time investment through actual comprehension improvement
- **Failure Mode:** Vocabulary doesn't transfer to content recognition, or user can't find familiar words in real Thai content, questions methodology effectiveness
- **Design Implication:** Explicitly surface this milestone: "You've learned 25 words - try watching Thai content and spotting familiar words!" Track user-reported content recognition as success metric.

### Experience Principles

**Principle 1: Immediate Action Over Explanation**

Users should be tracing their first Thai character within 30 seconds of opening the app. No lengthy tutorials, no signup walls, no abstract lessons. Show by doing, not by reading. Fast repetition beats lengthy explanations every time.

**Design Application:** Onboarding flow is: Open app → See ก with ghost font → Tap anywhere to trace → Hear pronunciation → See "Reset to try again" → Trace 5-6 characters → Prompt to save progress. Zero explanatory screens.

**Principle 2: Real-World Connection Over App Isolation**

Every milestone should explicitly tie to content consumption goals. Success is measured in "Can I read this YouTube comment?" not "Did I complete lesson 47?" The app exists to unlock Thai content, not to be a self-contained game.

**Design Application:** Achievement messages like "You can now read Thai video titles!" (Week 4), "Try reading comments on your favorite YouTuber's channel" (Week 8), "Recognized 3 words in Thai subtitle today" user-reported wins. Make external validation visible and celebrated.

**Principle 3: Micro-Wins During Delayed Gratification**

4 weeks of character practice before vocabulary requires constant progress validation. Users need to feel successful daily, not just at Week 4 completion. Small victories sustain motivation through the foundation phase.

**Design Application:** Daily streak tracking, "15 characters mastered!" incremental celebrations, Day 5/Day 7 "character recognition in wild" prompts, weekly accuracy improvement notifications ("Your vowel accuracy jumped from 65% → 74% this week!").

**Principle 4: Logic Over Memorization**

Teach WHY (consonant class + vowel length = tone) not just WHAT (this word has rising tone). Users want to understand the system, enabling independent pronunciation of unfamiliar words. Make the logic accessible, not buried.

**Design Application:** Tone mark highlighting during vocabulary flash cards, "Tone Rule Reference" easily accessible from practice screen, "Predict the tone" quizzes that teach consonant class logic, visual indicators showing tone derivation process.

**Principle 5: Personalization Through Data, Not Settings**

Accuracy tracking automatically identifies weak areas and surfaces them more frequently. Users don't configure spaced repetition algorithms, don't manually create revision decks, don't adjust difficulty settings. The app adapts invisibly based on performance patterns.

**Design Application:** Report card dashboard surfaces weak areas automatically, "Add to Revision Deck" one-tap action, practice sessions dynamically adjust (more vowel practice if vowels <70%), weekly reports show exactly where improvement happened without user configuration.

**Principle 6: Offline Reliability is Non-Negotiable**

Morning coffee routine, commute practice, evening wind-down - these happen regardless of network availability. After initial load, 100% functionality must work offline with zero degradation. Data loss is catastrophic for daily streak users.

**Design Application:** Service Worker implementation priority #1, LocalStorage progress persistence with export/import backup option, offline mode testing requirement for every feature, "Cached for offline practice" indicators for audio files, zero network error interruptions during usage.

---

## Desired Emotional Response

### Primary Emotional Goals

**Primary: Empowerment Through Understanding**

Thai Master should create the feeling of "I've unlocked a system, not just memorized random facts." The core emotional anchor is the Day 5-7 "I can READ that!" breakthrough when users recognize their first Thai character in a YouTube video title. This isn't satisfaction from completing a lesson—it's the excitement of understanding HOW Thai script works, enabling independent reading of unfamiliar words.

**Secondary Emotional Goals:**

1. **Vindication** - "Finally, an app that gets it right" - Validation for users who succeeded with Spanish flash cards but failed with Japanese on Duolingo. The script-first approach should feel like the obvious solution they wished existed all along.

2. **Progress Confidence** - Daily micro-wins (3 characters learned today, 15 total mastered, daily streak maintained) counter the 4-week delayed gratification before vocabulary introduction. Users should feel steady, measurable progress building toward the Week 4 milestone.

3. **Logic Clarity** - "Aha!" moments when tone rules click into place: "THAT'S why this word has rising tone - mid-class consonant + long vowel!" Understanding the system creates deeper satisfaction than memorizing individual word pronunciations.

4. **Real-World Competence** - Pride when recognizing familiar words in actual Thai content: Week 10 watching YouTube subtitles and understanding 5 words from the 50-word deck validates the time investment and methodology effectiveness.

### Emotional Journey Mapping

**First Discovery (Pre-App):**
- **Current Emotional State:** Frustration, skepticism after failing with traditional apps ("Another language app that won't work?")
- **Desired Emotional Shift:** Curiosity, cautious optimism when discovering script-first approach ("This might actually address why I failed before")
- **Design Support:** Product positioning explicitly contrasts with Duolingo/Memrise script-skipping approach

**First 5 Minutes (Onboarding Gate):**
- **Desired Emotion:** Immediate confidence, "I'm learning already!" without signup friction
- **Success Criteria:** User traces 5-6 Thai characters, hears pronunciation, feels tangible progress in first session
- **Design Support:** Zero signup wall, straight to tracing canvas, immediate audio feedback, simple reset functionality
- **Emotions to Avoid:** Confusion (too many instructions), anxiety (signup before value delivery), overwhelm (lengthy explanations)

**Day 5-7 (Breakthrough Moment):**
- **Desired Emotion:** Excitement, breakthrough, "THIS IS WORKING!"
- **Success Criteria:** User recognizes first Thai character in YouTube video title, experiences "I can READ that!" moment
- **Design Support:** Explicit prompt at Day 5: "Try spotting Thai characters in YouTube titles - you know 15+ characters now!"
- **Emotions to Avoid:** Missing the connection (not realizing practice applies to real content), continued skepticism about methodology

**Weeks 1-4 (Character Foundation Phase):**
- **Desired Emotions:** Steady progress (daily streak building), growing confidence (accuracy climbing 50% → 70%+), muscle memory forming (tracing feels more natural)
- **Design Support:** Daily streak tracking, incremental celebrations ("15 characters mastered!"), weekly accuracy improvement notifications ("Vowel accuracy jumped 65% → 74%!")
- **Emotions to Avoid:** Burnout (too fast pacing), discouragement (only highlighting failures), plateau frustration (no visible improvement)

**Week 4 (Character Mastery Achievement):**
- **Desired Emotion:** Major accomplishment, "I BUILT A FOUNDATION!", excited anticipation for vocabulary application
- **Success Criteria:** User feels confident in 70%+ alphabet accuracy, eager to learn real words
- **Design Support:** Visual/audio celebration "🎉 Character mastery complete! Ready for vocabulary?", explicit acknowledgment of achievement
- **Emotions to Avoid:** Anticlimactic transition, feeling unprepared for vocabulary despite technical completion

**Weeks 5-12 (Vocabulary Building):**
- **Desired Emotions:** Application excitement ("Real words!"), logic comprehension ("I know WHY this tone!"), real-world validation ("I understood that subtitle!")
- **Design Support:** Tone logic teaching integrated with flash cards, content consumption prompts, user-reported content recognition feature
- **Emotions to Avoid:** Memorization fatigue (rote drilling without understanding), feeling lost (not understanding tone derivation rules)

**Returning Users (Daily Practice Loop):**
- **Desired Emotion:** Comfortable routine ("my morning coffee practice"), effortless flow state
- **Design Support:** Offline reliability (commute practice), progress auto-persistence (zero worry), spaced repetition handles what to practice (zero decision fatigue)
- **Emotions to Avoid:** Network anxiety (offline failures), data loss panic, choice paralysis (what should I practice today?)

### Micro-Emotions

**Confidence vs. Confusion:**
- **Desired:** Confidence building through micro-wins, clarity from logic-based tone teaching, certainty from immediate audio feedback
- **Design Support:** Ghost font guidance (not intimidating blank canvas), audio pronunciation confirms correctness, tone rule reference accessible from practice screen
- **Avoid:** Confusion from laggy canvas, unclear whether tracing was "correct," hidden tone logic requiring memorization

**Trust vs. Skepticism:**
- **Desired:** Trust that script-first methodology works, validated through Day 5-7 breakthrough and Week 10 content recognition
- **Design Support:** Measurable improvement (accuracy tracking showing 50% → 70% progress), real-world validation (recognized characters in YouTube)
- **Avoid:** Skepticism from no visible progress, questioning time investment if vocabulary doesn't transfer to content consumption

**Accomplishment vs. Frustration:**
- **Desired:** Accomplishment from daily streaks, character mastery completion, recognizing words in real Thai content
- **Design Support:** Celebrate micro-wins (not just major milestones), report card shows improvement trends (not just current failures), revision deck framed as "power practice"
- **Avoid:** Frustration from 30-50% failure rate during learning, discouragement from weak area identification without positive framing, feeling "stuck" without progress indicators

**Delight vs. Satisfaction:**
- **Desired:** Delight when "I can READ that!" moment hits unexpectedly while watching YouTube
- **Design Support:** Explicit content recognition prompts, user-reported wins feature ("Where did you spot Thai today?"), achievement celebrations tied to real capabilities
- **Avoid:** Purely transactional satisfaction (checked off daily practice) without real-world validation moments, routine without surprise breakthroughs

**Empowerment vs. Dependency:**
- **Desired:** Empowerment to decode unfamiliar words independently using character + tone system knowledge
- **Design Support:** Logic-based tone teaching (consonant class rules), "Predict the tone" quizzes rewarding understanding, tone rule reference easily accessible
- **Avoid:** App dependency (must look up every word pronunciation), rote memorization without understanding WHY, feeling helpless without app guidance

### Design Implications

**1. Empowerment Through Understanding →**
- Tone logic explicitly taught with visual derivation (consonant class + vowel length = resulting tone)
- "Tone Rule Reference" button accessible from practice screen (not buried 5 taps deep)
- "Predict the tone" quizzes reward logic application, showing consonant class first, user predicts before answer revealed
- Visual tone mark highlighting during flash cards shows pattern recognition, not just rote memorization

**2. Vindication After Failed Apps →**
- Product positioning explicitly contrasts with Duolingo/Memrise script-skipping approach in messaging
- User testimonials featuring "finally understand how to read Thai" prominently displayed
- Day 5-7 breakthrough prompt makes success explicit: "See? You can READ Thai characters now - that's the foundation other apps skip!"

**3. Progress Confidence During Delayed Gratification →**
- Daily streak counter visible on home screen (simple, undeniable progress metric)
- Incremental celebrations: "5 characters mastered!" → "15 characters!" → "30 characters!" → "Week 4: All characters complete!"
- Weekly accuracy improvement notifications: "Your vowel accuracy jumped from 65% → 74% this week! That's 9% progress."
- Character completion progress bar: "38/44 consonants, 28/32 vowels, 4/4 tone marks" (visual progress toward milestone)

**4. Logic Clarity "Aha!" Moments →**
- Interactive tone prediction quizzes (show consonant class + vowel, user predicts tone BEFORE reveal)
- Tone derivation visualization: "Low-class consonant (ค) + short vowel (–ะ) = high tone (´)"
- "Why this tone?" button on vocabulary flash cards (on-demand explanation without forcing)
- Post-quiz success feedback: "You're getting it! That's consonant class logic working."

**5. Real-World Competence Validation →**
- Milestone prompts: "You know 15+ characters - try spotting them in YouTube titles today!" (Day 5), "25-word vocabulary - spot familiar words in Thai content!" (Week 8)
- User-reported wins feature: "Recognized Thai text today? Tell us where!" with examples (YouTube title, social media comment, subtitle)
- Achievement milestones tied to external capabilities: "You can now read Thai video titles!" (Week 4), "You have subtitle-reading vocabulary!" (Week 10)

**6. Offline Reliability = Invisible Trust →**
- "Cached for offline practice" indicators (user sees system prepared for offline mode)
- Zero network error messages during practice (offline mode seamless, no degradation)
- Progress export/import functionality (user controls data, builds trust in persistence)
- LocalStorage auto-save with zero manual intervention (progress just... persists)

### Emotional Design Principles

**Principle 1: Celebrate Micro-Wins to Counter Delayed Gratification**

4 weeks of character practice before vocabulary requires constant emotional validation. Users need to feel successful daily, not just at Week 4 milestone. Small victories sustain motivation through foundation phase.

**Application:** Daily streak counter, incremental character mastery celebrations ("15 mastered!" not waiting until all 44+32+4 complete), weekly accuracy improvement notifications ("Vowel accuracy improved 9% this week!" celebrates progress, not just final achievement), Day 5/7 content recognition prompts create "I can READ that!" moments before vocabulary introduction.

**Principle 2: Show Progress Trends, Not Just Current Failures**

Users fail 30-50% of quizzes during learning (70% alphabet, 50% vocabulary targets). Report card must emphasize improvement trajectory, not just current deficit. Celebrate growth over time to counter accuracy anxiety.

**Application:** Accuracy trend graphs showing week-over-week improvement (not just current 68%), "Your best week yet!" celebrations when accuracy jumps, weak area identification framed as "Focus here to improve fastest" not "You're failing these items," revision deck positioned as "Power practice for accelerated progress" not remedial work.

**Principle 3: Make "Aha!" Moments Explicit and Celebrated**

Logic-based understanding creates breakthrough feelings, but users might not consciously recognize them without prompts. Surface these moments explicitly.

**Application:** After tone prediction quiz success: "You're getting it! That's the consonant class logic working," Day 5-7 explicit prompt: "Try spotting Thai characters you learned in YouTube titles - you'll be surprised how many you recognize!", Week 4 celebration explicitly states: "You can now READ any Thai word (even if you don't know the meaning yet) - that's the foundation!"

**Principle 4: Build Trust Through Real-World Connection**

Users invest 12 weeks based on belief that script-first methodology works. Real-world validation is the trust anchor. Methodology proves itself through external recognition, not just in-app success.

**Application:** Milestones tied to external validation ("recognized characters in YouTube title" Week 1, "understood familiar words in subtitles" Week 10), user-reported content recognition feature ("Where did you spot Thai today?"), progress measured in "YouTube comprehension improvement" not just "lessons completed," explicit prompts to test learning in real Thai content.

**Principle 5: Empowerment Through Understanding, Not Dependency**

Users should feel "I can figure this out independently" not "I need the app to tell me every word." Teach the system (consonant classes, tone derivation), not just outcomes (this word has rising tone).

**Application:** Tone logic taught explicitly with accessible reference (consonant class rules available during practice), "Predict the tone" quizzes reward understanding over memorization, vocabulary flash cards show tone derivation logic visually (teach WHY, not just WHAT), tone rule reference on-demand without forcing lengthy explanations.

**Principle 6: Effortless Reliability = Invisible Confidence**

Users shouldn't consciously think about data loss, offline mode failures, or technical reliability. These anxieties must be eliminated through invisible, flawless UX.

**Application:** Progress auto-saves after every interaction (never manual save), offline mode seamless with zero network error interruptions, audio caching progressive in background (user never waits for audio to load), LocalStorage persistence with export backup option (control for power users), "Your progress is safe" communicated implicitly through zero data loss incidents across 12-week POC.

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Flash-Card Apps (Proven Pattern from Spanish Learning Success)**

What worked for target user (Asher) when learning Spanish successfully:
- Fast repetition cycle: present → answer → next (minimal explanation between reps)
- 85% known content reinforcement, 15% controlled unknown exposure
- Immediate progress feedback (words mastered count visible)
- Spaced repetition surfaces weak items automatically

**Key lesson:** Simplicity beats elaboration for vocabulary retention. Thai Master's flash-card phase (Weeks 5-12) should mirror this proven pattern directly.

**Duolingo (Learning from Successes and Failures)**

What works well:
- Daily streak counter (simple, visible motivation mechanic)
- Progress bars toward milestones (visual completion feedback)
- Mobile-first design (touch-optimized, no desktop assumptions)
- Audio pronunciation integrated into every interaction

What catastrophically fails for Thai/Japanese:
- Vocabulary-first approach without alphabet mastery foundation
- Overwhelming 80%+ unknown vocabulary in early sentences
- Skipping script logic teaching (users memorize sounds without understanding visual system)

**Key lesson:** Adopt Duolingo's engagement mechanics (streaks, progress bars, audio integration) while inverting their fundamental methodology (script-first, not vocabulary-first).

**Mobile Content Apps (YouTube, Social Media)**

What works well:
- Offline capability feels invisible (no "you're offline" warnings, just works)
- Progressive content loading (not everything at once)
- Touch-optimized navigation (swipe gestures, large tap targets)
- Auto-save assumptions (users never think about manual save)

**Key lesson:** Users expect mobile apps to "just work" offline during commutes, morning routines, locations without reliable connectivity. Thai Master's Service Worker caching must be flawless.

### Transferable UX Patterns

**Navigation & Information Architecture:**
- Minimal navigation depth (home → practice canvas, 1-2 taps maximum)
- Progress visible on home screen (daily streak, characters mastered count)
- Clear progression gates (vocabulary deck unlocks after Week 4 character mastery)

**Interaction Patterns:**
- Fast repetition without explanation interruptions (trace → audio → reset → trace again)
- One-tap actions for common flows (reset canvas, play audio, add to revision deck)
- Touch-first canvas (no mouse/keyboard assumptions, finger-optimized)
- Spaced repetition automatic (system surfaces weak items, user doesn't manually choose)

**Progress & Motivation Patterns:**
- Daily streak counter (Duolingo pattern, proven effective)
- Incremental celebrations ("15 characters mastered!" not waiting for all 44+32+4)
- Progress bars toward milestones (44/44 consonants visual completion)
- Accuracy trend graphs (week-over-week improvement, not just current state)

**Offline & Reliability Patterns:**
- Progressive audio caching (next 10 items, not all 130 at once)
- LocalStorage auto-persistence (zero manual save actions)
- Offline mode invisible (no network error messages during practice)
- Export/import backup option (power user control)

### Anti-Patterns to Avoid

**From Language Learning App Failures:**
- ❌ **Vocabulary before alphabet mastery** - Creates permanent app dependency for non-Latin scripts (Duolingo's core failure)
- ❌ **80%+ unknown vocabulary in sentences** - Overwhelming, not productive challenge
- ❌ **Lengthy explanations before action** - Users want to trace first character within 30 seconds, not read tutorials
- ❌ **Signup walls before value delivery** - Kills first-session conversion (prompt to save progress AFTER demonstrating value)

**From Mobile App Failures:**
- ❌ **Network error interruptions during use** - Breaks flow state, creates offline anxiety
- ❌ **Manual save requirements** - Users expect progress to persist automatically across sessions
- ❌ **Complex settings/configuration** - POC should work optimally with zero configuration needed
- ❌ **Tiny touch targets** - Mobile requires 44x44px minimum tap areas, not desktop-sized buttons

**From Educational App Failures:**
- ❌ **Only celebrating final milestones** - 4-week character phase needs daily micro-wins to sustain motivation
- ❌ **Highlighting only failures** - Report card showing "You failed 35% of vowels" without improvement context discourages
- ❌ **Hidden progress** - Users need constant visibility into "am I improving?" not just "did I pass this quiz?"

### Design Inspiration Strategy

**What to Adopt Directly:**
- **Flash-card fast repetition pattern** - Proven for target user's Spanish success (500-600 words), apply identically to vocabulary phase
- **Daily streak counter** - Duolingo's most effective motivation mechanic, visible on home screen
- **Offline-first architecture** - Mobile content app standard, Service Worker caching for all audio + progress persistence
- **Audio pronunciation on every interaction** - Language learning baseline, not supplementary feature

**What to Adapt:**
- **Duolingo gamification** → Tied to real-world validation (Week 4: "You can now read Thai video titles!" not just "Lesson 47 complete")
- **Flash-card spaced repetition** → With explicit accuracy thresholds (70% alphabet, 50% vocabulary targets visible)
- **Progress celebration** → Micro-wins during 4-week delayed gratification ("15 characters mastered!"), not just final achievement
- **Quiz feedback** → Celebrate improvement trends ("Vowel accuracy jumped 65% → 74%!"), not just current failures

**What to Avoid:**
- **Vocabulary-first approach** - Duolingo's fundamental flaw for non-Latin scripts, invert this completely (script-first)
- **Complex onboarding tutorials** - Get to tracing canvas within 30 seconds (trace first character immediately)
- **Network-dependent functionality** - Offline reliability non-negotiable for commute practice
- **Configuration complexity** - POC should work perfectly with zero settings (personalization through data, not settings)

**Strategy Summary:**

Thai Master's UX strategy: **Adopt proven engagement patterns (streaks, progress bars, fast repetition) while inverting the fundamental methodology flaw (script-first vs vocabulary-first).** Learn from Duolingo's successes (mobile UX, audio integration, gamification) while avoiding their catastrophic failure for non-Latin scripts (alphabet-skipping). Build on flash-card methodology that worked for target user's Spanish success, enhanced with script foundation layer that makes it work for Thai.

---

## Design System Foundation

### Design System Choice

**Radix UI (Unstyled Primitives) + Styled Components**

Radix UI provides unstyled, accessible component primitives with built-in behavior, keyboard navigation, and ARIA patterns. Styled Components provides CSS-in-JS styling with full TypeScript support and scoped styles. This combination delivers robust, accessible components with complete visual control - ideal for POC development.

**Component Architecture:**
- Radix UI handles behavior (modals, progress bars, tooltips, tabs, dialogs)
- Styled Components handles visual styling (scoped CSS, theme system, responsive design)
- Custom implementations for Canvas API (tracing), flash cards, and audio playback

### Rationale for Selection

**1. Accessibility Built-In**
- WCAG compliance for educational app (visual/audio learners from PRD requirements)
- Keyboard navigation, focus management, screen reader support provided automatically
- POC validates methodology, but accessibility matters from day 1 for target users

**2. Headless Component Architecture**
- Radix provides proven component patterns (modals, progress, toasts) without visual opinions
- Complete control over visual design (no Material Design or Bootstrap aesthetic constraints)
- Perfect for POC: robust behavior without premature visual design decisions

**3. Mobile-First Compatibility**
- Touch-optimized interactions built into Radix primitives
- Works seamlessly alongside custom Canvas API tracing implementation
- No framework conflicts between Radix UI and custom Canvas components

**4. Solo Developer Efficiency**
- Well-documented primitives with clear examples
- Import only needed components (minimal bundle size for POC)
- Composable: build exactly the components Thai Master requires

**5. Chrome-Optimized Development**
- Modern browser assumptions (no legacy IE polyfills)
- Leverages latest Web APIs without compatibility layers
- Aligns with POC's Chrome-only scope from PRD

### Implementation Approach

**Core Radix UI Components for Thai Master:**

**Character Practice Phase (Weeks 1-4):**
- `@radix-ui/react-progress` - Character mastery progress (44/44 consonants, 32/32 vowels, 4/4 tone marks)
- `@radix-ui/react-toast` - Micro-win celebrations ("15 characters mastered!", "Daily streak: 7 days!")
- `@radix-ui/react-dialog` - Week 4 achievement modal ("🎉 Character mastery complete! Ready for vocabulary?")
- `@radix-ui/react-tooltip` - On-demand character pronunciation hints

**Vocabulary Phase (Weeks 5-12):**
- `@radix-ui/react-tabs` - Switch between Practice / Quiz / Report Card screens
- `@radix-ui/react-progress` - Vocabulary deck completion (50-word progress)
- `@radix-ui/react-tooltip` - Tone rule reference ("Why this tone?" on-demand explanations)
- `@radix-ui/react-toast` - Vocabulary milestones ("25 words learned!", "Vowel accuracy improved 9%!")

**Report Card Dashboard:**
- `@radix-ui/react-accordion` - Collapsible weak area details (expand vowels showing 65% accuracy)
- `@radix-ui/react-separator` - Visual section dividers between accuracy categories
- `@radix-ui/react-alert-dialog` - "Add to Revision Deck" confirmation action
- `@radix-ui/react-progress` - Accuracy percentage visualizations

**Navigation & Settings:**
- `@radix-ui/react-navigation-menu` - Top-level navigation (if multi-screen beyond practice canvas)
- `@radix-ui/react-dropdown-menu` - Settings menu (export progress, reset, preferences)
- `@radix-ui/react-switch` - Toggle settings (audio on/off, notifications)

**Custom Components (Not Radix):**
- **Tracing Canvas** - Custom HTML5 Canvas API implementation (core character tracing interaction)
- **Flash Cards** - Custom swipe/flip interaction for vocabulary study
- **Audio Playback** - HTML5 Audio API with custom controls (play pronunciation button)
- **Accuracy Trend Graphs** - Custom visualization (Chart.js or lightweight SVG implementation)

### Customization Strategy

**Pastel Theme for Thai Master (Easy on the Eyes):**

**Background & Surfaces:**
- Primary background: Soft cream/beige (#FAF9F6 - warm white, reduces eye strain)
- Canvas background: Light lavender (#F3F0FF - gentle, non-intimidating for character tracing)
- Card surfaces: Pale mint (#F0FFF4 - fresh, calming for flash cards and report sections)
- Modal overlays: Soft blue-gray with transparency (#E2E8F0 @ 50% - subtle depth)

**Accent Colors:**
- Progress/Success: Soft sage green (#A7C4A0 - accomplishment without aggression)
- Primary actions: Muted periwinkle blue (#B4C7E7 - trust, calm interaction)
- Celebrations: Warm peachy coral (#FFD4C4 - joy without overwhelming)
- Warning (weak areas): Soft amber (#FFE5B4 - gentle attention, not alarming)

**Text & Thai Script:**
- Primary text: Charcoal gray (#2D3748 - readable but softer than pure black)
- Thai characters: Deep slate (#1A202C - maintains 7:1 contrast ratio on cream background for readability)
- Secondary text: Medium gray (#718096 - de-emphasized supporting information)
- Ghost font (canvas): Light lavender at 30% opacity (#F3F0FF @ 30% - visible guidance without distraction)

**Rationale for Pastel Theme:**
- Cream background reduces eye strain during daily 10-15 minute morning coffee/evening wind-down practice sessions
- Pastel accents feel approachable and non-intimidating (critical for 4-week character foundation phase delayed gratification)
- High enough contrast for Thai script readability (7:1 ratio ensures character recognition accuracy)
- Calming palette supports focused learning without visual fatigue or overstimulation
- Soft colors align with "comfortable routine" emotional goal from Step 4

**Styling Approach with Styled Components:**

Radix primitives styled with Styled Components theme system:

```tsx
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

// Example: Week 4 Achievement Dialog with Pastel Theme
const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(226, 232, 240, 0.5);
`;

const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.cream};
  border-radius: 8px;
  padding: ${props => props.theme.space.lg};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 28rem;
  width: 100%;
`;

const StyledTitle = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: ${props => props.theme.space.md};
  text-align: center;
  color: ${props => props.theme.colors.charcoal};
`;

const StyledDescription = styled(Dialog.Description)`
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.space.lg};
  text-align: center;
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.periwinkle};
  color: ${props => props.theme.colors.charcoal};
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  min-height: 44px;
  cursor: pointer;

  &:hover {
    background-color: #A3B8D7;
  }

  &:active {
    background-color: #93A8C7;
  }
`;

// Usage
<Dialog.Root>
  <StyledOverlay />
  <StyledContent>
    <StyledTitle>🎉 Character Mastery Complete!</StyledTitle>
    <StyledDescription>
      You've mastered all 44 consonants, 32 vowels, and 4 tone marks.
      Ready to start learning vocabulary?
    </StyledDescription>
    <Dialog.Close asChild>
      <StyledButton>Start Vocabulary Deck</StyledButton>
    </Dialog.Close>
  </StyledContent>
</Dialog.Root>
```

**Mobile-First Styling Priorities:**
1. **Touch Targets** - All interactive elements minimum 44x44px (`min-height: 44px`)
2. **Thai Font Rendering** - Unicode-compliant Thai fonts with accurate tone mark positioning (Noto Sans Thai, Sarabun)
3. **Responsive Breakpoints** - Mobile-first with tablet adaptations deferred to Phase 2+ (media queries in styled components)
4. **Minimal Visual Design** - Clean, functional UI focused on learning content with pastel aesthetics

**Accessibility Enhancements:**
- Radix handles focus management, keyboard navigation, ARIA attributes automatically
- Add descriptive `aria-label` attributes for custom Canvas interactions ("Trace Thai character ก")
- Ensure audio pronunciation has visual fallback (phonetic text always visible alongside audio button)
- Color contrast compliance (Thai script 7:1 ratio, body text 4.5:1 ratio minimum)
- Pastel colors maintain WCAG AA standards for text readability

**Performance Considerations:**
- Tree-shake unused Radix primitives (import only required components)
- Each Radix primitive typically <5kb gzipped (minimal bundle impact)
- No conflicts with Service Worker caching or offline LocalStorage persistence
- Radix components render efficiently on mid-range Android devices

**Styled Components Theme Configuration:**

```ts
// theme.ts - Thai Master pastel theme
export const theme = {
  colors: {
    // Primary colors
    cream: '#FAF9F6',
    lavender: '#F3F0FF',
    mint: '#F0FFF4',

    // Accent colors
    sage: '#A7C4A0',
    periwinkle: '#B4C7E7',
    coral: '#FFD4C4',
    amber: '#FFE5B4',

    // Text colors
    charcoal: '#2D3748',
    slate: '#1A202C',
    gray: '#718096',
  },

  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },

  fontSizes: {
    caption: '0.875rem',    // 14px
    body: '1rem',           // 16px
    h3: '1.25rem',          // 20px
    h2: '1.5rem',           // 24px
    h1: '1.75rem',          // 28px
    thaiCard: '3rem',       // 48px
    thaiCanvas: '6rem',     // 96px
  },

  fonts: {
    thai: "'Noto Sans Thai', 'Sarabun', sans-serif",
    system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  },

  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
  },
};

// App.tsx - Apply theme
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

## Core Interaction Design

### Defining Experience

**"Trace Thai characters with your finger and instantly hear how they sound"**

Thai Master's defining experience is touch-based character tracing with immediate audio reinforcement. This single interaction - if executed flawlessly - makes everything else in the product successful. The ghost-font guided canvas (30% opacity) provides visual guidance while users build muscle memory through repetition, with native speaker pronunciation confirming correct completion.

**Why This Matters:**
- This is the breakthrough that differentiates Thai Master from vocabulary-first competitors (Duolingo, Memrise)
- Physical tracing builds muscle memory that reinforces visual character recognition
- Immediate audio feedback creates confidence: "I'm pronouncing this correctly"
- Day 5-7 success moment: Users recognize first Thai character in YouTube title ("I can READ that!")

### User Mental Model

**Current Mental Model (From Failed App Experiences):**

Users arrive expecting vocabulary-first learning (Duolingo pattern):
- Expectation: "I should be speaking Thai phrases by Day 1"
- Reality for non-Latin scripts: Can't even read the characters, total confusion and abandonment
- Mental model mismatch: Apps assume alphabet literacy (true for Spanish, false for Thai)

**Thai Master's New Mental Model:**

Script mastery as foundation that unlocks independent reading:
- "Learn the Thai alphabet like learning A-Z before reading English words"
- Physical muscle memory (tracing) reinforces visual recognition
- Logic-based understanding (consonant class + tone rules) enables pronunciation of unfamiliar words

**Mental Model Shift:**
- **From:** "Memorize this word's pronunciation" → App dependency (must look up every word)
- **To:** "Understand the character system" → Independent reading (decode any word encountered)

**Familiar Metaphors:**
- Tracing paper from childhood (nostalgic, comforting, non-threatening)
- Building blocks (character foundation → vocabulary construction)
- Musical scales before songs (master fundamentals before performance)

### Success Criteria

**Immediate Success (First 5 Minutes):**
- User traces ก character, ghost font guides strokes visually without confusion
- Audio plays "gor gai" instantly (<100ms latency) confirming completion
- User taps "Reset" button, traces again successfully - repetition builds confidence
- Completes 5-6 characters in first session - tangible progress without signup friction
- User feels: "I'm learning already!" not "I'm reading instructions"

**Technical Success Criteria:**
- Canvas touch latency: <50ms on mid-range Android devices (no lag or stuttering)
- Ghost font visibility: 30% opacity clearly visible on mobile screen without eye strain
- Audio playback: <100ms start time from cache (instant gratification)
- Stroke rendering: Smooth, precise finger tracking with zero dropped frames

**Emotional Success Criteria:**
- Confidence building through micro-wins (each completed character = success)
- Non-threatening environment (no "wrong" validation, just guidance)
- Day 5-7 breakthrough moment: "I recognized ก in a YouTube title!" validates methodology
- Week 1 vindication: "This app addresses why I failed with Duolingo/Japanese"

**Long-Term Success (Week 4):**
- User completes all 44 consonants + 32 vowels + 4 tone marks
- Achieves 70%+ accuracy on character recognition quizzes
- Can decode (read aloud) any Thai word encountered, even if meaning unknown
- Feels foundation is solid, eager to apply character knowledge to vocabulary learning

### Novel UX Patterns

**Novel Pattern: Ghost-Font Guided Tracing**

Thai Master introduces canvas-based character tracing not found in mainstream language apps:
- **Innovation:** 30% opacity ghost font provides guidance without obscuring user's strokes
- **Familiar metaphor:** "Tracing paper" from childhood - comforting, nostalgic, non-threatening
- **No validation required:** Builds confidence through repetition, not strict correctness checking
- **Mobile-optimized:** Touch-first interaction feels natural on phones (not mouse-adapted)

**Teaching the Pattern:**
- No explicit tutorial needed - visual invitation is self-explanatory ("Draw this: ก")
- Ghost font communicates purpose instantly (visual guide for finger tracing)
- Audio feedback confirms understanding (sound plays when tracing completes)
- Individual reset button teaches repetition pattern (trace → reset → trace again)

**Novel Approach: Script-First Methodology**

Complete inversion of established language app patterns:
- **Traditional apps:** Vocabulary Day 1 → Script learned incidentally
- **Thai Master:** Script Weeks 1-4 → Vocabulary Week 5+ (after foundation solid)
- **Teaching strategy:** Explicit prompts explain "why" ("Master the alphabet to read independently")

**Established Patterns We're Adopting:**

- **Audio pronunciation on interaction:** Duolingo standard (tap to hear pronunciation)
- **Progress bars toward milestones:** Familiar gamification (44/44 consonants visual)
- **Flash-card methodology:** Proven from user's Spanish success (85% known, 15% unknown)
- **Daily streak counter:** Effective motivation mechanic (visible on home screen)

**Unique Twist on Established Patterns:**

- **Logic-based tone teaching:** Not just "this word has rising tone" but "mid-class consonant + long vowel = rising tone" (teach WHY)
- **Real-world validation prompts:** Explicit connection to content consumption ("Try spotting Thai characters in YouTube titles today!")
- **Progress celebration:** Micro-wins during delayed gratification (not just final milestone)

### Experience Mechanics

**1. Initiation (Starting the Core Interaction):**

- **Entry point:** User opens Thai Master → immediately sees tracing canvas with ก character (ghost font visible at 30% opacity on light lavender #F3F0FF background)
- **No barriers:** Zero signup wall, no tutorial screens - canvas invites immediate action
- **Visual prompt:** "Draw this: ก (k sound)" in charcoal gray (#2D3748) text above canvas
- **Invitation to act:** Touch anywhere on canvas to begin tracing (ghost font guides finger)

**2. Interaction (Core User Action):**

**User action:**
- Traces Thai character ก with finger following ghost font guide
- Finger moves across canvas drawing strokes in real-time
- Can trace freely (no strict validation) - focus on building muscle memory

**System response:**
- Canvas renders stroke in deep slate (#1A202C) with <50ms latency
- Stroke follows finger precisely with smooth, responsive tracking
- Ghost font remains visible at 30% opacity throughout tracing
- No lag, stuttering, or dropped frames on mid-range Android devices

**Visual feedback during interaction:**
- User's stroke appears darker than ghost font (clear contrast)
- Pastel lavender background (#F3F0FF) provides calm, non-intimidating surface
- Canvas shows real-time finger tracking (immediate visual confirmation)

**Completion detection:**
- When finger lifts after tracing attempt (touchend event)
- No strict validation ("correct" vs "incorrect") - encourages confidence building
- System assumes completion when user stops tracing

**3. Feedback (Confirming Success):**

**Immediate audio feedback:**
- Native speaker pronunciation plays instantly (<100ms latency): "gor gai"
- Audio playback from Service Worker cache (offline reliability)
- Visual fallback: Phonetic text "gor gai" appears if audio fails (accessibility)

**Visual confirmation:**
- User's traced strokes remain visible on canvas (compare to ghost font)
- Character stroke rendered in deep slate (#1A202C) contrasts with ghost guide
- Sense of accomplishment: "I drew a Thai character!"

**Emotional feedback:**
- Confidence building: No "wrong" message, just guidance and repetition
- Micro-win celebration: Completing stroke = success
- Muscle memory formation: Physical tracing reinforces visual recognition

**Error handling:**
- Accidental touch outside canvas: Ignored (no interruption to flow)
- Audio playback failure: Phonetic text "gor gai" shown as fallback
- Offline mode: All audio cached, zero degradation in functionality

**4. Completion (Finishing the Interaction):**

**Individual canvas reset:**
- "Reset" button (muted periwinkle #B4C7E7, min 44x44px touch target) clears canvas for repetition
- One-tap action - immediate reset without confirmation dialog
- User controls pacing: Can trace 1x or 10x before progressing

**Progression to next character:**
- "Next Character" button appears after 2-3 traces (optional suggestion, not forced)
- User decides when ready to progress (some prefer 10 reps, others 2 reps)
- Character counter updates: "1/44 consonants practiced today"

**Micro-win celebration:**
- After 5-6 characters completed: Toast notification (soft sage green #A7C4A0)
- Message: "You've practiced 6 characters today! Great progress."
- Incremental celebration sustains motivation during 4-week foundation phase

**Save progress prompt:**
- After demonstrating value (5-6 characters traced), prompt appears
- Message: "Want to save your progress? Create free account"
- Signup positioned AFTER value delivery (not before)
- User has tangible progress to preserve (motivation to create account)

**What's next:**
- Return to character selection (continue practicing)
- View progress dashboard (see 6/44 consonants mastered)
- Daily streak tracker visible (building habit formation)

---

## Visual Design Foundation

### Color System

**Pastel Theme (Defined in Design System Foundation):**

Thai Master uses a calming pastel color palette designed to reduce eye strain during daily 10-15 minute practice sessions:

**Primary Colors:**
- Background: Soft cream (#FAF9F6) - Warm white, easy on eyes
- Canvas: Light lavender (#F3F0FF) - Non-intimidating tracing surface
- Cards: Pale mint (#F0FFF4) - Fresh, calming for flash cards

**Accent Colors:**
- Success/Progress: Soft sage green (#A7C4A0) - Accomplishment without aggression
- Primary Actions: Muted periwinkle blue (#B4C7E7) - Trust, calm
- Celebrations: Warm peachy coral (#FFD4C4) - Joy without overwhelming
- Warnings: Soft amber (#FFE5B4) - Gentle attention

**Text Colors:**
- Primary: Charcoal gray (#2D3748) - Readable but softer than pure black
- Thai Characters: Deep slate (#1A202C) - 7:1 contrast ratio for readability
- Secondary: Medium gray (#718096) - De-emphasized information
- Ghost Font: Light lavender @ 30% opacity - Visible guidance without distraction

**Semantic Mappings:**
- `bg-primary`: #FAF9F6 (cream background)
- `text-primary`: #2D3748 (body text)
- `text-emphasis`: #1A202C (Thai characters, headings)
- `accent-success`: #A7C4A0 (progress indicators, completions)
- `accent-action`: #B4C7E7 (buttons, interactive elements)
- `accent-celebrate`: #FFD4C4 (achievement modals, milestones)
- `accent-warn`: #FFE5B4 (weak area identification)

### Typography System

**Font Families:**
- **Thai Script**: `font-family: 'Noto Sans Thai', 'Sarabun', sans-serif`
  - Unicode-compliant with accurate tone mark positioning
  - Optimized for mobile screen rendering
  - Fallback ensures character visibility if primary font fails to load

- **English/UI Text**: System font stack
  - iOS: San Francisco
  - Android: Roboto
  - Windows: Segoe UI
  - Rationale: Native feel, instant load (zero font file downloads), platform-optimized rendering

**Type Scale (Mobile-First):**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 28px (1.75rem) | Bold | 1.2 | Page titles ("Character Practice") |
| H2 | 24px (1.5rem) | Semibold | 1.3 | Section headings ("Progress Dashboard") |
| H3 | 20px (1.25rem) | Semibold | 1.4 | Subsections ("Consonants Mastery") |
| Body | 16px (1rem) | Regular | 1.5 | Instructions, descriptions, content |
| Caption | 14px (0.875rem) | Regular | 1.4 | Secondary info, timestamps, hints |
| Thai Character (Canvas) | 96px (6rem) | Regular | 1 | Tracing canvas display, large enough for touch precision |
| Thai Character (Flash Card) | 48px (3rem) | Regular | 1.2 | Vocabulary flash cards |

**Readability Priorities:**
- Minimum 16px body text (never smaller than 14px for captions)
- Line height 1.5 for body content (reduces eye fatigue during practice sessions)
- Thai characters sized large for tone mark visibility and tracing precision
- Generous letter-spacing for Thai script (improved character recognition)

**Font Loading Strategy:**
- System fonts load instantly (zero delay, native rendering)
- Noto Sans Thai loaded asynchronously with font-display: swap
- Fallback to Sarabun if Noto Sans Thai fails (ensures Thai characters always render)

### Spacing & Layout Foundation

**Spacing System (8px Base Unit):**

| Token | Size | Rem | Usage |
|-------|------|-----|-------|
| xs | 4px | 0.25rem | Tight spacing within components (icon-to-text gap) |
| sm | 8px | 0.5rem | Default component padding (button inner padding) |
| md | 16px | 1rem | Section spacing, card padding, horizontal page margins |
| lg | 24px | 1.5rem | Major section breaks (canvas to progress bar gap) |
| xl | 32px | 2rem | Page-level spacing (between major sections) |
| 2xl | 48px | 3rem | Major layout divisions (navigation to content) |

**Layout Principles:**

**1. Single-Focus Mobile Design:**
- One focal element at a time (tracing canvas OR flash card OR report card)
- No multi-column layouts on mobile (eliminates decision paralysis)
- Full-width components with 16px horizontal padding (maximize learning area)

**2. Generous Touch Targets:**
- Minimum 44x44px for all interactive elements (iOS/Android HIG standard)
- Buttons, canvas reset, audio play, navigation tabs all meet 44px threshold
- 8px minimum spacing between adjacent touch targets (prevents mis-taps)

**3. Breathing Room:**
- 24px spacing between major sections (canvas → progress indicator → navigation)
- 16px card padding for comfortable content containment
- Vertical rhythm: Consistent 8px/16px/24px increments prevent visual clutter

**4. Focused Learning Area:**
- Tracing canvas occupies 60-70% of viewport height (primary interaction dominates)
- Minimal chrome: Simple header (streak counter), footer (navigation), maximize practice area
- Progress indicators integrated contextually (not separate dashboard unless explicitly requested)

**Grid System:**

**Mobile (Primary Target):**
- Single column layout, full width
- 16px horizontal padding (left/right margins)
- No multi-column grid (one focal element)

**Tablet (Deferred to Phase 2+):**
- 2-3 column grid for character practice (multiple canvases simultaneously)
- 16px gutters between columns
- Consistent 16px outer margins

**Layout Hierarchy:**
1. **Primary Focus**: Tracing canvas or flash card (60-70% viewport)
2. **Progress Indicators**: Contextual progress bar, streak counter (10-15% viewport)
3. **Navigation/Actions**: Bottom navigation or contextual buttons (15-20% viewport)

### Accessibility Considerations

**Color Contrast (WCAG Compliance):**
- **Thai Characters (#1A202C) on Cream (#FAF9F6)**: 7:1 contrast ratio (WCAG AAA - enhanced readability)
- **Body Text (#2D3748) on Cream (#FAF9F6)**: 4.5:1 contrast ratio (WCAG AA standard)
- **Interactive Elements**: All buttons, links meet minimum 3:1 contrast for visual affordances
- **Pastel Accents**: Validated against backgrounds to ensure readability (sage green, periwinkle blue, peachy coral all AA compliant)

**Touch & Interaction:**
- **44x44px minimum touch targets**: All buttons, reset, audio play, navigation tabs (iOS/Android HIG standard)
- **8px minimum spacing** between adjacent interactive elements (prevents accidental mis-taps)
- **Clear focus states**: Radix UI provides accessible focus rings for keyboard navigation automatically
- **Visual feedback**: Button press states (darker shade on active), canvas stroke visibility confirms interaction

**Typography Accessibility:**
- **Minimum 16px body text**: Never smaller than 14px for captions (WCAG readability guidelines)
- **Line height 1.5**: Reduces eye strain, improves readability for dyslexic users
- **Thai font rendering**: Accurate diacritical mark positioning (tone marks correctly placed above/below characters)
- **System font fallbacks**: Ensures text renders even if custom fonts fail to load

**Content Accessibility:**
- **Audio with visual fallback**: Phonetic text ("gor gai") always shown alongside audio pronunciation
- **Screen reader labels**: Canvas interactions labeled ("Trace Thai character ก", "Reset canvas", "Play pronunciation")
- **Alternative text**: All icons and visual elements have descriptive aria-labels
- **Keyboard navigation**: All interactive elements accessible via Tab, Enter, Space (Radix handles natively)

**Motion & Animation:**
- Respect prefers-reduced-motion: Disable toast slide animations, fade only
- Canvas stroke rendering: No animation (instant feedback, <50ms latency)
- Celebration modals: Subtle fade-in (200ms), no distracting bounces or slides

**Language Support:**
- **Thai Script**: Unicode-compliant fonts (Noto Sans Thai) with full consonant, vowel, tone mark coverage
- **Right-to-left awareness**: Thai is left-to-right, but tone marks positioned correctly (above/below characters, not inline)
- **Phonetic transcription**: English phonetics ("gor gai") for non-Thai speakers learning pronunciation

---

## Design Direction Decision

### Design Direction Chosen

**Minimal Mobile-First with Pastel Calming Aesthetic**

Thai Master adopts a clean, focused design direction that prioritizes the core learning interaction while maintaining visual calm through pastel colors and generous spacing. The design philosophy: **"Get out of the way and let users focus on learning Thai characters."**

### Design Rationale

**1. Canvas-Dominant Layout (60-70% Viewport)**

The tracing canvas is the hero element on mobile screens:
- Full-width canvas with 16px horizontal margins
- Light lavender background (#F3F0FF) provides calm, non-intimidating surface
- Ghost font at 30% opacity visible without distraction
- Minimal chrome above/below canvas (progress indicator, reset button only)

**Rationale:** The canvas interaction is THE defining experience. Everything else is secondary. Maximize canvas real estate to make character tracing feel spacious and comfortable, not cramped.

**2. Bottom-Anchored Controls (Fixed Footer)**

All primary actions live in a fixed bottom toolbar:
- Reset button (left): Muted periwinkle (#B4C7E7), 44x44px
- Audio button (center): Play pronunciation, same periwinkle
- Next Character button (right): Primary action, slightly emphasized

**Rationale:** Thumb-friendly mobile UX. Users hold phone in one hand, trace with other hand. Bottom controls are easily reachable without repositioning grip. Fixed position means controls are always accessible during tracing.

**3. Contextual Progress Indicators (Non-Intrusive)**

Progress shown contextually without separate dashboard screen:
- Thin progress bar below canvas: "6/44 Consonants" in soft sage green (#A7C4A0)
- Daily streak counter in top-right corner: Small, unobtrusive
- Character completion shown inline during session

**Rationale:** For POC, users don't need complex dashboards. Simple inline progress keeps focus on practice while providing motivation through visible advancement.

**4. Toast Notifications for Celebrations (Temporary Overlays)**

Micro-win celebrations appear as temporary toasts:
- Soft sage green background, warm peachy coral text
- Slide up from bottom, auto-dismiss after 3 seconds
- Messages: "6 characters practiced today!", "Daily streak: 5 days!"

**Rationale:** Celebrations feel earned but don't interrupt flow. Toasts provide positive reinforcement without requiring dismissal action. Pastel colors keep celebrations gentle, not jarring.

**5. Modals for Major Milestones (Week 4 Achievement)**

Important transitions use centered modals:
- Week 4 "Character Mastery Complete!" modal with peachy coral celebration
- Soft overlay (50% opacity blue-gray) focuses attention
- Single clear action: "Start Vocabulary Deck" button

**Rationale:** Major phase transitions (character → vocabulary) deserve ceremonial moment. Modal creates pause to acknowledge accomplishment before new phase begins.

**6. Pastel Theme Throughout (Eye Strain Reduction)**

Consistent pastel palette across all screens:
- Cream background (#FAF9F6) for main app screens
- Light lavender for canvas
- Pale mint for flash card backgrounds
- Soft sage, periwinkle, coral, amber for accents

**Rationale:** Daily 10-15 minute practice sessions require eye-friendly colors. Pastels reduce visual fatigue compared to bright saturated colors. Calming aesthetic aligns with "comfortable routine" emotional goal.

### Implementation Approach

**Phase 1 - POC Screens (Weeks 1-12 Experience):**

**Screen 1: Character Practice Canvas**
- Full-screen tracing canvas (ก character with ghost font)
- Top bar: "Character Practice" title + daily streak counter
- Canvas: Light lavender background, deep slate stroke rendering
- Bottom toolbar: Reset | Audio | Next Character
- Contextual progress: "1/44 Consonants" below canvas

**Screen 2: Flash Card Practice** (Week 5+)
- Full-screen card on pale mint background
- Thai word front (48px), flip to reveal English meaning
- Audio button for pronunciation
- Swipe left (know it) / swipe right (learning it)
- Progress: "25/50 Vocabulary" below card

**Screen 3: Quick Quiz**
- Character/word shown, 4 multiple choice options
- Soft sage background for correct answer feedback
- Soft amber background for incorrect answer feedback
- Immediate audio pronunciation after selection

**Screen 4: Report Card Dashboard**
- Cream background with pale mint cards
- Accordion sections: Consonants (72% accuracy), Vowels (65%), Tone Marks (80%)
- Soft amber highlighting for <70% weak areas
- "Add to Revision Deck" button in muted periwinkle

**Screen 5: Achievement Modal** (Week 4 milestone)
- Centered modal on soft overlay
- Peachy coral celebration colors
- "🎉 Character Mastery Complete!" title
- Summary: "44 consonants, 32 vowels, 4 tone marks mastered"
- Single CTA: "Start Vocabulary Deck"

**Design System Components (Radix UI + Styled Components):**

```tsx
// Core reusable components for POC

// 1. Canvas Container
const CanvasContainer = styled.div`
  background-color: ${props => props.theme.colors.lavender};
  border-radius: 12px;
  padding: ${props => props.theme.space.lg};
  margin: ${props => props.theme.space.md};
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 2. Bottom Toolbar
const BottomToolbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.cream};
  padding: ${props => props.theme.space.md};
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.space.sm};
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

// 3. Action Button
const ActionButton = styled.button`
  background-color: ${props => props.theme.colors.periwinkle};
  color: ${props => props.theme.colors.charcoal};
  border: none;
  border-radius: 8px;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  min-height: 44px;
  min-width: 44px;
  font-size: ${props => props.theme.fontSizes.body};
  cursor: pointer;

  &:hover {
    background-color: #A3B8D7;
  }

  &:active {
    background-color: #93A8C7;
  }
`;

// 4. Progress Indicator
const ProgressBar = styled.div`
  background-color: ${props => props.theme.colors.sage};
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

// 5. Toast Notification (Radix UI Toast)
const StyledToast = styled(Toast.Root)`
  background-color: ${props => props.theme.colors.sage};
  color: ${props => props.theme.colors.charcoal};
  border-radius: 8px;
  padding: ${props => props.theme.space.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 6. Report Card (Radix UI Accordion)
const StyledAccordionItem = styled(Accordion.Item)`
  background-color: ${props => props.theme.colors.mint};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.space.sm};
  padding: ${props => props.theme.space.md};
`;
```

**Responsive Behavior (Mobile-First):**
- POC targets mobile phones (320px - 428px width)
- Tablet/desktop: Same single-column layout, centered with max-width 480px
- No multi-column grid until Phase 2+ post-POC validation

**Accessibility Implementation:**
- All Radix UI components provide ARIA attributes automatically
- Custom canvas has aria-label: "Trace Thai character ก"
- Buttons have min 44x44px touch targets
- Color contrast validated: 7:1 for Thai characters, 4.5:1 for body text
- Keyboard navigation: Tab through all interactive elements
- Screen reader announces progress: "6 of 44 consonants practiced"

### Success Criteria

This design direction succeeds if:

✅ Users can trace their first character within 30 seconds of opening app (no confusion)
✅ Canvas interaction feels smooth and responsive (<50ms latency)
✅ Pastel theme reduces eye strain during 10-15 minute sessions (user feedback)
✅ Progress is visible without requiring separate dashboard navigation
✅ Celebrations feel encouraging without interrupting practice flow
✅ POC can be implemented quickly with Radix UI + Styled Components (1-2 weeks dev time)

---

## UX Specification Complete

**Document Status:** ✅ Complete

This UX Design Specification provides comprehensive guidance for implementing Thai Master's 12-week POC. All design decisions are grounded in:
- User research and persona analysis (Asher - Content-Driven Learner)
- Emotional journey mapping (empowerment through understanding)
- Proven UX patterns (flash cards, Duolingo gamification) with script-first methodology inversion
- Technical constraints (mobile-first PWA, Canvas API, offline-first)
- Accessibility standards (WCAG AA compliance, 44px touch targets)

**Ready for Implementation:**
- Design system: Radix UI + Styled Components with pastel theme tokens
- Core interaction: Canvas tracing mechanics fully specified
- Visual foundation: Typography, spacing, colors documented
- Component architecture: 5 key screens + reusable components defined

**Next Steps:**
1. Set up React + TypeScript project with Vite
2. Install Radix UI primitives + Styled Components
3. Implement theme configuration (theme.ts)
4. Build Screen 1 (Character Practice Canvas) as POC validation
5. Iterate based on <50ms latency and user feedback

---
