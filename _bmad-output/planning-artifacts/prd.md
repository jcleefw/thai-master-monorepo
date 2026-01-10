---
stepsCompleted: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
inputDocuments: ["_bmad-output/planning-artifacts/product-brief-thai-learn-playground-2026-01-09.md"]
workflowType: 'prd'
lastStep: 11
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
completed: "2026-01-09"
---

# Product Requirements Document - thai-learn-playground

**Author:** thaieager
**Date:** 2026-01-09

## Executive Summary

Thai Master is a mobile-first language learning application that solves a critical gap in how current platforms teach non-Latin script languages. While mainstream apps like Duolingo and Memrise excel at teaching Latin-based languages (Spanish, French, Italian), they catastrophically fail for Thai, Japanese, Arabic, Korean, and similar scripts by applying the same vocabulary-first methodology that works for languages with familiar alphabets.

The core insight: **learners who already know A-Z can immediately read Spanish words, but Thai/Japanese/Arabic learners start from zero on the script**. Skipping this foundation creates permanent app dependency - users memorize sounds without understanding the visual system, never achieving true reading independence.

Thai Master inverts this approach with a **script-first methodology**: users master character recognition, writing, and pronunciation rules BEFORE building vocabulary, enabling them to independently read and pronounce any word they encounter, even unfamiliar ones. The platform starts with Thai as proof of concept, then validates the methodology for expansion to other underserved non-Latin script languages.

**Target Outcome:** Users achieve the ability to watch Thai YouTube content with Thai subtitles, understanding 50% by listening and 80% by reading, while engaging with Thai social media through independent character recognition and tone rule application.

### What Makes This Special

**1. Script-First Philosophy**
Foundation mastery (reading, writing, pronunciation rules) before vocabulary expansion - the complete inverse of current app approaches. First 2 weeks focus entirely on character recognition and writing using ghost-font tracing canvas (30% opacity) with audio pronunciation for every character.

**2. Non-Latin Script Specialization**
Purpose-built for the unique challenges of tonal languages with complex writing systems, not adapted from Latin-script methodology. Addresses the specific needs of Thai/Japanese/Arabic learners that mainstream apps ignore.

**3. Proven Pedagogical Foundation Enhanced**
Applies validated flash-card methodology (100-word decks, 85% known content, 15% controlled unknown sentence exposure) successfully used for Latin-script learning, but adds the critical script mastery foundation layer that makes it work for non-Latin languages.

**4. Logic-Based Tone Teaching**
Teaches WHY Thai words have specific tones based on consonant class and vowel length rules, enabling independent pronunciation derivation rather than rote memorization of each word's tone. Users understand the system, not just memorize outcomes.

**5. Proof-of-Concept for Category Expansion**
Thai validates the script-first methodology with measurable success criteria (70% accuracy, 2-week character mastery, 5+ days/week engagement). Once proven, the approach expands to Japanese (Hiragana/Katakana), Arabic, Korean (Hangul), Hebrew, and Hindi (Devanagari) - addressing a massive underserved market of non-Latin script learners abandoned by mainstream apps.

**6. Budget-Conscious Accessibility**
No expensive subscriptions or paywalls on foundational content. Immediate value delivery (straight to tracing canvas, no signup wall) with progress save prompts after demonstrating value. Aligns with target user (Asher) who abandoned paid platforms that didn't deliver results.

**7. Content-Driven Learning Integration**
Users learn to support their existing Thai content consumption (YouTube, social media) rather than abstract lessons. The success metric is real-world application: "Can I read this YouTube comment?" not "Did I complete lesson 47?"

## Project Classification

**Technical Type:** Mobile App (Web-First with Progressive Web App capabilities)
**Domain:** EdTech (Educational Technology - Language Learning)
**Complexity:** Medium
**Project Context:** Greenfield - new product development

**Classification Rationale:**

**Mobile App Signals:**
- Mobile-first design philosophy with single focal canvas for mobile, 2x3 grid for tablet
- Touch-optimized tracing canvas with ghost font guidance
- Progressive enhancement approach (mobile first, then tablet features in Phase 2)
- Potential for PWA deployment (offline character practice, local storage in MVP)

**EdTech Domain Signals:**
- Language learning application with validated pedagogical methodology
- Learning progression gates (70% accuracy thresholds, spaced repetition)
- Student success metrics (character mastery, vocabulary retention, real-world application)
- Educational content delivery (audio pronunciation, visual character recognition, tone logic teaching)
- Accessibility considerations for inclusive learning (WCAG compliance for visual/audio content)

**Medium Complexity Factors:**
- **Privacy Requirements:** Educational data privacy (preparation for COPPA/FERPA if expanding to younger learners)
- **Content Quality:** Native speaker audio recordings, accurate character rendering, tone mark precision
- **Learning Validation:** Methodology effectiveness measurement (70% accuracy targets, retention tracking)
- **Accessibility Standards:** WCAG compliance for visual learners, audio learners, different learning paces
- **Performance:** Audio/visual content delivery, tracing canvas responsiveness, offline capabilities
- **Localization:** Thai script rendering accuracy, Unicode handling, font optimization

**Technical Considerations:**
- Canvas-based character tracing with touch/mouse input
- Audio playback system for pronunciation
- Spaced repetition algorithm implementation
- Progress tracking and accuracy measurement
- Local storage for MVP (cloud sync in Phase 2+)
- Responsive design across mobile/tablet breakpoints

## Success Criteria

### User Success

**Script Mastery Outcomes:**
- **Foundation Goal:** Recognize all Thai consonants, vowels, and tone marks within 4 weeks
- **Ultimate Success:** Read and pronounce any Thai word or phrase correctly, even unfamiliar ones, using character and tone rule knowledge
- **Learning Pace:** Minimum 3 alphabets per day for steady progress
- **Accuracy Threshold:** Weekly 70% accuracy on alphabet recognition, 50% accuracy on vocabulary

**Vocabulary Achievement:**
- **50-Word Milestone:** Complete foundational deck with 50% accuracy minimum
- **Daily Vocabulary Progress:** Minimum 2 new vocabulary words per day
- **Retention Standard:** Maintain 50% weekly accuracy across learned vocabulary during POC phase

**Engagement & Consistency:**
- **Practice Frequency:** Minimum 5 days per week active practice
- **Daily Streak Tracking:** Measure consecutive days of engagement as retention indicator
- **Session Completion:** Users complete daily minimums (3 alphabets + 2 vocab words)

**Real-World Application Milestones (Realistic for 50-Word POC):**
- **Week 1:** Recognize first Thai character in YouTube video title
- **Week 4:** Recognize ALL Thai characters in YouTube video title (can "decode" even if don't know word meaning)
- **Week 6:** Read a simple Thai word independently using character + tone knowledge (2 weeks into 50-word vocab practice)
- **Week 10:** Recognize and understand 3-5 common Thai words in YouTube subtitles from the 50-word deck
- **Week 12:** Read a short Thai subtitle line (5-7 words) where 50%+ are from the learned 50-word deck

**Success Indicators:**
- Users achieving 70%+ alphabet accuracy and 50%+ vocabulary accuracy maintain daily practice habits
- Users completing character mastery within 4 weeks show high retention
- Users report "aha moments" recognizing Thai characters in real content (YouTube, social media)
- Users begin to recognize familiar words from their 50-word deck in Thai content

### Business Success

**Proof of Concept Phase (12 weeks):**
- **Primary Goal:** Validate script-first methodology effectiveness for Thai language learning
- **Accuracy Validation:** Demonstrate 70% alphabet accuracy and 50% vocabulary accuracy achievement
- **Retention Validation:** Prove user retention with 5+ days/week engagement pattern sustained through Week 12
- **Methodology Proof:** Establish that script-first foundation (4 weeks character mastery) enables faster vocabulary acquisition
- **Expansion Foundation:** Validate approach for potential expansion to other non-Latin script languages (Japanese, Arabic, Korean, Hebrew, Hindi)

**Go/No-Go Decision Gates:**

**Week 2 Checkpoint:**
- **GO IF:** ≥70% of users complete character mastery foundation progress on track
- **PIVOT IF:** <50% character completion → UX/pacing needs adjustment
- **NO-GO IF:** <30% character completion → fundamental methodology issue

**Week 4 Checkpoint (Critical):**
- **GO IF:** ≥70% weekly alphabet accuracy, character mastery complete, 5+ days/week engagement sustained
- **PIVOT IF:** Engagement drops below 5 days/week → retention mechanisms need strengthening
- **NO-GO IF:** Accuracy consistently below 40% → teaching methodology requires redesign

**Week 12 Validation:**
- **FULL PRODUCTION IF:** 50%+ users reach Week 12 milestones with 50%+ vocabulary accuracy, express interest in continued vocabulary expansion
- **LIMITED RELEASE IF:** 30-50% reach Week 12 → iterate on retention before scaling
- **RETURN TO POC IF:** <30% reach Week 12 → significant product rework needed

**Note:** Detailed business model, monetization strategy, and growth metrics to be defined post-POC validation.

### Technical Success

**Performance Requirements:**
- **Canvas Responsiveness:** <50ms touch/mouse input latency on tracing canvas
- **Audio Caching:** Preload and cache character pronunciation audio for offline playback
- **Offline Mode:** Character practice and vocabulary flash cards functional without network connection
- **Load Time:** <2 seconds initial app load on mobile 4G connection

**Data Accuracy:**
- **Thai Font Rendering:** Use Unicode-compliant Thai fonts with accurate tone mark positioning
- **Character Precision:** All consonants (44), vowels (32 forms), and tone marks (4) render correctly across iOS Safari, Android Chrome, desktop browsers
- **Audio Quality:** Native speaker pronunciation recordings at minimum 128kbps AAC quality
- **Tone Mark Accuracy:** Visual distinction between all 5 Thai tones (mid, low, falling, high, rising)

**System Reliability:**
- **Progress Persistence:** Local storage maintains user progress across sessions (no data loss)
- **Quiz Accuracy:** Spaced repetition algorithm correctly identifies weak areas and surfaces review content
- **Cross-Device:** Consistent experience across mobile phones (primary), tablets (secondary)

**Explicitly Out of Scope for POC:**
- Dark mode / theme switching (deferred to post-POC)
- Cloud sync / user accounts (local storage only in MVP)
- Accessibility features (screen readers, high contrast, keyboard navigation)
- Multi-language UI (English only for POC)

### Measurable Outcomes

**Primary Success Metric:**
At Week 12, ≥50% of users who started the program can:
1. Recognize and write all Thai consonants, vowels, and tone marks from memory
2. Achieve 70% accuracy on alphabet recognition quizzes
3. Achieve 50% accuracy on 50-word vocabulary deck
4. Read simple Thai words independently using character + tone knowledge
5. Recognize 3-5 familiar words from their 50-word deck in real Thai content

**Secondary Metrics:**
- **DAU (Daily Active Users):** Consistent engagement tracked through Week 12
- **Retention Curves:** Week 1, Week 4, Week 12 cohort retention rates
- **Feature Usage Distribution:** Tracing canvas time vs. flash-card time vs. quiz time
- **Completion Velocity:** Average time to complete character mastery (target: ≤4 weeks)
- **Learning Efficiency:** Characters learned per hour of practice time

**Qualitative Success Indicators:**
- User testimonials mentioning "finally understand how to read Thai characters"
- Real-world application stories (recognizing characters in YouTube titles, identifying familiar words)
- Requests for expanded vocabulary beyond 50-word foundation
- Positive comparison to Duolingo/Memrise abandonment experiences

## Product Scope

### MVP - Minimum Viable Product (POC Validation - 12 weeks)

**Pillar 1: Script Foundation (Complete Implementation)**

Mobile-first character mastery system with immediate hands-on learning:

- **Tracing Canvas:** Single focal canvas optimized for mobile with 30% opacity ghost font guide
- **Complete Character Set:** ALL Thai consonants (44), vowels (32 forms), and tone marks (4)
- **Audio Integration:** Native speaker pronunciation for every character with caching for offline playback
- **Individual Reset:** Per-canvas reset functionality for unlimited practice repetition
- **Learning Timeline:** First 4 weeks focused entirely on character recognition and writing mastery
- **Daily Target:** 3 new characters per day for steady, sustainable progression
- **Offline Capability:** Full character practice functionality without network connection

**Pillar 2: Vocabulary Foundation (Minimal Viable)**

Controlled vocabulary introduction after script foundation:

- **50-Word Foundational Deck:** High-frequency essential vocabulary curated for practical use
- **Flash-Card Methodology:** 85% known content, 15% controlled sentence exposure (4-5 words with minimal unknown)
- **Audio-First:** Native pronunciation for every vocabulary word with offline caching
- **Progression Gate:** Vocabulary deck unlocks only after character foundation completion (Week 4+)
- **Timeline:** Introduced Week 5-12 after script mastery achieved
- **Accuracy Target:** 50% weekly accuracy (lower than alphabet due to POC phase)

**Pillar 3: Character Assessment**

Validation system for script learning effectiveness:

- **Character Recognition Quizzes:** Multiple-choice identification of consonants, vowels, tone marks
- **Progress Tracking:** 70% alphabet accuracy, 50% vocabulary accuracy thresholds
- **Immediate Feedback:** Audio pronunciation confirmation and visual correction on errors
- **Spaced Repetition Algorithm:** Surface weak characters for review based on accuracy patterns
- **Weekly Accuracy Reports:** Track progress toward 70%/50% targets

**Core User Experience:**

- **Onboarding:** No signup wall - immediate access to first character tracing
- **Save Progress Prompt:** After 5-6 characters practiced, offer free account creation
- **Daily Practice Loop:** 3 characters + 2 vocabulary words (post-Week 4) = ~10-15 minutes
- **Mobile-First Design:** Touch-optimized for phones, progressive enhancement for tablets
- **Local Storage:** All progress saved locally (no cloud dependency in POC)

### Growth Features (Post-MVP - Pending POC Success)

**Pillar 1 Enhancements:**
- Tablet version with 2x3 grid tracing canvas for simultaneous practice
- Global clear button for all canvases
- Advanced stroke order guidance animations
- Handwriting recognition feedback (optional AI validation)

**Pillar 2 Expansions:**
- Expand from 50 words → 100 words → 500 words → 1,000-word library
- Three difficulty levels (Foundational, Practical, Nuanced)
- Category organization (Survival, Food, Travel, Social, Greetings, Numbers)
- Tone highlighting visual system for learning reinforcement
- Google Bridge "Deep Dive" contextual search integration
- Custom vocabulary deck creation from user's Thai content

**Pillar 3 Advanced Assessment:**
- Tone application logic quizzes (predict tone from consonant class + vowel)
- Timed writing challenges for speed improvement
- Accuracy-based competitive modes (leaderboards)
- Comprehensive analytics dashboard with retention curves

**Platform Features:**
- User accounts with cloud sync across devices
- Social features (progress sharing, community challenges)
- Adaptive learning paths customized to individual pace
- Content integration (import vocabulary from favorite Thai YouTubers/shows)
- Dark mode / theme switching

### Vision (Future - Post-POC + Growth Validation)

**Phase 5: Multi-Language Platform Expansion**

If Thai Master successfully validates the script-first methodology (≥50% Week 12 success rate):

- **Japanese:** Hiragana/Katakana mastery before vocabulary (same 4-week POC approach)
- **Arabic:** Script and pronunciation rules before word building
- **Korean:** Hangul foundation with logical character assembly rules
- **Hebrew:** Alphabet and vowel pointing system mastery
- **Hindi/Sanskrit:** Devanagari script foundation

**Long-Term Vision:**
Position as the definitive learning platform for non-Latin script languages, solving the foundational gap that mainstream apps (Duolingo, Babbel, Memrise) ignore. Build a community of learners who successfully mastered "impossible" languages using the proven script-first methodology pioneered with Thai Master POC.

**Platform Maturation:**
- Native mobile apps (iOS, Android) for deeper OS integration
- Progressive Web App (PWA) with offline-first architecture
- Desktop support for focused study sessions
- API for third-party integration (language schools, tutors)
- White-label licensing for other non-Latin script language communities

## User Journeys

### Journey 1: Asher's First Week - Breaking Through the Script Barrier

Asher has been watching Thai BL series on YouTube for months, always frustrated by his dependence on English subtitles. He knows he's missing cultural nuances and can't engage with Thai fans in the comments. After abandoning Japanese on Duolingo six months ago (despite knowing Chinese characters!), he's skeptical of language apps but desperate to unlock Thai content.

Late one evening, he searches "learn Thai alphabet app" and discovers Thai Master through a Reddit thread titled "Apps that skip the alphabet ruined my Japanese learning." The top comment says: "Finally, an app that doesn't assume I can already read Thai." Intrigued, he clicks through.

The app opens directly to a tracing canvas—no signup wall, no long tutorial. A single Thai character (ก) glows faintly at 30% opacity with the prompt: "Draw this: ก (k sound)." He traces it with his finger on his phone. The ghost font guides his strokes. When he completes it, he hears a native speaker pronounce "gor gai." He taps "Reset" and traces it again, feeling the muscle memory start to form.

Over the next 7 days, Asher practices during his morning coffee routine—15 minutes, 3 new characters per day. By Day 5, while watching a Thai cooking video, he recognizes ก in the video title. He literally sits up straighter. "I can READ that!" The breakthrough moment arrives on Day 7 when he decodes an entire YouTube title character by character: he doesn't know what the words mean yet, but he can READ them. For the first time in his language learning journey, he feels like he has a foundation, not just memorized sounds.

**Journey Requirements Revealed:**
- Immediate-value onboarding (no signup wall, instant tracing)
- Single focal canvas optimized for mobile touch
- Ghost font tracing system with audio pronunciation
- Individual character reset for repetition practice
- Daily practice loop supporting 3 characters/day pace
- Character recognition that translates to real content (YouTube titles)

### Journey 2: Asher's Month 2 - Vocabulary Unlocks, Real Understanding Begins

It's Week 5. Asher completed all Thai characters in 4 weeks (slightly ahead of the target). The app congratulates him: "🎉 Character mastery complete! Ready for vocabulary?" He taps "Start Vocabulary Deck."

The first flash card appears: สวัสดี (hello) with the phonetic "sawatdee" and audio pronunciation. He traces the tone marks he learned in Week 3 and hears the rising tone in the native speaker's voice. He thinks: "I know WHY this has a rising tone—mid-class consonant + long vowel." Instead of blindly memorizing, he's UNDERSTANDING.

Over the next 8 weeks (Week 5-12), Asher adds 2 new vocabulary words daily from the 50-word foundational deck. The flash cards follow the proven methodology: 85% cards show words he's already learned (reinforcement), 15% introduce simple 4-5 word sentences using mostly known vocabulary.

In Week 10, the breakthrough comes during his nightly Thai YouTube session. A subtitle flashes: "สวัสดี ครับ" (Hello [polite male form]). He recognizes both words from his deck! He doesn't pause the video. He just... understands. For the first time, he's reading Thai subtitles in real-time, even if it's just 2 words out of 8 in the sentence.

By Week 12, Asher's watching his favorite Thai food vlogger and catching 5-6 familiar words per subtitle line. It's not full comprehension—he's only learned 50 words—but he's experiencing the "50% known, learn from context" principle he mastered with Spanish flash cards. The foundation is working.

**Journey Requirements Revealed:**
- Progression gate (vocabulary unlocks after character mastery completion)
- 50-word foundational deck with curated high-frequency vocabulary
- Flash-card system: 85% known, 15% sentence introduction
- Audio pronunciation for every vocabulary word
- Tone mark integration (visual + logical tone rule teaching)
- Real-world validation (recognizing words in actual Thai content)
- Daily 2-word vocabulary progression tracking

### Journey 3: Asher's Performance Review - Confronting Weak Spots

It's Week 6. Asher notices he's consistently missing certain characters in his daily quizzes. The app shows him scoring 65% on his last vocabulary quiz—below his 70% alphabet / 50% vocab targets. Frustrated, he taps the "Progress" button he's been ignoring.

The **Report Card** screen loads, showing his performance breakdown:

**Alphabet Accuracy:**
- Overall: 72% ✓ (above 70% target)
- Consonants: 78%
- Vowels: 65% ⚠️ (weak area identified)
- Tone Marks: 80%

**Vocabulary Accuracy:**
- Overall: 48% ⚠️ (below 50% target)
- Words consistently missed: อาหาร (food), ขอบคุณ (thank you), ไป (go)

Below the stats, a section labeled **"Weak Areas - Recommended Practice"** shows:
- 8 vowel forms he's confusing (highlighted in red)
- 3 vocabulary words with <30% accuracy
- A blue button: **"Add to Revision Deck"**

He taps it. The app creates a custom revision deck containing only his weak characters and words. The next day, his practice session starts with these struggling items, using the same tracing canvas and flash-card system but focused on his specific gaps.

Over the next 2 weeks, Asher dedicates his first 5 minutes of daily practice to the revision deck. By Week 8, his vowel accuracy climbs from 65% to 74%. His vocabulary accuracy hits 52%. The targeted practice works—he's not just mindlessly repeating everything, he's strategically addressing his actual weaknesses.

The report card becomes his weekly ritual. Every Sunday evening, he reviews his accuracy trends, celebrates improvements, and updates his revision deck. The data-driven feedback loop keeps him motivated and prevents plateau frustration.

**Journey Requirements Revealed:**
- **Progress/Report Card screen** showing:
  - Overall accuracy percentages (alphabet 70% target, vocab 50% target)
  - Breakdown by category (consonants, vowels, tone marks, vocabulary)
  - Visual indicators (✓ above target, ⚠️ below target)
  - Trend tracking (weekly/daily accuracy over time)
- **Weak Area Identification:**
  - Algorithm identifies items with <70% accuracy (alphabet) or <50% accuracy (vocab)
  - Highlights specific characters/words causing difficulty
  - Shows accuracy percentage per individual item
- **Custom Revision Deck Creation:**
  - "Add to Revision Deck" functionality
  - Pulls weak items into focused practice session
  - Integrates with existing tracing canvas + flash-card systems
  - Updates dynamically as accuracy improves (removes mastered items, adds new weak spots)
- **Spaced Repetition Intelligence:**
  - Surfaces weak items more frequently
  - Tracks improvement trends
  - Prevents plateau by targeting gaps

### Journey Requirements Summary

These three journeys reveal the complete capability set needed for Thai Master POC:

**Character Learning System (Journey 1):**
- Instant-value onboarding (no signup wall)
- Ghost font tracing canvas (30% opacity, touch-optimized)
- Audio pronunciation playback system
- Individual character reset functionality
- Progress tracking (characters learned per day)
- Real-time feedback (audio confirmation on completion)

**Vocabulary Learning System (Journey 2):**
- Progression gate (unlocks after character mastery)
- 50-word flash-card deck with curated vocabulary
- Pedagogical methodology: 85% known, 15% sentence introduction
- Audio pronunciation for all vocabulary
- Tone rule integration (visual tone marks + logical teaching)
- Daily 2-word progression tracking
- Spaced repetition algorithm (surfaces due items)

**Performance & Revision System (Journey 3):**
- Report card dashboard (overall accuracy, category breakdown)
- Accuracy targeting (70% alphabet, 50% vocabulary thresholds)
- Weak area identification algorithm (<70%/<50% detection)
- Custom revision deck generation
- Trend visualization (weekly/daily accuracy graphs)
- Dynamic deck updating (add weak items, remove mastered items)
- Targeted practice integration with existing learning systems

**Cross-Journey Infrastructure:**
- Local storage (persist all progress across sessions)
- Offline functionality (character practice, vocabulary flash cards, quizzes)
- Mobile-first responsive design
- Audio caching system for offline playback
- Quiz engine (multiple-choice character/vocabulary recognition)
- Achievement tracking (character mastery completion, Week 4/6/12 milestones)

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Script-First Methodology (Core Innovation)**

Thai Master fundamentally inverts the traditional language learning sequence used by mainstream apps (Duolingo, Memrise, Babbel). Where existing apps assume learners can immediately read words (true for Latin-script languages like Spanish/French), Thai Master recognizes that non-Latin script learners start from zero character literacy.

**Innovation:** Dedicate **4 full weeks to character mastery** before introducing any vocabulary, ensuring learners can recognize, write, and understand tone marks for ALL Thai characters before attempting to learn words.

**Contrast with existing apps:**
- Traditional: Vocabulary Day 1 → Script learned incidentally
- Thai Master: Script Weeks 1-4 → Vocabulary Week 5+

**2. Logic-Based Tone Teaching**

Rather than pure memorization, Thai Master explicitly teaches the **logical rules** governing Thai tones (consonant class + vowel length + tone mark = resulting tone). This transforms tone learning from rote memorization to comprehensible patterns.

**Innovation:** Tone learning as a **logic puzzle** rather than an audio repetition task.

**3. Category-Agnostic Platform Architecture**

While the POC focuses on Thai, the script-first methodology is designed to be **universally applicable** to all non-Latin script languages (Japanese, Arabic, Hindi, Korean, Khmer).

**Innovation:** A single pedagogical framework that addresses the systematic failure mode across an entire category of languages, not just a single language solution.

### Market Context & Competitive Landscape

**Current Market State:**
- **Duolingo**: 500M+ users, dominates language learning, but struggles with retention for non-Latin script languages
- **Memrise**: Originally flash-card focused (user's proven success path), pivoted to journey maps (user abandoned after pivot)
- **Rosetta Stone/Babbel**: Traditional apps, Latin-script optimized

**Gap Identification:**
No major language app explicitly addresses the **character literacy prerequisite** for non-Latin script languages. Existing apps treat script learning as a parallel or incidental activity alongside vocabulary acquisition.

**Target Market:**
- **Primary**: Learners attempting Thai/Japanese/Arabic/Korean who failed on traditional apps
- **Secondary**: Visual learners frustrated by audio-first approaches
- **Tertiary**: Budget-conscious learners seeking free core content (differentiation from paywall-heavy competitors)

**Competitive Advantage:**
Thai Master's script-first approach provides a **clear pedagogical positioning** that addresses a documented pain point (user's own experience: succeeded with Spanish, failed with Japanese on traditional apps).

### Validation Approach

**POC Success Metrics (12-Week Thai Experiment):**
1. **Week 4 Gate**: 70% accuracy on ALL Thai character recognition
2. **Week 12 Gate**: 50% accuracy on 50-word vocabulary deck
3. **Real-World Validation**: Can recognize 3-5 Thai words in YouTube subtitles by Week 10

**Hypothesis Testing:**
- **H1**: Script mastery before vocabulary improves long-term retention (measured via accuracy tracking)
- **H2**: Users who complete 4-week character phase have higher vocabulary accuracy than traditional app users
- **H3**: Script-first methodology is generalizable to Japanese (next language test)

**Go/No-Go Decision Gates:**
- **Week 2**: If <70% character mastery progress → adjust pacing or methodology
- **Week 4**: If <70% character mastery → POC fails, reassess approach
- **Week 12**: If <50% vocabulary accuracy → POC fails or extends timeline

**Market Validation:**
If POC succeeds with Thai, validate methodology generalization by:
1. Building Japanese character module (Hiragana/Katakana)
2. Testing with 10-20 beta users who failed Japanese on Duolingo
3. Compare retention rates against traditional app baselines

### Risk Mitigation

**Innovation Risk #1: Delayed Gratification**
- **Risk**: 4-week character focus delays "speaking Thai" gratification that motivates traditional app users
- **Mitigation**: Target users who have already failed on traditional apps (proven pain point), explicitly set expectations about script-first timeline
- **Fallback**: If user dropout is high in Weeks 1-2, introduce 5-10 "motivation words" in Week 2 (high-frequency words like สวัสดี "hello") to provide early wins

**Innovation Risk #2: Methodology Doesn't Generalize**
- **Risk**: Script-first works for Thai but fails for Japanese/Arabic due to language-specific differences
- **Mitigation**: POC design explicitly includes "generalization test" after Thai success
- **Fallback**: If methodology doesn't generalize, pivot to "Thai Master - Thai Only" positioning rather than category platform

**Innovation Risk #3: Existing Apps Copy Approach**
- **Risk**: Duolingo/Memrise add "script mastery mode" after observing Thai Master's success
- **Mitigation**: Speed to market with POC, build community of users who "get it" before big players notice
- **Competitive Moat**: User experience and pedagogical depth (not just feature parity) - ghost font tracing, tone logic teaching, report card system

**Innovation Risk #4: Users Want Traditional Approach**
- **Risk**: Target users reject script-first methodology, prefer traditional vocabulary-first approach
- **Mitigation**: User persona (Asher) explicitly represents "failed on traditional apps" segment - pre-validated pain point
- **Validation**: If beta users request "skip to vocabulary," this signals methodology mismatch
- **Fallback**: Offer "hybrid mode" where users can choose between script-first (default/recommended) or traditional parallel approach

## Mobile App Specific Requirements

### Project-Type Overview

Thai Master is designed as a **web-first mobile learning application** optimized for Chrome browser (desktop and Android). The POC focuses on personal use without app store distribution, with the architecture designed to support future native Android app development post-validation.

**Development Philosophy:**
- **POC Phase**: Chrome-based web app with local storage for development
- **Personal Use**: No app store submission, web-distributed for immediate access
- **Future Path**: Native Android app (post-POC success) for deeper OS integration and offline capabilities

### Platform Requirements

**Primary Platform: Web Application**
- **Browser Targets:**
  - Chrome Desktop (development and testing environment)
  - Android Chrome Browser (primary mobile platform)
- **Rendering Engine:** Optimized for Chromium/Blink rendering
- **Progressive Web App (PWA) Features:**
  - Service worker for offline capability
  - Web App Manifest for "Add to Home Screen" functionality (optional for users)
  - No install prompts required (browser-first experience)

**Future Platform Evolution:**
- **Phase 2+ (Post-POC):** Native Android app development
- **Approach:** Android-first native development (iOS deferred)
- **Technology Options:** React Native, Capacitor, or native Kotlin (decision post-POC)
- **Migration Path:** Web app serves as functional prototype to validate features before native build

**Platform Constraints:**
- No iOS-specific features or testing in POC phase
- No cross-browser compatibility testing (Chrome-only)
- Desktop support secondary to mobile Android Chrome experience

### Device Permissions

**POC Required Permissions:**
- **Local Storage:** Full access for progress persistence, character mastery tracking, vocabulary accuracy data
- **Audio Playback:** Standard HTML5 audio API (no special permissions required)
- **Touch Events:** Canvas touch input for tracing (standard web API)

**Explicitly NOT Required:**
- **Microphone Access:** No speech recognition or recording features in POC
- **Camera Access:** No visual input features
- **Location Services:** No geolocation requirements
- **Contacts/Calendar:** No system integration

**Future Permissions (Native Android App):**
- Storage permissions for offline audio caching
- Notification permissions (if retention features added)

### Offline Mode & Data Strategy

**Development Environment (Local):**
- **Audio Files:** Stored locally in project assets for development
- **Progress Data:** LocalStorage API for all user progress tracking
- **Character/Vocabulary Content:** Embedded in application bundle

**Production Environment (Remote):**
- **Audio Delivery:** Cloudflare R2 bucket for character pronunciation audio files
  - 44 consonant audio files
  - 32 vowel form audio files
  - 4 tone mark audio files
  - 50 vocabulary word audio files
  - Total: ~130 audio files at 128kbps AAC
- **Audio Caching Strategy:**
  - Service Worker caches audio files on first load
  - Offline playback from cached audio
  - Progressive loading (cache as user progresses, not all at once)
- **Progress Persistence:** LocalStorage (no cloud sync in POC)

**Offline Capability Requirements:**
- **Full Offline Functionality:** Character tracing, vocabulary flash cards, quizzes work without network
- **Initial Online Load:** First session requires network to load app shell and initial character set
- **Audio Preloading:** Cache upcoming characters/vocabulary (e.g., next 10 items) to ensure smooth offline practice

### Push Notifications & Engagement

**POC Approach: No Push Notifications**
- No web push notification implementation
- No daily practice reminders via browser notifications
- User self-driven engagement (no retention automation)

**Rationale:**
- Personal use project eliminates need for automated retention
- Simplifies POC scope and permission complexity
- Focus on core learning experience over engagement mechanics

**Future Consideration (Native Android):**
- Daily practice reminders (if retention data shows need)
- Streak tracking notifications
- Weak area practice prompts

### Browser Compatibility & Rendering

**POC Browser Support Matrix:**

| Browser | Platform | Support Level | Notes |
|---------|----------|---------------|-------|
| Chrome Desktop | Desktop | Primary Development | Testing and development environment |
| Android Chrome | Android | Primary Target | Production user experience |
| Safari (iOS/Desktop) | iOS/Desktop | Not Supported | Out of scope for POC |
| Firefox | Any | Not Supported | Out of scope for POC |
| Edge | Any | Not Supported | Out of scope for POC |

**Chrome-Specific Optimizations:**
- Canvas rendering tuned for Chromium engine
- Audio playback using Chrome-optimized codecs (AAC)
- Touch event handling tested exclusively on Android Chrome
- Service Worker implementation tested on Chrome only

**Thai Font Rendering (Chrome):**
- Unicode Thai character support validated on Chrome/Android
- Tone mark positioning tested on Chromium rendering engine
- Ghost font (30% opacity) rendering validated for tracing canvas

### App Store Compliance & Distribution

**POC Distribution Strategy: Web-Only, No App Store**
- **Access Method:** Direct URL distribution (e.g., `thai-master.personal.dev`)
- **No App Store Submission:**
  - No Apple App Store review requirements
  - No Google Play Store policies to satisfy
  - No age rating, privacy policy, or terms of service requirements for POC
- **Personal Use Only:** Single-user or small group testing (no public launch)

**Advantages of Non-Store Distribution:**
- Instant deployment and iteration (no review delays)
- No compliance overhead (COPPA, privacy policies, etc.)
- No monetization restrictions
- Rapid bug fixes without app review process

**Future Store Considerations (If Expanding):**
- Google Play Store policies for educational apps
- Privacy policy requirement for data collection
- Content rating for language learning (likely "Everyone")
- COPPA compliance if targeting under-13 learners (not planned)

### Technical Architecture Summary

**POC Tech Stack (Chrome-Optimized):**
- **Frontend:** React/Vue/Vanilla JS (decision pending architecture phase)
- **Canvas API:** HTML5 Canvas for character tracing
- **Audio:** HTML5 Audio with Service Worker caching
- **Storage:** LocalStorage API for progress persistence
- **Hosting:** Static site hosting (Vercel, Netlify, Cloudflare Pages)
- **Audio CDN:** Cloudflare R2 for audio file delivery
- **Offline:** Service Worker with Cache API

**Performance Targets (Chrome/Android):**
- Canvas touch latency: <50ms on mid-range Android devices
- Audio playback start: <100ms from cached files
- Initial load time: <2s on 4G connection (Chrome Android)
- Offline mode: Full functionality after initial load

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach: Problem-Solving POC (Proof of Concept)**

Thai Master's MVP is a **validation experiment** designed to prove that script-first methodology works for non-Latin script languages. This is not a market-ready product launch but a personal learning tool that validates pedagogical assumptions before expanding to other languages or users.

**Strategic Rationale:**
- **Hypothesis Testing**: Validate that 4 weeks of character mastery before vocabulary improves retention vs. traditional apps
- **Personal Use Case**: Solo learner (you) serves as primary test subject - real motivation, real content consumption goals
- **Expansion Foundation**: If Thai POC succeeds (70%/50% accuracy gates), methodology is proven for Japanese/Arabic/Korean expansion
- **Rapid Iteration**: Personal use removes compliance overhead, enables daily iteration based on learning experience

**Resource Requirements:**
- **Team Size**: Solo developer (full-stack web development, Canvas API, Service Workers)
- **Timeline**: 12-week POC validation period (parallel to personal Thai learning journey)
- **Technical Skills**: Frontend development, Chrome DevTools, audio file management, LocalStorage API
- **External Dependencies**: Cloudflare R2 for audio hosting, native speaker for audio recordings (~130 audio files)

### MVP Feature Set (Phase 1 - POC Validation)

**Core User Journeys Supported:**
1. **Character Learning Journey (Weeks 1-4)**: Complete tracing canvas system for all 44 consonants, 32 vowel forms, 4 tone marks
2. **Vocabulary Learning Journey (Weeks 5-12)**: 50-word flash-card deck with 85% known / 15% sentence exposure
3. **Performance Review Journey (Weeks 1-12)**: Report card dashboard, weak area identification, custom revision deck

**Must-Have Capabilities (Non-Negotiable for POC):**

**Pillar 1 (Character Foundation) - Complete:**
- Single-canvas tracing system with ghost font (30% opacity)
- All Thai characters: 44 consonants + 32 vowels + 4 tone marks
- Audio pronunciation for every character (native speaker recordings)
- Individual canvas reset for repetition practice
- Offline functionality (Service Worker caching)

**Pillar 2 (Vocabulary Foundation) - Minimal:**
- 50-word foundational deck (NOT 100, NOT 1000 - lean POC scope)
- Flash-card interface with audio pronunciation
- 85% known / 15% controlled sentence exposure methodology
- Spaced repetition algorithm (surfaces weak items)
- Progression gate (unlocks after Pillar 1 completion)

**Pillar 3 (Assessment) - Core:**
- Character recognition quizzes (multiple choice)
- Vocabulary quizzes with accuracy tracking
- Report card dashboard (overall accuracy, category breakdown)
- Weak area identification (<70% alphabet, <50% vocabulary)
- "Add to Revision Deck" functionality
- Progress persistence (LocalStorage)

**Explicitly Out of Scope for MVP:**
- ❌ Tablet 2x3 grid canvas (single mobile canvas only)
- ❌ Global clear button (individual reset sufficient)
- ❌ Handwriting recognition AI validation (manual tracing validation)
- ❌ >50 vocabulary words (even if time permits - strict scope discipline)
- ❌ Tone logic quizzes (Phase 2+ enhancement)
- ❌ Social features, leaderboards, competitive modes
- ❌ User accounts, cloud sync, multi-device support
- ❌ Dark mode, theme switching, accessibility features
- ❌ Push notifications, retention automation
- ❌ Multi-language UI (English only)
- ❌ iOS testing, cross-browser compatibility

### Post-MVP Features

**Phase 2: Growth Features (Post-POC Success - If 70%/50% Gates Pass)**

**Pillar 1 Enhancements:**
- Tablet version with 2x3 tracing grid for simultaneous practice
- Global clear button for all canvases
- Stroke order guidance animations
- Advanced visual feedback on tracing accuracy

**Pillar 2 Vocabulary Expansion:**
- Expand from 50 → 100 words (Week 13-20)
- Then 100 → 500 words (with category organization)
- Three difficulty levels (Foundational, Practical, Nuanced)
- Category-based decks (Food, Travel, Social, Greetings, Numbers)
- Tone highlighting visual system
- Custom vocabulary deck creation from user's Thai content

**Pillar 3 Assessment Evolution:**
- Tone application logic quizzes (predict tone from consonant class + vowel)
- Timed writing challenges for speed improvement
- Comprehensive analytics dashboard with retention curves
- Accuracy-based competitive modes (if expanding to multiple users)

**Platform Features:**
- User accounts with cloud sync (if sharing with others)
- Progress sharing capabilities
- Adaptive learning paths customized to individual pace
- Content integration (import vocabulary from favorite Thai YouTubers)
- Dark mode and theme switching

**Phase 3: Deep Thai Learning & Advanced Features (Post-Vocabulary Growth)**

**Focus: Master Thai comprehensively before expanding to other languages**

**Vocabulary Depth & Content Expansion:**
- Expand vocabulary deck to 1,000-2,000 words (comprehensive Thai foundation)
- Advanced category-based decks (Technical terms, Slang, Regional dialects)
- Sentence construction practice (4-5 word → 10-15 word sentences)
- Real-world content integration (import vocabulary from Thai YouTube channels, social media)
- Contextual learning (words grouped by themes: cooking shows, BL series dialogue, travel vlogs)

**Platform & UX Enhancements:**
- **Live Recording Features**: Record your pronunciation, compare to native speaker audio
- **Multiple Canvas Practice Page**: 2x3 grid (tablet), 3x4 grid (desktop) for intensive practice sessions
- **Advanced Tracing Features**: Stroke order validation, speed challenges, accuracy scoring
- **Enhanced Practice Modes**: Timed challenges, competitive self-improvement tracking

**[Phase 3 Details Deferred - To Be Defined Post-Phase 2 Success]**

**Future Vision (Phase 4+): Multi-Language Platform Expansion**

After Thai mastery is achieved (1,000+ words, advanced features validated), validate methodology generalization to other non-Latin script languages: Japanese (Hiragana/Katakana), Arabic, Korean (Hangul), Hebrew, Hindi (Devanagari).

### Risk Mitigation Strategy

**Technical Risks:**

**Risk #1: Canvas Performance on Mid-Range Android Devices**
- **Mitigation**: Chrome Desktop development ensures Chromium optimization, test on mid-range Android early (Week 2)
- **Contingency**: If <50ms latency not achievable, simplify ghost font rendering or reduce opacity layers
- **Validation**: Test tracing latency on budget Android device (e.g., Samsung Galaxy A-series)

**Risk #2: Audio File Loading & Caching Complexity**
- **Mitigation**: Progressive audio loading (cache next 10 items, not all 130 files at once)
- **Contingency**: If Service Worker caching fails, fallback to streaming audio from R2 bucket
- **Validation**: Test offline mode within Week 1 of development

**Risk #3: LocalStorage Data Loss**
- **Mitigation**: Implement progress export/import functionality for manual backup
- **Contingency**: If LocalStorage unreliable, upgrade to IndexedDB for POC
- **Validation**: Daily testing of progress persistence across browser sessions

**Market Risks:**

**Risk #1: Script-First Methodology Doesn't Work (Hypothesis Failure)**
- **Mitigation**: This is the primary POC validation - Go/No-Go gates at Week 2, Week 4, Week 12
- **Contingency**: If <70% alphabet accuracy at Week 4, analyze whether issue is methodology or implementation (UX, pacing, content quality)
- **Pivot Option**: If methodology fails, explore "hybrid mode" (parallel character + vocabulary learning)

**Risk #2: 4-Week Character Focus Causes Dropout (Delayed Gratification)**
- **Mitigation**: Target yourself (intrinsically motivated) as primary user, eliminating retention concerns for POC
- **Contingency**: If motivation drops in Weeks 1-2, introduce 5-10 "motivation words" early (สวัสดี hello, ขอบคุณ thank you)
- **Validation**: Track your own engagement - if you skip 3+ days consecutively, reassess pacing

**Risk #3: Methodology Doesn't Generalize to Other Languages**
- **Mitigation**: This is Phase 4+ risk, not MVP blocker - validate Thai first before expanding
- **Contingency**: If Japanese validation fails, position as "Thai Master" only (abandon category platform vision)

**Resource Risks:**

**Risk #1: Native Speaker Audio Recording Unavailable**
- **Mitigation**: Source audio from multiple channels (Fiverr, Upwork, Thai language subreddits, existing open-source Thai audio)
- **Contingency**: Use high-quality TTS (Text-to-Speech) for POC if native speaker unavailable
- **Validation**: Secure audio source before starting development (Week 0)

**Risk #2: Solo Developer Burnout or Time Constraints**
- **Mitigation**: Strict MVP scope discipline (50 words, Chrome-only, no nice-to-haves)
- **Contingency**: If development stalls, reduce scope further (e.g., 25 words instead of 50, consonants-only first release)
- **Minimum Viable Validation**: Even with reduced scope, core hypothesis can be tested

**Risk #3: Technical Blockers (Canvas API, Service Workers)**
- **Mitigation**: Prototype tracing canvas and audio caching in Week 1 before full development
- **Contingency**: If Service Workers prove complex, accept online-only mode for initial POC
- **Technical De-Risking**: Build proof-of-concept prototypes for high-risk components early

### Scope Discipline Philosophy

**Core Principle: Validate First, Enhance Later**

The MVP scoping decisions are designed around a single question: **"What's the minimum needed to validate that script-first methodology works for Thai learning?"**

Every feature, enhancement, and "nice-to-have" is ruthlessly deferred unless it directly answers this validation question. The 50-word vocabulary limit, Chrome-only support, no tablet features, and personal-use-only constraints are all strategic choices to maximize learning from the POC while minimizing development complexity.

**Post-POC Decision Framework:**
- If Week 12 success criteria MET (70%/50% accuracy) → Expand to Phase 2 (vocabulary growth + platform features)
- If Week 12 criteria PARTIAL (50-70% success rate) → Iterate on UX/pacing before expansion
- If Week 12 criteria FAILED (<50% success) → Fundamental reassessment of methodology or pivot to hybrid approach

## Functional Requirements

### Character Learning & Practice

- **FR1**: Users can practice tracing Thai consonants (44 characters) on a touch-enabled canvas with ghost font guidance at 30% opacity
- **FR2**: Users can practice tracing Thai vowels (32 vowel forms) on a touch-enabled canvas with ghost font guidance
- **FR3**: Users can practice tracing Thai tone marks (4 tone marks) on a touch-enabled canvas with ghost font guidance
- **FR4**: Users can reset individual character canvases to practice the same character multiple times
- **FR5**: Users can hear native speaker pronunciation for each character when practicing
- **FR6**: Users can track their daily character learning progress (characters practiced per day)
- **FR7**: System prevents users from accessing vocabulary deck until all characters in Pillar 1 are completed

### Vocabulary Learning & Flash Cards

- **FR8**: Users can study 50-word Thai vocabulary deck using flash-card interface
- **FR9**: Users can hear native speaker pronunciation for each vocabulary word
- **FR10**: System presents flash cards following 85% known content / 15% controlled unknown sentence exposure methodology
- **FR11**: System surfaces vocabulary words using spaced repetition algorithm based on user accuracy
- **FR12**: Users can see tone marks integrated with vocabulary words during flash-card study
- **FR13**: Users can track daily vocabulary learning progress (new words learned per day)
- **FR14**: System introduces 4-5 word sentence examples using mostly known vocabulary (15% unknown exposure)

### Assessment & Quiz System

- **FR15**: Users can take character recognition quizzes (multiple-choice format) for consonants
- **FR16**: Users can take character recognition quizzes (multiple-choice format) for vowels
- **FR17**: Users can take character recognition quizzes (multiple-choice format) for tone marks
- **FR18**: Users can take vocabulary recognition quizzes with accuracy tracking
- **FR19**: System provides immediate feedback on quiz answers (correct/incorrect with audio confirmation)
- **FR20**: System tracks quiz accuracy percentages separately for consonants, vowels, tone marks, and vocabulary

### Performance Review & Reporting

- **FR21**: Users can view report card dashboard showing overall accuracy (alphabet 70% target, vocabulary 50% target)
- **FR22**: Users can see accuracy breakdown by category (consonants, vowels, tone marks, vocabulary) on report card
- **FR23**: Users can view visual indicators (✓ above target, ⚠️ below target) for each accuracy category
- **FR24**: Users can see trend visualization showing weekly/daily accuracy over time
- **FR25**: System identifies weak areas (items with <70% alphabet accuracy or <50% vocabulary accuracy)
- **FR26**: Users can view list of specific characters/words consistently missed with individual accuracy percentages
- **FR27**: Users can add weak items to a custom revision deck for targeted practice
- **FR28**: System dynamically updates revision deck by removing mastered items and adding new weak spots
- **FR29**: System surfaces revision deck items more frequently in practice sessions based on spaced repetition

### User Onboarding & Access

- **FR30**: Users can immediately access the first character tracing canvas without creating an account (no signup wall)
- **FR31**: Users receive a prompt to save progress after practicing 5-6 characters
- **FR32**: Users can create a free account to persist their learning progress
- **FR33**: Users can access the application directly via web browser without app store installation

### Audio & Pronunciation System

- **FR34**: System plays native speaker audio pronunciation for all 44 Thai consonants
- **FR35**: System plays native speaker audio pronunciation for all 32 Thai vowel forms
- **FR36**: System plays native speaker audio pronunciation for all 4 Thai tone marks
- **FR37**: System plays native speaker audio pronunciation for all 50 vocabulary words
- **FR38**: System caches audio files for offline playback using Service Worker
- **FR39**: System progressively loads audio files (caches next 10 items) to optimize performance

### Data Persistence & Offline Mode

- **FR40**: System persists user progress (characters practiced, vocabulary learned, quiz scores) using LocalStorage
- **FR41**: System maintains user progress across browser sessions without data loss
- **FR42**: Users can practice character tracing offline (after initial app load)
- **FR43**: Users can study vocabulary flash cards offline (after audio caching)
- **FR44**: Users can take quizzes offline with results persisted when returning online
- **FR45**: System provides export/import functionality for manual progress backup

### Content & Learning Progression

- **FR46**: System tracks character mastery completion status (all 44 consonants + 32 vowels + 4 tone marks)
- **FR47**: System unlocks vocabulary deck only after character mastery is marked complete (progression gate)
- **FR48**: System tracks Week 4 milestone (character mastery completion)
- **FR49**: System tracks Week 12 milestone (50-word vocabulary deck completion)
- **FR50**: Users can see achievement indicators for milestone completions (Week 4, Week 6, Week 12)

## Non-Functional Requirements

### Performance

**NFR-P1: Canvas Responsiveness**
- Touch input on tracing canvas must respond within 50ms on mid-range Android devices (Samsung Galaxy A-series or equivalent)
- Stroke rendering must be smooth with no visible lag during character tracing

**NFR-P2: Audio Playback**
- Audio pronunciation playback must start within 100ms from cached files
- First-time audio loading from Cloudflare R2 must complete within 500ms on 4G connection

**NFR-P3: Application Load Time**
- Initial app load must complete within 2 seconds on 4G mobile connection (Chrome Android)
- Subsequent page navigation must complete within 500ms when cached

**NFR-P4: Offline Mode Performance**
- Offline character tracing must perform identically to online mode (<50ms latency)
- Offline audio playback must start within 100ms with no buffering delays
- Quiz functionality must operate offline with no performance degradation

**NFR-P5: Progressive Loading**
- System must cache next 10 audio files (characters or vocabulary) in background without blocking UI
- Audio caching must not interfere with canvas performance or user interactions

### Reliability

**NFR-R1: Data Persistence**
- User progress (characters practiced, vocabulary learned, quiz scores) must persist across browser sessions with zero data loss
- LocalStorage writes must complete successfully with error handling for quota exceeded scenarios
- Progress must survive browser crashes and unexpected closures

**NFR-R2: Offline Mode Reliability**
- Once cached, character practice and vocabulary flash cards must work 100% offline
- Service Worker must maintain cached audio files for minimum 30 days
- Offline quiz results must be correctly persisted and reflected when returning online

**NFR-R3: Progress Tracking Accuracy**
- Accuracy calculations must be precise to 2 decimal places (e.g., 72.45%)
- Weak area identification must correctly identify all items below 70%/50% thresholds
- Spaced repetition algorithm must surface items consistently based on performance patterns

**NFR-R4: Export/Import Integrity**
- Progress export must capture 100% of user data (characters, vocabulary, scores, timestamps)
- Progress import must restore data with perfect fidelity (no data corruption or loss)

### Usability

**NFR-U1: Mobile-First Optimization**
- Canvas interface must be fully functional and comfortable to use on mobile screens (minimum 5-inch display)
- Touch targets must be minimum 44x44 pixels to prevent accidental taps
- UI must adapt responsively to mobile viewport without horizontal scrolling

**NFR-U2: Audio Quality**
- Native speaker pronunciation audio must be minimum 128kbps AAC quality
- Audio must be free of background noise, distortion, or compression artifacts
- Volume levels must be normalized across all 130 audio files (consonants, vowels, tone marks, vocabulary)

**NFR-U3: Thai Font Rendering**
- Thai characters must render with accurate tone mark positioning across Chrome Desktop and Chrome Android
- Ghost font (30% opacity) must be clearly visible on mobile screens without strain
- Font size must be appropriate for touch tracing (minimum 48pt for mobile canvas)

**NFR-U4: Feedback & Error Handling**
- User must receive immediate visual/audio feedback for all interactions (tracing completion, quiz answers, button presses)
- Error states (offline mode, audio loading failure, storage quota exceeded) must be clearly communicated with actionable guidance
- Quiz answer feedback must be instant (<100ms after selection)

### Security

**NFR-S1: Basic Web Security**
- Application must be served over HTTPS in production
- No sensitive user data (passwords, payment info, personal identifiable information) is collected during POC
- LocalStorage data is accessible only within same-origin (Chrome browser on same device)

**NFR-S2: Account Security (If Implemented)**
- If account creation feature is added, passwords must be hashed before storage
- No plaintext password storage in any location
- Basic email validation to prevent malformed account data

**Note:** Advanced security measures (OAuth, 2FA, encryption at rest) are deferred to post-POC phases given personal-use scope and absence of sensitive data.

### Integration

**NFR-I1: Cloudflare R2 Reliability**
- Audio file delivery from Cloudflare R2 must have 99% uptime for POC period (12 weeks)
- Failed audio loads must gracefully retry (3 attempts) before showing error to user
- R2 bucket must support CORS for cross-origin audio requests from web app domain

**NFR-I2: Audio CDN Performance**
- Audio files must be delivered with appropriate caching headers (max-age 30 days)
- CDN must support range requests for audio streaming
- Audio file URLs must be stable and not change during POC period



